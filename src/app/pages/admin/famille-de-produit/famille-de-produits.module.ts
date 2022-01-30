import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThemeModule } from "../../../@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NbDialogModule, NbWindowModule } from "@nebular/theme";
import { TranslateModule } from "@ngx-translate/core";
import { FamilleDeProduitComponent } from "./famille-de-produit.component";
import { ModalFamilleDeProduitComponent } from "./modal-famille-de-produit/modal-famille-de-produit.component";
import { ShowFamilleDeProduitComponent } from "./show-famille-de-produit/show-famille-de-produit.component";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
    declarations: [
        FamilleDeProduitComponent,
        ModalFamilleDeProduitComponent,
        ShowFamilleDeProduitComponent,
    ],
    imports: [
      CommonModule,
      ThemeModule,
      Ng2SmartTableModule,
      NbDialogModule.forChild(),
      NbWindowModule.forChild(),
      TranslateModule,
      NgSelectModule,
    ],
    exports:[
      TranslateModule,
    ],
    entryComponents: [
        ModalFamilleDeProduitComponent,
        ShowFamilleDeProduitComponent,
    ],
  })
  export class FamilleDeProduitModule { }