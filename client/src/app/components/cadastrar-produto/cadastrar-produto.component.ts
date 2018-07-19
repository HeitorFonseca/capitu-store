import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.scss']
})
export class CadastrarProdutoComponent implements OnInit {

  
  imgUrl: string;
  fileToUpload: File = null;

  constructor() { }

  ngOnInit() {
  }

  fileChange(files: FileList) {
    this.fileToUpload = files.item(0);

    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.imgUrl = event.target.result;
    }

    reader.readAsDataURL(this.fileToUpload);
  }


  onRegisterClick(referencia, Preco) {

    console.log("cadastrar produto, ", referencia.value, Preco.value, this.fileToUpload);
  }
}
