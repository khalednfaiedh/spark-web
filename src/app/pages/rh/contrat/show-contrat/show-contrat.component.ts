import { Component, OnInit } from '@angular/core';
import { ContratService } from '../contrat.service';
import { ContratModel } from '../contrat.model';
import { RegimeHoraireModel } from '../../../rh-parametrage/regime-horaire/regimeHoraire.model';
import { CategorieService } from '../../../rh-parametrage/categorie/categorie.service';
import { RegimeHoraireeService } from '../../../rh-parametrage/regime-horaire/regimeHoraire.service';
import { NbWindowRef } from '@nebular/theme';
import { CategorieModel } from '../../../rh-parametrage/categorie/categoeie.model';
import { EntrepriseService } from '../../../admin/entreprise/entreprise.service';
import { Entreprise } from '../../../admin/entreprise/entreprise';

@Component({
  selector: 'ngx-show-contrat',
  templateUrl: './show-contrat.component.html',
  styleUrls: ['./show-contrat.component.scss'],
})
export class ShowContratComponent implements OnInit {

  contrat: ContratModel;
  categorie: CategorieModel[];
  regimes: RegimeHoraireModel[];
  regime: RegimeHoraireModel;

 
  entreprises:Entreprise[];
 
  constructor(private service: ContratService,
    private categorieService: CategorieService,
    private regimeService: RegimeHoraireeService,
    private entrepriseService: EntrepriseService,
    private windowRef: NbWindowRef) { }

  ngOnInit() {
    this.contrat = new ContratModel();
    this.regime = new RegimeHoraireModel()
    let id = localStorage.getItem('idC');
    this.service.getContratsById(+id).subscribe(
      data => { this.contrat = data;
        this.regime = data.regime },
      error => { });

    this.categorieService.getAllCategorie().subscribe(
      data => { this.categorie = data; },
      error => { });

    this.regimeService.getAllRegimes().subscribe(
      data => { this.regimes = data; },
      error => { });


    this.entrepriseService.getAllEnterprise().subscribe(
      data => { this.entreprises = data; },
      error => { }
    );
  }

  onClose() {
    this.windowRef.close()
  }
}