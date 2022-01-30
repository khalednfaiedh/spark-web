import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { ModalFamilleDeProduitComponent } from './modal-famille-de-produit/modal-famille-de-produit.component';
import { ShowFamilleDeProduitComponent } from './show-famille-de-produit/show-famille-de-produit.component';
import { FamilleDeProduitService } from './famille-de-produit.service';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesFamilleDeProduit } from '../../../authorisation/authorities-famille-de-produit';

@Component({
  selector: 'ngx-famille-de-produit',
  templateUrl: './famille-de-produit.component.html',
  styleUrls: ['./famille-de-produit.component.scss']
})
export class FamilleDeProduitComponent implements OnInit {
  public static urlFamilleDeProduit = "/pages/admin/familleDeProduit";
  source: any;
  add = true;
  constructor(private service: FamilleDeProduitService, private windowService: NbWindowService) { }

  ngOnInit() {
    let idEntreprise = localStorage.getItem('current_entreprise')
    this.service.getAllFamilleDeProduit(+idEntreprise).subscribe(data=>{
      this.source = data;
    },
    error=>{ console.log("error"); })
    if(Authorities.hasAutorities(AuthoritiesFamilleDeProduit.FAMILLE_DE_PRODUIT_ADD_VALUE)){
      this.add = false;
    }
    if(Authorities.hasAutorities(AuthoritiesFamilleDeProduit.FAMILLE_DE_PRODUIT_UPDATE_VALUE)){
      this.settings.actions.custom.push({
        name: 'editAction',
        title: '<i class="nb-edit" title="Edit"></i>',
      },);
    }
    if(Authorities.hasAutorities(AuthoritiesFamilleDeProduit.FAMILLE_DE_PRODUIT_DELETE_VALUE)){
      this.settings.actions.delete= true;
    }
    if(Authorities.hasAutorities(AuthoritiesFamilleDeProduit.FAMILLE_DE_PRODUIT_VALUE)){
      this.settings.actions.custom.push({
        name: 'showAction',
        title: '<i class="nb-sunny" title="Show"></i>',
      },);
    }
  }

  settings = {
    actions: {
      add: false,
      edit: false,
      delete:false,
      position: 'right',
      custom: [
      ],
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      nom: {
        title: 'Désignation',
        type: 'string',
      },
    },
  };
  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idFamilleDeProduit');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalFamilleDeProduitComponent, {title: 'Ajouter une famille de produit'},
      );
  }

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette famille de produit?`)) {
      event.confirm.resolve(this.service.deleteFamilleDeProduit(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

  onCustom(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idFamilleDeProduit');
      localStorage.setItem('idFamilleDeProduit' , event.data.id);
      localStorage.setItem('e', '1');
      this.windowService.open(ModalFamilleDeProduitComponent, {title: 'Modifier cette famille de produit'});
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idFamilleDeProduit');
      localStorage.setItem('idFamilleDeProduit' , event.data.id);
      this.windowService.open(ShowFamilleDeProduitComponent, {title: 'Afficher les informations de cette famille de produit'});
      console.log('show');
    }
  }
}
