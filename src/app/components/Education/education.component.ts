import { Component, signal, computed, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { LanguageService } from '../../services/language.service';

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
  private languageService = inject(LanguageService);
  
  // Получаем переводы из сервиса
  protected readonly t = computed(() => this.languageService.getTranslations());

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


  ngAfterViewInit(): void {
    // Регистрируем education компонент как четвертый элемент (порядок 3) с анимацией flipInX
    this.scrollAnimationService.registerElement('education', this.elementRef.nativeElement, 3, 'flipInX');
  }

  ngOnDestroy(): void {
    // Отменяем регистрацию при уничтожении компонента
    this.scrollAnimationService.unregisterElement('education');
  }
}
