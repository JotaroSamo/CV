import { Injectable, signal, computed, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type AnimationType = 'fadeInUp' | 'slideInLeft' | 'slideInRight' | 'slideInUp' | 'zoomIn' | 'bounceIn' | 'flipInX' | 'rotateIn';

export interface AnimationElement {
  id: string;
  element: HTMLElement;
  isVisible: boolean;
  hasAnimated: boolean;
  order: number;
  animationType: AnimationType;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private elements = signal<Map<string, AnimationElement>>(new Map());
  private currentVisibleOrder = signal<number>(0);
  
  // Computed для получения видимых элементов в порядке их появления
  protected readonly visibleElements = computed(() => {
    const elementsMap = this.elements();
    return Array.from(elementsMap.values())
      .filter(el => el.isVisible && el.hasAnimated)
      .sort((a, b) => a.order - b.order);
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeIntersectionObserver();
    }
  }

  private intersectionObserver: IntersectionObserver | null = null;

  private initializeIntersectionObserver(): void {
    // Проверяем поддержку IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('IntersectionObserver не поддерживается в этом браузере. Анимации будут отключены.');
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const elementId = entry.target.getAttribute('data-animation-id');
          if (elementId) {
            this.updateElementVisibility(elementId, entry.isIntersecting);
          }
        });
      },
      {
        threshold: 0.1, // Элемент считается видимым когда 10% его площади видно
        rootMargin: '0px 0px -50px 0px' // Небольшой отступ снизу для более плавного появления
      }
    );
  }

  /**
   * Регистрирует элемент для анимации
   * @param elementId Уникальный ID элемента
   * @param element HTML элемент
   * @param order Порядок появления (0 - первый, 1 - второй и т.д.)
   * @param animationType Тип анимации
   */
  registerElement(elementId: string, element: HTMLElement, order: number = 0, animationType: AnimationType = 'fadeInUp'): void {
    // Проверяем, что мы в браузере
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const animationElement: AnimationElement = {
      id: elementId,
      element,
      isVisible: false,
      hasAnimated: false,
      order,
      animationType
    };

    this.elements.update(elements => {
      const newElements = new Map(elements);
      newElements.set(elementId, animationElement);
      return newElements;
    });

    // Добавляем атрибут для отслеживания
    element.setAttribute('data-animation-id', elementId);
    
    // Добавляем начальные стили для анимации в зависимости от типа
    this.setInitialAnimationStyles(element, animationType);

    // Начинаем наблюдение за элементом
    if (this.intersectionObserver) {
      this.intersectionObserver.observe(element);
    } else {
      // Если IntersectionObserver недоступен, показываем элемент сразу
      setTimeout(() => {
        this.animateElement(elementId);
      }, 100);
    }

    // Если это первый элемент (intro), показываем его сразу
    if (order === 0) {
      setTimeout(() => {
        this.animateElement(elementId);
      }, 300); // Увеличиваем задержку для более плавного появления
    }
  }

  /**
   * Отменяет регистрацию элемента
   */
  unregisterElement(elementId: string): void {
    // Проверяем, что мы в браузере
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const element = this.elements().get(elementId);
    if (element && this.intersectionObserver) {
      this.intersectionObserver.unobserve(element.element);
    }

    this.elements.update(elements => {
      const newElements = new Map(elements);
      newElements.delete(elementId);
      return newElements;
    });
  }

  private updateElementVisibility(elementId: string, isVisible: boolean): void {
    this.elements.update(elements => {
      const newElements = new Map(elements);
      const element = newElements.get(elementId);
      
      if (element) {
        element.isVisible = isVisible;
        newElements.set(elementId, element);
        
        // Если элемент стал видимым и еще не анимировался, запускаем анимацию
        if (isVisible && !element.hasAnimated) {
          this.animateElement(elementId);
        }
      }
      
      return newElements;
    });
  }

  private animateElement(elementId: string): void {
    const element = this.elements().get(elementId);
    if (!element) return;

    // Проверяем, можно ли анимировать этот элемент
    // (должен быть видимым и предыдущие элементы должны быть уже анимированы)
    if (this.canAnimateElement(elementId)) {
      element.hasAnimated = true;
      
      // Для элементов с одинаковым порядком добавляем небольшую задержку
      const delay = this.getAnimationDelay(elementId);
      
      setTimeout(() => {
        // Применяем анимацию в зависимости от типа
        this.applyAnimationStyles(element.element, element.animationType);
      }, delay);
      
      // Обновляем состояние
      this.elements.update(elements => {
        const newElements = new Map(elements);
        newElements.set(elementId, element);
        return newElements;
      });

      // Обновляем порядок видимых элементов
      this.currentVisibleOrder.update(current => Math.max(current, element.order));
    }
  }

  private canAnimateElement(elementId: string): boolean {
    const element = this.elements().get(elementId);
    if (!element) return false;

    // Элементы с порядком 0 (intro) всегда можно анимировать
    if (element.order === 0) return true;

    // Для остальных элементов проверяем, что предыдущий элемент уже анимирован
    const currentOrder = this.currentVisibleOrder();
    return element.order <= currentOrder + 1;
  }

  /**
   * Получает задержку для анимации элемента
   */
  private getAnimationDelay(elementId: string): number {
    // Для intro-right добавляем задержку 300ms
    if (elementId === 'intro-right') {
      return 300;
    }
    
    // Для остальных элементов без задержки
    return 0;
  }

  /**
   * Принудительно анимирует элемент (для отладки)
   */
  forceAnimateElement(elementId: string): void {
    this.animateElement(elementId);
  }

  /**
   * Устанавливает начальные стили для анимации
   */
  private setInitialAnimationStyles(element: HTMLElement, animationType: AnimationType): void {
    element.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';
    
    switch (animationType) {
      case 'fadeInUp':
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        break;
      case 'slideInLeft':
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        break;
      case 'slideInRight':
        element.style.opacity = '0';
        element.style.transform = 'translateX(50px)';
        break;
      case 'slideInUp':
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        break;
      case 'zoomIn':
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        break;
      case 'bounceIn':
        element.style.opacity = '0';
        element.style.transform = 'scale(0.3)';
        break;
      case 'flipInX':
        element.style.opacity = '0';
        element.style.transform = 'rotateX(90deg)';
        break;
      case 'rotateIn':
        element.style.opacity = '0';
        element.style.transform = 'rotate(-180deg) scale(0.8)';
        break;
      default:
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    }
  }

  /**
   * Применяет финальные стили анимации
   */
  private applyAnimationStyles(element: HTMLElement, animationType: AnimationType): void {
    element.style.opacity = '1';
    
    switch (animationType) {
      case 'fadeInUp':
      case 'slideInLeft':
      case 'slideInRight':
      case 'slideInUp':
        element.style.transform = 'translate(0, 0)';
        break;
      case 'zoomIn':
      case 'bounceIn':
        element.style.transform = 'scale(1)';
        break;
      case 'flipInX':
        element.style.transform = 'rotateX(0deg)';
        break;
      case 'rotateIn':
        element.style.transform = 'rotate(0deg) scale(1)';
        break;
      default:
        element.style.transform = 'translate(0, 0)';
    }
  }

  /**
   * Сбрасывает все анимации
   */
  resetAnimations(): void {
    this.elements().forEach(element => {
      this.setInitialAnimationStyles(element.element, element.animationType);
      element.hasAnimated = false;
    });
    
    this.currentVisibleOrder.set(0);
    
    // Анимируем первый элемент
    setTimeout(() => {
      this.animateElement('intro');
    }, 100);
  }

  /**
   * Очищает все зарегистрированные элементы
   */
  destroy(): void {
    if (isPlatformBrowser(this.platformId) && this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    this.elements.set(new Map());
    this.currentVisibleOrder.set(0);
  }
}
