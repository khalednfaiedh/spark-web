import { ModalBilanComponent } from './../bilan/modal-bilan/modal-bilan.component';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
// import { ModaleBonCommandeComponent } from './modale-bon-commande/modale-bon-commande.component';
import { ShowBonCommandeComponent } from './show-bon-commande/show-bon-commande.component';
import { BonCommandeService } from './services/bon-commande.service';
import { DatePipe, DOCUMENT } from '@angular/common'
import { DemandePrixAchatService } from '../demande-prix-achat/services/demande-prix-achat.service';
import { NbToastrService, NbGlobalPhysicalPosition } from "@nebular/theme";
import { ToasterConfig } from "angular2-toaster"
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { ModalEvaluationFournisseurComponent } from '../evaluation-fournisseur/modal-evaluation/modal-evaluation-fournisseur.component';
import { UpdateBonCommandeComponent } from './update-bon-commande/update-bon-commande.component';
import { Cookie } from 'ng2-cookies';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesBonCommande } from '../../../authorisation/authorities-bon-commande';
import { AuthoritiesHistoriqueCommande } from '../../../authorisation/authorities-historique-commande';
import { AuthoritiesEvaluationFournisseur } from '../../../authorisation/authorities-evaluation-fournisseur';
import { ModaleBonCommandeComponent } from './modale-bon-commande/modale-bon-commande.component';
import { ModalBonCommandeComponent } from './modal-bon-commande/modal-bon-commande.component';

@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" size="xsmall" status="warning" nbButton type="submit" value="Payement"/>\n' +
    '    </div>',
})
export class ButtonViewPayeComponent implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private router: Router,
    @Inject(DOCUMENT) private document: any) {
  }

  onClick() {
    Cookie.set("idCommande", this.rowData.idBC);
    console.log(this.rowData.idBC)
    this.document.localStorage = localStorage.setItem('idCommande', this.rowData.id);
    localStorage.setItem('idCommande', this.rowData.id);
  }
}
@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" size="xsmall" status="info" nbButton type="submit" value="Commande"/>\n' +
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
  constructor(private router: Router) {
  }

  onClick(event) {
    localStorage.setItem('idCommande', this.rowData.idBC);
    this.router.navigate([BonCommandeComponent.urlHistoriqueBonCommande]);
  }
}

@Component({
  selector: 'ngx-demande-achat',
  templateUrl: './bon-commande.component.html',
  styleUrls: ['./bon-commande.component.scss']
})
export class BonCommandeComponent implements OnInit {
  public static urlBonCommande = "/pages/achat/bonCommande";
  public static urlHistoriqueBonCommande = "/pages/achat/historiqueCommande";
  public static urlRefreshBonCommande = "/pages/achat/refreshBonCommande"
  source: LocalDataSource = new LocalDataSource();
  i: any;
  t: number = 0;
  value: boolean;
  facture: any = new Object()
  constructor(private router: Router,
    private toastrService: NbToastrService,
    public datepipe: DatePipe,
    private windowService: NbWindowService,
    private service: BonCommandeService,
    private serviceDP: DemandePrixAchatService,
  ) { }

  config: ToasterConfig;

  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 6000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }

  ngOnInit() {
    this.service.getAllBonCommande().subscribe(
      data => {
        for (this.i = 0; this.i < data.length; this.i++) {
          if (data[this.i].dateCommande != null) {
            var dateDemandestr = this.datepipe.transform(data[this.i].dateCommande, 'dd/MM/yyyy');
            data[this.i].dateCommande = dateDemandestr;
          }
          if (data[this.i].dateLivraison != null) {
            var dateLivraisonstr = this.datepipe.transform(data[this.i].dateLivraison, 'dd/MM/yyyy');
            data[this.i].dateLivraison = dateLivraisonstr;
          }
        }
        this.source = new LocalDataSource(data)
      },
      error => { console.log(error); });
    if (Authorities.hasAutorities(AuthoritiesBonCommande.BON_COMMANDE_VALUE)) {
      this.settings.actions.custom.push({ name: 'modal', title: '<i class="nb-sunny" title="Afficher"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesBonCommande.BON_COMMANDE_UPDATE_VALUE)) {
      this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesBonCommande.BON_COMMANDE_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
    if (Authorities.hasAutorities(AuthoritiesHistoriqueCommande.HISTORIQUE_COMMANDE_LIST_VALUE)) {

    }
    // if (Authorities.hasAutorities(AuthoritiesEvaluationFournisseur.EVALUATION_FOURNISSEUR_ADD_VALUE)) {
    //   this.settings.actions.custom.push({
    //     name: 'evaluation',
    //     title: '<i class="nb-compose" title="Evaluation"></i>',
    //   })
    // }
  }

  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-trash" title="supprimer"></i>',
      confirmDelete: true,
    },
    actions: {
      delete: false,
      add: false,
      edit: false,
      position: 'right',
      custom: [

      ],
    },
    rowClassFunction: (row) => {
      if (row.data.status == 'en_attente') {
        return 'solved';
      }
      if (row.data.status == 'confirmer') {
        return 'aborted';
      }
    },
    columns: {
      reference: {
        title: 'Référence',
        type: 'Date',
        filter: true,
      },
      dateCommande: {
        title: 'Date Commande',
        type: 'Date',
        filter: true,

      },
      dateLivraison: {
        title: 'Date Livraison  ',
        type: 'Date',
        filter: true,
      },
      statut: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (data) => {
          if (data == 'confirmer') {
            return '<p class="statut success"> Confirmé </p>';
          }
          else if (data == 'refuser') {
            return '<p class="statut danger">Refusé</p>';
          }
          else if (data == 'en_attente') {
            return '<p class="statut warning">En attente</p>';
          }
          else if (data == 'cloturer') {
            return '<p class="statut info">Cloturé</p>';
          }
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Status',
            list: [
              { value: 'en_attente', title: 'En attente' },
              { value: 'confirmer', title: 'Confirmé' },
              { value: 'refuser', title: 'Refusé' },
              { value: 'cloturer', title: 'Cloturé' },],
          },
        },
      },
      historiqueCommande: {
        title: 'Historique',
        type: 'custom',
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            localStorage.setItem('idCommande', row.id);
          });
        },
      },
      paye: {
        title: 'Payement',
        type: 'custom',
        renderComponent: ButtonViewPayeComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            localStorage.setItem('idCommande', row.id);
          });
        },
      },
    },
  };

  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idBC');
    localStorage.setItem('e', '0');

    this.windowService.open(ModalBonCommandeComponent,
      { title: 'Ajouter Bon Commande' });
  }

  onCustom(event) {
    if (event.action === 'modal') {
      localStorage.removeItem('e');
      localStorage.removeItem('idBC');
      localStorage.setItem('idBC', event.data.idBC);
      this.windowService.open(ShowBonCommandeComponent,
        { title: 'Afficher Bon Commande', context: { id: event.data.idBC } });
    }
    if (event.action === 'bilan') {
      localStorage.removeItem('e');
      localStorage.removeItem('idBC');
      localStorage.setItem('idBC', event.data.idBC);
      this.windowService.open(ModalBilanComponent,
        { title: 'Ajouter Bilan', context: { id: event.data.idBC } });
    }
    if (event.action === 'editAction') {
      if (event.data.staus === "confirmer") {
        localStorage.removeItem('e');
        localStorage.removeItem('idBC');
        localStorage.setItem('idBC', event.data.idBC);
        this.windowService.open(UpdateBonCommandeComponent,
          { title: "Modifier l'étape du bon de commande", context: { id: event.data.idBC } });
      }
      else{
        this.showToast(NbToastStatus.DANGER, "Bon de commande", "Vérifier la status de votre bon de commande");
      }
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette bon de commande?`)) {
      event.confirm.resolve(this.service.deleteBonCommandes(event.data.idBC).subscribe(
        data => {
          this.source.remove(event)
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
}