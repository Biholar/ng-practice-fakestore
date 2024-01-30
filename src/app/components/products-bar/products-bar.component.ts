import { CommonModule } from '@angular/common';
import { CategoryService } from './../../services/category.service';
import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription, Observable } from 'rxjs';
import { AppComponent } from '../../app.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { AddProductFormComponent } from '../add-product-form/add-product-form.component';

@Component({
  selector: 'app-products-bar',
  standalone: true,
  providers: [CategoryService],
  templateUrl: './products-bar.component.html',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    AppComponent,
    CommonModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class ProductsBarComponent implements OnInit {
  isSubscripted: Subscription | undefined;
  selected = 'All';
  categories: string[] | undefined;
  @Output() changeFilters = new EventEmitter<string>();
  @Output() changeSize = new EventEmitter<string>();
  @Output() changeSort = new EventEmitter<string>();

  itemsShowSize = '12';
  sort = 'desc';
  
  animal: string='puma';
  name: string='loh';

  constructor(private categoryService: CategoryService,public dialog: MatDialog) {}

  ngOnInit() {
    this.getAllCategories();
    
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddProductFormComponent, {
      data: {name: this.name, animal: this.animal},
    });

  }

  getAllCategories() {
    this.categoryService
      .getAllCategories()
      .subscribe((response: Array<string>) => {
        this.categories = response;
      });
  }

  onSortChange(sortType: string) {
    this.changeSort.emit(sortType);
    this.sort = sortType;
  }

  onChangeSize(size: string) {
    this.changeSize.emit(size);
    this.itemsShowSize = size;
  }

  onChangeFilters(category: string) {
    this.changeFilters.next(category);
  }
}
