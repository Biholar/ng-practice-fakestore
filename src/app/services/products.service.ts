import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../models/products';

const PRODUCTS_URL = 'https://fakestoreapi.com/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  products: Products[] | undefined;

  getAllProducts(
    limit = '5',
    sort = 'desc',
    category?: string
  ): Observable<Array<Products>> {
    return this.http.get<Array<Products>>(
      `${PRODUCTS_URL}${
        category ? '/category/' + category : ''
      }?sort=${sort}&limit=${limit}`
    );
  }


  getProductById(id:number){
    return this.http.get(`${PRODUCTS_URL}/${id}`);
  }

  addProduct(prod:Products){
    return this.http.post(PRODUCTS_URL,prod);
  }
}
