import { Component, OnInit } from '@angular/core';
import { EtatFinancier } from '../etat-financier';
import { Router } from '@angular/router';
import { NbWindowRef, NbToastrService } from '@nebular/theme';
import { ToastService } from '../toast.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { EtatFinancierService } from '../etat-financier.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-modal-etatfinancier',
  templateUrl: './modal-etatfinancier.component.html',
  styleUrls: ['./modal-etatfinancier.component.scss']
})
export class ModalEtatfinancierComponent implements OnInit {
  valider = this.translate.instant('etatfinancier.btn3');
  x :boolean =false;
  y :boolean =true;
  etatFinancier : EtatFinancier;
  etats = [];
  
  constructor(private router: Router,
    private windowRef: NbWindowRef,
    private etatFinancierService:EtatFinancierService,
    private toastrService: NbToastrService,
    private TS: ToastService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.etatFinancier = new EtatFinancier();
    let e = localStorage.getItem('e');
    if(e == '1'){
      this.x=true;
      this.y=false;
      this.valider=this.translate.instant('etatfinancier.btn2')
      let idEtat = localStorage.getItem('idEtat');
      this.etatFinancierService.getEtatFinancierById(+idEtat).subscribe(
        ent =>{this.etatFinancier = ent;},
        error =>{console.log(error);}
        );
  }
  this.etatFinancierService.getAllEtatFinancier().subscribe(
    ent =>{this.etats = ent;},
    error =>{console.log(error);}
    );
  }

  addEtatFinancier()
  {
   let e = localStorage.getItem('e');
   if (e === '0') {
     console.log(this.etatFinancier)
     this.etatFinancierService.addEtatFinancier(this.etatFinancier) 
      .subscribe(data => {
           this.etatFinancier=data;
           localStorage.removeItem('e');
           this.windowRef.close();
           this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
           this.router.navigate(['/pages/etatfinancier']));
           this.TS.makeToast(NbToastStatus.SUCCESS,this.translate.instant('etatfinancier.list14'),this.translate.instant('etatfinancier.list10'));         
         },
         error => {
           this.TS.makeToast(NbToastStatus.DANGER,this.translate.instant('etatfinancier.list15'),this.translate.instant('etatfinancier.list10'));         
         });
   }

   if (e === '1') {
       this.etatFinancierService.updateEtatFinancier(this.etatFinancier).subscribe(
       data => {
       this.windowRef.close();
       this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
       this.router.navigate(['/pages/etatfinancier']));
       this.TS.makeToast(NbToastStatus.SUCCESS, this.translate.instant('etatfinancier.list16'),this.translate.instant('etatfinancier.list18'));
        },
       error => {
        this.TS.makeToast(NbToastStatus.DANGER,this.translate.instant('etatfinancier.list17'),this.translate.instant('etatfinancier.list18'));   
       });
     }
   }}
