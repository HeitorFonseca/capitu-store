import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { CadastrarProdutoComponent } from '../../components/cadastrar-produto/cadastrar-produto.component'
import { PedidoComponent } from '../../components/pedido/pedido.component'

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'cadastrar-produto', component: CadastrarProdutoComponent },
    { path: 'pedido', component: PedidoComponent },
    { path: 'user-profile',   component: UserProfileComponent },
];

