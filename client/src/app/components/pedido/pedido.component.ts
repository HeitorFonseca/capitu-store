import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  pCount = 0;
  mCount = 0;
  gCount = 0;
  ggCount = 0;
  vestidoCount = 0;
  
  constructor() { }

  ngOnInit() {
  }

  incrementP(){
    this.pCount++;
  }

  decrementP() {
    this.pCount = (this.pCount == 0 ? 0 : this.pCount-1);
  }

  incrementM(){
    this.mCount++;
  }

  decrementM() {
    this.mCount = (this.mCount == 0 ? 0 : this.mCount-1);
  }
  
  incrementG(){
    this.gCount++;    
  }

  decrementG() {
    this.gCount = (this.gCount == 0 ? 0 : this.gCount-1);
  }

  incrementGG(){
    this.ggCount++;    
  }

  decrementGG() {
    this.ggCount = (this.ggCount == 0 ? 0 : this.ggCount-1);
  }

  incrementVestido(){
    this.vestidoCount++;        
  }

  decrementVestido() {
    this.vestidoCount = (this.vestidoCount == 0 ? 0 : this.vestidoCount-1);
  }
}
