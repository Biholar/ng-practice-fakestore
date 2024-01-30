import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Products } from '../../models/products';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, CommonModule,MatListModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})


export class ProductCardComponent  {
  @Input() product: Products | undefined;

}
