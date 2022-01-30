import { Component, OnInit } from '@angular/core';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthoritiesPrixProduct } from '../../../../authorisation/authorities-prix-product';
import { TarifsDeVenteModel } from '../tarifs-de-vente.model';
import { NbWindowService, NbWindowRef } from '@nebular/theme';
import { TarifsDeVentesService } from '../service/tarifs-de-ventes.service';

@Component({
  selector: 'ngx-show-tarifs-de-vente-product',
  templateUrl: './show-tarifs-de-vente-product.component.html',
  styleUrls: ['./show-tarifs-de-vente-product.component.scss']
})
export class ShowTarifsDeVenteProductComponent implements OnInit {

  tarifs: TarifsDeVenteModel
  source: any;
  today = new Date();
  constructor(private windowService: NbWindowService, private service: TarifsDeVentesService, private windowRef: NbWindowRef) { }

  ngOnInit() {
    let id = localStorage.getItem("idProduct")
    this.service.gatAllTarifByProduct(+id).subscribe(
      data => { this.source = data; console.log(this.source); },
      error => { console.log(error); },
    );




  }

  settings = {

    mode: "inline",
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    add: {
      addButtonContent: '<i class="nb-plus" ></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',

    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,

      custom: [


      ],
    },

    columns: {
      typedeprix: {
        title: 'Type de prix',
        type: 'string',
        filter: true,
      },
      code: {
        title: 'Réference',
        type: 'string',
        filter: true,
      },

      quantity: {
        title: 'Quantité',
        type: 'number',
        filter: true,
      },
      unite: {
        title: 'Unité de vente',
        type: 'string',
        filter: true,
      },
      prixdeventePropose: {
        title: 'Prix de vente HT',
        type: 'number',
        filter: true,
      },
      remise: {
        title: 'Remise(%)',
        type: 'number',
        filter: true,
      },
      prixventeremise: {
        title: 'Prix avec remise',
        type: 'number',
        filter: true,
      },
      devise: {
        title: 'Monnaie',
        type: 'string',
        filter: true,
      },
      debutValidite: {
        title: 'Début de validité',
        type: 'Date',
        filter: true,
      },
      finValidite: {
        title: 'Début de validité',
        type: 'Date',
        filter: true,
        rowClassFunction: (row) => {
          if (row.data.finValidite < (new Date())) {
            return 'solved';
          } else {
            return 'aborted'
          }

        },
      }
    },
  };
  onclose() {
    this.windowRef.close();
  }
}
