import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbDialogModule, NbWindowModule } from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';
import { SuivieComponent } from './suivie.component';

@NgModule({
  declarations: [
    SuivieComponent,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    DragDropModule,
  ]
})
export class SuivieModule { }
