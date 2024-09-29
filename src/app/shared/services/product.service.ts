import { Injectable } from '@angular/core';
import { environment } from '../../core/environments/environment';
import { ApiService } from '../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public product_url = environment.server_url + '/products/';

  constructor(private apiService: ApiService, private http: HttpClient) { }

  allProduct(): Observable<any> {
    return this.apiService.get(this.product_url)
  }
  addNewProduct(product_dto:any): Observable<any> {
    return this.apiService.post(this.product_url, product_dto);
  }

  singleProduct(id:any) {
    return this.apiService.get(this.product_url + id)
  }
  updateProduct(id:any, product_dto:any): Observable<any> {
    return this.apiService.put(this.product_url + id, product_dto);
  }
  deleteProduct(id:any): Observable<any> {
    return this.apiService.delete(this.product_url + id);
  }
}

