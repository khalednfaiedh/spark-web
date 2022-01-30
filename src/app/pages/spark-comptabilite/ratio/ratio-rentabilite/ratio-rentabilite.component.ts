import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RatioService } from '../ratio.service';
import { EtatFinancierService } from '../../etat-financier/etat-financier.service';
import { NbToastrService } from '@nebular/theme';
import { ToastService } from '../../etat-financier/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { EtatFinancier } from '../../etat-financier/etat-financier';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Ratio } from '../ratio';
// import { Ratio } from '../Ratio';

@Component({
  selector: 'ngx-ratio-rentabilite',
  templateUrl: './ratio-rentabilite.component.html',
  styleUrls: ['./ratio-rentabilite.component.scss']
})
export class RatioRentabiliteComponent implements OnInit {

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
  
  listName1=[{id: 6, name:"Rentabilité Des Capitaux Propres"}, {id: 7, name:"Rentabilité des capitaux employés"},
  {id: 8, name:"Rentabilité Des Capitaux Investis"},{id: 9, name:"Rentabilité des actifs"},
  {id: 10, name:"Marge brute d'exploitation"},{id: 11, name:"EBITDA"}];

  constructor(private router: Router,
    private ratioService:RatioService,
    private etatFinancierService: EtatFinancierService,
    private toastrService: NbToastrService,
    private TS: ToastService,
    private translate: TranslateService) { }

  ngOnInit() {
  }
  CalculRatioRentabilite() {
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

  ArchiverRatioRentabilite() {
    this.testValid=false;
    this.TS.makeToast(NbToastStatus.INFO,this.translate.instant('ratio.toast'),this.translate.instant('ratio.toastt'));
  }

  CalculRatioRentabiliteSansSave() {
     this.etatFinancier = new EtatFinancier();  
     this.etatFinancierService.findEtatFinancierByStartDateAndEndDate(this.ratioDto).subscribe(

     data=>{this.etatFinancier=data;console.log(data);
     this.NbDiv=this.ratioDto.NbDiv1;

     this.ratioService.calculRatioRentabiliteSansSave(this.ratioDto).subscribe(
     data2=>{this.ratioSortie=data2;console.log(data2)
     this.testValid=true;console.log(this.testValid);

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
    RentabilitéDesCapitauxPropres,Rentabilitédescapitauxemployés,RentabilitéDesCapitauxInvestis,Rentabilitédesactifs,MargebruteExploitation,EBITDA
  }
