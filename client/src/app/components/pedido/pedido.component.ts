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
  vestidoCurtoCount = 0;
  vestidoLongoCount = 0;
  golaChockerCount = 0;
  kitMeFCount = 0;
  masculinoCount = 0;
  filhoCount = 0;

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

  incrementVestidoCurto(){
    this.vestidoCurtoCount++;        
  }

  decrementVestidoCurto() {
    this.vestidoCurtoCount = (this.vestidoCurtoCount == 0 ? 0 : this.vestidoCurtoCount-1);
  }

  incrementVestidoLongo(){
    this.vestidoLongoCount++;        
  }

  decrementVestidoLongo() {
    this.vestidoLongoCount = (this.vestidoLongoCount == 0 ? 0 : this.vestidoLongoCount-1);
  }

  incrementGolaChocker(){
    this.golaChockerCount++;        
  }

  decrementGolaChocker() {
    this.golaChockerCount = (this.golaChockerCount == 0 ? 0 : this.golaChockerCount-1);
  }

  incrementKitMeF(){
    this.kitMeFCount++;        
  }

  decrementKitMeF() {
    this.kitMeFCount = (this.kitMeFCount == 0 ? 0 : this.kitMeFCount-1);
  }

  incrementMasculino(){
    this.masculinoCount++;        
  }

  decrementMasculino() {
    this.masculinoCount = (this.masculinoCount == 0 ? 0 : this.masculinoCount-1);
  }

  incrementFilho(){
    this.filhoCount++;        
  }

  decrementFilho() {
    this.filhoCount = (this.filhoCount == 0 ? 0 : this.filhoCount-1);
  }
  
}
