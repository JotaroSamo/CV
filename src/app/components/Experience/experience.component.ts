import { Component, signal, computed, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { LanguageService } from '../../services/language.service';

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
  private languageService = inject(LanguageService);
  
  // Получаем переводы из сервиса
  protected readonly t = computed(() => this.languageService.getTranslations());

  protected readonly experiences = computed(() => this.t().experience_items);

  ngAfterViewInit(): void {
    // Регистрируем experience компонент как третий элемент (порядок 2) с анимацией поворота
    this.scrollAnimationService.registerElement('experience', this.elementRef.nativeElement, 2, 'rotateIn');
  }

  ngOnDestroy(): void {
    // Отменяем регистрацию при уничтожении компонента
    this.scrollAnimationService.unregisterElement('experience');
  }
}
