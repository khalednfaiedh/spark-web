import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { ModalMagasinComponent } from './modal-magasin/modal-magasin.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { ShowMagasinComponent } from './show-magasin/show-magasin.component';
import { RefrechMagasinComponent } from './refrech-magasin/refrech-magasin.component';
import { ContactMagasinComponent } from './contact-magasin/contact-magasin.component';
import { ButtonViewComponent, MagasinComponent } from './magasin.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ThemeModule } from '../../../@theme/theme.module';
import { UpdateMagasinComponent } from './update-magasin/update-magasin.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NgxEchartsModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NgSelectModule,
  ],
  declarations: [
    MagasinComponent,
    ModalMagasinComponent,
    ShowMagasinComponent,
    RefrechMagasinComponent,
    ContactMagasinComponent,
    ButtonViewComponent,
    UpdateMagasinComponent
  ],
  entryComponents: [
    ModalMagasinComponent,
    ShowMagasinComponent,
    ContactMagasinComponent,
    UpdateMagasinComponent,
    ButtonViewComponent
  ]
})
export class MagasinModule { }
