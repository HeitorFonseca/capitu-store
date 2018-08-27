import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ProductService } from '../../services/product.service'
import { Ng2ImgMaxService } from 'ng2-img-max';


@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.scss']
})
export class CadastrarProdutoComponent implements OnInit {

  @ViewChild('Referencia') referencia: ElementRef;
  @ViewChild('Preco') preco: ElementRef;

  imgUrl: string = "../../../assets/img/uploadImage.png";
  fileToUpload: File = null;
  message: string = '';
  messageClass: string;

  categories: Array<string> = new Array<string>(
    "T-Shirt", "Vestido Curto", "Vestido Longo", "Gola chocker", "Kit Mae-Filho", "Masculino", "Filho"
  );
  category;


  constructor(private productService: ProductService,
    private ng2ImgMaxService: Ng2ImgMaxService,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.category = this.categories[0];
  }

  fileChange(files: FileList) {
    this.fileToUpload = files.item(0);

    var reader = new FileReader();

    this.ng2ImgMaxService.resize([this.fileToUpload], 170, 170).subscribe((result) => {

      this.fileToUpload = new File([result], result.name);
      this.getImagePreview(this.fileToUpload);
    });

  }


  onRegisterClick(referencia, preco) {

    // console.log("cadastrar produto, ", referencia.value, Preco.value, this.fileToUpload, this.imgUrl);

    let reqProduct = {
      Reference: referencia.value,
      Price: preco.value,
      Img: this.imgUrl,
      Category: this.category
    }

    //console.log(reqProduct);
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


  selectCategory(catValue : any) {
    console.log("category:", catValue);
    this.category = catValue;   
  }

  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgUrl = reader.result;
    };
  }
}
