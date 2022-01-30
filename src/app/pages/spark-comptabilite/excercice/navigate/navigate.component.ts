import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { EquilibrEcritureComponent } from '../equilibr-ecriture/equilibr-ecriture.component';

@Component({
  selector: 'ngx-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss']
})
export class NavigateComponent implements OnInit {

  constructor(private windowService: NbWindowService) { }

  ngOnInit() {

    this.windowService.open(EquilibrEcritureComponent, { title: `Equilibre Ecriture` });  
  }

}
