import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ParametreComponent } from './parametre/parametre.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
   
    {
       path: '',
       redirectTo: 'admin/entreprise',
       pathMatch: 'full',
      
    },
    {
      path: 'parametre',
      component: ParametreComponent,
    },
    {
      path: "utilisateur",
      loadChildren:  './utilisateur/utilisateur.module#UtilisateurModule'
    },
    {
      path: 'achat',
      loadChildren: './achat/achat.module#AchatModule',
    },
    {
      path: 'stock',
      loadChildren: './stock/stock.module#StockModule',
    },
    {
      path: 'vente',
      loadChildren: './vente/vente.module#VenteModule',
    },
    {
      path:'admin',
      loadChildren: './admin/admin.module#AdminModule',
    },
    {
      path: 'rh',
      loadChildren: './rh/employe.module#EmployeModule',
    },

    {
      path: 'parametrage',
      loadChildren: './rh-parametrage/parametrage.module#ParametrageModule',
    },
    {
      path: 'admin',
      loadChildren: './admin/entreprise/entreprise.module#EntrepriseModule',
    },
    {  
      path:'comptabilite',             
      loadChildren: './spark-comptabilite/spark-comptabilite.module#SparkComptabiliteModule',
    },
    {  
      path:'gpao',
      loadChildren: './gpao/gpao.module#GPAOModule',
    },
    {
      path: 'crm',
      loadChildren: './crm/crm.module#CrmModule',
    }, 
    {
      path: '**',
      component: NotFoundComponent,
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 
 

})
export class PagesRoutingModule {
}
