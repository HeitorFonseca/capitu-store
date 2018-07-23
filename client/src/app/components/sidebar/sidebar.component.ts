import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    { path: '/cadastrar-produto', title: 'Cadastro Produto',  icon: 'design_app', class: '' },
    { path: '/pedido', title: 'Adicionar Pedido',  icon: 'design_app', class: '' },
    { path: '/produtos', title: 'Produtos',  icon: 'design_app', class: '' },

    { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
