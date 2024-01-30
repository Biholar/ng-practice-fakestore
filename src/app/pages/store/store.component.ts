import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductsService } from './../../services/products.service';
import { Products } from './../../models/products';
import { ProductsBarComponent } from './../../components/products-bar/products-bar.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { MatCardModule } from '@angular/material/card';

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
  productsSubscription: Subscription | undefined;
  size = '12';
  sort = 'desc';
  category: string | undefined;
  products: Products[] | undefined;
  

  constructor(private prodService: ProductsService) {}
  ngOnInit(): void {
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
    this.productsSubscription = this.prodService
      .getAllProducts(this.size, this.sort, this.category)
      .subscribe((_products: Array<Products>) => (this.products = _products));
    this.category = undefined;
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
