import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import {ParametreComponent} from './parametre.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    ParametreComponent,
  ],
})
export class ParametreModule { }
