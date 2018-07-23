import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class ProductService {

  
  domain = "http://localhost:3000/api/";

  constructor(private http: HttpClient, 
    private router: Router) { }

   // Function to get projects
  getProducts() {
    return this.http.get(this.domain + 'product/').pipe(map(res => res));
  }

  // Function to register projects
  registerProduct(product, file) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const fd = new  FormData();
    fd.append('fileToUpload', file, file.name);
    fd.append('Reference', product.Reference);
    fd.append('Price', product.Price);
    fd.append('Img', product.Img);

    return this.http.post<any>(this.domain + 'product/register',  fd, {headers: headers}).pipe(map(res => res));
  }

  getProductsImgs(img): Observable<Blob>{
    let params = new HttpParams()

    params = params.append("Img", img);

    return this.http.get(this.domain + 'product/estampas/img', { params:params,  responseType: "blob"}).pipe(map(res => res));
  }

  // Function to register projects
  registerOrder(order) {

    return this.http.post<any>(this.domain + 'order/register', order).map(res => res);
  
  }

}
