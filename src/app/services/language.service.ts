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
  file_cv: string;
  
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

  // Contact widget
  contact_widget_title: string;
  contact_placeholder: string;
  message_placeholder: string;
  send: string;
  sending: string;
  sent_success: string;
  send_error: string;
  validation_contact_required: string;
  validation_message_short: string;
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
      position: '.NET Software Developer',
      age: 'лет',
      experience_years: '+ лет опыта',
      location: 'Брест, Беларусь',
      phone: '+375 (29) 558-06-32',
      main_skills: 'Основные навыки',
      download_cv: 'Скачать CV',
      file_cv: 'Resume RU.pdf',
      
      // About
      about_me: 'Обо мне',
      about_text: `.NET Software Developer с 2-летним опытом разработки API, а также интеграции фронтенда и бэкенда. Создаю
решения, которые оптимизируют процессы, повышают стабильность систем и улучшают пользовательский опыт.

Уверенно работаю с современными технологиями API разработки, а также инструментами мониторинга,
OpenTelemetry и Grafana. Стремлюсь создавать масштабируемые и надежные решения для бизнеса`,
      my_values: 'Мои ценности',
      
      // Experience
      work_experience: 'Опыт работы',
      achievements_tasks: 'Достижения и задачи:',
      technologies: 'Технологии:',
      
      // Education
      education_title: 'Образование',
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
        { icon: 'api', title: 'API Интеграции', description: 'Создание RESTful, GraphQl API и интеграция с внешними сервисами' }
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
          institution: 'Polessky State University',
          degree: 'Степень бакалавра в области разработки программного обеспечения',
          period: '2020 - 2024',
          description: 'Изучение основ программирования, алгоритмов и структур данных, веб-разработки и баз данных.',
          gpa: '4.0/5.0'
        }
      ],

      // Experience - items
      experience_items: [
        {
          company: 'NDA',
          position: '.NET Software Developer',
          period: '2024 - Настоящее время',
          achievements: [
            'Спроектировал и реализовал с нуля комплексную систему управления для критически важных об ъектов, обеспечившую полный жизненный цикл данных. Разработал более 25 API-эндпоинтов, поддерживающих сложную бизнес логику, интеграцию со сторонними сервисами и экспорт данных',
            'Разработал фоновый сервис с пакетной обработкой файлов, реализовал транзакционную обработку с откатом при ошибках, создал таблицу для outbox для отслеживания состояния миграции каждого файла и механизм повторных попыток',
            'Внедрил современные архитектурные паттерны (CQRS) и комплексную систему валидации, что повысило надежность и отказоустойчивость системы',
            'Оптимизировал работу с базами данных и внедрил кэширование, что позволило системе стабильно работать с большими объемами данных при высокой нагрузке',
            'Создал централизованную систему мониторинга здоровья всех ключевых компонентов системы (БД, внешние сервисы, приложение). Это позволило в режиме реального времени отслеживать метрики производительности и оперативно реагировать на инциденты, сократив время их устранения',
          ],
          technologies: ['C#', 'ASP.NET Core', 'DDD', 'PostgreSQL', 'SQL/Dapper', 'EF Core', 'Minio', 'Redis']
        },
        {
          company: 'Polessky State University',
          position: '.NET Software Developer',
          period: '2023 - 2024',
          achievements: [
            'Р азработал модульную платформу для внутренних коммуникаций и управления операциями на .NET с интеграцией мессенджер решений. Внедрил микросервисную архитектуру для разделения функционала оповещений, управления данными и аналитики',
            'Реализовал ботов для автоматической рассылки оперативных оповещений, отчетов и персональных напоминаний сотрудникам',
          ],
          technologies: ['C#', 'ASP.NET Core', 'PostgreSQL', 'EF Core']
        }
      ]
      ,
      // Contact widget
      contact_widget_title: 'Связаться со мной',
      contact_placeholder: 'Телефон или @telegram',
      message_placeholder: 'Ваше сообщение',
      send: 'Отправить',
      sending: 'Отправка...',
      sent_success: 'Сообщение отправлено! Я свяжусь с вами.',
      send_error: 'Не удалось отправить. Попробуйте позже.',
      validation_contact_required: 'Введите телефон или Telegram (@username)',
      validation_message_short: 'Сообщение слишком короткое'
    },
    en: {
      // Header
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      education: 'Education',
      
      // Intro
      name: 'Anton Samoshuk',
      position: '.NET Software Developer',
      age: 'years old',
      experience_years: '+ years of experience',
      location: 'Brest, Belarus',
      phone: '+375 (29) 558-06-32',
      main_skills: 'Main Skills',
      download_cv: 'Download CV',
      file_cv: 'Resume EN.pdf',
      
      // About
      about_me: 'About Me',
      about_text: `.NET Software Developer with 2 years of experience in API development, as well as frontend and backend support. I create
solutions that optimize processes, increase system stability and improve user experience.

I confidently work with modern API development technologies, as well as monitoring tools, OpenTelemetry and Grafana. I
strive to create scalable and reliable solutions for business.`,
      my_values: 'My Values',
      
      // Experience
      work_experience: 'Work Experience',
      achievements_tasks: 'Achievements and Tasks:',
      technologies: 'Technologies:',
      
      // Education
      education_title: 'Education',
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
        { icon: 'api', title: 'API Integration', description: 'Creating RESTful, GraphQl APIs and integrating with external services' }
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
          institution: 'Polessky State University',
          degree: 'Bachelors degree in software engineering',
          period: '2020 - 2024',
          description: 'Studied programming fundamentals, algorithms and data structures, web development and databases.',
          gpa: '4.0/5.0'
        }
       
      ],

      // Experience - items
      experience_items: [
        {
          company: 'NDA',
          position: '.NET Software Developer',
          period: '2024 - Present',
          achievements: [
            'Designed and implemented from scratch a comprehensive management system for critical objects, providing a full data lifecycle. Developed more than 25 API endpoints supporting complex business logic, integration with third-party services and data export',
            'Developed a background service with batch file processing, implemented transaction processing with rollback on errors, created a table for outbox to track the migration status of each file and a retry mechanism',
            'Implemented complex validation and CQRS patterns, increasing system reliability and fault tolerance',
            'Optimized database operations and implemented caching, allowing the system to handle large volumes of data under high load',
            'Created a centralized health monitoring system for all key components of the system (database, external services, application). This allowed real-time monitoring of performance metrics and proactive response to incidents, reducing resolution time',
          ],
          technologies: ['C#', 'ASP.NET Core', 'DDD', 'PostgreSQL', 'SQL/Dapper', 'EF Core', 'Minio', 'Redis']
        },
        {
          company: 'Polessky State University',
          position: '.NET Software Developer',
          period: '2023 - 2024',
          achievements: [
            'eveloped a modular platform for internal communications and operations management on .NET with integration of messenger solutions. Implemented a microservice architecture to separate the functionality of notifications, data management and analytics',
            'Implemented bots for automatic sending of operational notifications, reports and official messages to employees',
          ],
          technologies: ['C#', 'ASP.NET Core', 'PostgreSQL', 'EF Core']
        }
      ]
      ,
      // Contact widget
      contact_widget_title: 'Contact me',
      contact_placeholder: 'Phone or @telegram',
      message_placeholder: 'Your message',
      send: 'Send',
      sending: 'Sending...',
      sent_success: 'Message sent! I will contact you.',
      send_error: 'Failed to send. Please try later.',
      validation_contact_required: 'Enter phone or Telegram (@username)',
      validation_message_short: 'Message is too short'
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
