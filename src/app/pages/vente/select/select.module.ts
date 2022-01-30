import { CommonModule } from "@angular/common";
import { ThemeModule } from "../../../@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgModule } from "@angular/core";
import { NbWindowModule, NbDialogModule } from "@nebular/theme";
import { NgSelectModule } from "@ng-select/ng-select";
import { SelectComponent } from "./select.component";

@NgModule({
    declarations: [
        SelectComponent,
    ],
  
      imports: [
          CommonModule,
          ThemeModule,
          Ng2SmartTableModule,
          NbDialogModule.forRoot(),
          NbWindowModule.forRoot(),
          NgSelectModule,
      ],
    
    entryComponents: [
        SelectComponent,
    ],
    exports:[
        SelectComponent,
    ]
  })
  export class SelectModule { }