import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, map, Observable, catchError} from 'rxjs';
import { Categories } from '../shared/categories';

const API_BASE_URL = 'https://fakestoreapi.com/products/categories';

@Injectable({ providedIn: 'root'})

export class CategoryService {

  constructor(private http: HttpClient) {}

   getAllCategories():Observable<Array<string>>{
      return this.http.get<Array<string>>(API_BASE_URL);
   }
}
