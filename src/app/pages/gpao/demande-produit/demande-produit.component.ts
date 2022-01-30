import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { format } from 'date-fns';
import { DemandeProdService } from './demande-produit.service';

@Component({
  selector: 'ngx-demande-produit',
  templateUrl: './demande-produit.component.html',
  styleUrls: ['./demande-produit.component.scss']
})
export class DemandeProduitComponent implements OnInit {

  source = []
  constructor(private windowService: NbWindowService,
    private router: Router,
    private service: DemandeProdService) { }

  ngOnInit() {

    this.service.getAll().subscribe(
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
      dateDemande: {
        title: 'Date demande',
        type: 'Date',
        sortDirection: 'desc',
        valuePrepareFunction(cell, row) {
          return format(cell, "DD MMM YYYY")
        }
      },
      dateLiv: {
        title: 'Date livraison',
        type: 'Date',
        sortDirection: 'desc',
        valuePrepareFunction(cell, row) {
          return format(cell, "DD MMM YYYY")
        }
      },
      livrer: {
        title: 'Statut',
        type: 'string',
        valuePrepareFunction(cell, row) {
          return cell ? 'Livrer' : 'En attente'
        }
      },
    },
  };

}
