import { Component, OnInit } from '@angular/core';
import { Journal } from '../../journal/journal.service';
import { PlanTiersService } from '../../plan-tiers/plan-tiers.service';
import { PlanGeneralService } from '../../plan-general/plan-general.service';
import { ExcerciceService, Excercice } from '../../excercice/excercice.service';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { Router } from '@angular/router';
import { Enterprise } from '../../entreprise/entreprise';
import { EcritureService } from '../ecriture.service';
import { TostarService } from '../../tostar/tostar.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbWindowService } from '@nebular/theme';
import { OuvrirModelComponent } from '../../modele-ecriture/ouvrir-model/ouvrir-model.component';

@Component({
  selector: 'ngx-ecriture-by-lot',
  templateUrl: './ecriture-by-lot.component.html',
  styleUrls: ['./ecriture-by-lot.component.scss']
})
export class EcritureByLotComponent implements OnInit {
  ecriture = new EcritureLotModal()
  comptesGeneral = []
  comptesTiers = []
  source = []
  i = 0;
  exercice = new Excercice()
  entreprise = new Enterprise()
  constructor(private planTierService: PlanTiersService,
    private planGeneralService: PlanGeneralService,
    private exerciceService: ExcerciceService
    , private entrepriseService: EntrepriseService,
    private router: Router,
    private ecritureService: EcritureService,
    private tostarService:TostarService,
    private windowService: NbWindowService) { }

  ngOnInit() {
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

    let idExercice = localStorage.getItem('idExercice')

    this.exerciceService.getExcerciceById(+idExercice).subscribe(
      data => {
      this.exercice = data;
        this.exercice = this.exercice;
      },
      error => { console.log(error); }
    );




    this.ecriture.debit = null
    this.ecriture.credit = null
    this.ecriture.compteTier = null

    let annee = localStorage.getItem('annee')
    let idJournal2 = localStorage.getItem('idJournal2')
    let codJournal = localStorage.getItem('codJournal')
    let mois = localStorage.getItem('mois')

 

    this.ecriture.annee = annee;
    this.ecriture.idJournal = +idJournal2;
    this.ecriture.codJournal = codJournal;
    this.ecriture.mois = mois;

    this.planGeneralService.getAllPlanGeneral().subscribe(
      data => { this.comptesGeneral = data },
      error => { console.log("error get all pla general") }
    )

    this.planTierService.getAllPlanTiers().subscribe(
      data => { this.comptesTiers = data },
      error => { console.log("error get all pla  tier") }
    )

  }

  onClick03() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/comptabilite/exercice']));
  }

  addToTab(item) {


    console.log(this.ecriture)


    let nameCode = ""
    if (this.ecriture.compteTier === null) {
      nameCode = ""
    } else {
      nameCode = this.ecriture.compteTier.nameCode
    }

    if (this.ecriture.debit === null || this.ecriture.debit === "") {
      this.source.push({
        idJournal: this.ecriture.idJournal,
        mois: this.ecriture.mois,
        codJournal: this.ecriture.codJournal,
        jour: this.ecriture.jour,
        annee: this.ecriture.annee,
        numeroPiece: this.ecriture.numeroPiece,
        compteGeneral: this.ecriture.compteGeneral,
        compteTier: this.ecriture.compteTier,
        debit: 0,
        credit: this.ecriture.credit,
        nameCode: nameCode,

      })

    }

    if (this.ecriture.credit === null || this.ecriture.credit === "") {
      this.source.push({
        idJournal: this.ecriture.idJournal,
        mois: this.ecriture.mois,
        codJournal: this.ecriture.codJournal,
        jour: this.ecriture.jour,
        annee: this.ecriture.annee,
        numeroPiece: this.ecriture.numeroPiece,
        compteGeneral: this.ecriture.compteGeneral,
        compteTier: this.ecriture.compteTier,
        debit: this.ecriture.debit,
        credit: 0,
        nameCode: nameCode,

      })
    }





    console.log(this.source)
  }

  getTotalDebit() {

    var x;
    let total = 0;
    for (let item of this.source) {
      x = parseFloat(item.debit)
      if (isNaN(x)) {
        item.debit = 0;

      }


      total += parseFloat(item.debit);


    }

    if (!isNaN(total)) {
      return total.toFixed(3);

    }
  }


  getTotalCredit() {


    let total = 0;
    var x;
    for (let item of this.source) {
      x = parseFloat(item.credit)
      if (isNaN(x)) {
        item.credit = 0;
      }
      total += parseFloat(item.credit)
    }
    if (!isNaN(total)) {
      return total.toFixed(3);
    }
  }

  getEcartDebitCredit() {
    let debit = parseFloat(this.getTotalDebit());
    let credit = parseFloat((this.getTotalCredit()));
    let ecart = debit - credit;
    return ecart.toFixed(3);
  }

  dataNotFound() {
    if (this.source === null || this.source.length === 0) {
      return true;
    }
    return false;
  }

  disableEnregistrer() {
    if (this.getTotalCredit() !== this.getTotalDebit()) {
      return true;
    }

  }

  removeItem(i) {

    console.log("içi")
    console.log(i);
    this.source.splice(i, 1);
  }
  saveOperation() {


    this.ecritureService.saveOperationecritureByLot(this.source).subscribe(

      data => { console.log('ok')   ;
      this.tostarService.showToast(NbToastStatus.SUCCESS,'ERROR'," opération écriture enregistrait avec succsées");
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/pages/comptabilite/ecritureByLot']));},
      error => {
        if (error.status === 409) {
          this.tostarService.showToast(NbToastStatus.DANGER,'ERROR'," opération écriture n'est pas équilibrée")
          console.log("CONFLiCT  operation o")
        }
        else
          if (error.status === 403) {
console.log('compte non affecter')
this.tostarService.showToast(NbToastStatus.DANGER,'ERROR',"compte tier n'est pas affecté à un compte Général")
          }
  
  }
   )
}

ouvrirModeleEcriture()
{
  
  this.windowService.open( OuvrirModelComponent, { title: `Ouvrir un modele d'écriture` }); 
}
}

export class EcritureLotModal {


  idJournal: number;
  mois: string;
  codJournal: string;
  annee: string;
  jour: number;
  numeroPiece: number;
  compteGeneral: any;
  compteTier: any;
  debit: string;
  credit: string;
  nameCode: string
}
