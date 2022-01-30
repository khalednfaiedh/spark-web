import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { format } from 'date-fns';
import { adminsAuthorities } from '../../../authorisation/admins';
import { Authorities } from '../../../authorisation/authorities';
import { UtilisateurService } from '../../utilisateur/utilisateur.service';
import { Planning } from './planning';
import { PlanningService } from './planning.service';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'ngx-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {
  authoritiesAdd: boolean;

  constructor(private windowService: NbWindowService, 
    private service: PlanningService,
    public ser : UtilisateurService) {
  }

  source: Planning[];

  ngOnInit() {
      this.service.getAll().subscribe(
        data => {  this.source = data; 
       },
        error => { console.log('error',error) }
        );

        if (Authorities.hasAutorities(adminsAuthorities.CRM_ADMIN)) {
          this.authoritiesAdd = true;  
        }
        // if (Authorities.hasAutorities(changeme.CRM_ADMIN)) {
        //    this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Consulter"></i>' });
        // }
        if (Authorities.hasAutorities(adminsAuthorities.CRM_ADMIN)) {
          this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Editer"></i>' });
        }
        if (Authorities.hasAutorities(adminsAuthorities.CRM_ADMIN)) {
          this.settings.actions.delete= true;
         } 
  }

  settings = {

    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit: false,
      delete:false,
      position: 'right',
      custom: [
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Consulter" i18n="@@consulter"></i>',
        },
        // {
        //   name: 'editAction',
        //   title: '<i class="nb-edit" title="Editer" i18n="@@editer"></i>',
        //   confirm:true
        // },
       ],
    },
    columns: {
      idPlanning: {
        title: 'N°',
        type: 'number',
        filter: true,
        sort : true ,
        width:'7vw'
     },
     designation: {
        title: 'Désignation',
        type: 'string',
        filter: true,
        sort : true ,
      },
      dateDebut: {
        title: 'Date début',
        type: 'Date',
        filter: true,
        valuePrepareFunction(dateDebut){
          return dateDebut ? format(dateDebut,"DD/MM/YYYY"):'-'
        }
      },
      dateFin: {
        title: 'Date fin',
        type: 'Date',
        filter: true,
        sort : true ,
        sortDirection :	'desc',       
        valuePrepareFunction(dateFin){
          return dateFin ? format(dateFin,"DD/MM/YYYY"):'-'
        }
      },
      etat: {
        title: 'Etat',
        filter: true,
        sort : true ,
        sortDirection :	'desc', 
        width:'8vw',
        type:'html',
        valuePrepareFunction: (data) => {
          if (data == 'En cours') {
            return '<p class="statut success">' + data + '</p>';

          }else
           return '<p class="statut danger">' + data + '</p>';
           },
      },
    },
  };
  onCustom(event): any {
    if (event.action === 'editAction') {
      this.windowService.open(PopupComponent, {
        title: 'Modifier ce planning de prospection',
        context:{planning: event.data, disabled : false }  });
    }
    if (event.action === 'showAction') {
           this.windowService.open(PopupComponent, {
        title: 'Détails planning de prospection',
        context:{ planning: event.data,
        disabled : true  
        }
      });
    }
  }
  openWindow() {
    this.windowService.open(PopupComponent, 
      { title: 'Ajouter un nouveau planning',
       context:{ disabled : false  }
      });
  }

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous êtes sure de supprimer ce planning ?`)) {
      event.confirm.resolve(this.service.delete(event.data.idPlanning).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
}