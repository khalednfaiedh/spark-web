import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThemeModule } from "../../@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NbDialogModule, NbInputModule, NbSelectModule, NbWindowModule } from "@nebular/theme";
import { TranslateModule } from "@ngx-translate/core";
import { ModalUtilisateurComponent } from "./modal-utilisateur/modal-utilisateur.component";
import { ShowUtilisateurComponent } from "./show-utilisateur/show-utilisateur.component";
import { UtilisateurComponent } from "./utilisateur.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { UtilisateurRoutingModule } from "./utilisateur-routing.module";
import { OnOffUserComponent } from './on-off-user/on-off-user.component';

@NgModule({
    imports: [
        CommonModule,
        ThemeModule,
        NgSelectModule,
        Ng2SmartTableModule,
        NbDialogModule.forChild(),
        NbWindowModule.forChild(),
        TranslateModule,
        UtilisateurRoutingModule,
        NbInputModule,
        NbSelectModule
    ],
    exports: [
        TranslateModule,
    ],
    declarations: [
        UtilisateurComponent,
        ModalUtilisateurComponent,
        ShowUtilisateurComponent,
        OnOffUserComponent,
    ],
    entryComponents: [
        ModalUtilisateurComponent,
        ShowUtilisateurComponent,
        OnOffUserComponent
    ],
    providers: [
    ]
})
export class UtilisateurModule {
}