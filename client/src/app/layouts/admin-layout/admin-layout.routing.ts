import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { CadastrarProdutoComponent } from '../../components/cadastrar-produto/cadastrar-produto.component'
import { PedidoComponent } from '../../components/pedido/pedido.component'
import { ProdutosComponent } from '../../components/produtos/produtos.component'

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'cadastrar-produto', component: CadastrarProdutoComponent },
    { path: 'pedido/:id', component: PedidoComponent },
    { path: 'pedido', component: PedidoComponent },
    { path: 'produtos', component: ProdutosComponent },
    { path: 'user-profile',   component: UserProfileComponent },
];

