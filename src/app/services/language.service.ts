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

  // About - highlights and values
  about_highlights: Array<{ icon: string; title: string; description: string }>;
  values_list: string[];

  // Education - items
  education_items: Array<{
    institution: string;
    degree: string;
    period: string;
    description: string;
    achievements: string[];
    gpa: string;
  }>;

  // Experience - items
  experience_items: Array<{
    company: string;
    position: string;
    period: string;
    achievements: string[];
    technologies: string[];
  }>;
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
      gpa: 'GPA:',

      // About - highlights and values
      about_highlights: [
        { icon: 'code', title: 'Backend Разработка', description: 'Создание масштабируемых API и веб-приложений с использованием ASP.NET Core' },
        { icon: 'storage', title: 'Базы данных', description: 'Работа с SQL Server, Entity Framework и проектирование схем данных' },
        { icon: 'message', title: 'Message Broker', description: 'Работа с RabbitMQ для асинхронной обработки сообщений и микросервисов' },
        { icon: 'api', title: 'API Интеграции', description: 'Создание RESTful API и интеграция с внешними сервисами' }
      ],
      values_list: [
        'Качество кода',
        'Постоянное обучение',
        'Командная работа',
        'Креативность',
        'Внимание к деталям'
      ],

      // Education - items
      education_items: [
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
            'Проект на GitHub со 100+ звездами',
            'Выступление на конференции разработчиков'
          ],
          gpa: '5.0/5.0'
        }
      ],

      // Experience - items
      experience_items: [
        {
          company: 'Tech Company',
          position: '.NET Developer',
          period: '2022 - Настоящее время',
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
      ]
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
      gpa: 'GPA:',

      // About - highlights and values
      about_highlights: [
        { icon: 'code', title: 'Backend Development', description: 'Building scalable APIs and web apps with ASP.NET Core' },
        { icon: 'storage', title: 'Databases', description: 'Working with SQL Server, Entity Framework and data modeling' },
        { icon: 'message', title: 'Message Broker', description: 'Using RabbitMQ for asynchronous processing and microservices' },
        { icon: 'api', title: 'API Integration', description: 'Creating RESTful APIs and integrating with external services' }
      ],
      values_list: [
        'Code quality',
        'Continuous learning',
        'Teamwork',
        'Creativity',
        'Attention to detail'
      ],

      // Education - items
      education_items: [
        {
          institution: 'Moscow State University',
          degree: 'B.Sc. in Computer Science and Engineering',
          period: '2019 - 2023',
          description: 'Studied programming fundamentals, algorithms and data structures, web development and databases.',
          achievements: [
            'Graduated with honors',
            'Participation in programming contests',
            'Research work in machine learning'
          ],
          gpa: '4.8/5.0'
        },
        {
          institution: 'Advanced Training Courses',
          degree: 'Modern .NET Development Technologies',
          period: '2023 - 2024',
          description: 'In-depth study of ASP.NET Core, microservices architecture, Docker and Kubernetes.',
          achievements: [
            'Microsoft certificate',
            'GitHub project with 100+ stars',
            'Talk at a developer conference'
          ],
          gpa: '5.0/5.0'
        }
      ],

      // Experience - items
      experience_items: [
        {
          company: 'Tech Company',
          position: '.NET Developer',
          period: '2022 - Present',
          achievements: [
            'Built a RESTful API for a mobile app handling 10,000+ requests/day',
            'Optimized database performance, reducing response time by 40%',
            'Implemented microservices architecture using Docker and Kubernetes',
            'Created monitoring and logging with ELK Stack',
            'Performed code reviews for a team of 5 developers',
            'Wrote unit tests achieving 85%+ coverage'
          ],
          technologies: ['C#', 'ASP.NET Core', 'Entity Framework', 'SQL Server', 'RabbitMQ', 'Docker', 'Kubernetes']
        },
        {
          company: 'Startup Inc',
          position: 'Junior .NET Developer',
          period: '2021 - 2022',
          achievements: [
            'Contributed to a project management web application',
            'Built user authentication and authorization module',
            'Integrated external payment processing APIs',
            'Configured CI/CD pipeline with automatic deployment',
            'Fixed 50+ bugs and improved system stability',
            'Learned and applied SOLID and Clean Architecture principles'
          ],
          technologies: ['C#', 'ASP.NET Core', 'Docker', 'PostgreSQL', 'Git', 'Azure DevOps']
        }
      ]
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
