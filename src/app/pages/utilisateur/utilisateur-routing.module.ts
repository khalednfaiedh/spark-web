import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UtilisateurComponent } from "./utilisateur.component";

const routes: Routes = [{
            path: 'utilisateur',
            component: UtilisateurComponent,
        },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UtilisateurRoutingModule {
}