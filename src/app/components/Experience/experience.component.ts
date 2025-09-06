import { Component, signal, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private scrollAnimationService = inject(ScrollAnimationService);

  protected readonly experiences = signal([
    {
      company: 'Tech Company',
      position: '.NET Developer',
      period: '2022 - Present',
      achievements: [
        'Разработал RESTful API для мобильного приложения с обработкой 10,000+ запросов в день',
        'Оптимизировал производительность базы данных, сократив время отклика на 40%',
        'Внедрил микросервисную архитектуру с использованием Docker и Kubernetes',
        'Создал систему мониторинга и логирования с помощью ELK Stack',
        'Провел код-ревью для команды из 5 разработчиков',
        'Написал unit-тесты с покрытием кода 85%+'
      ],
      technologies: ['C#', 'ASP.NET Core', 'Entity Framework', 'SQL Server', 'RabbitMQ', 'Docker', 'Kubernetes']
    },
    {
      company: 'Startup Inc',
      position: 'Junior .NET Developer',
      period: '2021 - 2022',
      achievements: [
        'Участвовал в разработке веб-приложения для управления проектами',
        'Создал модуль аутентификации и авторизации пользователей',
        'Интегрировал внешние API для обработки платежей',
        'Настроил CI/CD pipeline с автоматическим деплоем',
        'Исправил 50+ багов и улучшил стабильность системы',
        'Изучил и применил принципы SOLID и Clean Architecture'
      ],
      technologies: ['C#', 'ASP.NET Core', 'Docker', 'PostgreSQL', 'Git', 'Azure DevOps']
    }
  ]);

  ngAfterViewInit(): void {
    // Регистрируем experience компонент как третий элемент (порядок 2) с анимацией поворота
    this.scrollAnimationService.registerElement('experience', this.elementRef.nativeElement, 2, 'rotateIn');
  }

  ngOnDestroy(): void {
    // Отменяем регистрацию при уничтожении компонента
    this.scrollAnimationService.unregisterElement('experience');
  }
}
