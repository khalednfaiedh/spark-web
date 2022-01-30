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

@Component({
  selector: 'ngx-ratio-equilibre-financier',
  templateUrl: './ratio-equilibre-financier.component.html',
  styleUrls: ['./ratio-equilibre-financier.component.scss']
})
export class RatioEquilibreFinancierComponent implements OnInit {
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

  listName2=[{id: 12, name:"Financementde l'actif circulant"},{id: 13, name:"Liquidité générale"},{id: 14, name:"Trésorerie d'équilibre financier"},
            {id: 15, name:"Financement stable des immobilisations"},{id: 16, name:"Autonomie de financement des immobilisations"}];
            
  constructor(private router: Router,
    private ratioService:RatioService,
    private etatFinancierService: EtatFinancierService,
    private toastrService: NbToastrService,
    private TS: ToastService,
    private translate: TranslateService) { }

  ngOnInit() {
  }
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
  CalculRatioEquilibreFinancierSansSave() {
    this.etatFinancier = new EtatFinancier();  
    this.etatFinancierService.findEtatFinancierByStartDateAndEndDate(this.ratioDto).subscribe(

    data=>{this.etatFinancier=data;console.log(data);
    this.NbDiv=this.ratioDto.NbDiv1;

    this.ratioService.calculRatioEquilibreFinancierSansSave(this.ratioDto).subscribe(
    data2=>{this.ratioSortie=data2;console.log(data2)
    this.testValid=true;console.log(this.testValid);

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
  FondDeRoulement,BesoinEnFondDeRoulement,Tresorerie
}
