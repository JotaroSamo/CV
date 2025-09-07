import { Injectable, signal, computed, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'ru' | 'en';

export interface Translations {
  // Header
  home: string;
  about: string;
  experience: string;
  education: string;
  
  // Intro
  name: string;
  position: string;
  age: string;
  experience_years: string;
  location: string;
  phone: string;
  main_skills: string;
  download_cv: string;
  
  // About
  about_me: string;
  about_text: string;
  my_values: string;
  
  // Experience
  work_experience: string;
  achievements_tasks: string;
  technologies: string;
  
  // Education
  education_title: string;
  achievements: string;
  certifications: string;
  
  // Common
  years: string;
  years_experience: string;
  gpa: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly LANGUAGE_STORAGE_KEY = 'cv-language';
  
  // Сигнал для текущего языка
  private languageSignal = signal<Language>('ru');
  
  // Computed для получения текущего языка
  readonly currentLanguage = computed(() => this.languageSignal());
  
  // Computed для проверки, является ли язык русским
  readonly isRussian = computed(() => this.currentLanguage() === 'ru');
  
  // Computed для проверки, является ли язык английским
  readonly isEnglish = computed(() => this.currentLanguage() === 'en');

  // Переводы
  private readonly translations: Record<Language, Translations> = {
    ru: {
      // Header
      home: 'Главная',
      about: 'Обо мне',
      experience: 'Опыт',
      education: 'Образование',
      
      // Intro
      name: 'Антон Самошук',
      position: '.NET Developer',
      age: 'лет',
      experience_years: '+ лет опыта',
      location: 'Москва, Россия',
      phone: '+7 (999) 123-45-67',
      main_skills: 'Основные навыки',
      download_cv: 'Скачать CV',
      
      // About
      about_me: 'Обо мне',
      about_text: `Привет! Меня зовут Антон Самошук, и я .NET Developer с 2+ годами опыта в разработке современных веб-приложений и API. 
      Моя страсть к программированию началась с изучения C#, и с тех пор я постоянно развиваюсь в области backend-разработки.
      
      Я специализируюсь на создании масштабируемых и производительных приложений, используя современные технологии 
      такие как ASP.NET Core, Entity Framework, SQL Server и RabbitMQ. Мой опыт включает работу с микросервисной архитектурой, 
      создание RESTful API, асинхронной обработки сообщений и интеграцию с различными базами данных.
      
      В свободное время я изучаю новые технологии .NET экосистемы, участвую в open-source проектах и создаю собственные проекты для 
      портфолио. Я верю, что лучший способ обучения - это практика и постоянное совершенствование своих навыков.`,
      my_values: 'Мои ценности',
      
      // Experience
      work_experience: 'Опыт работы',
      achievements_tasks: 'Достижения и задачи:',
      technologies: 'Технологии:',
      
      // Education
      education_title: 'Образование',
      achievements: 'Достижения:',
      certifications: 'Сертификации',
      
      // Common
      years: 'лет',
      years_experience: '+ лет опыта',
      gpa: 'GPA:'
    },
    en: {
      // Header
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      education: 'Education',
      
      // Intro
      name: 'Anton Samoshuk',
      position: '.NET Developer',
      age: 'years old',
      experience_years: '+ years of experience',
      location: 'Moscow, Russia',
      phone: '+7 (999) 123-45-67',
      main_skills: 'Main Skills',
      download_cv: 'Download CV',
      
      // About
      about_me: 'About Me',
      about_text: `Hello! My name is Anton Samoshuk, and I'm a .NET Developer with 2+ years of experience in developing modern web applications and APIs. 
      My passion for programming started with learning C#, and since then I've been constantly developing in the field of backend development.
      
      I specialize in creating scalable and performant applications using modern technologies 
      such as ASP.NET Core, Entity Framework, SQL Server and RabbitMQ. My experience includes working with microservice architecture, 
      creating RESTful APIs, asynchronous message processing and integration with various databases.
      
      In my free time, I study new .NET ecosystem technologies, participate in open-source projects and create my own projects for 
      portfolio. I believe that the best way to learn is through practice and constant improvement of your skills.`,
      my_values: 'My Values',
      
      // Experience
      work_experience: 'Work Experience',
      achievements_tasks: 'Achievements and Tasks:',
      technologies: 'Technologies:',
      
      // Education
      education_title: 'Education',
      achievements: 'Achievements:',
      certifications: 'Certifications',
      
      // Common
      years: 'years old',
      years_experience: '+ years of experience',
      gpa: 'GPA:'
    }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeLanguage();
  }

  /**
   * Инициализирует язык при загрузке приложения
   */
  private initializeLanguage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Получаем сохраненный язык из localStorage
    const savedLanguage = localStorage.getItem(this.LANGUAGE_STORAGE_KEY) as Language;
    
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en')) {
      this.languageSignal.set(savedLanguage);
    } else {
      // Если нет сохраненного языка, используем русский по умолчанию
      this.languageSignal.set('ru');
    }
  }

  /**
   * Переключает язык
   */
  toggleLanguage(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const newLanguage: Language = this.currentLanguage() === 'ru' ? 'en' : 'ru';
    this.setLanguage(newLanguage);
  }

  /**
   * Устанавливает конкретный язык
   */
  setLanguage(language: Language): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.languageSignal.set(language);
    this.saveLanguage(language);
  }

  /**
   * Сохраняет язык в localStorage
   */
  private saveLanguage(language: Language): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      localStorage.setItem(this.LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      console.warn('Не удалось сохранить язык в localStorage:', error);
    }
  }

  /**
   * Получает перевод по ключу
   */
  translate(key: keyof Translations): string {
    return this.translations[this.currentLanguage()][key];
  }

  /**
   * Получает текущий язык
   */
  getCurrentLanguage(): Language {
    return this.currentLanguage();
  }

  /**
   * Получает все переводы для текущего языка
   */
  getTranslations(): Translations {
    return this.translations[this.currentLanguage()];
  }
}
