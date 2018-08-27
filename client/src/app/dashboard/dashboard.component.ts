import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

import { ProductService } from '../services/product.service'
import { PagerService } from '../services/pager.service'
import { Order } from '../models/order'


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

  constructor(private productService: ProductService) { }

  ngOnInit() {

    this.productService.getOrders().subscribe(data => {
      console.log(data);
      this.orders = data as Array<Order>;

    }, err => {

    });

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
    var pqtd, mqtd, gqtd, ggqtd, vestcqtd, vestlqtd, mascqtd, kitmfqtd, filhoqtd, chocqtd;
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

    return {
      P: pqtd, M: mqtd, G: gqtd, GG: ggqtd, VestC: vestcqtd, VestL: vestlqtd,
      Masc: mascqtd, Kit: kitmfqtd, Filho: filhoqtd, Chocker: chocqtd
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
      ret = (ret != '' ?  ret + ", " + objValues.G : ret + objValues.G);
    if (objValues.GG != '')
      ret = (ret != '' ?  ret + ", " + objValues.GG : ret + objValues.GG);
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

    return ret;
  }
}
