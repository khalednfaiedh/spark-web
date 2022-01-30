import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { FournisseurModel } from '../fournisseur.model';
import { FournisseurService } from '../fournisseur.service';
import { FormeJuridiqueService } from '../../forme-juridique/forme-juridique.service';
import { FormeJuridiqueModel } from '../../forme-juridique/forme-juridique.model';
import { FournisseurComponent } from '../fournisseur.component';
import { AdminComponent } from '../../admin.component';
import { FournisseurCategorieService } from '../../fournisseur-categorie/fournisseur-categorie.service';
import { FournisseurCategorie } from '../../fournisseur-categorie/fournisseur-categorie.model';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-modal-fournisseur',
  templateUrl: './modal-fournisseur.component.html',
  styleUrls: ['./modal-fournisseur.component.scss'],
})
export class ModalFournisseurComponent implements OnInit {
  formeJuridiques: FormeJuridiqueModel[];
  ARCM: string;
  fournisseur: FournisseurModel = new FournisseurModel()
  payes = AdminComponent.PAYES_LIST;
  status = AdminComponent.STATUS;
  TVA = AdminComponent.TVA;
  allCategories: FournisseurCategorie[];
  selectedCatg: FournisseurCategorie[];
  idEntr = localStorage.getItem('current_entreprise')
  constructor(private service: FournisseurService, private serviceFormeJuridique: FormeJuridiqueService,
    private router: Router,
    private windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private categorieService: FournisseurCategorieService) { }

  ngOnInit() {
    let id = localStorage.getItem('current_entreprise')
    this.fournisseur = new FournisseurModel();
    this.serviceFormeJuridique.getAllFormeJuridique(+this.idEntr).subscribe(
      data => { this.formeJuridiques = data; },
      error => { console.log(error); },
    );
    this.categorieService.getAll(+id).subscribe(
      data => { this.allCategories = data; },
      error => { console.log(error); },
    );
    let e = localStorage.getItem('e')
    console.log(e);
    if (e === '0') {
      this.ARCM = 'Ajouter';
    }

    if (e === '1') {
      let id = localStorage.getItem('idRC')
      this.ARCM = 'Modifier';
      this.service.getFournisseurById(+id).subscribe(
        data => {
          this.fournisseur = data;
          this.fournisseur.fourn_Catg.forEach(
            i => (i.name = i.categorieFournisseur.name,
              i.id = i.categorieFournisseur.id
            )
          )
        },
        error => { console.log('error'); },
      );
      // this.service.getCategorieByFournisseur(+id).subscribe(
      //  data => {this.fournisseur.fourn_Catg = data
      //   this.fournisseur.fourn_Catg.forEach(
      //     i => (i.name = i.categorieFournisseur.name)
      //   )
      //   console.log(this.fournisseur.fourn_Catg)
      // },
      //  error =>{console.log(error)}
      // )
    }
  }



  onAddRCM() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      let id = localStorage.getItem('current_entreprise')
      this.service.addFournisseurs(+id,this.fournisseur).subscribe(
        data => {

          console.log("fournisseur", data)
          localStorage.removeItem('e');
          localStorage.removeItem('idRC');
          localStorage.setItem('idFournisseur', data.idF);
          this.showToast(NbToastStatus.SUCCESS, "Fourinisseur", "  est ajouter avec succéss" + " " + "vous pouvez ajouter les informations supplémentaires de client")
          //this.router.navigate([ClientComponent.urlRefreshClient]);
          // this.windowRef.close();
        },
        error => { console.log('error'); });
    }
    if (e === '1') {
      let id = localStorage.getItem('current_entreprise')
      this.service.updateFournisseurs(+id,this.fournisseur).subscribe(
        data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idRC');
          localStorage.setItem('idFournisseur', data.idF);
          this.windowRef.close();
          this.router.navigate([FournisseurComponent.urlRefreshFournisseur]);
        },
        error => { console.log('error'); });
    }
  }
  close() {
    this.windowRef.close();
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