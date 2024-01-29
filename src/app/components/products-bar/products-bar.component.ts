import { CommonModule } from '@angular/common';
import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription, Observable } from 'rxjs';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-products-bar',
  standalone: true,
  providers: [CategoryService, ],
  templateUrl: './products-bar.component.html',
  imports: [MatFormFieldModule, MatSelectModule, AppComponent,CommonModule],
})
export class ProductsBarComponent implements OnInit {
  isSubscripted: Subscription | undefined;
  selected = 'All';
  categories: string[] | undefined;
  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService
      .getAllCategories()
      .subscribe((response: Array<string>) => {
        this.categories = response;
      });
  }
}
