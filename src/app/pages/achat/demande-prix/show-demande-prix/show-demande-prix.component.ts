import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { format } from 'date-fns';
import { LocalDataSource } from 'ng2-smart-table';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthoritiesDemandePrixAchat } from '../../../../authorisation/authorities-demande-prix-achat';
import { AuthoritiesDevisProduct } from '../../../../authorisation/authorities-devis-product';
import { FournisseurService } from '../../../admin/fournisseur/fournisseur.service';
import { DemandeAchatComponent } from '../../demande-achat/demande-achat.component';
import { DemandeAchatModel } from '../../demande-achat/model/demande-achat.model';
import { ModalDemandePrixAchatComponent } from '../../demande-prix-achat/modal-demande-prix/modal-demande-prix-achat.component';
import { ShowDemandePrixAchatComponent } from '../../demande-prix-achat/show-demande-prix-achat/show-demande-prix-achat.component';
import { DevisAchatComponent } from '../../devis-achat/devis-achat.component';
import { ModalDevisAchatComponent } from '../../devis-achat/modal-devis-achat/modal-devis-achat.component';
import { DevisAchatService } from '../../devis-achat/services/devis-achat.service';
import { DemandePrixModel } from '../demande-prix.model';
import { DemandePrixService } from '../demande-prix.service';

@Component({
  selector: 'ngx-show-demande-prix',
  templateUrl: './show-demande-prix.component.html',
  styleUrls: ['./show-demande-prix.component.scss']
})
export class ShowDemandePrixComponent implements OnInit {

  prop: String;
  demande: DemandePrixModel = new DemandePrixModel();
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
    this.service.getDemandeByProposition(this.id).subscribe(
      data => {
        this.demande = data;
        this.proposition = data.demandeAchat;
      },
      error => { console.log(error); });

    this.service.getFournisseursByIdDemande(this.id).subscribe(
      data => { this.source = data; },
      error => { console.log(error); });

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
      ref: {
        title: 'Référence',
        type: 'string',
        filter: true,
      },
      rs: {
        title: 'Raison social',
        type: 'string',
        filter: true,
      },
      res: {
        title: 'Premier résponsable',
        type: 'string',
        filter: true,
      },
      type: {
        title: 'Type',
        type: 'string',
        filter: true,
      },
      date: {
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
