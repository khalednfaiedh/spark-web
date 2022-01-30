import { Component, OnInit } from '@angular/core';
import { EtapeCommandeService } from './etape-commande.service';
import { Router } from '@angular/router';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesEtapeCommande } from '../../../authorisation/authorities-etape-commande';

@Component({
  selector: 'ngx-etape-commande',
  templateUrl: './etape-commande.component.html',
  styleUrls: ['./etape-commande.component.scss']
})
export class EtapeCommandeComponent implements OnInit {
  public static urlEtapeCommande = "/pages/admin/etapeCommande";
  source: any;
  constructor(private service: EtapeCommandeService,
    private router: Router) { }

  ngOnInit(): void {
    this.service.getAllEtapeCommande().subscribe(
      data => { this.source = data; },
      error => { console.log(error); });

      if(Authorities.hasAutorities(AuthoritiesEtapeCommande.ETAPE_COMMANDE_ADD_VALUE)){
        this.settings.actions.add= true;
      }
      if(Authorities.hasAutorities(AuthoritiesEtapeCommande.ETAPE_COMMANDE_DELETE_VALUE)){
        this.settings.actions.delete= true;
      }
      if(Authorities.hasAutorities(AuthoritiesEtapeCommande.ETAPE_COMMANDE_UPDATE_VALUE)){
        this.settings.actions.edit= true;
      }
  }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      nom: {
        title: 'Nom',
        type: 'string',
        filter: true,
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette Etape?`)) {
      event.confirm.resolve(this.service.deleteEtapeCommandes(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    this.service.addEtapeCommandes(event.newData).subscribe(
      data => { this.source.add(event.newData).refresh(); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }

  onSaveConfirm(event): any {
    this.service.updateEtapeCommandes(event.newData).subscribe(
      data => { this.source.update(event.newData); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }
}