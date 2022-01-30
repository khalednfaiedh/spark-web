import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PaiementEtReglementComponent } from "./paiement-et-reglement/paiement-et-reglement.component";

const routes: Routes = [{
    path: 'xxx',
    component: PaiementEtReglementComponent,
},
]

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})

export class FinanceRoutingModule {
}