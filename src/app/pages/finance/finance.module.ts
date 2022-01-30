import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PaiementEtReglementComponent } from './paiement-et-reglement/paiement-et-reglement.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
  PaiementEtReglementComponent],
   entryComponents: [
  ],
  providers: [
  ]
})
export class FinanceModule { }