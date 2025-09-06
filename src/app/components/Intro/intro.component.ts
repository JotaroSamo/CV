import { Component, signal, computed, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private scrollAnimationService = inject(ScrollAnimationService);
  private languageService = inject(LanguageService);
  
  // Получаем переводы из сервиса
  protected readonly t = computed(() => this.languageService.getTranslations());
  
  protected readonly name = computed(() => this.t().name);
  protected readonly position = computed(() => this.t().position);
  protected readonly age = signal(23);
  protected readonly experience = signal(2);
  protected readonly location = computed(() => this.t().location);
  protected readonly email = signal('your.email@example.com');
  protected readonly phone = computed(() => this.t().phone);
  protected readonly photoPath = signal('avatar.jpg');
  protected readonly cvPath = signal('assets/Resume RU.pdf');
  
  protected readonly skills = signal([
    'C#', 'ASP.NET Core', 'Entity Framework', 'SQL Server', 'RabbitMQ', 'Git'
  ]);
  
  protected readonly socialLinks = signal([
    { icon: 'linkedin', url: 'https://linkedin.com/in/your-profile', label: 'LinkedIn' },
    { icon: 'telegram', url: 'https://t.me/your_username', label: 'Telegram' },
    { icon: 'email', url: 'mailto:your.email@example.com', label: 'Email' }
  ]);

  // Метод для скачивания CV
  protected downloadCV(): void {
    const link = document.createElement('a');
    link.href = this.cvPath();
    link.download = 'Resume RU.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Метод для связи по телефону
  protected callPhone(): void {
    window.open(`tel:${this.phone()}`, '_self');
  }

  ngAfterViewInit(): void {
    // Регистрируем левую часть (фото и основная информация) - появляется слева
    const leftPart = this.elementRef.nativeElement.querySelector('.intro-main');
    if (leftPart) {
      this.scrollAnimationService.registerElement('intro-left', leftPart as HTMLElement, 0, 'slideInLeft');
    }

    // Регистрируем правую часть (навыки и действия) - появляется справа
    const rightPart = this.elementRef.nativeElement.querySelector('.intro-actions');
    if (rightPart) {
      this.scrollAnimationService.registerElement('intro-right', rightPart as HTMLElement, 0, 'slideInRight');
    }
  }

  ngOnDestroy(): void {
    this.scrollAnimationService.unregisterElement('intro-left');
    this.scrollAnimationService.unregisterElement('intro-right');
  }
}
