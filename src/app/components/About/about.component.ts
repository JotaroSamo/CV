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

  protected readonly highlights = computed(() => this.t().about_highlights);

  protected readonly values = computed(() => this.t().values_list);

  ngAfterViewInit(): void {
    // Регистрируем about компонент как второй элемент (порядок 1) с анимацией "из неоткуда"
    this.scrollAnimationService.registerElement('about', this.elementRef.nativeElement, 1, 'zoomIn');
  }

  ngOnDestroy(): void {
    // Отменяем регистрацию при уничтожении компонента
    this.scrollAnimationService.unregisterElement('about');
  }
}
