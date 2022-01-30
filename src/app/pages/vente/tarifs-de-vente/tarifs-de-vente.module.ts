import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalTarifsDeVenteComponent } from './modal-tarifs-de-vente/modal-tarifs-de-vente.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { ThemeModule } from '../../../@theme/theme.module';
import { TarifsDeVenteComponent } from './tarifs-de-vente.component';
import { ShowTarifsDeVenteComponent } from './show-tarifs-de-vente/show-tarifs-de-vente.component';
import { ShowProductComponent } from '../../admin/product/show-product/show-product.component';
import { ShowTarifsDeVenteProductComponent } from './show-tarifs-de-vente-product/show-tarifs-de-vente-product.component';
import { RefreshTarifsDeVenteComponent } from './refresh-tarifs-de-vente/refresh-tarifs-de-vente.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { IConfig } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NgSelectModule,
    NgxCurrencyModule,
  ],
  declarations: [
    TarifsDeVenteComponent,
    ModalTarifsDeVenteComponent,
    ShowTarifsDeVenteComponent,
    ShowTarifsDeVenteProductComponent,
    RefreshTarifsDeVenteComponent,


  ],
  exports: [ShowTarifsDeVenteProductComponent],
  entryComponents: [
    ModalTarifsDeVenteComponent,
    ShowTarifsDeVenteComponent,
    ShowTarifsDeVenteProductComponent

  ],
})
export class TarifsDeVenteModule { }
