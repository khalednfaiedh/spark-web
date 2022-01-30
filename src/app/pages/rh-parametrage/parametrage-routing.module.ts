import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import { ParametrageComponent } from './parametrage.component';
import {TypePrimeComponent} from './type-prime/type-prime.component';
import {RubriqueComponent} from './rubrique/rubrique.component';
import { AbattementComponent } from './abattement/abattement.component';
import { IrppComponent } from './irpp/irpp.component';
import { TypeCongeComponent } from './type-conge/type-conge.component';
import { JourFerieComponent } from './jour-ferie/jour-ferie.component';
import { CategorieComponent } from './categorie/categorie.component';
import { RegimeHoraireComponent } from './regime-horaire/regime-horaire.component';


const routes: Routes = [{
  path: '',
  component: ParametrageComponent,
  children: [
    {
      path: 'primes',
      component: TypePrimeComponent,
    },

    {
      path: 'impots',
      component: RubriqueComponent,
    },
    {
      path: 'abattement',
      component: AbattementComponent,
    },
    // {
    //   path: 'regimeEntreprise',
    //   component: RegimeEntrepriseComponent,
    // },
    {
      path: 'regime',
      component: RegimeHoraireComponent,
    },
    {
      path: 'irpp',
      component: IrppComponent,
    },
    {
      path: 'conge',
      component: TypeCongeComponent,
    },
    {
      path: 'joursferie',
      component: JourFerieComponent,
    },
    {
      path: 'categorie',
      component: CategorieComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ParametrageRoutingModule {
}
