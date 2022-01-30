import { Component, OnInit } from '@angular/core';
import { PagesComponent } from '../../pages.component';
import { HttpClient } from '@angular/common/http';
import { ConditionDePaiementService } from './condition-de-paiement.service';
import { error } from 'console';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesConditionsPaiement } from '../../../authorisation/authorities-condition-de-paiement';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { ModalConditionDePaiementComponent } from './modal-condition-de-paiement/modal-condition-de-paiement.component';
import { ModalTaxeComponent } from '../taxe/modal-taxe/modal-taxe.component';
import { ShowConditionDePaiementComponent } from './show-condition-de-paiement/show-condition-de-paiement.component';

@Component({
  selector: 'ngx-condition-de-paiement',
  templateUrl: './condition-de-paiement.component.html',
  styleUrls: ['./condition-de-paiement.component.scss']
})
export class ConditionDePaiementComponent implements OnInit {
  public static urlconditionDePaiement = "/pages/admin/conditionDePaiement";
  source: any
  add: any
  idEntr = localStorage.getItem('current_entreprise')
  constructor(private service: ConditionDePaiementService, private windowService: NbWindowService, private router: Router) { }

  ngOnInit() {
    if (Authorities.hasAutorities(AuthoritiesConditionsPaiement.CONDITIONS_DE_PAIEMENTS_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
    if (Authorities.hasAutorities(AuthoritiesConditionsPaiement.CONDITIONS_DE_PAIEMENTS_UPDATE_VALUE)) {
      this.settings.actions.custom.push({
        name: 'editAction',
        title: '<i class="nb-edit" title="Edit"></i>',
      })
    }
    if (Authorities.hasAutorities(AuthoritiesConditionsPaiement.CONDITIONS_DE_PAIEMENTS_ADD_VALUE)) {
      this.add = false;
    }
    if (Authorities.hasAutorities(AuthoritiesConditionsPaiement.CONDITIONS_DE_PAIEMENTS_VALUE)) {
      this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });

    }
    this.service.getAllConditionDePaiement(+this.idEntr).subscribe(data => {
      this.source = data;
      console.log("this.source==>", this.source)
    }, error => {
      console.log(error)
    })
  }
  settings = {

    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
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
      typeEcheancier: {
        title: "Type d'échéancier",
        type: 'String',
        filter: true,
      },
      strategie: {
        title: 'Stratégie de paiement',
        type: 'String',
        filter: true,
      },
      listCondition: {
        title: 'Condition',
        type: 'String',
        filter: true,
        /* valuePrepareFunction(cell, row) {
 
           return row.listcondiontDePaiements.map(data => data.listCondition)
         }*/
      },

    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette condition de paiement?`)) {
      event.confirm.resolve(this.service.deleteConditionDePaiement(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }


  onCustom(event) {
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idCP');
      localStorage.setItem('idCP', event.data.id);
      this.windowService.open(ShowConditionDePaiementComponent,
        {
          title: 'Afficher les informations de ce condition',
          context: event.data.id
        });
    }
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idCP');
      localStorage.setItem('e', '1');
      localStorage.setItem('idCP', event.data.id);
      this.windowService.open(ModalConditionDePaiementComponent,
        { title: 'Modifier une condition de paiement', context: event.data.id });
    }
  }
  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idCP');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalConditionDePaiementComponent,
      { title: 'Ajouter une condition de paiement' });
  }
}




