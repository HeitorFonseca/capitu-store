import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { Ng2ImgMaxModule } from 'ng2-img-max';


import { CadastrarProdutoComponent } from '../../components/cadastrar-produto/cadastrar-produto.component'
import { PedidoComponent } from '../../components/pedido/pedido.component'
import { ProdutosComponent  } from '../../components/produtos/produtos.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    Ng2AutoCompleteModule,
    Ng2ImgMaxModule,
    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    CadastrarProdutoComponent,
    PedidoComponent,
    ProdutosComponent
  ]
})

export class AdminLayoutModule {}
