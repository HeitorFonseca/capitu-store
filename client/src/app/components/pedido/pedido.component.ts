import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ProductService } from '../../services/product.service'
import { Product } from '../../models/product'
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../models/order';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  clientName: string;
  arrayOfStrings = ['this', 'is', 'list', 'of', 'string', 'element'];

  pCount = 0;
  mCount = 0;
  gCount = 0;
  ggCount = 0;
  vestidoCurtoCount = 0;
  vestidoLongoCount = 0;
  golaChockerCount = 0;
  infantilCount = 0;
  masculinoCount = 0;
  filhoCount = 0;
  curtoPCount = 0;
  curtoMCount = 0;
  curtoGCount = 0;
  curtoGGCount = 0;
  curtoInfantilCount = 0;
  semMangaCount = 0;

  referencia;
  mySource;

  products: Array<Product>;
  referencesToOrder: Array<string> = new Array<string>();
  sizesToOrder: Array<string> = new Array<string>();

  referenceArray: Array<string> = new Array<string>();
  selectedProduct: Product;

  message: string = '';
  messageClass: string;

  objRefSize: Array<any> = new Array<any>();

  orderIdParameter;

  constructor(private route: ActivatedRoute, private productService: ProductService,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.orderIdParameter = this.route.snapshot.paramMap.get('id');

    console.log("orderId=", this.orderIdParameter);

    if (this.orderIdParameter) {
      //edit order
      this.productService.getOrderById(this.orderIdParameter).subscribe(data => {
        let order = data as Order;
        this.referencesToOrder = order.References;
        this.sizesToOrder = order.Sizes;
        this.clientName = order.ClientName;

        console.log(order, data);
        for (let i = 0; i < order.References.length; i++) {
          this.objRefSize.push({ reference: order.References[i], size: order.Sizes[i] });
        }

      }, err => {
        this.message = "Erro ao editar o pedido";
        this.messageClass = "alert alert-danger";
      })
    }

    this.productService.getProducts(1, 100000).subscribe(data => {
      console.log(data);
      this.products = data as Array<Product>;

      for (let prod of this.products) {
        this.referenceArray.push(prod.Reference);
      }
    });

  }

  onRegisterClick(reference, clientName) {
    console.log("cadastrar pedido, ", reference.value, clientName.value);

    let sizes = this.getSizes();

    let reqOrder = {
      References: this.referencesToOrder,
      ClientName: clientName.value,
      Sizes: this.sizesToOrder
    }

    console.log(reqOrder);
    //register
    if (!this.orderIdParameter) {
      this.productService.registerOrder(reqOrder).subscribe(data => {
        console.log("pedido registrado:", data);
        this.message = "Pedido para " + clientName.value + " Registrado!";
        this.messageClass = "alert alert-success";
        this.clientName = "";
        this.referencia = "";
        this.selectedProduct = null;
        this.objRefSize.splice(0, this.objRefSize.length);
        this.sizesToOrder.splice(0, this.sizesToOrder.length);
        this.referencesToOrder.splice(0, this.referencesToOrder.length);

      }, err => {
        this.message = "Voce esqueceu de colocar algum campo?";
        this.messageClass = "alert alert-danger";
      });
    } else {
      //edit
      this.productService.editOrder(this.orderIdParameter, reqOrder).subscribe(data => {
        console.log("pedido editado:", data);
        this.message = "Pedido para " + clientName.value + " editado!";
        this.messageClass = "alert alert-success";
      }, err => {
        this.message = "Voce esqueceu de colocar algum campo?";
        this.messageClass = "alert alert-danger";
      });
    }
  }


  addReference(reference: any) {
    if (this.getSizes() == '') {
      this.message = "Selecione um tamanho";
      this.messageClass = "alert alert-danger";
    } else {
      this.referencesToOrder.push(reference);
      let sz = this.getSizes();
      this.objRefSize.push({ reference: reference, size: sz })
      this.sizesToOrder.push(sz);
      this.resetCounters();
    }
  }

  getSizes() {
    var sizes = '';

    if (this.pCount > 0)
      sizes = sizes + this.pCount + "P"
    if (this.mCount > 0)
      sizes = (sizes == '' ? sizes + this.mCount + "M" : sizes + " " + this.mCount + "M");
    if (this.gCount > 0)
      sizes = (sizes == '' ? sizes + this.gCount + "G" : sizes + " " + this.gCount + "G");
    if (this.ggCount > 0)
      sizes = (sizes == '' ? sizes + this.ggCount + "GG" : sizes + " " + this.ggCount + "GG");
    if (this.vestidoCurtoCount > 0)
      sizes = (sizes == '' ? sizes + this.vestidoCurtoCount + "Vestido curto" : sizes + " " + this.vestidoCurtoCount + "Vestido curto");
    if (this.vestidoLongoCount > 0)
      sizes = (sizes == '' ? sizes + this.vestidoLongoCount + "Vestido longo" : sizes + " " + this.vestidoLongoCount + "Vestido longo");
    if (this.golaChockerCount > 0)
      sizes = sizes == '' ? sizes + this.golaChockerCount + "Gola Chocker" : sizes + " " + this.golaChockerCount + "Gola Chocker";
    if (this.infantilCount > 0)
      sizes = sizes == '' ? sizes + this.infantilCount + "Infantil" : sizes + " " + this.infantilCount + "Infantil";
    if (this.masculinoCount > 0)
      sizes = sizes == '' ? sizes + this.masculinoCount + "Masculino" : sizes + " " + this.masculinoCount + "Masculino";
    if (this.filhoCount > 0)
      sizes = sizes == '' ? sizes + this.filhoCount + "Filho" : sizes + " " + this.filhoCount + "Filho";
    if (this.curtoPCount > 0)
      sizes = sizes == '' ? sizes + this.curtoPCount + "Curto P" : sizes + " " + this.curtoPCount + "Curto P";
    if (this.curtoMCount > 0)
      sizes = sizes == '' ? sizes + this.curtoMCount + "Curto M" : sizes + " " + this.curtoMCount + "Curto M";
    if (this.curtoGCount > 0)
      sizes = sizes == '' ? sizes + this.curtoGCount + "Curto G" : sizes + " " + this.curtoGCount + "Curto G";
    if (this.curtoGGCount > 0)
      sizes = sizes == '' ? sizes + this.curtoGGCount + "Curto GG" : sizes + " " + this.curtoGGCount + "Curto GG";
    if (this.curtoInfantilCount > 0)
      sizes = sizes == '' ? sizes + this.curtoInfantilCount + "Curto Infantil" : sizes + " " + this.curtoInfantilCount + "Curto Infantil";
    if (this.semMangaCount > 0)
      sizes = sizes == '' ? sizes + this.semMangaCount + "Sem Manga" : sizes + " " + this.semMangaCount + "Sem Manga";
    
      
     return sizes;
  }

  resetCounters() {
    this.pCount = this.mCount = this.gCount = this.ggCount = this.vestidoCurtoCount = this.vestidoLongoCount =
      this.golaChockerCount = this.masculinoCount = this.filhoCount = this.infantilCount = 
      this.curtoPCount = this.curtoMCount = this.curtoGCount = this.curtoGGCount = this.curtoInfantilCount = this.semMangaCount = 0;
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

  incrementInfantil() {
    this.infantilCount++;
  }

  decrementInfantil() {
    this.infantilCount = (this.infantilCount == 0 ? 0 : this.infantilCount - 1);
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

  incrementcurtoP() {
    this.curtoPCount++;
  }

  decrementcurtoP() {
    this.curtoPCount = (this.curtoPCount == 0 ? 0 : this.curtoPCount - 1);
  }

  incrementcurtoM() {
    this.curtoMCount++;
  }

  decrementcurtoM() {
    this.curtoMCount = (this.curtoMCount == 0 ? 0 : this.curtoMCount - 1);
  }

  incrementcurtoG() {
    this.curtoGCount++;
  }

  decrementcurtoG() {
    this.curtoGCount = (this.curtoGCount == 0 ? 0 : this.curtoGCount - 1);
  }

  incrementcurtoGG() {
    this.curtoGGCount++;
  }

  decrementcurtoGG() {
    this.curtoGGCount = (this.curtoGGCount == 0 ? 0 : this.curtoGGCount - 1);
  }

  incrementcurtoInfantil() {
    this.curtoInfantilCount++;
  }

  decrementcurtoInfantil() {
    this.curtoInfantilCount = (this.curtoInfantilCount == 0 ? 0 : this.curtoInfantilCount - 1);
  }

  incrementsemManga() {
    this.semMangaCount++;
  }

  decrementsemManga() {
    this.semMangaCount = (this.semMangaCount == 0 ? 0 : this.semMangaCount - 1);
  }
  valueChanged(newVal) {
    console.log("Case 2: value is changed to ", newVal);
    this.selectedProduct = this.products.find(x => x.Reference == newVal);
  }

}
