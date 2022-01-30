import {RouterModule, Routes} from '@angular/router';
import { CrmComponent} from './crm.component'
import {NgModule} from '@angular/core';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';
import { SuperviseComponent } from './supervise/supervise.component';
// import { LeadsComponent } from './leads/leads.component';
import { ActionsComponent } from './actions/actions.component';
import { ProspectsComponent } from './prospects/prospects.component';
import { StatpageComponent } from './statpage/statpage.component';
import { LeadsComponent } from './leads/leads.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { PlanningComponent } from './planning/planning.component';
import { EditAffaireComponent } from './leads/edit-affaire/edit-affaire.component';
import { ProspecteurComponent } from './prospecteur/prospecteur.component';
import { CalandrierGeneralComponent } from './calandrier-general/calandrier-general.component';
import { ProspecteurCalendrierComponent } from './prospecteur/prospecteur-calendrier/prospecteur-calendrier.component';

const routes: Routes = [{
  path: '',
  component: CrmComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
        path: 'affaire',
        component: LeadsComponent,
      },
      {
        path: 'affaire/edit/:id',
        component: EditAffaireComponent,
      },
      {
        path: 'supervise',
        component:  SuperviseComponent,
      },
      {
        path: 'prospects',
        component: ProspectsComponent,
      },
      {
        path: 'actions',
        component: ActionsComponent,
      },
      {
        path: 'prospecteurs',
        component: ProspecteurComponent,
      },
      {
        path: 'prospecteurs/calendrier',
        component: ProspecteurCalendrierComponent,
      },
      {
        path: 'stats',
        component: StatpageComponent,
      },
      {
        path: 'planning',
        component: PlanningComponent,
      },
      {
        path: 'calandrier',
        component: CalandrierGeneralComponent
      },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      }

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CrmRouting {
}