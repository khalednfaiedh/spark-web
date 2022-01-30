import { NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { ModalBilanComponent } from './modal-bilan/modal-bilan.component';
import { ShowBilanComponent } from './show-bilan/show-bilan.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { BilanComponent } from './bilan.component';

@NgModule({
  declarations: [BilanComponent ,ModalBilanComponent, ShowBilanComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    TranslateModule,
  ],
  exports:[
    TranslateModule,
  ],
  entryComponents: [
    ShowBilanComponent,
    ModalBilanComponent,
  ],
})
export class BilanModule { }
