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
  isRelatorioPedido = true;
  relatorioPedido: Array<string> = new Array<string>();

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
  kitPCount = 0;
  kitMCount = 0;
  kitGCount = 0;
  kitGGCount = 0;
  longoRegataCount = 0;
  nozinhoCount = 0;
  regataoMascCount = 0;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {

    this.productService.getOrders().subscribe(data => {
      console.log(data);
      this.orders = data as Array<Order>;

      this.orders.forEach(e => {
        let dtt = new Date(e.createdAt);
        e.date = dtt.getDate() + "/" + dtt.getMonth() + "/" + dtt.getFullYear() + " " +
          dtt.getHours() + ":" + dtt.getMinutes() + ":" + dtt.getSeconds();
      });

      this.orders.sort((a, b) => {
        var dateA = new Date(a.createdAt);
        var dateB = new Date(b.createdAt);
        return +dateB - +dateA;
      })
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
    console.log(this.orders);
  }

  selectAll() {
    this.orders.forEach(element => {
      element.isChecked = true;
    });
  }

  gerar_relatorio() {

    this.isRelatorioPedido = true;
    let dict = new Map<string, string>();

    this.finalOrders = this.orders.filter(a => a.isChecked === true && a.Confirmed === false);

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

    this.createReport(dict)
    console.log("dicionario: ", dict);
  }

  gerar_relatorioSeparar() {
    this.relatorioPedido.splice(0, this.relatorioPedido.length);
    this.isRelatorioPedido = false;

    this.finalOrders = this.orders.filter(a => a.isChecked === true && a.Confirmed === false);

    for (var item = 0; item < this.finalOrders.length; item++) {
      var line = this.finalOrders[item].ClientName + ":\n";

      for (var j = 0; j < this.finalOrders[item].References.length; j++) {

        var ref = this.finalOrders[item].References[j];
        line += " " + this.finalOrders[item].References[j] + ":" + this.finalOrders[item].Sizes[j] + "\n";
      }
      line += "\n";
      this.relatorioPedido.push(line);
    }
  }

  cu(str: string) {
    var pqtd, mqtd, gqtd, ggqtd, vestcqtd, vestlqtd, mascqtd, kitmfqtd, filhoqtd, chocqtd, curtpqtd, curtmqtd, curtgqtd,
      curtggqtd, curtinfqtd, semmangaqtd, kitpqtd, kitmqtd, kitgqtd, kitggqtd, longoregqtd, infantilqtd, nozinhoqtd, regataoMascqtd;


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
    regex = /([0-9]+KIT GG\s|[0-9]+KIT GG$)/g;
    kitggqtd = this.loop(str, "KIT GG", regex);
    regex = /([0-9]+Longo regata\s|[0-9]+Longo regata$)/g;
    longoregqtd = this.loop(str, "Longo regata", regex);
    regex = /([0-9]+Infantil\s|[0-9]+Infantil$)/g;
    infantilqtd = this.loop(str, "Infantil", regex);    
    regex = /([0-9]+Nozinho\s|[0-9]+Nozinho$)/g;
    nozinhoqtd = this.loop(str, "Nozinho", regex);    
    regex = /([0-9]+Regatão Masculino\s|[0-9]+Regatão Masculino$)/g;
    regataoMascqtd = this.loop(str, "Regatão Masculino", regex);

    return {
      P: pqtd, M: mqtd, G: gqtd, GG: ggqtd, VestC: vestcqtd, VestL: vestlqtd,
      Masc: mascqtd, Kit: kitmfqtd, Filho: filhoqtd, Chocker: chocqtd, CurtoP: curtpqtd,
      CurtoM: curtmqtd, CurtoG: curtgqtd, CurtoGG: curtggqtd, CurtoInfantil: curtinfqtd,
      SemManga: semmangaqtd, KitP: kitpqtd, KitM: kitmqtd, KitG: kitgqtd, KitGG: kitggqtd, LongoRegata: longoregqtd,
      Infantil: infantilqtd, Nozinho: nozinhoqtd, RegataoMasculino: regataoMascqtd
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

    this.finalSum(counter, type);

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

    this.finalReport.push("--------------------------------------------------------------------------------------------------------------------------------");
    this.finalReport.push("Total de Camisas P - " + this.pCount);
    this.finalReport.push("Total de Camisas M - " + this.mCount);
    this.finalReport.push("Total de Camisas G - " + this.gCount);
    this.finalReport.push("Total de Camisas GG - " + this.ggCount);
    this.finalReport.push("Total de Vestidos Curtos - " + this.vestidoCurtoCount);
    this.finalReport.push("Total de Vestidos Longos - " + this.vestidoLongoCount);
    this.finalReport.push("Total de Camisas Masculinas - " + this.masculinoCount);
    this.finalReport.push("Total de Camisas filho - " + this.filhoCount);
    this.finalReport.push("Total de Camisas Gola Chocker - " + this.golaChockerCount);
    this.finalReport.push("Total de Vestidos Curtos p - " + this.curtoPCount);
    this.finalReport.push("Total de Vestidos Curtos M - " + this.curtoMCount);
    this.finalReport.push("Total de Vestidos Curtos G - " + this.curtoGCount);
    this.finalReport.push("Total de Vestidos Curtos GG - " + this.curtoGGCount);
    this.finalReport.push("Total de Vestidos curtos Infantil - " + this.curtoInfantilCount);
    this.finalReport.push("Total de Regatas (Sem Manga) - " + this.semMangaCount);
    this.finalReport.push("Total de Kits P - " + this.kitPCount);
    this.finalReport.push("Total de Kits M - " + this.kitMCount);
    this.finalReport.push("Total de Kits G - " + this.kitGCount);
    this.finalReport.push("Total de Kits GG - " + this.kitGGCount);
    this.finalReport.push("Total de Vestido Longo Regata - " + this.longoRegataCount);
    this.finalReport.push("Total de Infantil - " + this.infantilCount);
    this.finalReport.push("Total de Camisas Nozinho - " + this.nozinhoCount);
    this.finalReport.push("Total de Camisas Regatão Masculino - " + this.regataoMascCount);

    let total = this.pCount + this.mCount + this.gCount + this.ggCount + this.vestidoCurtoCount + this.vestidoLongoCount +  
    this.masculinoCount +  this.filhoCount +  this.golaChockerCount +  this.curtoPCount +  this.curtoMCount +  
    this.curtoGCount +  this.curtoGGCount + this.curtoInfantilCount +  this.semMangaCount +  this.kitPCount +  this.kitMCount + 
    this.kitGCount +  this.kitGGCount +  this.longoRegataCount +  this.infantilCount +  this.nozinhoCount +  
    this.regataoMascCount;

    this.finalReport.push("Total: - " + total);

    this.pCount = this.mCount = this.gCount = this.ggCount = this.vestidoCurtoCount = this.vestidoLongoCount =  
    this.masculinoCount =  this.filhoCount =  this.golaChockerCount =  this.curtoPCount =  this.curtoMCount =  
    this.curtoGCount =  this.curtoGGCount = this.curtoInfantilCount =  this.semMangaCount =  this.kitPCount =  this.kitMCount = 
    this.kitGCount =  this.kitGGCount =  this.longoRegataCount =  this.infantilCount =  this.nozinhoCount =  
    this.regataoMascCount = 0;
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
    if (objValues.Infantil != '')
      ret = (ret != '' ? ret + ", " + objValues.Infantil : ret + objValues.Infantil);
    if (objValues.Nozinho != '')
      ret = (ret != '' ? ret + ", " + objValues.Nozinho : ret + objValues.Nozinho);
    if (objValues.RegataoMasculino != '')
      ret = (ret != '' ? ret + ", " + objValues.RegataoMasculino : ret + objValues.RegataoMasculino);

    return ret;
  }

  finalSum(counter:any, type:string) {

    console.log("tipo: ", type, " counter = ", counter);

    if (type == "P")
      this.pCount+= counter;
    else if (type == "M")
      this.mCount+=counter;
    else if (type == "G")
      this.gCount+=counter;
    else if (type == "GG") 
      this.ggCount+=counter;
    else if (type == "Vestido curto")
      this.vestidoCurtoCount+=counter;
    else if (type == "Vestido longo")
      this.vestidoLongoCount+=counter;
    else if (type == "Masculino")
      this.masculinoCount+=counter;
    else if (type == "Filho")
      this.filhoCount+=counter;
    else if (type == "Gola Chocker")
      this.golaChockerCount+=counter;
    else if (type == "Curto P")
      this.curtoPCount+=counter;
    else if (type == "Curto M")
      this.curtoMCount+=counter;
    else if (type == "Curto G")
      this.curtoGCount+=counter;
    else if (type == "Curto GG")
      this.curtoGGCount+=counter;
    else if (type == "Curto Infantil")
      this.curtoInfantilCount+=counter;
    else if (type == "Sem Manga")
      this.semMangaCount+=counter;
    else if (type == "KIT P")
      this.kitPCount+=counter;
    else if (type == "KIT M")
      this.kitMCount+=counter;
    else if (type == "KIT G")
      this.kitGCount+=counter;
    else if (type == "KIT GG")
      this.kitGGCount+=counter;
    else if (type == "Longo regata")
      this.longoRegataCount+=counter;
    else if (type == "Infantil")
      this.infantilCount+=counter;
    else if (type == "Nozinho")
      this.nozinhoCount+=counter;
    else if (type == "Regatão Masculino")
      this.regataoMascCount+=counter;

  }
}
