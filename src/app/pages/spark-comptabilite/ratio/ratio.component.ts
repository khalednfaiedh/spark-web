import { Component, OnInit } from '@angular/core';
import { RatioService } from './ratio.service';
import { Router } from '@angular/router';
import { NbWindowRef, NbToastrService } from '@nebular/theme';
import { ToastService } from '../etat-financier/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { EtatFinancierService } from '../etat-financier/etat-financier.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { EtatfinancierDates } from '../etat-financier/etat-financier.component';
import { EtatFinancier } from '../etat-financier/etat-financier';
import { NumberValueAccessor } from '@angular/forms/src/directives';
import { DatePipe } from '@angular/common';
import { Ratio } from './ratio';
 

@Component({
  selector: 'ngx-ratio',
  templateUrl: './ratio.component.html',
  styleUrls: ['./ratio.component.scss']
})
export class RatioComponent implements OnInit {
  testValid: boolean= false;
  testDisable: boolean= false;
  ratioDto= new RatioDto();
  ratio= new Ratio();
  ratioSortie=[];
  ratioDyn: RatioDyn[];
  etatFinancier: any;
  nameRatio:any[];
  NbDiv: number;
  res:number;
  montant: number[];
  libelle: String[];
  dateFrom= new Date();
  dateTo= new Date();

  listName=[{id: 0, name:"Fonds de roulement"},{id: 1, name:"Besoin en fonds de roulement"},{id: 2, name:"Trésorerie"},
            {id: 3, name:"Indépendance Financière"},{id: 4, name:"Ratio de solvabilité"},{id: 5, name:"Ratio d'endettement"}];

  constructor(private router: Router,
    private ratioService:RatioService,
    private etatFinancierService: EtatFinancierService,
    private toastrService: NbToastrService,
    private TS: ToastService,
    private translate: TranslateService) { }

  ngOnInit() { }

  CalculRatio() {
    this.etatFinancier = new EtatFinancier();  
    this.etatFinancierService.findEtatFinancierByStartDateAndEndDate(this.ratioDto).subscribe(
    data=>{this.etatFinancier=data;

    this.ratioService.calculRatio(this.ratioDto).subscribe(
    data2=>{this.ratio=data2;console.log(data2)
    this.testValid=false;
    this.TS.makeToast(NbToastStatus.SUCCESS,this.translate.instant('ratio.toast1'),this.translate.instant('ratio.toast2'));         
    },
    error=>{ this.TS.makeToast(NbToastStatus.DANGER,this.translate.instant('ratio.toast1'),this.translate.instant('ratio.toast3'))}
   ) } )
  }

  ArchiverRatio() {
    this.testValid=false;
    this.TS.makeToast(NbToastStatus.INFO,this.translate.instant('ratio.toast'),this.translate.instant('ratio.toastt'));
  }

  CalculRatioSansSave() {
     this.etatFinancier = new EtatFinancier();  
     this.etatFinancierService.findEtatFinancierByStartDateAndEndDate(this.ratioDto).subscribe(

     data=>{this.etatFinancier=data;console.log(data);
     this.NbDiv=this.ratioDto.NbDiv1;

     this.ratioService.calculRatioSansSave(this.ratioDto).subscribe(
     data2=>{this.ratioSortie=data2;console.log(data2)
     this.testValid=true;console.log(this.testValid);

     for (var i = 0; i < this.NbDiv; i++) {
 /*  this.res = data2[i].ratioDyn[i].resultat;
     this.dateFrom = data2[i].startDate;
     this.dateTo = data2[i].endDate;
     this.montant = data2[i].montants;
     this.libelle = data2[i].libelles;
     this.nameRatio = data2[i].ratioName;
*/
    }
  //  this.TS.makeToast(NbToastStatus.SUCCESS,this.translate.instant('ratio.toast1'),this.translate.instant('ratio.toast2'));
       },
        error=>{ this.TS.makeToast(NbToastStatus.DANGER,this.translate.instant('ratio.toast4'),this.translate.instant('ratio.toast5'))}
     )
   }
  )
 }
}
  export class RatioDto {
    startDate: Date;
    endDate: Date;
    NbDiv1: number;
    //ratioName: any;
    ratioNames: any=[];
  }
  export class RatioDyn {
    startDate: Date;
    endDate: Date;
    resultat: number;
    montants: number[];
  }
  export class RatioSortie {
    ratioDyn: RatioDyn[];
    ratioName: any=[];
    libelles: String[];
    etatfinancier: EtatFinancier;
  }
  export enum RatioName {
    FondDeRoulement,BesoinEnFondDeRoulement,Tresorerie,IndépendanceFinancière,RatioSolvabilité,RatioEndettement
  }