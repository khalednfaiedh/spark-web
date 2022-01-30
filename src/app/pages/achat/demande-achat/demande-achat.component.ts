import { ModalContratFournisseurComponent } from '../contrat-fournisseur/modal-contrat-fournisseur/modal-contrat-fournisseur.component';
import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { ModalDemandeAchatComponent } from './modal-demande-achat/modal-demande-achat.component';
import { ShowDemandeAchatComponent } from './show-demande-achat/show-demande-achat.component';
import { DemandeAchatService } from './services/demande-achat.service';
import { DatePipe } from '@angular/common'
import { ModalDemandePrixAchatComponent } from "../demande-prix-achat/modal-demande-prix/modal-demande-prix-achat.component";
import { DemandePrixAchatService } from '../demande-prix-achat/services/demande-prix-achat.service';
import { NbToastrService, NbGlobalPhysicalPosition } from "@nebular/theme";
import { ToasterConfig } from "angular2-toaster"
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesDemandeAchat } from '../../../authorisation/authorities-demande-achats';
import { AuthoritiesDemandePrixAchat } from '../../../authorisation/authorities-demande-prix-achat';
import { AuthoritiesContratFournisseur } from '../../../authorisation/authorities-contrat-fournisseur';
import { Router } from '@angular/router';
import { ConfirmDemandeAchatComponent } from './confirm-demande-achat/confirm-demande-achat.component';
import { DemandePrixAchatModel } from '../demande-prix-achat/model/demande-prix-achat.model';

@Component({
  selector: 'ngx-demande-achat',
  templateUrl: './demande-achat.component.html',
  styleUrls: ['./demande-achat.component.scss']
})
export class DemandeAchatComponent implements OnInit {
  source: any;
  t: number = 0;
  add = true;
  demandePrix: DemandePrixAchatModel[]
  constructor(private toastrService: NbToastrService,
    public datepipe: DatePipe,
    private windowService: NbWindowService,
    private service: DemandeAchatService,
    private serviceDP: DemandePrixAchatService,
    private router: Router
  ) { }
  public static urlDemandeAchat = "/pages/achat/proposition"


  ngOnInit() {
    this.service.getAllDemandeAchat().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          var dateDemande = new Date(data[i].dateDemande)
          var dateLivraison = new Date(data[i].dateLivraison)
          var dateDemandestr = this.datepipe.transform(dateDemande, 'dd-MM-yyyy')
          var dateLivraisonstr = this.datepipe.transform(dateLivraison, 'dd-MM-yyyy')
          data[i].dateDemande = dateDemandestr
          data[i].dateLivraison = dateLivraisonstr

        }
        this.source = data
      },
      error => { console.log(error); })
    this.serviceDP.getAllDemandePrix().subscribe(data => {
      this.demandePrix = data
    })
    if (Authorities.hasAutorities(AuthoritiesDemandeAchat.DEMANDE_ACHAT_ADD_VALUE)) {
      this.add = false;

    }

    console.log("add" + AuthoritiesDemandeAchat.DEMANDE_ACHAT_ADD_VALUE);
    console.log("addAuthorities" + Authorities.hasAutorities(AuthoritiesDemandeAchat.DEMANDE_ACHAT_ADD_VALUE));

    if (Authorities.hasAutorities(AuthoritiesDemandeAchat.DEMANDE_ACHAT_VALUE)) {
      this.settings.actions.custom.push({
        name: 'modal',
        title: '<i class="nb-sunny" title="Afficher"></i>',
      },
      )
    }

    if (Authorities.hasAutorities(AuthoritiesDemandePrixAchat.DEMANDE_PRIX_ACHAT_ADD_VALUE)) {
      this.settings.actions.custom.push({
        name: 'prix',
        title: '<i class="nb-paper-plane" title="Demande de prix"></i>',
      })
    }

    if (Authorities.hasAutorities(AuthoritiesContratFournisseur.CONTRAT_FOURNISSEUR_ADD_VALUE)) {
      this.settings.actions.custom.push({
        name: 'contrat',
        title: '<i class="nb-compose" title="Contrat"></i>',
      })
    }

    console.log("delete" + AuthoritiesDemandeAchat.DEMANDE_ACHAT_DELETE_VALUE);
    console.log("deleteAuthorities" + Authorities.hasAutorities(AuthoritiesDemandeAchat.DEMANDE_ACHAT_DELETE_VALUE));
    if (Authorities.hasAutorities(AuthoritiesDemandeAchat.DEMANDE_ACHAT_DELETE_VALUE)) {
      this.settings.actions.delete = true;
      console.log("hhh");
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
        {
          name: 'activateAction',
          title: '<i class="nb-power" title="Confirmer/Annuler"></i>',
        }

      ],
    },
    columns: {
      reference: {
        title: 'Référence',
        type: 'string',
        filter: true,
        width: '5vw',
      },
      designation: {
        title: 'Désignation',
        type: 'string',
        filter: true,
      },
      typeDemande: {
        title: 'Demandeur',
        type: 'string',
        filter: true,
      },
      creePar: {
        title: 'Crée par',
        type: 'string',
        filter: true,
      },
      dateDemande: {
        title: 'Date demande',
        type: 'Date',
        filter: true,

      },
      dateLivraison: {
        title: 'Date livraison',
        type: 'Date',
        filter: true,
      },
      statut: {
        title: 'Statut',
        width: '9vw',
        type: 'html',
        valuePrepareFunction: (data) => {
          if (data == 'Confirmer') {
            return '<p class="statut success">' + data + '</p>';

          } else if (data == 'Annuler') {
            return '<p class="statut danger">' + data + '</p>';

          } else return '<p class="statut warning">' + data + '</p>';

        },
      },
    },
  };
  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    localStorage.setItem('e', '0');

    this.windowService.open(ModalDemandeAchatComponent,
      { title: "Ajouter proposition d'achat" });
  }
  onCustom(event) {
    if (event.action === 'activateAction') {
      this.windowService.open(ConfirmDemandeAchatComponent,
        {
          context: {
            statut: event.data.statut,
            id: event.data.idDemandeAchat
          }
        });
    }
    if (event.action === 'modal') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.idDemandeAchat);
      this.windowService.open(ShowDemandeAchatComponent,
        { title: "Afficher proposition d'achat", context: { id: event.data.idDemandeAchat } });
    }
    if (event.action === 'edit') {
      localStorage.removeItem('e');
      localStorage.setItem('e', '1')
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.idDemandeAchat);
      this.windowService.open(ModalDemandeAchatComponent,
        { title: "Modifier proposition d'achat", context: { id: event.data.idDemandeAchat } });
    }
    if (event.action === 'contrat') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.idDemandeAchat);
      this.windowService.open(ModalContratFournisseurComponent,
        { title: 'Ajouter Contrat', context: { id: event.data.idDemandeAchat } });
    }
    if (event.action === 'prix') {
      this.t = 0;
      // this.serviceDP.getAllDemandePrix().subscribe(data => {

      /* if (this.demandePrix.length != 0) {
         console.log(this.demandePrix);
         for (let i = 0; i < this.demandePrix.length; i++) {
 
           if (this.demandePrix[i].demandeAchat.idDemandeAchat == event.data.idDemandeAchat) {*/
      this.serviceDP.getDemandePrixByProposition(event.data.idDemandeAchat).subscribe(
        dataDP => {
          if (dataDP != null) {
            console.log("dataDP", dataDP)
            localStorage.removeItem('idRC');
            localStorage.setItem('idRC', event.data.idDemandeAchat);
            this.t = 1;
            this.showToast(NbToastStatus.DANGER, "Demande de prix existe", "de réference DMP" + dataDP.iddp);
            // this.router.navigate(['/pages/achat/demande-prix']);
          } else if (event.data.statut == "Annuler" || event.data.statut == "En attente") {
            this.showToast(NbToastStatus.DANGER, "Demande Achat non confirmer", "vous ne pouvez pas effectuer une demande d'achat");
            this.t = 1;
          }
          else {
            localStorage.removeItem('e');
            localStorage.removeItem('idRC');
            localStorage.setItem('idRC', event.data.idDemandeAchat);
            console.log('IDdemandePrix', event.data.idDemandeAchat)
            localStorage.setItem('e', '0');
            this.windowService.open(ModalDemandePrixAchatComponent,
              { title: 'Demande Prix', context: { id: event.data.idDemandeAchat } });
          }
        }

      )
    }
  }


  // }
  // }
  // })

  //  }


  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette proposition ?`)) {
      event.confirm.resolve(this.service.deleteDemandeAchats(event.data.idDemandeAchat).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

  config: ToasterConfig;

  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);

  }
}
