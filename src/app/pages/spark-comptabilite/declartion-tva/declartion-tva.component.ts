import { Component, OnInit } from '@angular/core';
import { DeclartionTVAService } from './declartion-tva.service';
import { runInThisContext } from 'vm';
import { Router } from '@angular/router';
import { calculateViewDimensions } from '@swimlane/ngx-charts';
import { PopUpComponent } from './pop-up/pop-up.component';
import { NbWindowService } from '@nebular/theme';
import { TostarService } from '../tostar/tostar.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ExcerciceService, Excercice } from '../excercice/excercice.service';
import { ChartPanelSummaryComponent } from '../e-commerce/charts-panel/chart-panel-summary/chart-panel-summary.component';

@Component({
  selector: 'ngx-declartion-tva',
  templateUrl: './declartion-tva.component.html',
  styleUrls: ['./declartion-tva.component.scss']
})
export class DeclartionTVAComponent implements OnInit {
  tva1 = new DeclartionModal();
  tva = new Declartion();
  exercice = new Excercice();
  total = new salairee()
  boolean1: boolean = true;
  typeDeclartion = new typeDeclartion();
  exerciceBoolean: boolean;
  constructor(private declartionTvaService: DeclartionTVAService,
    private router: Router, private windowService: NbWindowService,
    private tostarService: TostarService,
    private exerciceService: ExcerciceService) { }

  ngOnInit() {
    this.declartionTvaService.getTypeDeclartion().subscribe(
      data => { this.typeDeclartion = data; console.log(this.typeDeclartion) },
      error => { console.log("error") }
    )

    let idExercice= localStorage.getItem('idExercice');

    if( idExercice == null)
    {
      this.exerciceBoolean =true;
    }
    else
    {
      this.exerciceBoolean=false;
    }
  }

  importJournalPaie() {
    this.windowService.open(PopUpComponent, { title: ` Import un  Journal Paie ` });
  }
  declartionTva() {

    console.log(this.tva1)



    let idEntreprise = localStorage.getItem('current_entreprise');

    this.tva1.idEntreprise = +idEntreprise;
    this.declartionTvaService.recapeSalariee(this.tva1).subscribe(
      data => {
        console.log(data), this.total = data

        /**
         * cors
         */
        this.declartionTvaService.declartionTva(this.tva1).subscribe(

          data2 => {
            console.log(data); this.tva = data2;
            this.tva.salaireImposable = this.total.totalslairImpossbale;
            this.boolean1 = false;
          },
          error => {
            console.log("erreur with status = 409")
            if (error.status == '409') {
              this.tostarService.showToast(NbToastStatus.DANGER, 'DANGER', ' Données invalid !!!!  ')

            }


          }
        )



      },
      error => { console.log("error slariée")
      if (error.status == '409') {
        this.tostarService.showToast(NbToastStatus.DANGER, 'DANGER', ' Données invalid !!!!  ')

      } }
    )
  }

  nagivateToParametreTva() {
    this.router.navigate(['/pages/comptabilite/parametreTVA']);
  }

  calaculTcl02(tcl02) {
    return tcl02 * 0.002;
  }

  calculRetunue5(retunue5) {
    return retunue5 * 0.5;
  }

  calculRetunue15(retunue15) {
    return retunue15 * 0.5;
  }

  dataNotFound() {
    if (this.tva == null) {
      return true;
    }
    return false;
  }

  saveDeclartion() {
    this.tva.annee = this.tva1.annee;
    this.tva.mois = this.tva1.mois;
    let idEntreprise = localStorage.getItem('current_entreprise');
    console.log("id entr:" + idEntreprise)
    this.tva.idEntreprise = +idEntreprise;

    console.log(this.tva)
    this.declartionTvaService.saveDeclartion(this.tva).subscribe(
      data => {
        console.log(data)
        this.tostarService.showToast(NbToastStatus.SUCCESS, 'SUCCESS', 'Déclartion Mensuelle enrgistrer avec success !')
      },
      error => {
        console.log("error"),
          this.tostarService.showToast(NbToastStatus.DANGER, 'DANGER', 'Déclartion Mensuelle  Déja  enrgistrer !!!!  ')
      }
    )
  }
}


export class DeclartionModal {


  mois: any;
  annee: any;
  idEntreprise: number;


}

export class Declartion {

  tvaDeductible: number;
  tvaCollectee: number;
  totalPayee: number;
  reportTva: number;
  etatTva: number;
  ttcLocal: number;
  tcl02: number;
  salaireImposable: number;
  irpp: number;
  retunue5: number;
  retunue15: number;
  etatRetunue: number;
  salaireBrute: number;
  tfp: number;
  fropolos: number;
  timbre: number;
  total: number;
  mois: any;
  annee: any;
  idEntreprise: number;

}

export class typeDeclartion {
  id: number;
  relationWithPaie: string;

}

export class salairee {
  totalBrut: number;
  totalslairImpossbale: number;
  totalIrpp: number;
  totalCss: number;

}