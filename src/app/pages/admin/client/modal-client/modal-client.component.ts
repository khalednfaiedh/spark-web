import { Component, OnInit, Input } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { ClientModel } from '../client.model';
import { FormeJuridiqueService } from '../../forme-juridique/forme-juridique.service';
import { FormeJuridiqueModel } from '../../forme-juridique/forme-juridique.model';
import { ClientComponent } from '../client.component';
import { FileService } from '../../files/service/file.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NgForm } from '@angular/forms';
import { CategorieClientService } from '../../categorie-client/categorie-client.service';
import { GrilleTarifsModel } from '../../grille-tarifs/grille-tarifs-model';
import { GrilleTarifsService } from '../../grille-tarifs/grille-tarifs.service';
import { CategorieClient } from '../../categorie-client/categorieClient';
import { ConditionDePaiementService } from '../../condition-de-paiement/condition-de-paiement.service';
import { ModeDePaiementService } from '../../mode-de-paiement/service/mode-de-paiement.service';
import { ConditionDePaiementModel } from '../../condition-de-paiement/condition-de-paiement-model';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { Entreprise } from '../../entreprise/entreprise';
import { AdminComponent } from '../../admin.component';

@Component({
  selector: 'ngx-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.scss']
})
export class ModalClientComponent implements OnInit {
  modes: any = []
  condtion: ConditionDePaiementModel[]

  formeJuridiques: FormeJuridiqueModel[];
  client: ClientModel;
  show: boolean;
  ARCP: string;
  // file: File;
  SubmitEvent: any
  selectedFiles: FileList;
  currentFileUpload: File;
  categories: any[]
  grilleTarifs: GrilleTarifsModel[]
  grille: string
  categorieClient: CategorieClient = new CategorieClient()
  idEntr = localStorage.getItem('current_entreprise')
  starategiePaiement: string
  payes = AdminComponent.PAYES_LIST
  constructor(private service: ClientService,
    private serviceFile: FileService,
    private serviceFormeJuridique: FormeJuridiqueService,
    public windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    public router: Router,

    private catergorieClientService: CategorieClientService,
    private grilleTarifsService: GrilleTarifsService, private condtionPaimentService: ConditionDePaiementService,
    private modePaimentService: ModeDePaiementService) { }

  ngOnInit() {
    this.client = new ClientModel();

    let e = localStorage.getItem('e');
    console.log(e);

    this.serviceFormeJuridique.getAllFormeJuridique(+this.idEntr).subscribe(data => {
      this.formeJuridiques = data

    },
      error => {
        console.error("error")
      });
    this.grilleTarifsService.getAllGrilleTarifs(+this.idEntr).subscribe(data => {
      this.grilleTarifs = data

    },
      error => {
        console.error("error")
      });
    this.catergorieClientService.getAllCategorieClient(+this.idEntr).subscribe(
      data => {
        this.categories = data
        console.log('this.coteg', this.categories)
      }

    )

    this.modePaimentService.getAllModeDePaiement(+this.idEntr).subscribe(
      data => { this.modes = data }
    )


    if (e === '0') {
      this.ARCP = 'Ajouter';

    }

    if (e === '1') {
      let id = localStorage.getItem('idClient');
      this.ARCP = 'Modifier';

      this.service.getClientById(+id).subscribe(
        data => {
          this.client = data;
          // this.categorieClient = this.client.categorieClient

          this.starategiePaiement = this.client.conditionsDePaiements.strategie
          console.log('ng onit this client', this.client)
        },
        error => { console.log(error); },
      );



    }




  }
  getGrilleTarifsByCategorie() {
    let e = localStorage.getItem('e');

    console.log("dataCategorie1", this.client.categorieClient)
    this.client.grilleTarifs = this.client.categorieClient.grilleTarifs;

  }
  getListConditionPaiementParStragie() {

    this.condtionPaimentService.getAllConditionDePaiementbyTypeEcheancier("Client", this.starategiePaiement).subscribe(
      data => {
        this.condtion = data


      }
    )

  }
  onAddRCM() {
    let e = localStorage.getItem('e');
    console.log(event)
    if (e === '0') {
      //   this.client.categorieClient = this.categorieClient
      this.service.addClient(this.client, +this.idEntr).subscribe(
        (data: any) => {
          console.log("dataClient===>", data)
          localStorage.removeItem('e');
          localStorage.setItem('idClient', data.code_clt);
          this.showToast(NbToastStatus.SUCCESS, "Client", "  est ajouter avec succéss" + " " + "vous pouvez ajouter les informations supplémentaires de client")
        },
        error => {
          console.log('error');
          this.showToast(NbToastStatus.DANGER, "Error", "")
        });


    }
    if (e === '1') {
      this.service.updateClient(this.client).subscribe(
        data => {
          this.client = data
          localStorage.removeItem('e');
          localStorage.removeItem('idClient');
          this.showToast(NbToastStatus.SUCCESS, "Client CLT", + data.code_clt + " est modifer")
          this.router.navigate([ClientComponent.urlRefreshClient]);
          this.windowRef.close();
        },
        error => {
          console.log(error);
          this.showToast(NbToastStatus.DANGER, "Error", "")
        });
      console.log(this.client)
    }

  }
  change() {
    if (this.client.nature = "Société partiellement exportatrice") {
      this.client.exonerationTva = "Soumis à la TVA"
      console.log(" this.client.exonerationTva", this.client.exonerationTva);
    }
  }

  onclose() {
    this.windowRef.close();
    this.router.navigate([ClientComponent.urlRefreshClient]);
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 10000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
