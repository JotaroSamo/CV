# Руководство по системе анимации последовательного появления элементов

## Обзор

Система анимации позволяет элементам появляться на странице в определенном порядке с различными эффектами:
1. **Intro** - левая часть появляется слева, правая часть справа
2. **About** - появляется с эффектом "из неоткуда" (zoomIn)
3. **Experience** - появляется с поворотом (rotateIn)
4. И так далее для будущих компонентов...

## Как это работает

### 1. Сервис ScrollAnimationService

Сервис `ScrollAnimationService` управляет всеми анимациями:
- Отслеживает видимость элементов с помощью Intersection Observer
- Контролирует порядок появления элементов
- Применяет CSS анимации к элементам

### 2. Регистрация компонента

Каждый компонент должен:
1. Импортировать `ScrollAnimationService`
2. Реализовать интерфейсы `AfterViewInit` и `OnDestroy`
3. Зарегистрировать себя в `ngAfterViewInit`
4. Отменить регистрацию в `ngOnDestroy`

### 3. Пример реализации

```typescript
import { Component, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-my-component',
  // ... остальная конфигурация
})
export class MyComponent implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private scrollAnimationService = inject(ScrollAnimationService);

  ngAfterViewInit(): void {
    // Регистрируем компонент с порядком появления и типом анимации
    // Порядок: 0 - первый, 1 - второй, 2 - третий и т.д.
    // Тип анимации: 'fadeInUp', 'slideInLeft', 'slideInRight', 'zoomIn', 'bounceIn', 'flipInX', 'rotateIn'
    this.scrollAnimationService.registerElement('my-component', this.elementRef.nativeElement, 2, 'zoomIn');
  }

  ngOnDestroy(): void {
    // Отменяем регистрацию при уничтожении компонента
    this.scrollAnimationService.unregisterElement('my-component');
  }
}
```

## Добавление нового компонента

### Шаг 1: Создайте компонент
```bash
ng generate component components/MyNewComponent
```

### Шаг 2: Добавьте анимацию
1. Импортируйте `ScrollAnimationService`
2. Добавьте методы `ngAfterViewInit` и `ngOnDestroy`
3. Зарегистрируйте компонент с уникальным ID, порядком и типом анимации

### Шаг 3: Добавьте в главный компонент
1. Импортируйте компонент в `app.ts`
2. Добавьте в массив `imports`
3. Добавьте в `app.html`

### Шаг 4: Уберите статические CSS анимации
Удалите из SCSS файла компонента все `animation` свойства, так как анимация теперь управляется сервисом.

## Порядок элементов

Текущий порядок:
- **0**: Intro (левая часть слева, правая часть справа)
- **1**: About (zoomIn - "из неоткуда")
- **2**: Experience (rotateIn - с поворотом)

Для добавления нового компонента используйте следующий порядок (3, 4, 5...).

## Типы анимаций

Доступные типы анимаций:
- **fadeInUp** - появление снизу вверх (по умолчанию)
- **slideInLeft** - появление слева
- **slideInRight** - появление справа
- **slideInUp** - появление снизу
- **zoomIn** - увеличение "из неоткуда"
- **bounceIn** - появление с отскоком
- **flipInX** - поворот по оси X
- **rotateIn** - поворот с масштабированием

## Настройка анимации

### Изменение задержки
В `ScrollAnimationService` можно настроить:
- `threshold` - процент видимости элемента для срабатывания
- `rootMargin` - отступы для более раннего/позднего срабатывания

### Изменение стилей анимации
В `styles.scss` определены CSS классы:
- `.animate-fade-in-up` - появление снизу вверх
- `.animate-slide-in-left` - появление слева
- `.animate-slide-in-right` - появление справа
- `.animate-slide-in-up` - появление снизу

## Отладка

### Принудительная анимация
```typescript
// Для отладки можно принудительно анимировать элемент
this.scrollAnimationService.forceAnimateElement('my-component');
```

### Сброс анимаций
```typescript
// Сбросить все анимации
this.scrollAnimationService.resetAnimations();
```

## Примеры использования

### Компонент "Навыки"
```typescript
ngAfterViewInit(): void {
  this.scrollAnimationService.registerElement('skills', this.elementRef.nativeElement, 3, 'bounceIn');
}
```

### Компонент "Проекты"
```typescript
ngAfterViewInit(): void {
  this.scrollAnimationService.registerElement('projects', this.elementRef.nativeElement, 4, 'flipInX');
}
```

### Компонент "Контакты"
```typescript
ngAfterViewInit(): void {
  this.scrollAnimationService.registerElement('contacts', this.elementRef.nativeElement, 5, 'slideInUp');
}
```

## Важные замечания

1. **Уникальные ID**: Каждый компонент должен иметь уникальный ID при регистрации
2. **Порядок**: Соблюдайте последовательность порядков (0, 1, 2, 3...)
3. **Очистка**: Всегда отменяйте регистрацию в `ngOnDestroy`
4. **CSS**: Удаляйте статические CSS анимации из компонентов
5. **Производительность**: Система оптимизирована для производительности с использованием Intersection Observer
6. **SSR совместимость**: Сервис автоматически определяет, работает ли в браузере или на сервере
7. **Fallback**: Если IntersectionObserver не поддерживается, элементы показываются сразу

## Будущие улучшения

- Добавление различных типов анимаций
- Настройка задержек между анимациями
- Анимации для мобильных устройств
- Поддержка пользовательских анимаций
