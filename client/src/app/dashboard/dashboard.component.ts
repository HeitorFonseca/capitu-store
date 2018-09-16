import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

import { ProductService } from '../services/product.service'
import { PagerService } from '../services/pager.service'
import { Order } from '../models/order'
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  orders: Array<Order> = new Array<Order>();
  selectedIds: Array<string> = new Array<string>();
  finalOrders: Array<Order>;

  finalReport: Array<string> = new Array<string>();

  message: string = '';
  messageClass: string;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {

    this.productService.getOrders().subscribe(data => {
      console.log(data);
      this.orders = data as Array<Order>;

    }, err => {

    });

  }

  removeOrder(id: string, index: number) {
    console.log("id a ser removido:", id);
    this.productService.removeOrder(id).subscribe(data => {
      this.message = "Pedido Removido";
      this.messageClass = "alert alert-success";

      this.orders.splice(index, 1);
    }, err => {
      this.message = err.error.message;
      this.messageClass = "alert alert-danger";
    })
  }

  editOrder(id: string) {
    console.log("edit order: ", id);
    this.router.navigate(['/pedido', id]);
  }

  confirmOrder(id: string, index: number) {
    console.log("id a ser confirmado:", id);
    this.productService.confirmOrder(id).subscribe(data => {
      this.message = "Pedido Confirmado";
      this.messageClass = "alert alert-success";
      console.log("confirmou");
      this.orders[index].Confirmed = true;

    }, err => {
      this.message = err.error.message;
      this.messageClass = "alert alert-danger";
    })
  }

  selectCheckBox(event: any) {
    // if (event.target.checked) {
    //   console.log("checked");

    // } else {
    //   console.log("not checked");
    // }
    // console.log(event.target);
    // this.selectedIds.push(event.target.value);

    console.log(this.orders);
  }

  gerar_relatorio() {

    let dict = new Map<string, string>();

    this.finalOrders = this.orders.filter(a => a.isChecked === true);

    console.log("finalOrders: ", this.finalOrders);

    for (var item = 0; item < this.finalOrders.length; item++) {
      for (var j = 0; j < this.finalOrders[item].References.length; j++) {
        var ref = this.finalOrders[item].References[j];
        if (!dict.has(ref)) {
          dict.set(ref, this.finalOrders[item].Sizes[j]);
        } else {
          dict.set(ref, dict.get(ref) + " " + this.finalOrders[item].Sizes[j]);
        }
      }
    }

    // Array.from(dict.values()).forEach(value => this.cu(value));

    this.createReport(dict)
    console.log("dicionario: ", dict);


  }

  cu(str: string) {
    var pqtd, mqtd, gqtd, ggqtd, vestcqtd, vestlqtd, mascqtd, kitmfqtd, filhoqtd, chocqtd, curtpqtd, curtmqtd, curtgqtd,
      curtggqtd, curtinfqtd, semmangaqtd, kitpqtd, kitmqtd, kitgqtd, kitggqtd, longoregqtd;
    console.log(str);
    let regex = /([0-9]+P\s|[0-9]+P$)/g;
    pqtd = this.loop(str, "P", regex);
    regex = /([0-9]+M\s|[0-9]+M$)/g;
    mqtd = this.loop(str, "M", regex);
    regex = /([0-9]+G\s|[0-9]+G$)/g;
    gqtd = this.loop(str, "G", regex);
    regex = /([0-9]+GG\s|[0-9]+GG$)/g;
    ggqtd = this.loop(str, "GG", regex);
    regex = /([0-9]+Vestido curto\s|[0-9]+Vestido curto$)/g;
    vestcqtd = this.loop(str, "Vestido curto", regex);
    regex = /([0-9]+Vestido longo\s|[0-9]+Vestido longo$)/g;
    vestlqtd = this.loop(str, "Vestido longo", regex);
    regex = /([0-9]+Masculino\s|[0-9]+Masculino$)/g;
    mascqtd = this.loop(str, "Masculino", regex);
    regex = /([0-9]+Kit Mae e filha\s|[0-9]+Kit Mae e filha$)/g;
    kitmfqtd = this.loop(str, "Kit Mae e filha", regex);
    regex = /([0-9]+Filho\s|[0-9]+Filho$)/g;
    filhoqtd = this.loop(str, "Filho", regex);
    regex = /([0-9]+Gola Chocker\s|[0-9]+Gola Chocker$)/g;
    chocqtd = this.loop(str, "Gola Chocker", regex);
    regex = /([0-9]+Curto P\s|[0-9]+Curto P$)/g;
    curtpqtd = this.loop(str, "Curto P", regex);
    regex = /([0-9]+Curto M\s|[0-9]+Curto M$)/g;
    curtmqtd = this.loop(str, "Curto M", regex);
    regex = /([0-9]+Curto G\s|[0-9]+Curto G$)/g;
    curtgqtd = this.loop(str, "Curto G", regex);
    regex = /([0-9]+Curto GG\s|[0-9]+Curto GG$)/g;
    curtggqtd = this.loop(str, "Curto GG", regex);
    regex = /([0-9]+Curto Infantil\s|[0-9]+Curto Infantil$)/g;
    curtinfqtd = this.loop(str, "Curto Infantil", regex);
    regex = /([0-9]+Sem Manga\s|[0-9]+Sem Manga$)/g;
    semmangaqtd = this.loop(str, "Sem Manga", regex);
    regex = /([0-9]+KIT P\s|[0-9]+KIT P$)/g;
    kitpqtd = this.loop(str, "KIT P", regex);
    regex = /([0-9]+KIT M\s|[0-9]+KIT M$)/g;
    kitmqtd = this.loop(str, "KIT M", regex);
    regex = /([0-9]+KIT G\s|[0-9]+KIT G$)/g;
    kitgqtd = this.loop(str, "KIT G", regex);
    regex = /([0-9]+KIT G\s|[0-9]+KIT G$)/g;
    kitggqtd = this.loop(str, "KIT G", regex);
    regex = /([0-9]+Longo regata\s|[0-9]+Longo regata$)/g;
    longoregqtd = this.loop(str, "Longo regata", regex);

    return {
      P: pqtd, M: mqtd, G: gqtd, GG: ggqtd, VestC: vestcqtd, VestL: vestlqtd,
      Masc: mascqtd, Kit: kitmfqtd, Filho: filhoqtd, Chocker: chocqtd, CurtoP: curtpqtd,
      CurtoM: curtmqtd, CurtoG: curtgqtd, CurtoGG: curtggqtd, CurtoInfantil: curtinfqtd,
      SemManga: semmangaqtd, KitP: kitpqtd, KitM: kitmqtd, KitG: kitggqtd, KitGG: kitggqtd, LongoRegata: longoregqtd
    };

  }

  loop(str: string, type: string, regex: any) {

    let array = str.match(regex);

    let counter = 0;
    if (array) {
      for (var i = 0; i < array.length; i++) {
        let num = array[i].split(type)[0];

        var conv = +num; // convert to number
        counter = counter + conv;

      }
    } else counter = 0;

    var ret = (counter > 0 ? "" + counter + type : "")
    return ret;
  }

  createReport(dict: Map<string, string>) {
    this.finalReport.splice(0, this.finalReport.length);


    var counter = 1;
    Array.from(dict.entries()).forEach(entry => {

      console.log('Key: ' + entry[0] + ' Value: ' + entry[1]);

      var objValues = this.cu(entry[1]);
      console.log("objValues:", objValues);
      this.finalReport.push("" + counter++ + ". " + entry[0] + " - " + this.getSizes(objValues));

    });

  }

  getSizes(objValues) {
    var ret = "";
    if (objValues.P != '')
      ret = (ret != '' ? ret + ", " + objValues.P : ret + objValues.P);
    if (objValues.M != '')
      ret = (ret != '' ? ret + ", " + objValues.M : ret + objValues.M);
    if (objValues.G != '')
      ret = (ret != '' ? ret + ", " + objValues.G : ret + objValues.G);
    if (objValues.GG != '')
      ret = (ret != '' ? ret + ", " + objValues.GG : ret + objValues.GG);
    if (objValues.VestC != '')
      ret = (ret != '' ? ret + ", " + objValues.VestC : ret + objValues.VestC);
    if (objValues.VestL != '')
      ret = (ret != '' ? ret + ", " + objValues.VestL : ret + objValues.VestL);
    if (objValues.Masc != '')
      ret = (ret != '' ? ret + ", " + objValues.Masc : ret + objValues.Masc);
    if (objValues.Kit != '')
      ret = (ret != '' ? ret + ", " + objValues.Kit : ret + objValues.Kit);
    if (objValues.Filho != '')
      ret = (ret != '' ? ret + ", " + objValues.Filho : ret + objValues.Filho);
    if (objValues.Chocker != '')
      ret = (ret != '' ? ret + ", " + objValues.Chocker : ret + objValues.Chocker);
    if (objValues.CurtoP != '')
      ret = (ret != '' ? ret + ", " + objValues.CurtoP : ret + objValues.CurtoP);
    if (objValues.CurtoM != '')
      ret = (ret != '' ? ret + ", " + objValues.CurtoM : ret + objValues.CurtoM);
    if (objValues.CurtoG != '')
      ret = (ret != '' ? ret + ", " + objValues.CurtoG : ret + objValues.CurtoG);
    if (objValues.CurtoGG != '')
      ret = (ret != '' ? ret + ", " + objValues.CurtoGG : ret + objValues.CurtoGG);
    if (objValues.CurtoInfantil != '')
      ret = (ret != '' ? ret + ", " + objValues.CurtoInfantil : ret + objValues.CurtoInfantil);
    if (objValues.SemManga != '')
      ret = (ret != '' ? ret + ", " + objValues.SemManga : ret + objValues.SemManga);
      if (objValues.KitP != '')
      ret = (ret != '' ? ret + ", " + objValues.KitP : ret + objValues.KitP);
      if (objValues.KitM != '')
      ret = (ret != '' ? ret + ", " + objValues.KitM : ret + objValues.KitM);
      if (objValues.KitG != '')
      ret = (ret != '' ? ret + ", " + objValues.KitG : ret + objValues.KitG);
      if (objValues.KitGG != '')
      ret = (ret != '' ? ret + ", " + objValues.KitGG : ret + objValues.KitGG);
      if (objValues.LongoRegata != '')
      ret = (ret != '' ? ret + ", " + objValues.LongoRegata : ret + objValues.LongoRegata);
    return ret;
  }
}
