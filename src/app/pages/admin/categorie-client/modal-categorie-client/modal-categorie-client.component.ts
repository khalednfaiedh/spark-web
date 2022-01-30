import { Component, OnInit, Inject } from '@angular/core';
import { ModeDePaiementService } from '../../mode-de-paiement/service/mode-de-paiement.service';
import { ConditionDePaiementService } from '../../condition-de-paiement/condition-de-paiement.service';
import { CategorieClient } from '../categorieClient';
import { CategorieClientService } from '../categorie-client.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbGlobalPhysicalPosition, NbWindowRef, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { CONTEXT } from '@angular/core/src/render3/interfaces/view';
import { ThemeSettingsComponent } from '../../../../@theme/components';
import { EcheanceDePaiementModel } from '../../../vente/echeance-de-paiement/echeance-de-paiement-model';
import { EcheanceDePaiementServiceService } from '../../../vente/echeance-de-paiement/echeance-de-paiement-service.service';
import { ConditionDePaiementModel } from '../../condition-de-paiement/condition-de-paiement-model';
import { ListConditionDePaiementModel } from '../../condition-de-paiement/list-condtion-de-paiement-model';
import { GrilleTarifsService } from '../../grille-tarifs/grille-tarifs.service';
import { GrilleTarifsModel } from '../../grille-tarifs/grille-tarifs-model';

@Component({
  selector: 'ngx-modal-categorie-client',
  templateUrl: './modal-categorie-client.component.html',
  styleUrls: ['./modal-categorie-client.component.scss']
})
export class ModalCategorieClientComponent implements OnInit {
  idEntr = localStorage.getItem('current_entreprise')
  grilleTarifs: GrilleTarifsModel[]
  message = ""
  etat = ""
  disabled: boolean = false;
  categorieClient = new CategorieClient();
  categoriesClient: CategorieClient[]
  echeancePaiement = new EcheanceDePaiementModel();
  e = localStorage.getItem('e')
  constructor(
    private modePaimentService: ModeDePaiementService,
    private condtionPaimentService: ConditionDePaiementService,
    private categorieClientService: CategorieClientService,
    public windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private router: Router,
    private grilleTarisService: GrilleTarifsService,
    @Inject(NB_WINDOW_CONTEXT) context,
  ) {
    /* if (context.etat == "edit") {
       this.etat = "edit"
       let id = localStorage.getItem('idCategorie')
       this.categorieClientService.getCategorieClientById(+id).subscribe(data => {
         this.categorieClient = data
         console.log(" this.categorieClient", this.categorieClient)
       })
 
       this.message = "Modfier"
     }*/



    if (context.etat == "show") {
      this.categorieClient = context.

        data
      this.disabled = true;
    }


  }

  ngOnInit() {
    if (this.e == '0') {
      this.message = "Ajouter"
    }
    this.categorieClientService.getAllCategorieClient(+this.idEntr).subscribe(data => {
      this.categoriesClient = data
    })

    this.grilleTarisService.getAllGrilleTarifs(+this.idEntr).subscribe(data => {
      this.grilleTarifs = data

    })
    if (this.e == '1') {
      this.message = "Modfier"
      let id = localStorage.getItem('idCategorie')
      this.categorieClientService.getCategorieClientById(+id).subscribe(data => {
        this.categorieClient = data

      })
    }
  }


  addCategorieClient() {

    if (this.e == '0') {
      this.categorieClientService.addCategorieClient(this.categorieClient, +this.idEntr).subscribe(
        response => {
          this.categorieClient = response;

          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", " Catégorie Client   est ajouter avec succéss")
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/admin/categorieClient"]));
        }
        , err => { console.log('err add ') }
      )

    }

    else
      if (this.e == '1') {
        this.categorieClientService.updateCategorieClient(this.categorieClient).subscribe(
          response => {
            this.categorieClient = response;
            this.showToast(NbToastStatus.SUCCESS, "SUCCESS", " Catégorie Client   est  Modfier avec succéss")
            this.windowRef.close();
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(["/pages/admin/categorieClient"]));
          }
          , err => { console.log('err edit ') }
        )
      }

  }

  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 20000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }

  onclose() {
    this.windowRef.close();
  }

}
