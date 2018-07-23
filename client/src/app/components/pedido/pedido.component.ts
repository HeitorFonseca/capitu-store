import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service'
import { Product } from '../../models/product'


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  arrayOfStrings = ['this', 'is', 'list', 'of', 'string', 'element'];

  pCount = 0;
  mCount = 0;
  gCount = 0;
  ggCount = 0;
  vestidoCurtoCount = 0;
  vestidoLongoCount = 0;
  golaChockerCount = 0;
  kitMeFCount = 0;
  masculinoCount = 0;
  filhoCount = 0;

  myData;
  mySource;

  products: Array<Product>;
  referenceArray: Array<string> = new Array<string>();
  selectedProduct:Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      console.log(data);
      this.products = data as Array<Product>;

      for (let prod of this.products) {
        this.referenceArray.push(prod.Reference);

        this.productService.getProductsImgs(prod.Img).subscribe(data => {

          let reader = new FileReader();

          reader.addEventListener("load", () => {
            prod.imageToShow = reader.result;
          }, false);
      
          if (data) {
            reader.readAsDataURL(data);
          }
         
        });

      }

    });
  }

  onRegisterClick(reference, clientName) {
    console.log("cadastrar pedido, ", reference.value, clientName.value);

    let sizes = this.getSizes();

    let reqOrder = {
      Reference: reference.value,
      ClientName: clientName.value,
      Sizes: sizes
    }

    console.log(reqOrder);
    this.productService.registerOrder(reqOrder).subscribe(data => {
      console.log("pedido registrado:", data);
    })
  }

  getSizes() {
    var sizes = '';

    if (this.pCount > 0)
      sizes = sizes + this.pCount + "P"
      if (this.mCount > 0)
      sizes = (sizes == '' ? sizes + this.mCount + "M" :  sizes + " " + this.mCount + " M" );
      if (this.gCount > 0)
      sizes = ( sizes == '' ? sizes + this.gCount + "G" :  sizes + " " + this.gCount + " G");
      if (this.ggCount > 0)
      sizes = (sizes == '' ? sizes + this.ggCount + "GG":  sizes + " " + this.ggCount + " GG");
      if (this.vestidoCurtoCount > 0)
      sizes = (sizes == '' ? sizes + this.vestidoCurtoCount + "Vestido(s) curto": sizes + " " + this.vestidoCurtoCount + " Vestido(s) curto");
      if (this.vestidoLongoCount > 0)
      sizes = (sizes == '' ? sizes + this.vestidoLongoCount + "Vestido(s) longo": sizes + " " + this.vestidoLongoCount + " Vestido(s) longo");
      if (this.golaChockerCount > 0)
      sizes = sizes == '' ? sizes + this.golaChockerCount + "Gola Chocker" : sizes + " " + this.golaChockerCount + " Gola Chocker";
      if (this.kitMeFCount > 0)
      sizes = sizes == '' ? sizes + this.kitMeFCount + "Kit Mãe e filha" :  sizes + " " + this.kitMeFCount + " Kit Mãe e filha";
      if (this.masculinoCount > 0)
      sizes = sizes == '' ? sizes + this.masculinoCount + "Masculino" :  sizes + " " + this.masculinoCount + " Masculino";
      if (this.filhoCount > 0)
      sizes = sizes == '' ? sizes + this.filhoCount + "Filho" : sizes + " " + this.filhoCount + " Filho";

      return sizes;
  }

  incrementP() {
    this.pCount++;
  }

  decrementP() {
    this.pCount = (this.pCount == 0 ? 0 : this.pCount - 1);
  }

  incrementM() {
    this.mCount++;
  }

  decrementM() {
    this.mCount = (this.mCount == 0 ? 0 : this.mCount - 1);
  }

  incrementG() {
    this.gCount++;
  }

  decrementG() {
    this.gCount = (this.gCount == 0 ? 0 : this.gCount - 1);
  }

  incrementGG() {
    this.ggCount++;
  }

  decrementGG() {
    this.ggCount = (this.ggCount == 0 ? 0 : this.ggCount - 1);
  }

  incrementVestidoCurto() {
    this.vestidoCurtoCount++;
  }

  decrementVestidoCurto() {
    this.vestidoCurtoCount = (this.vestidoCurtoCount == 0 ? 0 : this.vestidoCurtoCount - 1);
  }

  incrementVestidoLongo() {
    this.vestidoLongoCount++;
  }

  decrementVestidoLongo() {
    this.vestidoLongoCount = (this.vestidoLongoCount == 0 ? 0 : this.vestidoLongoCount - 1);
  }

  incrementGolaChocker() {
    this.golaChockerCount++;
  }

  decrementGolaChocker() {
    this.golaChockerCount = (this.golaChockerCount == 0 ? 0 : this.golaChockerCount - 1);
  }

  incrementKitMeF() {
    this.kitMeFCount++;
  }

  decrementKitMeF() {
    this.kitMeFCount = (this.kitMeFCount == 0 ? 0 : this.kitMeFCount - 1);
  }

  incrementMasculino() {
    this.masculinoCount++;
  }

  decrementMasculino() {
    this.masculinoCount = (this.masculinoCount == 0 ? 0 : this.masculinoCount - 1);
  }

  incrementFilho() {
    this.filhoCount++;
  }

  decrementFilho() {
    this.filhoCount = (this.filhoCount == 0 ? 0 : this.filhoCount - 1);
  }

  valueChanged(newVal) {
    console.log("Case 2: value is changed to ", newVal);
    this.selectedProduct = this.products.find(x => x.Reference == newVal);
  }

}
