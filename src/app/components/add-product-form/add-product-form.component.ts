
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductsService } from './../../services/products.service';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialog,
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
    HttpClientModule
  ],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.css',
  providers:[ProductsService]
})
export class AddProductFormComponent implements OnInit {
  formSubmitted = false;
  form!: FormGroup;
  product!: Products;
  constructor(public dialogRef: MatDialogRef<AddProductFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private prodService:ProductsService
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
  res:any;
  onSubmit() {
    this.product = {
      title: this.form.value.title,
      description: this.form.value.description,
      price: this.form.value.price,
      category: 'electronic',
      image: this.form.value.imageLink,
    };
    console.log(this.product);
    this.prodService.addProduct(this.product).subscribe((_res)=>this.res= _res);
    setTimeout(() => {
      console.log('form Submited with id ' + this.res.id )
    }, 3000);
   ;
    this.formSubmitted = true;
  }
}
