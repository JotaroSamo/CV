import { Injectable, signal, computed, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'cv-theme-mode';
  
  // Сигнал для текущей темы
  private themeSignal = signal<ThemeMode>('dark');
  
  // Computed для получения текущей темы
  readonly currentTheme = computed(() => this.themeSignal());
  
  // Computed для проверки, является ли тема темной
  readonly isDarkTheme = computed(() => this.currentTheme() === 'dark');
  
  // Computed для проверки, является ли тема светлой
  readonly isLightTheme = computed(() => this.currentTheme() === 'light');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeTheme();
  }

  /**
   * Инициализирует тему при загрузке приложения
   */
  private initializeTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Получаем сохраненную тему из localStorage
    const savedTheme = localStorage.getItem(this.THEME_STORAGE_KEY) as ThemeMode;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      this.themeSignal.set(savedTheme);
    } else {
      // Если нет сохраненной темы, используем системную
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.themeSignal.set(prefersDark ? 'dark' : 'light');
    }

    // Применяем тему к документу
    this.applyTheme(this.currentTheme());
  }

  /**
   * Переключает тему
   */
  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const newTheme: ThemeMode = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /**
   * Устанавливает конкретную тему
   */
  setTheme(theme: ThemeMode): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.themeSignal.set(theme);
    this.applyTheme(theme);
    this.saveTheme(theme);
  }

  /**
   * Применяет тему к документу
   */
  private applyTheme(theme: ThemeMode): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const body = document.body;
    const docEl = document.documentElement;
    
    if (theme === 'dark') {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      body.style.colorScheme = 'dark';
      docEl.classList.remove('light-theme');
      docEl.classList.add('dark-theme');
      docEl.style.colorScheme = 'dark';
      docEl.setAttribute('data-theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      body.style.colorScheme = 'light';
      docEl.classList.remove('dark-theme');
      docEl.classList.add('light-theme');
      docEl.style.colorScheme = 'light';
      docEl.setAttribute('data-theme', 'light');
    }
  }

  /**
   * Сохраняет тему в localStorage
   */
  private saveTheme(theme: ThemeMode): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(this.THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.warn('Не удалось сохранить тему в localStorage:', error);
    }
  }

  /**
   * Получает текущую тему
   */
  getCurrentTheme(): ThemeMode {
    return this.currentTheme();
  }

  /**
   * Сбрасывает тему к системной
   */
  resetToSystemTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme: ThemeMode = prefersDark ? 'dark' : 'light';
    this.setTheme(systemTheme);
  }
}
