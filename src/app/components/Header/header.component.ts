import { Component, signal, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('glassPanel', { static: false }) glassPanel!: ElementRef<HTMLDivElement>;
  
  protected readonly name = signal('Ваше Имя'); // Замените на ваше имя
  
  protected readonly navigationItems = signal([
    { label: 'Главная', href: '#home' },
    { label: 'Обо мне', href: '#about' },
    { label: 'Навыки', href: '#skills' },
    { label: 'Опыт', href: '#experience' },
    { label: 'Контакты', href: '#contact' }
  ]);

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
}
