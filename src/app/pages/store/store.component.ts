import { ProductsBarComponent } from './../../components/products-bar/products-bar.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector:'app-store',
  imports: [ProductsBarComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {

}
