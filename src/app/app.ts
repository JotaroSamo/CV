import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/Header/header.component';
import { IntroComponent } from './components/Intro/intro.component';
import { AboutComponent } from "./components/About/about.component";
import { ExperienceComponent } from "./components/Experience/experience.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet, HeaderComponent, IntroComponent, AboutComponent, ExperienceComponent],
  standalone: true
})
export class App {
  protected readonly title = signal('CV');
}
