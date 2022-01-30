import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ClientComponent,
  ButtonViewAdresseComponent,
  ButtonViewCoordonneesComponent
} from './client.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { ModalClientComponent } from './modal-client/modal-client.component';
import { RefreshClientComponent } from './refresh-client/refresh-client.component';
import { ShowClientComponent } from './show-client/show-client.component';
import { ContactClientComponent } from './contact-client/contact-client.component';
import { AdresseLivraisonClientComponent } from './adresse-livraison-client/adresse-livraison-client.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoordonnesBancaireClientComponent } from './coordonnes-bancaire-client/coordonnes-bancaire-client.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { ContratClientModule } from '../../vente/contrat-client/contrat-client.module';
import { SelectModule } from '../../vente/select/select.module';
import { ShowContactClientComponent } from './contact-client/show-contact-client/show-contact-client.component';
import { ShowAdresseLivraisonClientComponent } from './adresse-livraison-client/show-adresse-livraison-client/show-adresse-livraison-client.component';
import { ShowCoordonnesBancaireClientComponent } from './coordonnes-bancaire-client/show-coordonnes-bancaire-client/show-coordonnes-bancaire-client.component';
import { ModalCoordonneBancaireClientComponent } from './coordonnes-bancaire-client/modal-coordonne-bancaire-client/modal-coordonne-bancaire-client.component';




@NgModule({
  imports: [
    ThemeModule,
    NgSelectModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    ContratClientModule,
    SelectModule,
    ContratClientModule,
  ],
  declarations: [
    ClientComponent,
    ModalClientComponent,
    RefreshClientComponent,
    ShowClientComponent,
    ButtonViewAdresseComponent,
    ButtonViewCoordonneesComponent,
    ContactClientComponent,
    AdresseLivraisonClientComponent,
    CoordonnesBancaireClientComponent,
    ShowContactClientComponent,
    ShowAdresseLivraisonClientComponent,
    ShowCoordonnesBancaireClientComponent,
    ModalCoordonneBancaireClientComponent,

  ],
  entryComponents: [
    ModalClientComponent,
    ShowClientComponent,
    ButtonViewAdresseComponent,
    ButtonViewCoordonneesComponent,
    ContactClientComponent,
    AdresseLivraisonClientComponent,
    CoordonnesBancaireClientComponent,

  ],
  exports: [
    ShowClientComponent,
    ShowContactClientComponent,
    ShowAdresseLivraisonClientComponent,
    ShowCoordonnesBancaireClientComponent,
  ],

})
export class ClientModule { }
