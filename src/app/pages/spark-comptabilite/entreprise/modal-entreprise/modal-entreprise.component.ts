import { Component, OnInit } from '@angular/core';
import { Entreprise, EntrepriseService } from '../entreprise.service';
import { Router } from '@angular/router';
import { NbWindowRef, NbToastrService, NbGlobalPhysicalPosition, NbGlobalPosition, NbGlobalLogicalPosition } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Excercice, ExcerciceService } from '../../excercice/excercice.service';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'ngx-modal-entreprise',
  templateUrl: './modal-entreprise.component.html',
  styleUrls: ['./modal-entreprise.component.scss']
})
export class ModalEntrepriseComponent implements OnInit {

  valider = "Ajouter";
  natures = [
    "TE", "PE"
  ]
  juridicForms = [
    "SUARL", "SARL", "SA"
  ]
  moneys = [
      "AFN",
      "EUR", "DZD",
      "AOA", " XCD",
      "AMD", "AWG", "AUD", "AZN", "BSD", "BHD", "BDT", "BBD", "BYR",
      "BZD",
      "XOF", "BMD", "BTN", "INR", "BOB", "BOV", "BAM", "BWP", "NOK", "BRL", "BND",
      "BGN", "BIF", "CVE", "KHR", "XAF", "CAD", "KYD", "CLF", "CLP", "CNY", "COP", "COU", "KMF", "CDF", "NZD", "CRC", "HRK", "ANG",
     "CUC", "CUP", "CZK", "DKK",
     "DJF", "DOP", "EGP", "SVC", "ERN", "ETB", "FKP",
     "FJD", "XPF", "GMD", "GEL", "GHS", "GIP", "GTQ", "GBP", "GNF",
     "GYD", "HTG", "HNL", "HKD", "HUF", "ISK", "IDR", "XDR", 
     "IRR", "IQD", "JMD", "JPY", "JOD", "KZT", "KES", "KPW", "KRW", "KWD",
     "KGS", "LAK", "LBP", "LSL", "ZAR", "LRD", "LYD", "MOP", "MKD", "MGA",
     "MWK", "MYR", "MVR", "MRU", "MUR", "XUA", "MXN", "MXV", "MDL", "MNT",
     "MZN", "MMK", "NPR", "NGN", "OMR", "PKR", "PAB", "PGK", "PYG", "PHP",
     "PLN", "QAR", "RON", "RWF", "SHP", "WST", "STN", "SAR", "RSD", "SCR",
     "SLL", "SGD", "XSU", "SBD", "SOS", "SSP", "LKR", "SDG", "SRD", "SZL",
     "SEK", "CHE", "CHF", "CHW", "SYP", "TWD", "TJS", "TZS", "THB", "TOP",
     "TTD", "TND", "TRY", "TMT", "UGX", "UAH", "AED", "USN", "UYI", "UYU",
     "UZS", "VUV", "VEF", "VND", "USD",  "MAD", "YER", "ZMW", "ZWL"
    
  ]
    enterprise : Entreprise;
  //fy : FiscalYear ;
    exercice = new  Excercice()
  x : boolean = false;
 y:boolean=true;
//tostr
//tost
config: ToasterConfig;
destroyByClick = true;
duration = 10000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
preventDuplicates = false;
status: NbToastStatus 
title: string;
content = ` `;

 
  constructor(private router: Router, 
    private windowRef: NbWindowRef, 
    private   entrepriseService:EntrepriseService, 
    private exerciceService:ExcerciceService,
    private toastrService: NbToastrService,) { }

  ngOnInit() {
    this.enterprise = new Entreprise();

    let e = localStorage.getItem('e');
    localStorage.removeItem('e')
    if(e == '1'){
      this.x =   true;
      this.y=false;
      // this.fy.sdate = new Date();
      // this.fy.edate = new Date();
      this.valider="Modifier"
      
    
      let idEntreprise = localStorage.getItem('current_entreprise');
      this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
        ent =>{this.enterprise = ent;},
        error =>{console.log(error);}
        );
  
    }
  }



 addEntreprise()
 {
  let e = localStorage.getItem('e');
  if (e === '0') {
    this.entrepriseService.addEnterprise(this.enterprise) 
      .subscribe(data => {
      this.enterprise=data;
    
          localStorage.removeItem('e');
          this.windowRef.close();
          this.router.navigateByUrl('/',{skipLocationChange: true}).then(()=>
         this.router.navigate(['/pages/comptabilite/entreprise']));
        },

         
        error => {
          console.log('error entreprise');
        });
      
  }
  if (e === '1') {
    this.entrepriseService.updateEnterprise(this.enterprise).subscribe(
      data => {
      this.windowRef.close();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/pages/comptabilite//entreprise']));
      this.content=' Mis À JOUR  entreprise  réussi'
      this.status= NbToastStatus.SUCCESS;
      this.makeToast();
       
      },
      error => {
        console.log('error');
      });
  }
}

makeToast() {
  this.showToast(this.status, this.title, this.content);
}
private showToast(type: NbToastStatus, title: string, body: string) {
  const config = {
    status: type,
    destroyByClick: this.destroyByClick,
    duration: this.duration,
    hasIcon: this.hasIcon,
    position: this.position,
    preventDuplicates: this.preventDuplicates,
  };
  const titleContent = title ? `. ${title}` : '';


  this.toastrService.show(
    body,
    `Toast ${titleContent}`,
    config);
}
 }
  
  


