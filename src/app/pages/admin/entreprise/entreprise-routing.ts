import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import { EntrepriseComponent } from './entreprise.component';
import { ListEntrepriseComponent } from './list-entreprise/list-entreprise.component';
import { CompteBancaireComponent } from './compte-bancaire/compte-bancaire.component';
import { SiteComponent } from './site/site.component';

const routes: Routes = [{
  path: '',
  component: EntrepriseComponent,
  children: [
     
    {
      path:'entreprise',
      component: ListEntrepriseComponent,
    },
    {
      path:'entreprise/compte-bancaire',
      component: CompteBancaireComponent,
    },
    {
      path:'entreprise/site',
      component:SiteComponent
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class EntrepriseRoutingModule {
}
