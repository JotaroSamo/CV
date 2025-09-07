import { Component, signal, computed, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('glassPanel', { static: false }) glassPanel!: ElementRef<HTMLDivElement>;
  
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);
  
  protected readonly name = signal('Ваше Имя'); // Замените на ваше имя
  
  // Получаем переводы из сервиса
  protected readonly t = computed(() => this.languageService.getTranslations());
  
  protected readonly navigationItems = computed(() => [
    { label: this.t().home, href: '#home' },
    { label: this.t().about, href: '#about' },
    { label: this.t().experience, href: '#experience' },
    { label: this.t().education, href: '#education' }
  ]);

  // Получаем состояние темы из сервиса
  protected readonly currentTheme = this.themeService.currentTheme;
  protected readonly isDarkTheme = this.themeService.isDarkTheme;
  protected readonly isLightTheme = this.themeService.isLightTheme;
  
  // Получаем состояние языка из сервиса
  protected readonly currentLanguage = this.languageService.currentLanguage;
  protected readonly isRussian = this.languageService.isRussian;
  protected readonly isEnglish = this.languageService.isEnglish;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupGlassPanel();
    }
  }

  private setupGlassPanel(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const panel = this.glassPanel.nativeElement;
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach((item) => {
      item.addEventListener('mouseenter', (e) => {
        const target = e.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        
        panel.style.left = `${rect.left}px`;
        panel.style.top = `${rect.top}px`;
        panel.style.width = `${rect.width}px`;
        panel.style.height = `${rect.height}px`;
        panel.style.opacity = '1';
        panel.style.transform = 'scale(1)';
      });

      item.addEventListener('mouseleave', () => {
        panel.style.opacity = '0';
        panel.style.transform = 'scale(0.8)';
      });
    });
  }

  /**
   * Переключает тему
   */
  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  /**
   * Переключает язык
   */
  protected toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
}
