import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuantityProductComponent } from './quantity-product.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NgSelectModule,
  
  ],
  declarations: [
    QuantityProductComponent,
  ],
  
  exports:[
    QuantityProductComponent,
  ],

})
export class QuantityProductModule { }
