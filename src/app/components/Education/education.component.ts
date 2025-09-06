import { Component, signal, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private scrollAnimationService = inject(ScrollAnimationService);

  protected readonly educationItems = signal([
    {
      institution: 'Московский государственный университет',
      degree: 'Бакалавр информатики и вычислительной техники',
      period: '2019 - 2023',
      description: 'Изучение основ программирования, алгоритмов и структур данных, веб-разработки и баз данных.',
      achievements: [
        'Диплом с отличием',
        'Участие в олимпиадах по программированию',
        'Научная работа по машинному обучению'
      ],
      gpa: '4.8/5.0'
    },
    {
      institution: 'Курсы повышения квалификации',
      degree: 'Современные технологии .NET разработки',
      period: '2023 - 2024',
      description: 'Углубленное изучение ASP.NET Core, микросервисной архитектуры, Docker и Kubernetes.',
      achievements: [
        'Сертификат Microsoft',
        'Проект на GitHub с 100+ звезд',
        'Выступление на конференции разработчиков'
      ],
      gpa: '5.0/5.0'
    }
  ]);

  protected readonly certifications = signal([
    {
      name: 'Microsoft Certified: Azure Developer Associate',
      issuer: 'Microsoft',
      date: '2024',
      description: 'Сертификация по разработке облачных приложений на платформе Azure'
    },
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2023',
      description: 'Сертификация по разработке приложений в облаке AWS'
    },
    {
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2023',
      description: 'Сертификация по разработке приложений в Google Cloud Platform'
    }
  ]);

  ngAfterViewInit(): void {
    // Регистрируем education компонент как четвертый элемент (порядок 3) с анимацией flipInX
    this.scrollAnimationService.registerElement('education', this.elementRef.nativeElement, 3, 'flipInX');
  }

  ngOnDestroy(): void {
    // Отменяем регистрацию при уничтожении компонента
    this.scrollAnimationService.unregisterElement('education');
  }
}
