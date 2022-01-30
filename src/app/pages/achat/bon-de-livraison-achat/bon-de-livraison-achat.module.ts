import { NgxEchartsModule } from "ngx-echarts";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NbDialogModule, NbWindowModule } from "@nebular/theme";
import { ThemeModule } from "../../../@theme/theme.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BonDeLivraisonAchatComponent } from "./bon-de-livraison-achat.component";
import { ModalBonDeLivraisonAchatComponent } from "./modal-bon-de-livraison-achat/modal-bon-de-livraison-achat.component";
import { ShowBonDeLivraisonAchatComponent } from "./show-bon-de-livraison-achat/show-bon-de-livraison-achat.component";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
    imports: [
        CommonModule,
        ThemeModule,
        NgxEchartsModule,
        Ng2SmartTableModule,
        NbDialogModule.forChild(),
        NbWindowModule.forChild(),
        NgSelectModule,
    ],
    declarations: [
      BonDeLivraisonAchatComponent,
      ModalBonDeLivraisonAchatComponent,
      ShowBonDeLivraisonAchatComponent,
    ],
    entryComponents: [
      ModalBonDeLivraisonAchatComponent,
      ShowBonDeLivraisonAchatComponent,
    ],
})
export class BonDeLivraisonAchatModule { }