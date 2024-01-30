import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { StoreComponent } from './pages/store/store.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  template:`
  <app-header></app-header>
  <router-outlet></router-outlet>
`,
  
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, HeaderComponent, StoreComponent,MatButtonModule,  HttpClientModule],
})
export class AppComponent {
  title = 'ng-practice-fakestore';
}
