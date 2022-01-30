import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { format } from 'date-fns';
import { MvtService } from '../services/mouvementService';
import { MouvementPopupComponent } from './mouvement-popup/mouvement-popup.component';

@Component({
  selector: 'ngx-mouvement',
  templateUrl: './mouvement.component.html',
  styleUrls: ['./mouvement.component.scss']
})
export class MouvementComponent implements OnInit {
  mvt: any;

  constructor(private mouvementService:MvtService,
    private windowService: NbWindowService) { }

  ngOnInit() {
    this.mouvementService.getAll().subscribe(
      data => {this.mvt = data; }
    )
  }

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        { name: 'showAction', 
        title: '<i class="nb-sunny" title="Afficher"></i>'},      
      ],
    },
    columns: {
      reference: {
        title: 'Référence',
        type: 'string',
      },
      designation: {
        title: 'Désignation',
        type: 'string',
      },
      typeMvt: {
        title: 'Nature',
        type: 'string'
      },
      dateOperation: {
        title: "Date opération",
        type: 'Date',
        valuePrepareFunction(cell, row) {
          return format(cell, "DD MMM YYYY")
        }
      },
    }
  } 
  onCustom(event): any {
    if (event.action === 'showAction') {
      this.windowService.open(MouvementPopupComponent, {
        title: 'Mouvement',
        context:{mvt: event.data }  });
    }
  }
}
