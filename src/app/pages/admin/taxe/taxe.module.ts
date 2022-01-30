import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { ModalTaxeComponent } from './modal-taxe/modal-taxe.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TaxeComponent } from './taxe.component';
import { RefreshTaxeComponent } from './refresh-taxe/refresh-taxe.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({

  imports: [
    ThemeModule,
    NgSelectModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    TranslateModule,
    NgxCurrencyModule,

    NgSelectModule,

  ],
  declarations: [
    TaxeComponent,
    ModalTaxeComponent,
    RefreshTaxeComponent,
  ],
  entryComponents: [
    ModalTaxeComponent
  ],
})
export class TaxeModule { }
