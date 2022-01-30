import { NbWindowModule, NbCalendarModule, NbAccordionModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaiementListComponent } from './paiement-list/paiement-list.component';
import { PaiementComponent } from './paiement.component';
import { PaiementRoutingModule } from './paiement-routing.module';
import { ChequeComponent } from './type-payement/cheque/cheque.component';
import { EspeceComponent } from './type-payement/espece/espece.component';
import { VirementComponent } from './type-payement/virement/virement.component';
import { TypePayementComponent } from './type-payement/type-payement.component';
import { ShowVirementComponent } from './paiement-list/show-virement/show-virement.component';

@NgModule({
    imports: [
      ThemeModule,
      PaiementRoutingModule,
      Ng2SmartTableModule,
      NbWindowModule.forChild(),
      NgSelectModule,
      NbCalendarModule,
      NbAccordionModule
    ],
    declarations: [
    PaiementComponent,
    PaiementListComponent,
    ChequeComponent,
    EspeceComponent,
    VirementComponent,
    TypePayementComponent,
    ShowVirementComponent
  ],
    
    entryComponents: [    
      TypePayementComponent,
      ShowVirementComponent
    ],
    providers: [

    ],
  })
  
  export class PaiementModule { }