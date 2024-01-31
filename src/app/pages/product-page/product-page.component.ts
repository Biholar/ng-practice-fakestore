import { ProductsService } from './../../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, RouterOutlet, HttpClientModule, CommonModule],
  providers: [ProductsService],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent implements OnInit {
  id: number = 0;
  product: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {}

  sendQueryParams(category: string) {
    this.router.navigate(['./'], {
      queryParams: {
        cat: category,
      },
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.productService
      .getProductById(this.id)
      .subscribe((_prod) => (this.product = _prod));
  }
}
