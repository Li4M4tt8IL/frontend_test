import { Component } from '@angular/core';
import { ContainerComponent } from './container/container.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ContainerComponent],
  template: `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <main>
    <app-header />
    <app-container />
  </main>
  `,
  styleUrl: './app.component.scss',
  
})

export class AppComponent {
  title = 'frontend_test';
}

