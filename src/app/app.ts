import { Component, signal, AfterViewInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from './components/Header/header.component';
import { IntroComponent } from './components/Intro/intro.component';
import { AboutComponent } from "./components/About/about.component";
import { ExperienceComponent } from "./components/Experience/experience.component";
import { EducationComponent } from "./components/Education/education.component";
import { ContactWidgetComponent } from './components/ContactWidget/contact-widget.component';
import { SmoothScrollService } from './services/smooth-scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [HeaderComponent, IntroComponent, AboutComponent, ExperienceComponent, EducationComponent, ContactWidgetComponent],
  standalone: true
})
export class App implements AfterViewInit {
  protected readonly title = signal('Anton Samoshuk');

  private smoothScroll = inject(SmoothScrollService);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // При обновлении/загрузке всегда показываем главную секцию
      this.smoothScroll.scrollToSelector('#home', 0, 0);
    }
  }
}
