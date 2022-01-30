import { Component, OnInit } from '@angular/core';
import { PaiementService } from '../../type-payement/paiement.service';
import { PaiementModel } from '../../type-payement/paiement.model';
import { NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { CompteBancaireService } from '../../../../admin/entreprise/compte-bancaire/compte-bancaire.service';
import { CompteBancaireModel } from '../../../../admin/entreprise/compte-bancaire/compte-bancaire.model';
@Component({
  selector: 'ngx-show-virement',
  templateUrl: './show-virement.component.html',
  styleUrls: ['./show-virement.component.scss']
})
export class ShowVirementComponent implements OnInit {

  constructor(private paiementServie : PaiementService, private windowRef : NbWindowRef,
  private compteService : CompteBancaireService  ,private router : Router ) { }
  virements : PaiementModel[] ;
  compte : CompteBancaireModel ;
  total : number
  m : number
  mois : string
  annee : number
  code : number
  IdE: number
  payed : number
  RS : string
  MF : string
  RC : string 
  rib : string
  banque : string
  url : string 
  ngOnInit() {

     this.code = +localStorage.getItem('CODE')
     this.total = 0 ;
     this.IdE = +localStorage.getItem('current_entreprise')
    this.paiementServie.getVirement(this.IdE, this.code).subscribe(
        data => {
                this.compteService.getCompteById(data[0].idCompte).subscribe(
                    data2 => {this.compte = data2
                              this.RS = data2.entreprise.socialReason 
                              this.MF = data2.entreprise.taxRegistrationCode
                              this.rib = data2.rib
                              this.banque = data2.banque.nom +" *** Agence: "+data2.agence
                              this.RC = data2.entreprise.tradeRegister
                                },
                     error =>{console.log('err get compte')}
                  )
          localStorage.removeItem('CODE')
          this.virements = data
          this.annee = data[0].annee
          this.m = data[0].mois 
          this.payed = data[0].etat 
          this.virements.forEach(element => {
          this.total += element.net
          });
          switch(this.m) { 
            case 1: {  this.mois ='Janvier'; break;  } 
            case 2: { this.mois ="Février"; break; } 
            case 3: {this.mois ="Mars";  break; } 
            case 4: { this.mois ="Avril";  break; }  
            case 5: { this.mois ="Mai";  break; }  
            case 6: { this.mois ="Juin";  break; }  
            case 7: { this.mois ="Juillet";  break; }  
            case 8: { this.mois ="Aout";  break; }  
            case 9: { this.mois ="Séptembre";  break; }  
            case 10: { this.mois ="Octobre";  break; }  
            case 11: { this.mois ="Novembre";  break; }  
            case 12: { this.mois ="Décembre";  break; }  
            case 13: {this.mois ="13éme";  break; } 
            case 14: { this.mois ="14éme";  break; }  
            case 15: { this.mois ="15éme";  break; }  
            case 16: { this.mois ="16éme";  break; }  
            default: {  console.log("Invalid month"); break; } 
         }       
        },
        error =>{ console.log('error') }
    );
  }
  close(){
    this.windowRef.close()
  }
payer(){
    console.log(this.virements)
    this.virements.forEach(element => {
      this.paiementServie.payement(element.idPayement).subscribe(
        data => {
         
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/pages/rh/paiement']))
          this.windowRef.close();
        },
        error => {
          console.log('erreur de paiement')
        }
      );
    });
}


exportVirementToExcel() {
  this.paiementServie.virementToExcel(this.IdE,this.code).subscribe(x => {
    const blob = new Blob([x], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob)
   }
             const data= window.URL.createObjectURL(blob);

    const link = document.createElement('a')
    link.href = data       
    link.download ="ORDRE DE VIREMENT N°"+this.code+".xlsx"
    link.dispatchEvent(new MouseEvent('click', {bubbles:true,cancelable:true,view:window}))
    setTimeout(function(){
      window.URL.revokeObjectURL(data)
      link.remove;
    },100);
    
  })
}
imprimer(){
  var data = document.getElementById('content');
  html2canvas(data).then(canvas => {
    var imgWidth = 200;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
    pdf.addImage(contentDataURL, 'PNG', 5, 10, imgWidth, imgHeight)
    pdf.save('OrdreVirement_' + this.code + '.pdf'); // Generated PDF   
  });
}
}
