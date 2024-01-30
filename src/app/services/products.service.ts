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
  productess = 
    {
      title:
        'Silicon Lower 500gb SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',
      price: 109,
      description:
        '3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.',
      category: 'electronics',
      image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
    };

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
    return this.http.post(PRODUCTS_URL,this.productess);
  }
}
