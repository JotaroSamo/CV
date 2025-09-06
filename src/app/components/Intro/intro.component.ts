import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {
  protected readonly name = signal('Антон Самошук');
  protected readonly position = signal('Frontend Developer');
  protected readonly age = signal(23);
  protected readonly experience = signal(2);
  protected readonly location = signal('Москва, Россия');
  protected readonly email = signal('your.email@example.com');
  protected readonly phone = signal('+7 (999) 123-45-67'); // Ваш номер телефона
  protected readonly photoPath = signal('avatar.jpg'); // Путь к вашему фото
  protected readonly cvPath = signal('assets/Resume RU.pdf'); // Путь к вашему CV файлу
  
  protected readonly skills = signal([
    'Angular', 'TypeScript', 'JavaScript', 'HTML/CSS', 'SCSS', 'Git'
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
}
