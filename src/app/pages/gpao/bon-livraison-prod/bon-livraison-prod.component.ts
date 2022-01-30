import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { format } from 'date-fns';
import { BonLivraisonProdService } from './bonLivraisonProd.service';

@Component({
  selector: 'ngx-bon-livraison-prod',
  templateUrl: './bon-livraison-prod.component.html',
  styleUrls: ['./bon-livraison-prod.component.scss']
})
export class BonLivraisonProdComponent implements OnInit {

  source = []
  constructor(private windowService: NbWindowService,
    private router: Router,
    private blProdService: BonLivraisonProdService) { }

  ngOnInit() {

    this.blProdService.getAll().subscribe(
      data => { this.source = data; console.log(data) }
    )
  }

  settings = {
    actions: {
      position: 'right',
      custom: [
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Show"></i>',
        },
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Edit"></i>',

        },
      ],
      add: false,
      edit: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
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
      stocker: {
        title: 'Statut',
        type: 'string',
        valuePrepareFunction(cell, row) {
          return cell ? 'stocker' : 'En attente'
        }
      },
      fini: {
        title: 'Etat',
        type: 'string',
        valuePrepareFunction(cell, row) {
          return cell ? 'Produit fini' : 'Produit non fini'
        }
      },
      reserver: {
        title: 'Réserver',
        type: 'string',
        valuePrepareFunction(cell, row) {
          return cell ? 'Oui' : 'Non'
        }
      },
      date: {
        title: 'Date sortie',
        type: 'Date',
        sortDirection: 'desc',
        valuePrepareFunction(cell, row) {
          return format(cell, "DD MMM YYYY")
        }
      },
    },
  };

}
