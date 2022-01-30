import { Component, OnInit } from '@angular/core';
import { Enterprise } from '../entreprise/entreprise';
import { Excercice, ExcerciceService } from '../excercice/excercice.service';
import { GrandLivreModel } from '../grand-livre/grand-livre.model';
import { EntrepriseService } from '../entreprise/entreprise.service';
import { Router } from '@angular/router';
import { EcritureService } from '../ecriture/ecriture.service';
import { LivreTiersService } from './livre-tiers.service';
import { PlanGeneralService } from '../plan-general/plan-general.service';
import { ImportExportService } from '../import-export/import-export.service';

@Component({
  selector: 'ngx-grand-livre-tiers',
  templateUrl: './grand-livre-tiers.component.html',
  styleUrls: ['./grand-livre-tiers.component.scss']
})
export class GrandLivreTiersComponent implements OnInit {

  entreprise = new Enterprise();
  exercice = new Excercice();
  operations = []
  plans = [];
  comptes = [];
  exercices = []
  id: any
  grandLivre: GrandLivreModel;
  result = [];
  classes = ["1", "2", "3", "4", "5", "6", "7"]
  exerciceBoolean: boolean;
  constructor(private entrepriseService: EntrepriseService,
    private exerciceService: ExcerciceService,
    private router: Router,
    private ecritureService: EcritureService,
    private grnadLivreService: LivreTiersService,
    private PlanGeneralService: PlanGeneralService,
    private excelService:ImportExportService) { }

  ngOnInit() {

    this.grandLivre = new GrandLivreModel()
    this.grandLivre.classe = null;
    this.grandLivre.codeCompte = null;
    this.grandLivre.date1 = null;
    this.grandLivre.date2 = null;


    let idEntreprise = localStorage.getItem('current_entreprise');

    this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
      data => {
      this.entreprise = data;

        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
    this.exerciceService.getAllExcercice(+idEntreprise).subscribe(
      data => { this.exercices = data },
      error => { console.log("ereur excercices") }


    )
    let idExercice1 = localStorage.getItem('idExercice')
    let idExercice= localStorage.getItem('idExercice')
    if( idExercice == null)
    {
      this.exerciceBoolean =true;
    }
    else
    {
      this.exerciceBoolean=false;
    }
    this.exerciceService.getExcerciceById(+idExercice1).subscribe(
      data => {
      this.exercice = data;
      this.grandLivre.annee = this.exercice.annee;
        console.log(data)
        this.grnadLivreService.GarndLivreTiers(this.exercice.annee).subscribe(
          data => { this.plans = data; console.log(" data for grnand livre"); console.log(data) },
          error => { console.log(' err get grand livre tiers   ') }

        );
      },
      error => { console.log(error); }
    );

    // let idExercice = localStorage.getItem('idExerciceFilter')

    // this.exerciceService.getExcerciceById(+idExercice).subscribe(
    //   data => {
    //   this.exercice = data;
    //     this.grnadLivreService.GarndLivreTiers(this.exercice.annee).subscribe(
    //       data => { this.plans = data; console.log(data) },
    //       error => { console.log('ok plan') }

    //     );
    //   },
    //   error => { console.log(error); }
    // );

    // this.ecritureService.getAllOperationEcritureByPlanGenerale(1852).subscribe(

    // data=>{this.operations=data;console.log(data)},
    // error=>{console.log('error get all operation bby  journal')}

    // );

    this.PlanGeneralService.getAllPlanGeneralAndTiers().subscribe(
      data => { this.comptes = data; },
      error => { console.log("data error get comptes") }
    )

  }

  onClick03() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/exercice']));
  }

  getTotolDebit(j) {
    var somme = 0;
    for (let i = 0; i < this.plans[j].operationEcritures.length; i++) {
      somme += this.plans[j].operationEcritures[i].debit;
    }
    return somme;
  }

  getTotolCredit(j) {
    var somme = 0;
    for (let i = 0; i < this.plans[j].operationEcritures.length; i++) {
      somme += this.plans[j].operationEcritures[i].credit;
    }
    return somme;
  }

  getEtatCompte(j) {
    var x = this.getTotolDebit(j) - this.getTotolCredit(j);
    if (x == 0) {
      return "";
    }
    else if (x > 0) {
      return " SOLDE DEBITEUR"
    }
    else if (x < 0) {
      return "  SOLDE CREDITEUR"
    }
  }

  getCumule(j) {
    var x = this.getTotolDebit(j) - this.getTotolCredit(j);
    ;
    return x.toFixed(3);
  }

  getGrandLivre(id) {
    this.exerciceService.getExcerciceById(+id).subscribe(
      data => {
      this.exercice = data;
        console.log(data)
        this.grnadLivreService.GarndLivreTiers(this.exercice.annee).subscribe(
          data => { this.plans = data; console.log(data) },
          error => { console.log('ok plan') }

        );
      },
      error => { console.log(error); }
    );


  }
  filterByDate() {
    // this.grandLivre.annee=this.exercice.annee;
    // if(this.grandLivre.codeCompte== null)
    // {
    //   this.grandLivre.codeCompte="";
    // }
    // this.grnadLivreService.filterGarndLivreTiers(this.grandLivre).subscribe(

    //   data=>{this.plans=data;
    //     console.log(this.grandLivre)
    //     console.log(data)},
    //         error=>{console.log('data error result')}
    // )
 
    console.log(this.grandLivre)
    if (this.grandLivre.classe != null && (this.grandLivre.codeCompte != null || this.grandLivre.date1 != null || this.grandLivre.date2 != null)) {
      if (this.grandLivre.codeCompte == null) {
        this.grandLivre.codeCompte = "";
      }
      console.log("tous  critér")
      this.grnadLivreService.filterGrandLivreGeneralByTousCritere(this.grandLivre).subscribe(

        data => {
          this.plans = data
          console.log(this.grandLivre)
          console.log(data), this.grandLivre.codeCompte = null
        },
        error => { console.log('data error result'), this.grandLivre.codeCompte = null }
      )
      this.grandLivre.codeCompte = null
    }
    else if (this.grandLivre.classe === null && (this.grandLivre.codeCompte != null || this.grandLivre.date1 != null || this.grandLivre.date2 != null)) {
      console.log("ancien critér")
      if (this.grandLivre.codeCompte == null) {
        this.grandLivre.codeCompte = "";
      }
      console.log(this.grandLivre)
      this.grnadLivreService.filterGarndLivreTiers(this.grandLivre).subscribe(

        data => {
          this.plans = data
          console.log(this.grandLivre)
          console.log(data), this.grandLivre.codeCompte = null
        },
        error => {
          console.log('data error result'); this.grandLivre.codeCompte = null
        }
      )
    }
    else
      if (this.grandLivre.classe != null && (this.grandLivre.codeCompte === null && this.grandLivre.date1 === null && this.grandLivre.date2 === null)) {
        console.log("classe si tt")
        if (this.grandLivre.codeCompte == null) {
          this.grandLivre.codeCompte = "";
        }
        console.log(this.grandLivre)
        this.grnadLivreService.getGrandLivreTiersByClasse(this.grandLivre.annee, this.grandLivre.classe).subscribe(

          data => {
            this.plans = data
            console.log(this.grandLivre)
            console.log(data), this.grandLivre.codeCompte = null
          },
          error => { console.log('data error result'), this.grandLivre.codeCompte = null }
        )
      }
      else {
        this.ngOnInit();
      }

      
  }

  dataNotFound() {
    if (this.plans === null || this.plans.length === 0) {
      return true;
    }
    return false;
  }
  refresh() {
    this.ngOnInit()
  }

  exportToExcel()
  {
    this.grnadLivreService.exportGrandLivreTier(this.plans).subscribe(
 
     data=>{console.log(data);this.excelService.exportAsExcelFile(data,'GRAND-LIVRE-Tiér');},
     error=>{console.log("error")}
    )
  }
}
