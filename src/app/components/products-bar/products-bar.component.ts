import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AddProductFormComponent } from '../add-product-form/add-product-form.component';
import { CategoryService } from './../../services/category.service';
import { AppComponent } from '../../app.component';

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
  itemsShowSize = '12';
  sort = 'desc';

  @Output() changeFilters = new EventEmitter<string>();
  @Output() changeSize = new EventEmitter<string>();
  @Output() changeSort = new EventEmitter<string>();

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllCategories();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddProductFormComponent, {
      data: { name: 'Dialog' },
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
    if (category == 'all') category = '';
    this.changeFilters.next(category);
  }
}
