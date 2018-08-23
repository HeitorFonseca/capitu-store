import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ProductService } from '../../services/product.service'
import { PagerService } from '../../services/pager.service'
import { Product } from '../../models/product'

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  globalLimit = 8;

  products: Array<Product>;
  referencia = "01";
  message: string = '';
  messageClass: string;

  constructor(private productService: ProductService, private pagerService: PagerService) { }

  // array of all items to be paged
  private allItems: any[];
  private allItemsCounter;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {

    this.productService.getCountProducts().subscribe(data=> {
      this.allItemsCounter = data.counter;
      this.setPage(1);

    }, err => {
      this.message = err.error.message;
      this.messageClass = 'alert alert-danger';
    });

    this.productService.getProducts(1, this.globalLimit).subscribe(data => {
      console.log(data);

      this.products = data as Array<Product>;


      // for (let product of this.products) {
      //   this.productService.getProductsImgs(product.Img).subscribe(data => {

      //     let reader = new FileReader();

      //     reader.addEventListener("load", () => {
      //       product.imageToShow = reader.result;
      //     }, false);

      //     if (data) {
      //       reader.readAsDataURL(data);
      //     }

      //   });
      // }
    }, err => {
      this.message = err.error.message;
      this.messageClass = 'alert alert-danger';
    });

  }


  removeProduct(referencia, index) {

    if (referencia) {
      this.productService.removeProduct(referencia).subscribe(data => {

          this.message = data.message;
          this.messageClass = 'alert alert-success';
          this.products.splice(index, 1);
      
      }, err => {
        this.message = err.error.message;
        this.messageClass = 'alert alert-danger';
      })
    }
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItemsCounter, page, this.globalLimit);

    console.log("pager:", this.pager);

    this.productService.getProducts(page, this.globalLimit).subscribe(data => {
      console.log(data);

      this.products = data as Array<Product>;

    });

    // get current page of items
    // this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
