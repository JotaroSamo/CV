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
      description: 'Разработка веб-приложений и API с использованием ASP.NET Core, Entity Framework и SQL Server.',
      technologies: ['C#', 'ASP.NET Core', 'Entity Framework', 'SQL Server', 'RabbitMQ']
    },
    {
      company: 'Startup Inc',
      position: 'Junior .NET Developer',
      period: '2021 - 2022',
      description: 'Участие в разработке микросервисной архитектуры и создание RESTful API.',
      technologies: ['C#', 'ASP.NET Core', 'Docker', 'PostgreSQL']
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
