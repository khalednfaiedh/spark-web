import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { TaxeComponent } from "./taxe/taxe.component";
import { AdminComponent } from "./admin.component";
import { RefreshTaxeComponent } from "./taxe/refresh-taxe/refresh-taxe.component";
import { FormeJuridiqueComponent } from "./forme-juridique/forme-juridique.component";
import { BanqueComponent } from "./banque/banque.component";
import { ClientComponent } from "./client/client.component";
import { RefreshClientComponent } from "./client/refresh-client/refresh-client.component";
import { ProductComponent } from "./product/product.component";
import { FournisseurComponent } from "./fournisseur/fournisseur.component";
import { RefreshProductComponent } from "./product/refresh-product/refresh-product.component";
import { RefreshFournisseurComponent } from "./fournisseur/refresh-fournisseur/refresh-fournisseur.component";
import { UniteMesureComponent } from "./unite-mesure-product/unite-mesure.component";
import { EtapeCommandeComponent } from "../admin/etape-commande/etape-commande.component";
import { ConditionnementEmballageProductComponent } from "./conditionnement-emballage-product/conditionnement-emballage-product.component";
import { FamilleDeProduitComponent } from "./famille-de-produit/famille-de-produit.component";
import { ModalFileComponent } from "./files/modal-file/modal-file.component";
import { ModeDePaiementComponent } from "./mode-de-paiement/mode-de-paiement.component";
import { ConditionDePaiementComponent } from "./condition-de-paiement/condition-de-paiement.component";
import { CategorieClientComponent } from "./categorie-client/categorie-client.component";
import { UniteDeTransactionComponent } from "./unite-de-transaction/unite-de-transaction.component";
import { SiteComponent } from "./entreprise/site/site.component";
import { AtelierComponent } from "./atelier/atelier.component";
import { FournisseurCompteBancaireComponent } from "./fournisseur/compte-bancaire/compte-bancaire.component";
import { MachineComponent } from "./machine/machine.component";
import { CategorieMachineComponent } from "./categorie-machine/categorie-machine.component";
import { FournisseurCategorieComponent } from "./fournisseur-categorie/fournisseur-categorie.component";
import { GrilleTarifsComponent } from "./grille-tarifs/grille-tarifs.component";


const routes: Routes = [{
    path: '',
    component: AdminComponent,
    children: [
        {
            path: 'banque',
            component: BanqueComponent,
        },
        {
            path: 'client',
            component: ClientComponent,
        },
        {
            path: 'categorieClient',
            component: CategorieClientComponent,
        },
        {
            path: 'refreshClient',
            component: RefreshClientComponent,
        },
        {
            path: 'conditionnementEmballage',
            component: ConditionnementEmballageProductComponent,
        },
        {
            path: 'etapeCommande',
            component: EtapeCommandeComponent,
        },
        {
            path: 'familleDeProduit',
            component: FamilleDeProduitComponent,
        },
        {
            path: 'file',
            component: ModalFileComponent,
        },
        {
            path: 'formeJuridique',
            component: FormeJuridiqueComponent,
        },
        {
            path: 'fournisseur',
            component: FournisseurComponent,
        },
        {
            path: 'fournisseur-categorie',
            component: FournisseurCategorieComponent,
        },
        {
            path: 'fournisseur/banque',
            component: FournisseurCompteBancaireComponent,
        },
        {
            path: 'refreshFournisseur',
            component: RefreshFournisseurComponent,
        },
        {
            path: 'product',
            component: ProductComponent,
        },
        {
            path: 'refreshProduct',
            component: RefreshProductComponent,
        },
        {
            path: 'uniteMesure',
            component: UniteMesureComponent,
        },
        {
            path: 'taxe',
            component: TaxeComponent,
        },
        {
            path: 'refreshtaxe',
            component: RefreshTaxeComponent,
        },
        {
            path: 'modeDePaiement',
            component: ModeDePaiementComponent,
        },
        {
            path: 'conditionDePaiement',
            component: ConditionDePaiementComponent,
        },
        {
            path: 'forme-juridique',
            component: FormeJuridiqueComponent,
        },
        {
            path: 'unite-de-transaction',
            component: UniteDeTransactionComponent,
        },
        {
            path: 'atelier',
            component: AtelierComponent,
        },
        {
            path: 'machine',
            component: MachineComponent,
        },
        {
            path: 'categorieMachine',
            component: CategorieMachineComponent,
        },
        {
            path: 'grilleTarifs',
            component: GrilleTarifsComponent,
        },

    ]
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {
}