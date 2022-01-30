import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { ThemeModule } from "../../@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NbBadgeModule, NbDialogModule, NbWindowModule } from "@nebular/theme";
import { StockComponent } from "./stock.component";
import { NgModule } from "@angular/core";
import { StockRoutingModule } from "./stock-routing.module";
import { MagasinModule } from "./magasin/magasin.module";
import { EmplacementModule } from "./emplacement/emplacement.module";
import { PersonnelModule } from "./personnel/personnel.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { RapportComponent } from "./rapport/rapport.component";
import { ModalRapportComponent } from "./rapport/modal-rapport/modal-rapport.component";
import { ShowRapportComponent } from "./rapport/show-rapport/show-rapport.component";
import { CritereQualiteComponent } from "./critere-qualite/critere-qualite.component";
import { InventaireComponent } from "./inventaire/inventaire.component";
import { StockInputComponent } from './stock-input/stock-input.component';
import { StockOutputComponent } from './stock-output/stock-output.component';
import { StockEtatComponent } from './stock-etat/stock-etat.component';
import { PopubBlComponent } from './stock-input/popub-bl/popub-bl.component';
import { PopupReclamationComponent } from './stock-input/popup-reclamation/popup-reclamation.component';
import { PopupProdComponent } from './stock-input/popup-prod/popup-prod.component';
import { PopupBlVenteComponent } from './stock-output/popup-bl-vente/popup-bl-vente.component';
import { ProduitParamComponent } from './produit-param/produit-param.component';
import { PopupParamComponent } from './produit-param/popup-param/popup-param.component';
import { PopupDemandeGpaoComponent } from './stock-output/popup-demande-gpao/popup-demande-gpao.component';
import { TransfertPopupComponent } from './stock-etat/transfert-popup/transfert-popup.component';
import { MouvementComponent } from './mouvement/mouvement.component';
import { MouvementPopupComponent } from './mouvement/mouvement-popup/mouvement-popup.component';
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
    declarations: [
        StockComponent,
        RapportComponent,
        ModalRapportComponent,
        ShowRapportComponent,
        CritereQualiteComponent,
        InventaireComponent,
        StockInputComponent,
        StockOutputComponent,
        StockEtatComponent,
        PopubBlComponent,
        PopupReclamationComponent,
        PopupProdComponent,
        PopupBlVenteComponent,
        ProduitParamComponent,
        PopupParamComponent,
        PopupDemandeGpaoComponent,
        TransfertPopupComponent,
        MouvementComponent,
        MouvementPopupComponent,
    ],
    imports: [
        CommonModule,
        ThemeModule,
        Ng2SmartTableModule,
        NbDialogModule.forChild(),
        NbWindowModule.forChild(),
        TranslateModule,
        NgSelectModule,
        StockRoutingModule,
        MagasinModule,
        EmplacementModule,
        PersonnelModule,
        NbBadgeModule,
        NgxCurrencyModule

    ],
    exports: [
        TranslateModule,
    ],
    entryComponents: [
        ModalRapportComponent,
        ShowRapportComponent,
        PopubBlComponent,
        PopupReclamationComponent,
        PopupProdComponent,
        PopupBlVenteComponent,
        PopupParamComponent,
        PopupDemandeGpaoComponent,
        TransfertPopupComponent,
        MouvementPopupComponent
    ],
    providers: []
})
export class StockModule { }