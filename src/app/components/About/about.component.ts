import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  protected readonly aboutText = signal(`
    Привет! Меня зовут Антон Самошук, и я .NET Developer с 2+ годами опыта в разработке современных веб-приложений и API. 
    Моя страсть к программированию началась с изучения C#, и с тех пор я постоянно развиваюсь в области backend-разработки.
    
    Я специализируюсь на создании масштабируемых и производительных приложений, используя современные технологии 
    такие как ASP.NET Core, Entity Framework, SQL Server и RabbitMQ. Мой опыт включает работу с микросервисной архитектурой, 
    создание RESTful API, асинхронной обработки сообщений и интеграцию с различными базами данных.
    
    В свободное время я изучаю новые технологии .NET экосистемы, участвую в open-source проектах и создаю собственные проекты для 
    портфолио. Я верю, что лучший способ обучения - это практика и постоянное совершенствование своих навыков.
  `);

  protected readonly highlights = signal([
    {
      icon: 'code',
      title: 'Backend Разработка',
      description: 'Создание масштабируемых API и веб-приложений с использованием ASP.NET Core'
    },
    {
      icon: 'storage',
      title: 'Базы данных',
      description: 'Работа с SQL Server, Entity Framework и проектирование схем данных'
    },
    {
      icon: 'message',
      title: 'Message Broker',
      description: 'Работа с RabbitMQ для асинхронной обработки сообщений и микросервисов'
    },
    {
      icon: 'api',
      title: 'API Integration',
      description: 'Создание RESTful API и интеграция с внешними сервисами'
    }
  ]);

  protected readonly values = signal([
    'Качество кода',
    'Постоянное обучение',
    'Командная работа',
    'Креативность',
    'Внимание к деталям'
  ]);
}
