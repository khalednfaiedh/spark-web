import { NbWindowRef } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { FournisseurModel } from '../fournisseur.model';
import { FournisseurService } from '../fournisseur.service';
import { FournisseurCategorieService } from '../../fournisseur-categorie/fournisseur-categorie.service';
import { FournisseurCategorie } from '../../fournisseur-categorie/fournisseur-categorie.model';

@Component({
  selector: 'ngx-show-fournisseur',
  templateUrl: './show-fournisseur.component.html',
  styleUrls: ['./show-fournisseur.component.scss']
})
export class ShowFournisseurComponent implements OnInit {
  fournisseur: FournisseurModel;
  allCategories: FournisseurCategorie[];

  constructor(private windowRef: NbWindowRef,
    private categorieService: FournisseurCategorieService,
    private service: FournisseurService) { }

  ngOnInit() {
    let idEntreprise = localStorage.getItem('current_entreprise')
    this.fournisseur = new FournisseurModel();
    let id = localStorage.getItem('idFournisseur');
    this.service.getFournisseurById(+id).subscribe(
      data => {
        this.fournisseur = data;
        this.fournisseur.fourn_Catg.forEach(
          i => (i.name = i.categorieFournisseur.name,
            i.id = i.categorieFournisseur.id
          )
        )
      },
      error => { console.log(error); });
    this.categorieService.getAll(+idEntreprise).subscribe(
      data => { this.allCategories = data; },
      error => { console.log(error); },
    );
  }
  close() {
    this.windowRef.close();
  }



}
