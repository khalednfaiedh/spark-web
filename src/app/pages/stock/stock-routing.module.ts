import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { StockComponent } from "./stock.component";
import { MagasinComponent } from "./magasin/magasin.component";
import { RefrechMagasinComponent } from "./magasin/refrech-magasin/refrech-magasin.component";
import { RefreshEmplacementComponent } from "./emplacement/refresh-emplacement/refresh-emplacement.component";
import { EmplacementComponent } from "./emplacement/emplacement.component";
import { PersonnelComponent } from "./personnel/personnel.component";
import { RefrechPersonnelComponent } from "./personnel/refrech-personnel/refrech-personnel.component";
import { CritereQualiteComponent } from "./critere-qualite/critere-qualite.component";
import { InventaireComponent } from "./inventaire/inventaire.component";
import { RapportComponent } from "./rapport/rapport.component";
import { StockInputComponent } from "./stock-input/stock-input.component";
import { StockOutputComponent } from "./stock-output/stock-output.component";
import { StockEtatComponent } from "./stock-etat/stock-etat.component";
import { ProduitParamComponent } from "./produit-param/produit-param.component";
import { MouvementComponent } from "./mouvement/mouvement.component";

const routes: Routes = [{
    path: '',
    component: StockComponent,
    children: [
       
          {
            path: '',
            redirectTo: 'dashbord',
            pathMatch: 'full',
          },
          {
            path: 'magasin',
            component: MagasinComponent,
          },
          {
            path: 'critereQualite',
            component: CritereQualiteComponent,
          },
          {
            path: 'inventaire',
            component: InventaireComponent,
          },
          {
            path: 'refreshMagasin',
            component: RefrechMagasinComponent,
          },
          {
            path: 'refreshEmplacement',
            component: RefreshEmplacementComponent,
          },
          {
            path: 'emplacement',
            component: EmplacementComponent,
          },
          {
            path: 'personnel',
            component: PersonnelComponent,
          },
          {
            path: 'refreshPersonnel',
            component: RefrechPersonnelComponent,
          },
          {
            path: 'mouvement',
            component: MouvementComponent,
          },
        
          {
            path: 'rapport',
            component: RapportComponent,
          },
          {
            path: 'entrees',
            component: StockInputComponent,
          },
          {
            path: 'sorties',
            component: StockOutputComponent,
          },
          {
            path: 'transfert',
            component: StockEtatComponent,
          },
          {
            path: 'produit',
            component: ProduitParamComponent,
          },
    ]
}];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StockRoutingModule {
}