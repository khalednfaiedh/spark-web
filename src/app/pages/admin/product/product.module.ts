import {NgModule} from '@angular/core';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbDialogModule, NbWindowModule} from '@nebular/theme';
import {ProductComponent} from './product.component';
import {ShowProductComponent} from './show-product/show-product.component';
import {RefreshProductComponent} from './refresh-product/refresh-product.component';
import {ModalProductComponent} from './modal-product/modal-product.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ThemeModule } from '../../../@theme/theme.module';
import { TaxeComponent } from '../taxe/taxe.component';
import { TaxeModule } from '../taxe/taxe.module';
import { ProductTaxeComponent } from './product-taxe/product-taxe.component';
import { ProductConditionnementComponent } from './product-conditionnement/product-conditionnement.component';
import { TarifsDeVenteModule } from '../../vente/tarifs-de-vente/tarifs-de-vente.module';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NgSelectModule,
    TaxeModule,
    TarifsDeVenteModule,
  ],
  declarations: [
    ProductComponent,
    ShowProductComponent,
    RefreshProductComponent,
    ModalProductComponent,
    ProductTaxeComponent,
    ProductConditionnementComponent,
  ],
  entryComponents: [
    ModalProductComponent,
    ShowProductComponent,
  ],
})
export class ProductModule {
}
