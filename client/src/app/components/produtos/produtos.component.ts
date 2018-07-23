import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ProductService } from '../../services/product.service'
import { Product } from '../../models/product'

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  products: Array<Product>;
  referencia = "01";

  constructor(private productService: ProductService) { }



  ngOnInit() {

    this.productService.getProducts().subscribe(data => {
      console.log(data);

      this.products = data as Array<Product>;

      for (let product of this.products) {
        this.productService.getProductsImgs(product.Img).subscribe(data => {

          let reader = new FileReader();

          reader.addEventListener("load", () => {
            product.imageToShow = reader.result;
          }, false);
      
          if (data) {
            reader.readAsDataURL(data);
          }

         
        });
      }
    })
  }



}
