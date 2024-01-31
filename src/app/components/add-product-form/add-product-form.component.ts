import { ProductsService } from './../../services/products.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Products } from '../../models/products';

@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.css',
  providers: [ProductsService],
})
export class AddProductFormComponent implements OnInit {
  formSubmitted = false;
  form!: FormGroup;
  product!: Products;
  res: any;

  constructor(
    public dialogRef: MatDialogRef<AddProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private prodService: ProductsService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      imageLink: new FormControl(''),
      price: new FormControl(''),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    this.product = {
      title: this.form.value.title,
      description: this.form.value.description,
      price: this.form.value.price,
      category: this.form.value.category,
      image: this.form.value.imageLink,
    };

    this.prodService
      .addProduct(this.product)
      .subscribe((_res) => (this.res = _res));
    setTimeout(() => {
      console.log(this.product +'from form was submited with id ' + this.res.id);
    }, 3000);
    this.formSubmitted = true;
  }
}
