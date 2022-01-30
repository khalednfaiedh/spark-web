import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { EmployeComponent } from './employe.component';
import { FormEmployeComponent } from '../admin/employe-list/form-employe/form-employe.component';
import { FormContratComponent } from './contrat/form-contrat/form-contrat.component';
import { ButtonViewPrimeComponent, ContratComponent, ButtonViewAvanceMensComponent, ButtonViewPretComponent, ButtonViewDeductionLogementComponent } from './contrat/contrat.component';
import { PrimeComponent } from './prime/prime.component';
import { EmployeRoutingModule } from './employe-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonViewComponent, EmployeListComponent, ButtonView2Component, ButtonView3Component } from '../admin/employe-list/employe-list.component';
import { NbWindowModule } from '@nebular/theme';
import { ShowEmployeComponent } from '../admin/employe-list/show-employe/show-employe.component';
import { RefreshContratComponent } from './contrat/refresh-contrat/refresh-contrat.component';
import { ShowContratComponent } from './contrat/show-contrat/show-contrat.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalPrimeComponent } from './prime/modal-prime/modal-prime.component';
import { EmployeEnfantComponent } from './employe-enfant/employe-enfant.component';
import { AvanceComponent } from './avance/avance.component';
import { FormAvanceComponent } from './avance/form-avance/form-avance.component';
import { AvanceMensComponent } from './avance-mens/avance-mens.component';
import { FormAvanceMensComponent } from './avance-mens/form-avance-mens/form-avance-mens.component';
import { ImputationComponent } from './imputation/imputation.component';
import { ModalImputationComponent } from './imputation/modal-imputation-mensuelle/modal-imputation.component';
import { ModalImputationHeureComponent } from './imputation/modal-imputation-heure/modal-imputation-heure.component';
import { GenerateOneComponent } from './fiche-paie/generate-one/generate-one.component';
import { GenerateAllComponent } from './fiche-paie/generate-all/generate-all.component';
import { ShowFicheComponent } from './fiche-paie/show-fiche/show-fiche.component';
import { FichePaieComponent } from './fiche-paie/fiche-paie.component';
import { CongeComponent, ButtonDemandeCongeComponent, ButtonSuivieCongeComponent } from './conge/conge.component';
import { AddCongeComponent } from './conge/add-conge/add-conge.component';
import { SuivieCongeComponent } from './conge/suivie-conge/suivie-conge.component';
import { GestionDesCongesComponent } from './conge/gestion-des-conges/gestion-des-conges.component';
import { JournalPaieComponent } from './journal-paie/journal-paie.component';
import { DeclarationCNSSComponent } from './declaration-cnss/declaration-cnss.component';
import { RecapCNSSComponent } from './declaration-cnss/recap-cnss/recap-cnss.component';
import { PaieComponent } from './paie/paie.component';
import { MoisComponent } from './paie/mois/mois.component';
import { ClotureComponent } from './fiche-paie/cloture/cloture.component';
import { PopupComponent } from './fiche-paie/popup/popup.component';
import { DeductionLogementComponent } from './contrat/deduction-logement/deduction-logement.component';
import { FormDeductionComponent } from './contrat/deduction-logement/form-deduction/form-deduction.component';
import { CongePayerComponent } from './fiche-paie/conge-payer/conge-payer.component';
import { SoldeToutCompteComponent } from './fiche-paie/solde-tout-compte/solde-tout-compte.component';
import { ViewSoldeToutCompteComponent } from './fiche-paie/solde-tout-compte/view-solde-tout-compte/view-solde-tout-compte.component';
import { AddSoldeToutCompteComponent } from './fiche-paie/solde-tout-compte/add-solde-tout-compte/add-solde-tout-compte.component';
import { PaiementModule } from './paiement/paiement.module';
import { PopupSendEmailComponent } from './declaration-cnss/popup-send-email/popup-send-email.component';
// import { EspeceComponent } from './journal-paie/type-payement/espece/espece.component';
// import { TypePayementComponent } from './journal-paie/type-payement/type-payement.component';
// import { ChequeComponent } from './journal-paie/type-payement/cheque/cheque.component';
// import { VirementComponent } from './journal-paie/type-payement/virement/virement.component';



@NgModule({
  imports: [
    ThemeModule,
    EmployeRoutingModule,
    Ng2SmartTableModule,
    NbWindowModule.forChild(),
    NgSelectModule,
    PaiementModule
  ],
  declarations: [
    ImputationComponent,
    ModalImputationComponent,
    ModalImputationHeureComponent,
    GenerateOneComponent,
    GenerateAllComponent,
    ShowFicheComponent,
    FichePaieComponent,
    EmployeComponent,
    FormEmployeComponent,
    FormContratComponent,
    ContratComponent,
    PrimeComponent,
    EmployeListComponent,
    ButtonViewComponent,
    ButtonView2Component,
    ButtonView3Component,
    ButtonViewPrimeComponent,
    ButtonViewPretComponent,
    ButtonViewAvanceMensComponent,
    ShowEmployeComponent,
    RefreshContratComponent,
    ShowContratComponent,
    ModalPrimeComponent,
    EmployeEnfantComponent,
    AvanceComponent,
    FormAvanceComponent,
    FormAvanceMensComponent,
    AvanceMensComponent,
    CongeComponent,
    AddCongeComponent,
    ButtonDemandeCongeComponent,
    ButtonSuivieCongeComponent,
    SuivieCongeComponent,
    GestionDesCongesComponent,
    JournalPaieComponent,
    DeclarationCNSSComponent,
    RecapCNSSComponent,
    PaieComponent,
    MoisComponent,
    ClotureComponent,
    PopupComponent,
    DeductionLogementComponent,
    ButtonViewDeductionLogementComponent,
    FormDeductionComponent,
    CongePayerComponent,
    SoldeToutCompteComponent,
    ViewSoldeToutCompteComponent,
    AddSoldeToutCompteComponent,
    PopupSendEmailComponent,
    // TypePayementComponent,
    // ChequeComponent,
    // VirementComponent,
    // EspeceComponent,
    
    
  ],
  entryComponents: [
    FormEmployeComponent,
    FormContratComponent,
    ButtonViewComponent,
    ShowContratComponent,
    ButtonView2Component,
    ButtonView3Component,
    ButtonViewPrimeComponent,
    ButtonViewPretComponent,
    ButtonViewAvanceMensComponent,
    ShowEmployeComponent,
    ModalPrimeComponent,
    EmployeEnfantComponent,
    FormAvanceMensComponent,
    FormAvanceComponent,
    ModalImputationComponent,
    ModalImputationHeureComponent,
    GenerateOneComponent,
    GenerateAllComponent,
    ShowFicheComponent,
    ButtonDemandeCongeComponent,
    AddCongeComponent,
    ButtonSuivieCongeComponent,
    SuivieCongeComponent,
    GestionDesCongesComponent,
    RecapCNSSComponent,
    MoisComponent,
    ClotureComponent,
    PopupComponent,
    ButtonViewDeductionLogementComponent,
    DeductionLogementComponent,
    FormDeductionComponent,
    CongePayerComponent,
    ViewSoldeToutCompteComponent,
    AddSoldeToutCompteComponent,
    PopupSendEmailComponent
    // TypePayementComponent,
    // EspeceComponent
  ],
  providers: [
  ],
})

export class EmployeModule { }