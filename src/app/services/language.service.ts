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
      position: 'Middle .NET Software Developer',
      age: 'года',
      experience_years: '+ лет опыта',
      location: 'Брест, Беларусь',
      phone: '+375 (29) 558-06-32',
      main_skills: 'Основные навыки',
      download_cv: 'Скачать CV',
      file_cv: 'Resume RU.pdf',
      
      // About
      about_me: 'Обо мне',
      about_text: `<strong>.NET Software Developer</strong> с <strong>2 годами</strong> опыта в проектировании и разработке высоконагруженных систем. Специализация на создании отказоустойчивых и производительных бэкенд-решений на C# и ASP.NET Core. Ключевые компетенции: оптимизация производительности, внедрение кэширования и систем мониторинга для повышения стабильности приложений.`,
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
      years_experience: 'лет опыта',
      gpa: 'GPA:',

      // About - highlights and values
      about_highlights: [
        { icon: 'code', title: 'Backend Разработка', description: 'Создание масштабируемых API и веб-приложений с использованием ASP.NET Core' },
        { icon: 'storage', title: 'Базы данных', description: 'Работа с PostgreSQL, Entity Framework, Dapper и проектирование схем данных' },
        { icon: 'message', title: 'Message Broker', description: 'Работа с RabbitMQ для асинхронной обработки сообщений и микросервисов' }
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
          institution: 'Полесский государственный университет',
          degree: 'Степень бакалавра в области разработки программного обеспечения',
          period: '2020 - 2024',
          description: 'Изучение основ программирования, алгоритмов и структур данных, веб-разработки и баз данных.',
          gpa: '4.0/5.0'
        }
      ],

      // Experience - items
      experience_items: [
        {
          company: 'Военная академия Республики Беларусь',
          position: '.NET Software Developer',
          period: 'Ноябрь2024 - Настоящее время',
          achievements: [
            'Участвовал в разработке и оптимизировал backend-модули для системы управления на основе микросервисной архитектуры.',
            'птимизировал производительность ключевого API отчетов: провел анализ и рефакторинг SQL-запросов, внедрил Dapper и добавил недостающие индексы в PostgreSQL. Результат: снижение времени отклика с 2000 мс до 200 мс.',
            'Внедрил кеширование данных в Redis для часто запрашиваемых эндпоинтов. Результат: снижение нагрузки на базу данных и повышение производительности на 40%',
            'Разработал отказоустойчивый фоновый сервис для пакетной обработки файлов с полной транзакционной логикой и откатом изменений при ошибках.',
            'Разрабатывал пользовательский интерфейс: создавал и интегрировал новые компоненты, сервисы, модули на Angular.',
            'Настроил систему мониторинга на основе Grafana для отслеживания метрик здоровья приложения. Результат: время обнаружения инцидентов сократилось с 30 минут до 2-3 минут.',
            'Участвовал в код-ревью и помогал в адаптации двух новых junior-разработчиков в команде.'
          ],
          technologies: ['C#', 'ASP.NET Core', 'Angular','Dapper','TS','RabbitMQ', 'PostgreSQL', 'SQL/Dapper', 'EF Core', 'Minio', 'Redis', 'Jira', 'Docker']
        },
        {
          company: 'Полесский государственный университет',
          position: '.NET Software Developer',
          period: 'Июнь 2023 - Май 2024',
          achievements: [
            'Участвовал в разработке микросервисной платформы для внутренних коммуникаций.',
            'Реализовал бизнес-логику сервисов и REST API.',
            'Разработал и внедрил ботов для автоматизации рассылки отчетов и уведомлений с использованием RabbitMQ. Результат: сокращение времени на рутинные операции на 25%.'
          ],
          technologies: ['C#', 'ASP.NET Core', 'PostgreSQL', 'EF Core', 'RabbitMQ']
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
      position: 'Middle .NET Software Developer',
      age: 'years old',
      experience_years: '+ years of experience',
      location: 'Brest, Belarus',
      phone: '+375 (29) 558-06-32',
      main_skills: 'Main Skills',
      download_cv: 'Download CV',
      file_cv: 'Resume EN.pdf',
      
      // About
      about_me: 'About Me',
      about_text: `<strong>Middle .NET Software Developer</strong> with <strong>2 years</strong> of experience in designing and developing high-load systems. Specialized in building fault-tolerant and high-performance backend solutions using C# and ASP.NET Core. Key competencies include performance optimization, implementing caching and monitoring systems to enhance application stability.`,
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
        { icon: 'storage', title: 'Databases', description: 'Working with PostgreSQL, Entity Framework, Dapper and data modeling' },
        { icon: 'message', title: 'Message Broker', description: 'Using RabbitMQ for asynchronous processing and microservices' }
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
          company: 'Military Academy of the Republic of Belarus',
          position: '.NET Software Developer',
          period: 'November 2024 - Present',
          achievements: [
            'Participated in the development and optimization of backend modules for the management system based on a microservices architecture.',
            'Optimized the performance of the key reporting API: conducted an analysis and refactoring of SQL queries, implemented Dapper, and added missing indexes to PostgreSQL. Result: reduction of response time from 2000 ms to 200 ms',
            'Implemented data caching in Redis for frequently requested endpoints. Result: reduction of load on the database and increase of performance by 40%',
            'Developed a fault-tolerant background service for batch file processing with full transactional logic and rollback on errors.',
            'Developed the user interface: created and integrated new components, services, modules on Angular.',
            'Configured the health monitoring system based on Grafana for monitoring the health of all application components. Result: the time to detect incidents was reduced from 30 minutes to 2-3 minutes.',
            'Participated in code reviews and helped in the adaptation of two new junior developers in the team.',
          ],
          technologies: ['C#', 'ASP.NET Core', 'Angular','Dapper','TS','RabbitMQ', 'PostgreSQL', 'SQL/Dapper', 'EF Core', 'Minio', 'Redis', 'Jira', 'Docker']
        },
        {
          company: 'Polessky State University',
          position: '.NET Software Developer',
          period: '2023 - 2024',
          achievements: [
            'Participated in the development of a microservices platform for internal communications.',
            'Implemented business logic for services and REST APIs.',
            'Developed and integrated bots for automating report distribution and notifications using RabbitMQ. Result: Reduced time spent on routine operations by 25%.'
          ],
          technologies: ['C#', 'ASP.NET Core', 'PostgreSQL', 'EF Core', 'RabbitMQ']
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
