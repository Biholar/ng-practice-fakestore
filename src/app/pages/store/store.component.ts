import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProductsBarComponent } from './../../components/products-bar/products-bar.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductsService } from './../../services/products.service';
import { Products } from './../../models/products';

@Component({
  standalone: true,
  selector: 'app-store',
  imports: [
    ProductsBarComponent,
    CommonModule,
    MatGridListModule,
    ProductCardComponent,
    MatCardModule,
    RouterModule,
  ],
  providers: [ProductsService],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css',
})
export class StoreComponent implements OnInit, OnDestroy {
  isSubscripted: Subscription | undefined;
  size = '12';
  sort = 'asc';
  category: string | undefined;
  products: Products[] | undefined;

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getLinkFilter();
    this.getAllProducts();
  }
  onChangeFilters(newFilter: string) {
    this.category = newFilter;
    this.getAllProducts();
    this.category = undefined;
  }

  resetFiler() {
    this.getAllProducts();
  }

  getLinkFilter() {
    this.isSubscripted = this.route.queryParams.subscribe((params: Params) => {
      params ? (this.category = params['cat']) : (this.category = undefined);
    });
  }

  onSortTypeChange(newSortType: string) {
    this.sort = newSortType;
    this.getAllProducts();
    console.log(this.sort);
  }

  onItemsSizeChange(newSize: string) {
    this.size = newSize;
    this.getAllProducts();
  }

  getAllProducts() {
    this.isSubscripted = this.prodService
      .getAllProducts(this.size, this.sort, this.category)
      .subscribe((_products: Array<Products>) => (this.products = _products));
    this.category = undefined;
  }

  ngOnDestroy(): void {
    if (this.isSubscripted) {
      this.isSubscripted.unsubscribe();
    }
  }
}
