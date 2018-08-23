import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class ProductService {

  
  // domain = "http://localhost:3000/api/";
  domain = "";

  constructor(private http: HttpClient, 
    private router: Router) { }

   // Function to get projects
  getProducts(page, limit) {

    var params = new HttpParams().set('page', page).set('limit', limit);

    return this.http.get(this.domain + 'product/', {params: params}).pipe(map(res => res));
  }

  // Function to get projects
  getCountProducts() {
    return this.http.get<any>(this.domain + 'product/count').pipe(map(res => res));
  }

  // Function to register projects
  registerProduct(product) {

    return this.http.post<any>('product/register',  product).pipe(map(res => res));
  }

   // Function to get projects
   getProductById(reference) {
    return this.http.get(this.domain + 'product/' + reference).pipe(map(res => res));
  }


  // Function to register projects
  removeProduct(reference) {
    return this.http.delete<any>('product/' + reference).pipe(map(res => res));
  }

  getProductsImgs(img): Observable<Blob>{
    let params = new HttpParams()

    params = params.append("Img", img);

    return this.http.get('product/estampas/img', { params:params,  responseType: "blob"}).pipe(map(res => res));
  }

  // Function to register projects
  registerOrder(order) {

    return this.http.post<any>('order/register', order).map(res => res);
  
  }

}
