import { RefreshEmplacementComponent } from './refresh-emplacement/refresh-emplacement.component';
import { ShowEmplacementComponent } from './show-emplacement/show-emplacement.component';
import { ModalEmplacementComponent } from './modal-emplacement/modal-emplacement.component';
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { EmplacementComponent } from './emplacement.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NgxEchartsModule,
    NbDialogModule.forChild(),
    NgSelectModule,
    NbWindowModule.forChild(),
    NgxCurrencyModule
  ],
  declarations: [
    EmplacementComponent,
    ModalEmplacementComponent,
    ShowEmplacementComponent,
    RefreshEmplacementComponent
   
  ],
  entryComponents: [
    ShowEmplacementComponent,
    ModalEmplacementComponent,
    RefreshEmplacementComponent

    
  ]
})
export class EmplacementModule { }
