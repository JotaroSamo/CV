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
      age: 'лет',
      experience_years: '+ лет опыта',
      location: 'Брест, Беларусь',
      phone: '+375 (29) 558-06-32',
      main_skills: 'Основные навыки',
      download_cv: 'Скачать CV',
      file_cv: 'Resume RU.pdf',
      
      // About
      about_me: 'Обо мне',
      about_text: `<strong>Middle .NET Software Developer</strong> с <strong>2-летним</strong> опытом полного цикла разработки, сфокусированный решении любых бизнес задач.

Моя ключевая задача — создание не просто работающих, а эффективных и надежных решений, которые напрямую влияют на бизнес-показатели: оптимизируют внутренние процессы, повышают стабильность систем и в конечном итоге улучшают пользовательский опыт.

Глубоко заинтересован в современных практиках API-разработки. Активно применяю инструменты мониторинга и (OpenTelemetry, Grafana) для сбора метрик, анализа производительности и проактивного выявления проблем, что позволяет строить предсказуемые и отказоустойчивые системы.

Ценю командную работу и открытую коммуникацию. Стремлюсь к проектам, где могу принести максимальную пользу, решая сложные задачи и участвуя в создании масштабируемых и технологически совершенных продуктов. Постоянно учусь и с интересом принимаю новые вызовы.`,
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
          position: 'Middle .NET Software Developer',
          period: '2024 - Настоящее время',
          achievements: [
            'Спроектировал и реализовал с нуля комплексную систему управления для критически важных объектов, обеспечившую полный жизненный цикл данных',
            'Разработал фоновый сервис с пакетной обработкой файлов, реализовал транзакционную обработку с откатом при ошибках',
            'Оптимизировал большие запросы в базу данных, что улучшило время запроса',
            'Интегрировали стратегии кэширования с Redis для ускорения времени отклика и снижения нагрузки на базу данных',
            'Создал централизованную систему мониторинга здоровья всех ключевых компонентов системы (БД, внешние сервисы, приложение). Это позволило в режиме реального времени отслеживать метрики производительности и оперативно реагировать на инциденты, сократив время их устранения',
            'Активно участвовал во всех этапах жизненного цикла продукта в рамках Scrum-процесса',
            'Курировал и консультировал новых членов команды по код-стейджам, архитектурным решениям и бизнес-логике проекта, способствуя их быстрой адаптации и эффективной интеграции в рабочий процесс'
          ],
          technologies: ['C#', 'ASP.NET Core', 'DDD', 'PostgreSQL', 'SQL/Dapper', 'EF Core', 'Minio', 'Redis', 'Jira', 'Docker']
        },
        {
          company: '',
          position: 'Junior.NET Software Developer',
          period: '2023 - 2024',
          achievements: [
            'Для надежного асинхронного взаимодействия между сервисами и legacy-монолитом использовали брокер сообщений RabbitMQ',
            'Настраивал централизованное логирование через Seq и ELK-стек и мониторинг ключевых метрик здоровья системы (очереди в RabbitMQ, задержки ответа БД) в Grafana',
            'Рефакторинг legacy-кода',
            'Активно работал в рамках гибридной методологии (Scrum/Kanban), участвовал в планировании задач по модернизации, оценке рисков и ретроспективах'

          ],
          technologies: ['C#', 'ASP.NET Core', 'MS SQL', 'EF Core', 'RabbitMQ','ELK', 'Docker']
        },
        {
          company: 'Polessky State University',
          position: 'Junior.NET Software Developer',
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
      about_text: `<strong>Middle .NET Software Developer</strong> with <strong>2 years</strong> of experience in full-cycle development, focused on delivering business-oriented solutions.

My primary expertise lies in building not just functional but efficient and reliable systems that directly impact key business metrics. I achieve this by optimizing internal processes, enhancing system stability, and ultimately improving the end-user experience.

I possess a deep interest in modern API development practices and actively utilize monitoring and observability tools (OpenTelemetry, Grafana) to collect metrics, analyze performance, and proactively identify issues. This data-driven approach allows me to build predictable and fault-tolerant systems.

A strong advocate for teamwork and open communication, I thrive in environments where I can tackle complex challenges and contribute to building scalable, technologically advanced products. I am a continuous learner and always eager to embrace new challenges.`,
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
          company: 'NDA',
          position: '.NET Software Developer',
          period: '2024 - Present',
          achievements: [
            'Designed and implemented a complex mission-critical control system from the ground up, establishing a complete and secure data lifecycle management process',
            'Engineered a robust background service for high-volume batch file processing, implementing transactional logic with a comprehensive rollback mechanism to guarantee data integrity and consistency',
            'Optimized complex SQL queries and database structures, resulting in a significant reduction in query execution time and improved overall application responsiveness',
            'Integrated advanced caching strategies using Redis, which dramatically decreased response times and reduced the load on the primary database system',
            'Architected a centralized health monitoring system for all key components (database, application, external services). This enabled real-time performance metric tracking and proactive incident response, drastically reducing mean time to resolution',
            'Actively contributed to all phases of the product lifecycle within a Scrum framework',
            'Mentored and onboarded new team members, providing guidance on code standards, architectural patterns, and business logic to facilitate rapid integration and productivity',
          ],
          technologies: ['C#', 'ASP.NET Core', 'DDD', 'PostgreSQL', 'SQL/Dapper', 'EF Core', 'Minio', 'Redis']
        },
        {
          company: '',
          position: 'Junior.NET Software Developer',
          period: '2023 - 2024',
          achievements: [
            'Orchestrated reliable, asynchronous communication between new services and the legacy monolith by implementing a RabbitMQ message broker, ensuring decoupled and resilient service interaction',
            'Established a comprehensive observability stack by configuring centralized logging (Seq, ELK stack) and Grafana dashboards to monitor key health metrics, including RabbitMQ queue states and database latency, enabling data-driven performance optimization',
            'Legacy code refactoring',
            'Actively collaborated within a hybrid Scrum/Kanban framework, contributing to modernization planning, risk assessment, and iterative process improvement through sprint retrospectives'
          ],
          technologies: ['C#', 'ASP.NET Core', 'MS SQL', 'EF Core', 'RabbitMQ','ELK', 'Docker']
        },
        {
          company: 'Polessky State University',
          position: '.NET Software Developer',
          period: '2023 - 2024',
          achievements: [
            'Designed and developed a modular internal communications and operations management platform on .NET, integrating with third-party messenger solutions.Introduced a microservices architecture to decouple core functionalities such as notifications, data management, and analytics into independent, scalable services',
            'Engineered and deployed automated bots for distributing real-time alerts, generating and sending reports, and delivering personalized reminders to employees, significantly improving operational efficiency',
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
