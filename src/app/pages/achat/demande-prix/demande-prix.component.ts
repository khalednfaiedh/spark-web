import { Component, OnInit } from '@angular/core';
import { NbWindowService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesDemandePrixAchat } from '../../../authorisation/authorities-demande-prix-achat';
import { AuthoritiesDevisProduct } from '../../../authorisation/authorities-devis-product';
import { ModalDemandePrixAchatComponent } from '../demande-prix-achat/modal-demande-prix/modal-demande-prix-achat.component';
import { DemandePrixService } from '../demande-prix/demande-prix.service';
import { ShowDemandePrixAchatComponent } from '../demande-prix-achat/show-demande-prix-achat/show-demande-prix-achat.component';
import { DemandePrixModel } from './demande-prix.model';
import { format } from 'date-fns';
import { DemandeAchatModel } from '../demande-achat/model/demande-achat.model';
import { Router } from '@angular/router';
import { DemandeAchatComponent } from '../demande-achat/demande-achat.component';
import { FournisseurService } from '../../admin/fournisseur/fournisseur.service';
import { ModalDevisAchatComponent } from '../devis-achat/modal-devis-achat/modal-devis-achat.component';
import { DevisAchatService } from '../devis-achat/services/devis-achat.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { DevisAchatComponent } from '../devis-achat/devis-achat.component';

@Component({
  selector: 'ngx-demande-prix',
  templateUrl: './demande-prix.component.html',
  styleUrls: ['./demande-prix.component.scss']
})
export class DemandePrixComponent implements OnInit {

  public static urlDemandePrix = "/pages/achat/demande-prix";
  prop: String;
  demande: DemandePrixModel = new DemandePrixModel();
  demandes: DemandePrixModel[]
  demandeFournisseurs: any
  x: any[] = []
  source: LocalDataSource = new LocalDataSource();
  proposition: DemandeAchatModel = new DemandeAchatModel()
  id = +localStorage.getItem('idRC');
  constructor(private router: Router,
    private windowService: NbWindowService,
    private serviceDevis: DevisAchatService,
    private toastrService: NbToastrService,
    private service: DemandePrixService,
    private fournisseurService: FournisseurService) { }

  ngOnInit() {
    this.service.getAllDemandePrix().subscribe(
      data => {
        this.source = data;

        // this.proposition = data.demandeAchat;
      },
      error => { console.log(error); });

    /* this.service.getFournisseursByIdDemande(this.id).subscribe(
       data => { this.source = data; }
       error => { console.log(error); });
 */
    // if (Authorities.hasAutorities(AuthoritiesDemandePrixAchat.DEMANDE_PRIX_ACHAT_VALUE)) {
    //   this.settings.actions.custom.push({
    //     name: 'showAction',
    //     title: '<i class="nb-sunny" title="Afficher"></i>',
    //   });
    // }
    if (Authorities.hasAutorities(AuthoritiesDevisProduct.DEVIS_ACHAT_ADD_VALUE)) {
      this.settings.actions.custom.push({
        name: 'devis',
        title: '<i class="nb-paper-plane" title="Devis"></i>',
      });
    }
    if (Authorities.hasAutorities(AuthoritiesDemandePrixAchat.DEMANDE_PRIX_ACHAT_UPDATE_VALUE)) {
      this.settings.actions.custom.push({
        name: 'editAction',
        title: '<i class="nb-edit" title="Modifier"></i>',
      });
    }
    if (Authorities.hasAutorities(AuthoritiesDemandePrixAchat.DEMANDE_PRIX_ACHAT_DELETE_VALUE)) {
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
      custom: [],
    },
    columns: {
      iddp: {
        title: 'Référence',
        type: 'string',
        filter: true,
      },
      designation: {
        title: 'Raison social',
        type: 'string',
        filter: true,
      },
      creePar: {
        title: 'Créer',
        type: 'string',
        filter: true,
      },

      dateDmp: {
        title: 'Date',
        type: 'date',
        filter: true,
        sort: true,
        sortDirection: 'desc',
        valuePrepareFunction(d) {
          return d ? format(d, "MMM D,YYYY") : '-'
        }
      },
    },
  };


  delete() {
    if (window.confirm(`Vous etes sure de supprimer cette demande ?`)) {
      this.service.deleteDemandePrix(this.id).subscribe(
        data => {
          this.router.navigate([DemandeAchatComponent.urlDemandeAchat]);
        },
        error => { }
      )
    }
  }

  onCustom(event) {
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.iddp);
      this.windowService.open(ShowDemandePrixAchatComponent,
        { title: 'Afficher demande de prix', context: { id: event.data.iddp } });
    }
    if (event.action == "devis") {

      this.serviceDevis.getDevisByDemanndeFournisseur(event.data.id).subscribe(
        data => {
          if (data === true) {
            this.showToast(NbToastStatus.DANGER,
              "Devis",
              "Devis existe déja");
            this.router.navigate([DevisAchatComponent.urlDevisAchat]);
          }
          if (data === false) {
            localStorage.removeItem('e');
            localStorage.removeItem('idDF');
            localStorage.setItem('idDF', event.data.id);
            this.windowService.open(ModalDevisAchatComponent, { title: 'Ajouter une devis', context: { id: event.data.id } })
          }
        }
      )

    }
    if (event.action == "editAction") {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.iddp);
      localStorage.setItem('e', '1');
      this.windowService.open(ModalDemandePrixAchatComponent, { title: 'Modifier la demande de prix', context: { id: event.data.iddp } })
    }
  }
  back() {
    this.router.navigate([DemandeAchatComponent.urlDemandeAchat]);
  }

  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
