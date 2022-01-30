import { NbWindowModule, NbCalendarModule, NbAccordionModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ParametrageRoutingModule } from './parametrage-routing.module';
import { ParametrageComponent } from './parametrage.component';
import { TypePrimeComponent } from './type-prime/type-prime.component';
import { RubriqueComponent } from './rubrique/rubrique.component';
import { AbattementComponent } from './abattement/abattement.component';
import { IrppComponent } from './irpp/irpp.component';
import { TypeCongeComponent } from './type-conge/type-conge.component';
import { JourFerieComponent } from './jour-ferie/jour-ferie.component';
import { AddJoursFeriesComponent } from './jour-ferie/add-jours-feries/add-jours-feries.component';
import { CategorieComponent, ButtonViewCNSSComponent } from './categorie/categorie.component';
import { AddCategorieComponent } from './categorie/add-categorie/add-categorie.component';
import { ChargesCnssComponent } from './categorie/charges-cnss/charges-cnss.component';
import { RegimeHoraireComponent } from './regime-horaire/regime-horaire.component';
import { AddRegimeHoraireComponent } from './regime-horaire/add-regime-horaire/add-regime-horaire.component';

@NgModule({
    imports: [
      ThemeModule,
      ParametrageRoutingModule,
      Ng2SmartTableModule,
      NbWindowModule.forChild(),
      NgSelectModule,
      NbCalendarModule,
      NbAccordionModule
    ],
    declarations: [
      ParametrageComponent,
      TypePrimeComponent,
      RubriqueComponent,
      AbattementComponent,

      IrppComponent,
      TypeCongeComponent,
      JourFerieComponent,
      AddJoursFeriesComponent,
      CategorieComponent,
      AddCategorieComponent,
      ChargesCnssComponent,
      ButtonViewCNSSComponent,
      RegimeHoraireComponent,
      AddRegimeHoraireComponent
    ],
    entryComponents: [
      AddJoursFeriesComponent,
      AddCategorieComponent,
      ButtonViewCNSSComponent,
      ChargesCnssComponent,
      AddRegimeHoraireComponent,
      
    ],
    providers: [

    ],
  })
  
  export class ParametrageModule { }