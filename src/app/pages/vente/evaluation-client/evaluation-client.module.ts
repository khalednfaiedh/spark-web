import { ThemeModule } from "../../../@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NbAlertModule, NbDialogModule, NbSelectModule, NbWindowModule } from "@nebular/theme";
import { NgModule } from "@angular/core";
import { ClientEvaluationComponent } from "./client-evaluation/client-evaluation.component";
import { ClientOrderComponent } from "./client-order/client-order.component";
import { EvaluationPercentageClientComponent } from "./evaluation-percentage-client/evaluation-percentage-client.component";
import { ModalEvaluationClientComponent } from "./modal-evaluation-client/modal-evaluation-client.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CritereEvaluationComponent } from './critere-evaluation/critere-evaluation.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { CommonModule } from "@angular/common";
import { ClientModule } from "../../admin/client/client.module";

@NgModule({
  imports: [
    Ng2SmartTableModule,
    ReactiveFormsModule,
    CommonModule,
    ThemeModule,
    NbAlertModule,
    CommonModule,
    ThemeModule,
    NgSelectModule,
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbAlertModule,
    NbSelectModule,
    FormsModule,


  ],
  declarations: [
    ClientEvaluationComponent,
    ClientOrderComponent,
    EvaluationPercentageClientComponent,
    ModalEvaluationClientComponent,
    CritereEvaluationComponent,
  ],
  entryComponents: [

    ModalEvaluationClientComponent,

  ]
})
export class EvaluationClientModule { }