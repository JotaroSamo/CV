import { Component, signal } from '@angular/core';
import { HeaderComponent } from './components/Header/header.component';
import { IntroComponent } from './components/Intro/intro.component';
import { AboutComponent } from "./components/About/about.component";
import { ExperienceComponent } from "./components/Experience/experience.component";
import { EducationComponent } from "./components/Education/education.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [HeaderComponent, IntroComponent, AboutComponent, ExperienceComponent, EducationComponent],
  standalone: true
})
export class App {
  protected readonly title = signal('Anton Samoshuk');
}
