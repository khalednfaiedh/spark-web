import { RouterModule, Routes } from '@angular/router';
import { EmployeComponent } from './employe.component';
import { ContratComponent } from './contrat/contrat.component';
import { PrimeComponent } from './prime/prime.component';
import { NgModule } from '@angular/core';
import { EmployeListComponent } from '../admin/employe-list/employe-list.component';
import { EmployeEnfantComponent } from './employe-enfant/employe-enfant.component';
import { AvanceComponent } from './avance/avance.component';
import { AvanceMensComponent } from './avance-mens/avance-mens.component';
import { FichePaieComponent } from './fiche-paie/fiche-paie.component';
import { ImputationComponent } from './imputation/imputation.component';
import { CongeComponent } from './conge/conge.component';
import { JournalPaieComponent } from './journal-paie/journal-paie.component';
import { DeclarationCNSSComponent } from './declaration-cnss/declaration-cnss.component';
import { PaieComponent } from './paie/paie.component';
import { DeductionLogementComponent } from './contrat/deduction-logement/deduction-logement.component';
import { SoldeToutCompteComponent } from './fiche-paie/solde-tout-compte/solde-tout-compte.component';

const routes: Routes = [{

  path: '',
  component: EmployeComponent,
  children: [
    {
      path: 'contrat',
      component: ContratComponent,
    },
    {
      path: 'employe',
      component: EmployeListComponent,
    },
    {
      path: 'prime',
      component: PrimeComponent,
    },
    {
      path: 'pret',
      component: AvanceComponent,
    },
    {
      path: 'avance',
      component: AvanceMensComponent,
    },

    {
      path: 'enfant',
      component: EmployeEnfantComponent,
    },
    {
      path: 'deduction',
      component: DeductionLogementComponent,
    },
    {
      path: 'imputation',
      component: ImputationComponent,
    },
    {
      path: 'conge',
      component: CongeComponent,
    },
    {
      path: 'fichePaie',
      component: FichePaieComponent,
    },
    {
      path: 'paie',
      component: PaieComponent,
    },
    {
      path: 'journalPaie',
      component: JournalPaieComponent,
    },
    {
      path: 'declarationCNSS',
      component: DeclarationCNSSComponent,
    },
    {
      path: 'soldetoutcompte',
      component: SoldeToutCompteComponent,
    },

    {
      path: 'paiement',
      loadChildren: './paiement/paiement.module#PaiementModule',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class EmployeRoutingModule {
}
