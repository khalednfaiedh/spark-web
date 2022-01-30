import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { PersonnelComponent } from './personnel.component';
import { ModalPersonnelComponent } from './modal-personnel/modal-personnel.component';
import { RefrechPersonnelComponent } from './refrech-personnel/refrech-personnel.component';
import { ShowPersonnelComponent } from './show-personnel/show-personnel.component';
import { PersonnelContracteComponent } from './modal-personnel/personnel-contracte/personnel-contracte.component';
import { PersonnelTemporaireComponent } from './modal-personnel/personnel-temporaire/personnel-temporaire.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
    NgSelectModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
  ],
  declarations: [
    PersonnelComponent,
    ModalPersonnelComponent,
    RefrechPersonnelComponent,
    ShowPersonnelComponent,
    PersonnelContracteComponent,
    PersonnelTemporaireComponent,
    ],
  entryComponents:[
    ModalPersonnelComponent,
    ShowPersonnelComponent,
  ],
})
export class PersonnelModule { }
