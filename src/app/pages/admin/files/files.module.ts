import { NgModule } from '@angular/core';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalFileComponent } from './modal-file/modal-file.component';
import { FilesComponent } from './files.component';
import { ThemeModule } from '../../../@theme/theme.module';

@NgModule({

  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NgSelectModule,
  ],
  declarations: [
    ModalFileComponent,
    FilesComponent,
  ]
})
export class FilesModule { }
