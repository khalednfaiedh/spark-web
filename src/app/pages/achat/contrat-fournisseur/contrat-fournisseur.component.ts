import { ModaleBonCommandeComponent } from '../bon-commande/modale-bon-commande/modale-bon-commande.component';
import { ModalContratFournisseurComponent } from './modal-contrat-fournisseur/modal-contrat-fournisseur.component';
import { NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ContratService } from './service/contrat-fournisseur.service';
import { Component, OnInit } from '@angular/core';
import { ShowContratFournisseurComponent } from './show-contrat-fournisseur/show-contrat-fournisseur.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesContratFournisseur } from '../../../authorisation/authorities-contrat-fournisseur';
import { AuthoritiesBonCommande } from '../../../authorisation/authorities-bon-commande';

@Component({
  selector: 'ngx-contrat-fournisseur',
  templateUrl: './contrat-fournisseur.component.html',
  styleUrls: ['./contrat-fournisseur.component.scss']
})
export class ContratFournisseurComponent implements OnInit {
  public static urlContratFournisseur = "/pages/achat/contratFournisseur";
  public static urlRefreshContratFournisseur = "/pages/achat/refreshContratFournisseur"
  source: LocalDataSource = new LocalDataSource()
  today = new Date()
  constructor(private windowService: NbWindowService, private serviceContrat: ContratService) { }


  ngOnInit() {
    this.serviceContrat.getAllContrat().subscribe(
      data => {

        this.source = new LocalDataSource(data)
      },
      error => { console.log(error); });

    if (Authorities.hasAutorities(AuthoritiesContratFournisseur.CONTRAT_FOURNISSEUR_VALUE)) {
      this.settings.actions.custom.push({
        name: 'show',
        title: '<i class="nb-sunny" title="Afficher"></i>',
      });
    }
    if (Authorities.hasAutorities(AuthoritiesBonCommande.BON_COMMANDE_ADD_VALUE)) {
      this.settings.actions.custom.push({
        name: 'commande',
        title: '<i class="nb-paper-plane" title="Commande"></i>',
      });
    }
    if (Authorities.hasAutorities(AuthoritiesContratFournisseur.CONTRAT_FOURNISSEUR_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
  }
  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-trash" title="supprimer"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
      ],
    },
    columns: {
      idContrat: {
        title: 'Référence',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell, row) {
          let date = new Date()
          return "CTR2019" + row.idContrat
        }
      },
    },
  };
  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    localStorage.setItem('e', '0');

    this.windowService.open(ModalContratFournisseurComponent,
      { title: 'Ajouter Contrat' });
  }
  onCustom(event) {

    if (event.action === 'show') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.idContrat);
      this.windowService.open(ShowContratFournisseurComponent,
        { title: 'Afficher Contrat', context: { id: event.data.idContrat } });
    }
    if (event.action === 'commande') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.idContrat);
      localStorage.setItem('e', '1');
      this.windowService.open(ModaleBonCommandeComponent,
        { title: 'Ajouter commande', context: { id: event.data.idContrat } });


    }
  }
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce Produit?`)) {
      event.confirm.resolve(this.serviceContrat.deleteContrat(event.data.idContrat).subscribe(
        data => {
          this.source.remove(event)
        }),
      );
    } else {
      event.confirm.reject();
    }
  }


}
