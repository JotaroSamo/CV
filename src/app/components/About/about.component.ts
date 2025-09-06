import { Component, signal, computed, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private scrollAnimationService = inject(ScrollAnimationService);
  private languageService = inject(LanguageService);
  
  // Получаем переводы из сервиса
  protected readonly t = computed(() => this.languageService.getTranslations());
  
  protected readonly aboutText = computed(() => this.t().about_text);

  protected readonly highlights = signal([
    {
      icon: 'code',
      title: 'Backend Разработка',
      description: 'Создание масштабируемых API и веб-приложений с использованием ASP.NET Core'
    },
    {
      icon: 'storage',
      title: 'Базы данных',
      description: 'Работа с SQL Server, Entity Framework и проектирование схем данных'
    },
    {
      icon: 'message',
      title: 'Message Broker',
      description: 'Работа с RabbitMQ для асинхронной обработки сообщений и микросервисов'
    },
    {
      icon: 'api',
      title: 'API Integration',
      description: 'Создание RESTful API и интеграция с внешними сервисами'
    }
  ]);

  protected readonly values = signal([
    'Качество кода',
    'Постоянное обучение',
    'Командная работа',
    'Креативность',
    'Внимание к деталям'
  ]);

  ngAfterViewInit(): void {
    // Регистрируем about компонент как второй элемент (порядок 1) с анимацией "из неоткуда"
    this.scrollAnimationService.registerElement('about', this.elementRef.nativeElement, 1, 'zoomIn');
  }

  ngOnDestroy(): void {
    // Отменяем регистрацию при уничтожении компонента
    this.scrollAnimationService.unregisterElement('about');
  }
}
