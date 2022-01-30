import { NgModule } from '@angular/core';
import { CrmRouting } from './crm.routing';
import { CrmComponent } from './crm.component';
import { SuperviseComponent } from './supervise/supervise.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { NbListModule, NbProgressBarModule, NbWindowModule, NbPopoverModule, NbDatepickerModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { MiscellaneousModule } from '../miscellaneous/miscellaneous.module';
import { ActionDetailsComponent } from './actions/action-details/action-details.component';
import { AddActionComponent } from './actions/add-action/add-action.component';
import { ConfirmDeleteActionComponent } from './actions/confirm-delete-action/confirm-delete-action.component';
import { ActionsComponent, ButtonViewConsignationComponent } from './actions/actions.component';
import { ActionCalendarComponent } from './actions/action-calendar/action-calendar.component';
import { ActionKanbanComponent } from './actions/action-kanban/action-kanban.component';
import { ActionSearchComponent } from './actions/action-search/action-search.component';
import { AddProspectComponent } from './prospects/add-prospect/add-prospect.component';
import { DeleteProspectComponent } from './prospects/delete-prospect/delete-prospect.component';
import { ProspectDetailsComponent } from './prospects/prospect-details/prospect-details.component';
import { ProspectSearchComponent } from './prospects/prospect-search/prospect-search.component';
import { ButtonViewContact, ProspectsComponent } from './prospects/prospects.component';
import { LeadsComponent } from './leads/leads.component';
import { AddLeadComponent } from './leads/add-lead/add-lead.component';
import { ConfirmDeleteComponent } from './leads/confirm-delete/confirm-delete.component';
import { LeadDetailsComponent } from './leads/lead-details/lead-details.component';
import { LeadKanbanComponent } from './leads/lead-kanban/lead-kanban.component';
import { LeadSearchComponent } from './leads/lead-search/lead-search.component';
import { CalendarComponent } from './leads/calendar/calendar.component';
import { ActionTypePieChartComponent } from './statpage/action-type-pie-chart/action-type-pie-chart.component';
import { UserProfitsComponent } from './statpage/user-profits/user-profits.component';
import { StatpageComponent } from './statpage/statpage.component';
import { ActionPieChartComponent } from './statpage/action-pie-chart/action-pie-chart.component';
import { LeadBarChartComponent } from './statpage/lead-bar-chart/lead-bar-chart.component';
import { ChartModule } from 'angular2-chartjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PlanningComponent } from './planning/planning.component';
import { PopupComponent } from './planning/popup/popup.component';
import { EditAffaireComponent } from './leads/edit-affaire/edit-affaire.component';
import { IpopupComponent } from './leads/edit-affaire/ipopup/ipopup.component';
import { ApopupComponent } from './leads/edit-affaire/apopup/apopup.component';
import { PpopupComponent } from './leads/edit-affaire/ppopup/ppopup.component';
import { NpopupComponent } from './leads/edit-affaire/npopup/npopup.component';
import { ButtonViewActionHistory, ButtonViewCalendrier, ProspecteurComponent } from './prospecteur/prospecteur.component';
import { HistoriqueActionComponent } from './prospecteur/historique-action/historique-action.component';
import { DetailsAffaireComponent } from './leads/details-affaire/details-affaire.component';
import { CalandrierGeneralComponent } from './calandrier-general/calandrier-general.component';
import { ActionShowComponent } from './calandrier-general/action-show/action-show.component';
import { ProspectContactComponent } from './prospects/prospect-contact/prospect-contact.component';
import { ProspecteurCalendrierComponent } from './prospecteur/prospecteur-calendrier/prospecteur-calendrier.component';

@NgModule({
  declarations: [ 
    CrmComponent,
    SuperviseComponent,
// Actions components
    ActionsComponent,
    ActionSearchComponent,
    ActionKanbanComponent,
    ActionCalendarComponent,
    ConfirmDeleteActionComponent,
    ActionDetailsComponent,
    AddActionComponent,
    ButtonViewConsignationComponent,
// All prospect component
    ProspectsComponent,
    ProspectSearchComponent,
    AddProspectComponent,
    ProspectDetailsComponent,
    DeleteProspectComponent,
    ProspectContactComponent,
    ButtonViewContact,
// All affaire component
    LeadsComponent,
    AddLeadComponent,
    ConfirmDeleteComponent,
    LeadDetailsComponent,
    LeadSearchComponent,
    LeadKanbanComponent,
    CalendarComponent,
  //  ButtonEditAffaire,

// All stat components
    StatpageComponent,
    ActionPieChartComponent,
    LeadBarChartComponent,
    UserProfitsComponent,
    ActionTypePieChartComponent,
    PlanningComponent,
    PopupComponent,
    EditAffaireComponent,
    IpopupComponent,
    ApopupComponent,
    PpopupComponent,
    NpopupComponent,
    ProspecteurComponent,
    ButtonViewActionHistory,
    HistoriqueActionComponent,
    DetailsAffaireComponent,
    CalandrierGeneralComponent,
    ActionShowComponent,
    ProspecteurCalendrierComponent,   
    ButtonViewCalendrier
  ],
  imports: [ 
    CrmRouting,
    NgSelectModule, 
    FormsModule,
    ThemeModule,
    MiscellaneousModule,
    NbListModule,
    Ng2SmartTableModule,
    NbProgressBarModule,
    NbWindowModule.forChild(),
    DragDropModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ScrollingModule,
    NbPopoverModule,

    ChartModule,
    NgxEchartsModule,
    NgxChartsModule,
    ECommerceModule
  ],
  entryComponents: [    
    ConfirmDeleteActionComponent,
    ActionDetailsComponent,
    AddActionComponent,
    ButtonViewConsignationComponent,

    ProspectDetailsComponent,
    AddProspectComponent,
    DeleteProspectComponent,
    ProspectContactComponent,
    ButtonViewContact,
    AddLeadComponent,
    ConfirmDeleteComponent,
    LeadDetailsComponent,
    DetailsAffaireComponent,
    EditAffaireComponent,
    PopupComponent,
    IpopupComponent,
    ApopupComponent,
    PpopupComponent,
    NpopupComponent,
    ButtonViewActionHistory,
    HistoriqueActionComponent,
    ActionShowComponent,
    ButtonViewContact,
    ProspecteurCalendrierComponent,
    ButtonViewCalendrier
  ],
  providers: [

  ],
exports: [
  CalendarComponent
]
})
export class CrmModule { }
