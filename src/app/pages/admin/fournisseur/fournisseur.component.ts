import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { FournisseurService } from './fournisseur.service';
import { ModalFournisseurComponent } from './modal-fournisseur/modal-fournisseur.component';
import { ShowFournisseurComponent } from './show-fournisseur/show-fournisseur.component';
import { ViewCell } from 'ng2-smart-table';
import { ContactComponent } from './contact/contact.component';
import { AdresseDeLivraisonComponent } from './adresse-de-livraison/adresse-de-livraison.component';
import { CordonneeBancaireComponent } from './cordonnee-bancaire/cordonnee-bancaire.component';
import { AuthoritiesFournisseur } from '../../../authorisation/authorities-fournisseur';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesEvaluationFournisseur } from '../../../authorisation/authorities-evaluation-fournisseur';
import { FournisseurEvaluationComponent } from '../../achat/evaluation-fournisseur/fournisseur-evaluation/fournisseur-evaluation.component';
import { format } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <button (click)="onClickB()" nbButton status="info" ' +
    '      style="padding:5px 15px;" type="submit" title="Coordonné(s) bancaire(s)"><i class="fas fa-university"></i> </button> \n' +
    '    </div>',
})
export class ButtonViewBComponent implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private router: Router) {
  }
  onClickB() {
    localStorage.setItem('idFournisseur', this.rowData.idF);
    this.router.navigate(['pages/admin/fournisseur/banque'])
  }

}
@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <button (click)="onClick()" nbButton status="info" ' +
    '      style="padding:5px 15px;" type="submit" title="Liste de contact(s)"><i class="fas fa-phone"></i> </button> \n' +
    '    </div>',
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService) {
  }
  onClick() {
    localStorage.setItem('idFournisseur', this.rowData.idF);
    this.windowService.open(ContactComponent,
      { title: 'Liste de contacts' });
  }

}
@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <button (click)="onClickA()" nbButton status="info" ' +
    '      style="padding:5px 15px;" type="submit" title="Liste des adresses de livraison"><i class="fas fa-route"></i> </button> \n' +
    '    </div>',
})
export class ButtonViewAComponent implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService) {
  }
  onClickA() {
    localStorage.setItem('idFournisseur', this.rowData.idF);
    this.windowService.open(AdresseDeLivraisonComponent,
      { title: 'Liste des adresses de livraison' });
  }

}

@Component({
  selector: 'ngx-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss'],
})
export class FournisseurComponent implements OnInit {
  public static urlFournisseur = "/pages/admin/fournisseur";
  public static urlRefreshFournisseur = "/pages/admin/refreshFournisseur";
  source: any;
  add = true;
  constructor(private windowService: NbWindowService, private service: FournisseurService) { }

  ngOnInit() {
    let id = localStorage.getItem('current_entreprise')
    this.service.getAllfournisseur(+id).subscribe(
      data => { this.source = data; },
      error => { console.log(error); });

    if (Authorities.hasAutorities(AuthoritiesFournisseur.FOURNISSEUR_ADD_VALUE)) {
      this.add = false;
    }
    if (Authorities.hasAutorities(AuthoritiesFournisseur.FOURNISSEUR_VALUE)) {
      this.settings.actions.custom.push({
        name: 'showAction',
        title: '<i class="nb-sunny" title="Afficher"></i>',
      })
    }
    if (Authorities.hasAutorities(AuthoritiesFournisseur.FOURNISSEUR_UPDATE_VALUE)) {
      this.settings.actions.custom.push({
        name: 'editAction',
        title: '<i class="nb-edit" title="Edit"></i>',
      })
    }

    if (Authorities.hasAutorities(AuthoritiesEvaluationFournisseur.EVALUATION_FOURNISSEUR_ADD_VALUE)) {
      this.settings.actions.custom.push({
        name: 'evaluation',
        title: '<i class="nb-compose" title="Evaluation"></i>',
      });
    }

    if (Authorities.hasAutorities(AuthoritiesFournisseur.FOURNISSEUR_DELETE_VALUE)) {
      this.settings.actions.delete = true;
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
      delete: false,
      position: 'right',
      custom: [

      ],
    },
    columns: {

      raisonSocial: {
        title: 'Raison Sociale',
        type: 'string',
        filter: true,
      },
      nameF: {
        title: 'Premier résponsable',
        type: 'string',
        filter: true,
        valuePrepareFunction(row, cell) {
          return cell.nameF + ' ' + cell.lastNameF
        }
      },
      dateCreation: {
        title: 'Date création',
        type: 'Date',
        filter: true,
        width: '12vw',
        valuePrepareFunction(date) {
          return date ? format(date, "DD/MM/YYYY") : '-'
        }
      },
      status: {
        title: 'Statut',
        type: 'string',
        filter: true,
        width: '7vw',
      },
    }
  };


  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalFournisseurComponent,
      { title: 'Ajouter un Fournisseur' });
  }

  onCustom(event) {
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('e', '3');
      localStorage.setItem('idFournisseur', event.data.idF);
      this.windowService.open(ShowFournisseurComponent,
        {
          title: 'Afficher les informations de ce fournisseur',
          context: event.data.idF
        });
    }
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('e', '1');
      localStorage.setItem('idRC', event.data.idF);
      this.windowService.open(ModalFournisseurComponent,
        { title: 'Modifier un fournisseur', context: event.data.idF });
    }
    if (event.action === 'evaluation') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('e', '1');
      localStorage.setItem('idRC', event.data.idF);
      this.windowService.open(FournisseurEvaluationComponent,
        { title: 'Evaluer le fournisseur', context: event.data.idF });
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous êtes sûr(e) de supprimer ce fournisseur ?`)) {
      event.confirm.resolve(this.service.deleteFournisseurs(event.data.idF).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

}
