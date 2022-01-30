import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from './utilisateur.service';
import { Authorities } from '../../authorisation/authorities';
import { AuthoritiesUser } from '../../authorisation/authorities-user';
import { NbWindowService } from '@nebular/theme';
import { ModalUtilisateurComponent } from './modal-utilisateur/modal-utilisateur.component';
import { ShowUtilisateurComponent } from './show-utilisateur/show-utilisateur.component';
import { OnOffUserComponent } from './on-off-user/on-off-user.component';

@Component({
  selector: 'ngx-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {
  public static urlUtilisateur= "/pages/utilisateur/utilisateur";
  add: boolean;
  source: any;
  constructor(private windowService: NbWindowService, private service: UtilisateurService) { }

  ngOnInit() {
    console.log(Authorities.getUserInfo())
    
    // this.service.getAllUtilisateur().subscribe(
    this.service.getAllUtilisateurPublique().subscribe(
      data=>{
        this.source = data;
      },
      error=>{console.log("error");}
    );
    if(Authorities.hasAutorities(AuthoritiesUser.ADD_USER)){
    //  this.add = false;
    }
    if(Authorities.hasAutorities(AuthoritiesUser.GET_USER)){
      this.settings.actions.custom.push({
        name: 'showAction',
        title: '<i class="nb-sunny" title="Afficher"></i>',
      },)
    }
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
     
      custom: [
        {
          name: 'activateAction',
          title: '<i class="nb-power" title="Activer/Desactiver"></i>',
        },
        // {
        //   name: 'editAction',
        //   title: '<i class="nb-edit" title="Modifier"></i>',
        // }
        
      ],
    },
    columns: {
      username: {
        title: 'Nom d\'utilisateur',
        type: 'string',
        filter: true,
        width:'15%'
      },
      firstName: {
        title: 'Nom',
        type: 'string',
        filter: true,
        width:'10%',

      },
      lastName: {
        title: 'Prénom',
        type: 'string',
        filter: true,
        width:'10%',

      },
      idEmploye: {
        title: 'Type',
        type: 'string',
        filter: true,
        valuePrepareFunction: (data) => {
          if (data) {
            return 'Interne'
          }else return 'Externe'
        }
      },
      email: {
        title: 'Email',
        type: 'string',
        filter: true,
        width:'20%'
      },
      tel: {
        title: 'Tel',
        type: 'number',
        filter: true,
        width:'10%'
      },
      gender: {
        title: 'Genre',
        type: 'list',
        filter: { type: 'list',
          config: {
            selectText: 'Type',
            list: [{ value: 'Masculin', title: 'Masculin' },
              { value: 'Feminin', title: 'Feminin' }],
          },
        },
        editor: { type: 'list',
          config: {
            selectText: 'Type',
            list: [{ value: 'Masculin', title: 'Masculin' },
            { value: 'Feminin', title: 'Feminin' }],
          },
        },
      },
      status: {
        title: 'Statut',
        width:'9vw',
        type:'html',
        valuePrepareFunction: (data) => {
          if (data == 'ACTIF') {
            return '<p class="success">' + data + '</p>';

          }else
           return '<p class="danger">' + data + '</p>';
           },
      }
      // status: {
      //   title: 'Status',
      //   type: 'list',
      //   filter: { type: 'list',
      //     config: {
      //       selectText: 'Type',
      //       list: [{ value: 'ACTIVE', title: 'ACTIVE' },
      //         { value: 'INACTIVE', title: 'INACTIVE' }],
      //     },
      //   },
      //   editor: { type: 'list',
      //     config: {
      //       selectText: 'Type',
      //       list: [{ value: 'ACTIVE', title: 'ACTIVE' },
      //       { value: 'INACTIVE', title: 'INACTIVE' }],
      //     },
      //   },
      // },
    },
  };
  onCustom(event) {

    if (event.action === 'showAction') {

      this.windowService.open(ShowUtilisateurComponent,
        { title: 'Afficher utilisateur', context: { utilisateur: event.data } });
    }else if (event.action === 'activateAction') {
      this.windowService.open(OnOffUserComponent,
        { title: 'Activer/Désactiver utilisateur', context: { utilisateur: event.data } });
    }else  if (event.action === 'editAction') {

      this.windowService.open(ModalUtilisateurComponent,
        { title: 'Modifier utilisateur', context: { utilisateur: event.data } });
    }
  }

  openWindow() {
   
    this.windowService.open(ModalUtilisateurComponent,
      {title: 'Ajouter un utilisateur'});
  }

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cet utilisateur ?`)) {
      event.confirm.resolve(this.service.deleteUtilisateur(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
}
