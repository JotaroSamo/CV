import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/Header/header.component';
import { IntroComponent } from './components/Intro/intro.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet, HeaderComponent, IntroComponent],
  standalone: true
})
export class App {
  protected readonly title = signal('CV');
}
