import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ProductService } from '../../services/product.service'


@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.scss']
})
export class CadastrarProdutoComponent implements OnInit {

  @ViewChild('Referencia') referencia: ElementRef;
  @ViewChild('Preco') preco: ElementRef;

  imgUrl: string = "../../assets/img/uploadImage.png";
  fileToUpload: File = null;
  message: string = '';
  messageClass: string;

  constructor(private productService: ProductService) { }

  ngOnInit() {

  }

  fileChange(files: FileList) {
    this.fileToUpload = files.item(0);

    var reader = new FileReader();

    reader.onloadend = (event: any) => {
      this.imgUrl = event.target.result;
      console.log("base:", this.imgUrl);
    }

    reader.readAsDataURL(this.fileToUpload);
  }


  onRegisterClick(referencia, preco) {

    // console.log("cadastrar produto, ", referencia.value, Preco.value, this.fileToUpload, this.imgUrl);

    let reqProduct = {
      Reference: referencia.value,
      Price: preco.value,
      Img: this.imgUrl
    }

    console.log(reqProduct);
    this.productService.registerProduct(reqProduct).subscribe(data => {
      console.log("produto registrado:", data);


      this.message = "Produto " + referencia.value + " cadastrado";
      this.messageClass = 'alert alert-success';

      this.imgUrl = "../../assets/img/uploadImage.png";

    }, err => {
      this.message = err.error.message;
      this.messageClass = 'alert alert-danger';
    })
  }
}
