import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';

import { PaiementComponent } from './paiement.component';
import { PaiementListComponent } from './paiement-list/paiement-list.component';
import { ChequeComponent } from './type-payement/cheque/cheque.component';
import { EspeceComponent } from './type-payement/espece/espece.component';
import { VirementComponent } from './type-payement/virement/virement.component';

const routes: Routes = [{
  path: '',
  component: PaiementComponent,
  children: [
    {
      path: '',
      component: PaiementListComponent,
    },
    {
      path:'cheque',
      component: ChequeComponent,
    },    {
      path:'espece',
      component: EspeceComponent,
    },  
    {
      path:'virement',
      component: VirementComponent,
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PaiementRoutingModule {
}
