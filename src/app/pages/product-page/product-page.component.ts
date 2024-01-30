import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Products } from './../../models/products';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet, HttpClientModule,CommonModule],
  providers:[ProductsService],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent implements OnInit {
  id: number = 0;
  product: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];});
      this.productService.getProductById(this.id).subscribe((_prod)=> this.product=  _prod);
  }
}
