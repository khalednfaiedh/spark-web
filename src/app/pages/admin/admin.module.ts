import { TranslateModule } from "@ngx-translate/core";
import { NbWindowModule, NbDialogModule } from "@nebular/theme";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../../@theme/theme.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdminComponent } from "./admin.component";
import { ProductModule } from "./product/product.module";
import { FournisseurModule } from "./fournisseur/fournisseur.module";
import { TaxeModule } from "./taxe/taxe.module";
import { BanqueComponent } from "./banque/banque.component";
import { ClientModule } from "./client/client.module";
import { FamilleDeProduitModule } from "./famille-de-produit/famille-de-produits.module";
import { FormeJuridiqueComponent } from "./forme-juridique/forme-juridique.component";
import { UniteMesureComponent } from "./unite-mesure-product/unite-mesure.component";
import { ConditionnementEmballageProductComponent } from "./conditionnement-emballage-product/conditionnement-emballage-product.component";
import { FilesModule } from "./files/files.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { EtapeCommandeComponent } from "./etape-commande/etape-commande.component";
import { ModalContratClientComponent } from "../vente/contrat-client/modal-contrat-client/modal-contrat-client.component";
import { ConditionDePaiementComponent } from './condition-de-paiement/condition-de-paiement.component';
import { UniteDeTransactionComponent } from './unite-de-transaction/unite-de-transaction.component';
import { CategorieClientComponent } from './categorie-client/categorie-client.component';
import { ModalCategorieClientComponent } from './categorie-client/modal-categorie-client/modal-categorie-client.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { AtelierComponent, ButtonIlot } from './atelier/atelier.component';
import { ModalAtelierComponent } from './atelier/modal-atelier/modal-atelier.component';
import { FournisseurCategorieComponent } from './fournisseur-categorie/fournisseur-categorie.component';
import { ModeDePaiementComponent } from "./mode-de-paiement/mode-de-paiement.component";
import { MachineComponent } from './machine/machine.component';
import { ModalMachineComponent } from './machine/modal-machine/modal-machine.component';
import { ShowMachineComponent } from './machine/show-machine/show-machine.component';
import { CategorieMachineComponent } from './categorie-machine/categorie-machine.component';
import { ModalCategorieMachineComponent } from './categorie-machine/modal-categorie-machine/modal-categorie-machine.component';
import { ShowCategorieMachineComponent } from './categorie-machine/show-categorie-machine/show-categorie-machine.component';
import { ModalConditionDePaiementComponent } from "./condition-de-paiement/modal-condition-de-paiement/modal-condition-de-paiement.component";

import { GrilleTarifsComponent } from './grille-tarifs/grille-tarifs.component';
import { ShowCategorieClientComponent } from './categorie-client/show-categorie-client/show-categorie-client.component';
import { ShowConditionDePaiementComponent } from "./condition-de-paiement/show-condition-de-paiement/show-condition-de-paiement.component";
import { CaracteristiqueEmballageComponent } from './caracteristique-emballage/caracteristique-emballage.component';

import { ModalFourniseurCategorieComponent } from './fournisseur-categorie/modal-fourniseur-categorie/modal-fourniseur-categorie.component';
import { ModalUniteTransactionComponent } from './unite-de-transaction/modal-unite-transaction/modal-unite-transaction.component';
import { NgxCurrencyModule } from "ngx-currency";


@NgModule({
  declarations: [
    ModeDePaiementComponent,
    AdminComponent,
    BanqueComponent,
    FormeJuridiqueComponent,
    UniteMesureComponent,
    ConditionnementEmballageProductComponent,
    EtapeCommandeComponent,
    ConditionDePaiementComponent,
    UniteDeTransactionComponent,
    CategorieClientComponent,
    ModalCategorieClientComponent,
    AtelierComponent,
    ModalAtelierComponent,
    ButtonIlot,
    MachineComponent,
    ModalMachineComponent,
    ShowMachineComponent,
    CategorieMachineComponent,
    ModalCategorieMachineComponent,
    ShowCategorieMachineComponent,
    FournisseurCategorieComponent,
    ModalConditionDePaiementComponent,

    ModalFourniseurCategorieComponent,
    GrilleTarifsComponent,
    ShowCategorieClientComponent,
    ShowConditionDePaiementComponent,
    CaracteristiqueEmballageComponent,
    ModalUniteTransactionComponent

  ],
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    TranslateModule,
    AdminRoutingModule,
    ClientModule,
    FamilleDeProduitModule,
    FilesModule,
    FournisseurModule,
    ProductModule,
    TaxeModule,
    NgSelectModule,
    NgxCurrencyModule,

  ],
  exports: [
    TranslateModule,

  ],
  entryComponents: [
    ModalContratClientComponent,
    ModalCategorieClientComponent,
    ModalAtelierComponent,
    ButtonIlot,
    ModalConditionDePaiementComponent,
    ShowCategorieMachineComponent,
    ModalMachineComponent,
    ShowMachineComponent,

    ShowCategorieClientComponent,
    ShowConditionDePaiementComponent,
    CaracteristiqueEmballageComponent,

    ModalCategorieMachineComponent,
    ModalFourniseurCategorieComponent,
    ModalUniteTransactionComponent


  ],
  providers: []
})
export class AdminModule { }