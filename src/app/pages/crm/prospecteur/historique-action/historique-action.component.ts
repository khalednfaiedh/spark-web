import { Component, Inject, OnInit } from '@angular/core';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { format } from 'date-fns';
import { ActionModel } from '../../leads/edit-affaire/apopup/action';
import { ProspecteurService } from '../prospecteur.service';

@Component({
  selector: 'ngx-historique-action',
  templateUrl: './historique-action.component.html',
  styleUrls: ['./historique-action.component.scss']
})
export class HistoriqueActionComponent implements OnInit {
  prospecteur : String
  source: ActionModel[];
  constructor(protected service : ProspecteurService,
    @Inject(NB_WINDOW_CONTEXT) context) {
      this.prospecteur = context.prospecteur  }

  ngOnInit() {
    console.log(this.prospecteur)
    this.service.getActions(this.prospecteur).subscribe(
      data => {this.source = data},
      error => {console.log(error)}
    )
  }
  settings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false
    },

    pager: {
      display: true,
      perPage: 15
    },
    columns: {
      lead: {
        title: 'Affaire',
        type: 'string',
       
        valuePrepareFunction(lead) {
          return lead ? lead.leadName : '-'
        }
      },
      actionType: {
        title: 'Action',
        type: 'string',
        width: "15vw",
        valuePrepareFunction(actionType) {
          return actionType ? actionType.typeName : '-'
        }
      },
      actionDateLimite: {
        title: 'Date action',
        type: 'Date',
        valuePrepareFunction(actionDateLimite) {
          return actionDateLimite ? format(actionDateLimite, "DD/MM/YYYY HH:mm") : '-'
        }
      },
      responsable: {
        title: 'Crée par',
        type: 'string',
      },
      actionDateCreation:{
        title: 'Date de création',
        type: 'Date',
        valuePrepareFunction(actionDateCreation){
          return actionDateCreation ? format(actionDateCreation,"DD/MM/YYYY HH:mm"):'-'
        }
      },
 
      actionStatus: {
        title: 'Statut',
        type: 'string',
        valuePrepareFunction(actionStatus) {
          return actionStatus ? actionStatus.statusName : '-'
        }
      },
     
  
  }
}
}
