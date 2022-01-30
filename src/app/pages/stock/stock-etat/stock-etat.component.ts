import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { format } from 'date-fns';
import { MouvementPopupComponent } from '../mouvement/mouvement-popup/mouvement-popup.component';
import { StockEtatService } from '../services/etatDeStock.service';
import { MvtService } from '../services/mouvementService';
import { StockModel } from './stock.model';
import { TransfertPopupComponent } from './transfert-popup/transfert-popup.component';

@Component({
  selector: 'ngx-stock-etat',
  templateUrl: './stock-etat.component.html',
  styleUrls: ['./stock-etat.component.scss']
})
export class StockEtatComponent implements OnInit {


  constructor(private mouvementService:MvtService,
    private windowService: NbWindowService, 
    private service: StockEtatService) {
  }

  source: StockModel[];
  mvt: any;
  ngOnInit() {
      this.service.getAll().subscribe(
        data => {  this.source = data; 
       },
        error => { console.log('error',error) }
        );
        this.mouvementService.getAllMouvementsByentreprise("Transfert").subscribe(
          data => {this.mvt = data; }
        )
  }

  settings = {

    actions: {
      add: false,
      edit: false,
      delete:false,
      columnTitle:"Transfert",
      position: 'right',
      custom: [
        { name: 'tranfert',
          title: '<i class="nb-arrow-retweet" title="Transférer"></i>'
        }
       ],
    },
    columns: {
      nameMagasin: {
        title: 'Magasin',
        type: 'string',
        filter: true,
        sort : true ,
        sortDirection :	'asc',
      },
     nameProduit: {
        title: 'Produit',
        type: 'string',
      },
      quantity: {
        title: 'Quantité',
        type: 'string',
      },
      lot: {
        title: 'N° lot',
        type: 'string',
      },
    },
  };

  onCustom(event): any {
  
    if (event.action === 'tranfert') {
           this.windowService.open(TransfertPopupComponent, {
        title: 'Effectuer un transfert',
        context:{ produit: event.data }
      });
    }
  }


mvtSettings = {
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
    qualite: {
      title: 'Contrôle qualité',
      type: 'string'
    },
    dateOperation: {
      title: "Date Transfert",
      type: 'Date',
      valuePrepareFunction(cell, row) {
        return format(cell, "DD MMM YYYY")
      }
    },
  }
} 
mvtOnCustom(event): any {
  if (event.action === 'showAction') {
    this.windowService.open(MouvementPopupComponent, {
      title: 'Transfert',
      context:{mvt: event.data }  });
  }
}
}
