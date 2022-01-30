import { NbWindowModule, NbCalendarModule, NbAccordionModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { EntrepriseRoutingModule } from './entreprise-routing';
import { ModalEntrepriseComponent } from './list-entreprise/modal-entreprise/modal-entreprise.component';
import { ShowEntrepriseComponent } from './list-entreprise/show-entreprise/show-entreprise.component';
import { ButtonViewComponent, ListEntrepriseComponent, ButtonViewCompteComponent } from './list-entreprise/list-entreprise.component';
import { EntrepriseComponent } from './entreprise.component';
import { CompteBancaireComponent } from './compte-bancaire/compte-bancaire.component';
import { AddCompteComponent } from './compte-bancaire/add-compte/add-compte.component';
import { ShowCompteComponent } from './compte-bancaire/show-compte/show-compte.component';
import { SiteComponent } from './site/site.component';
import { ModalSiteComponent } from './site/modal-site/modal-site.component';
import { EntrepriseService } from './entreprise.service';


@NgModule({
    imports: [
      ThemeModule,
      EntrepriseRoutingModule,
      Ng2SmartTableModule,
      NbWindowModule.forChild(),
      NgSelectModule,
      NbCalendarModule,
      NbAccordionModule
    ],
    declarations: [
        EntrepriseComponent,
        ListEntrepriseComponent,
        ModalEntrepriseComponent,
        ShowEntrepriseComponent,
        ButtonViewComponent,
        CompteBancaireComponent,
        AddCompteComponent,
        ShowCompteComponent,
        ButtonViewCompteComponent,
        SiteComponent,
        ModalSiteComponent
  ],
    
    entryComponents: [    
        ModalEntrepriseComponent,
        ShowEntrepriseComponent,
        AddCompteComponent,
        ShowCompteComponent,
        ButtonViewComponent,
        ButtonViewCompteComponent,
        ModalSiteComponent
    ],
    providers: [
    
    ],
  })
  
  export class EntrepriseModule { }