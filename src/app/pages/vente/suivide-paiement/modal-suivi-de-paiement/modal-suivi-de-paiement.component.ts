import { Component, OnInit, Inject } from '@angular/core';
import { SuiviDePaiementService } from '../suivi-de-paiement.service';
import { SuividePaiementModel } from '../Suivi-de-paiement-model';
import { DevisClientService } from '../../devis-client/devis-client.service';
import { CommandeService } from '../../commande/commande.service';
import { NbWindowService, NbWindowRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { SuividePaiementComponent } from '../suivide-paiement.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';

@Component({
  selector: 'ngx-modal-suivi-de-paiement',
  templateUrl: './modal-suivi-de-paiement.component.html',
  styleUrls: ['./modal-suivi-de-paiement.component.scss']
})
export class ModalSuiviDePaiementComponent implements OnInit {
  A = ""
  id: number;
  suiviPaiement = new SuividePaiementModel();
  idFacture: number
  modesPaiements = []
  referenceFacture: string;
  test: string
  disabled: boolean = false;
  idEntr = localStorage.getItem('current_entreprise')
  constructor(
    private serviceModePaiement: ModeDePaiementService,
    private serviceSP: SuiviDePaiementService,
    private windowService: NbWindowRef,
    private router: Router,
    private toastrService: NbToastrService,
    @Inject(NB_WINDOW_CONTEXT) context) {

    console.log(context)

    this.idFacture = context.idfacture
    this.id = context.id;
    if (context.id == -1) {
      this.A = "AJOUTER"
    } else if (context.id == 1) {
      this.A = "Modfier"
      this.serviceSP.getSuiviPaiementById(context.idSuivi).subscribe(dataSP => {
        this.suiviPaiement = dataSP


      })
    }
    else
      if (context.id = 2) {

        this.serviceSP.getSuiviPaiementById(context.idSuivi).subscribe(dataSP => {
          this.suiviPaiement = dataSP
          this.disabled = true;


        })
      }

  }

  ngOnInit() {


    this.serviceModePaiement.getAllModeDePaiement(+this.idEntr).subscribe(data => {
      this.modesPaiements = data; console.log(data)

    })
    // let idSP = localStorage.getItem('idSP');
    // this.serviceSP.getSuiviPaiementById(+idSP).subscribe(dataSP => {
    //   this.suiviPaiement = dataSP
    //   this.referenceFacture = "FCT" + this.suiviPaiement.code_fac;

    // })
  }
  OnAddSP() {
    if (this.id == -1) {


      this.serviceSP.addSuiviPaiement(this.suiviPaiement, this.idFacture).subscribe(
        response => {
          this.showToast(NbToastStatus.SUCCESS, "Suivi  Paiement", "est  Ajouter  avec succéss")
          // this.router.navigate(['/pages/vente/suiviPaiement/:id']);
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/pages/vente/suiviPaiement', +this.idFacture.toString()]));
          this.windowService.close();
        },
        err => { console.log("err") }
      )
    }
    else
      if (this.id == 1) {

        this.serviceSP.updateSuiviPaiement(this.suiviPaiement, this.suiviPaiement.id).subscribe(dataSP => {
          this.suiviPaiement = dataSP
          this.showToast(NbToastStatus.SUCCESS, "Suivi Paiement", "est modifier avec succéss")

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/pages/vente/suiviPaiement', this.idFacture]));
          this.windowService.close();
        },
          error => {
            this.showToast(NbToastStatus.DANGER, "Erreur", "")
          }
        )
      }
  }
  onclose() {
    this.windowService.close();
  }
  // montantReste() {
  //   this.suiviPaiement.montantReste = this.suiviPaiement.sommeFinale - this.suiviPaiement.montantPayer
  //   console.log("MR", this.suiviPaiement.montantReste)
  // }
  changeStatutPaiement() {
    if (this.suiviPaiement.montantReste == 0) {
      this.suiviPaiement.statutPaiement = "Payée totalement"
      console.log("SSP1", this.suiviPaiement.statutPaiement)
    }
    else if (this.suiviPaiement.montantPayer == 0) {
      this.suiviPaiement.statutPaiement = 'Non payée totalement';

    }
    else {
      this.suiviPaiement.statutPaiement = " Partiellement payée"
    }

  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
