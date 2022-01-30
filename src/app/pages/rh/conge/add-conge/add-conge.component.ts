import { Component, OnInit } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Router } from '@angular/router';
import { CongeService } from '../conge.service';
import { CongeModel, CongeShowModel, PeriodeModel } from '../conge.model';
import { TypeCongeModel } from '../../../rh-parametrage/type-conge/typeConge.model';
import { TypeCongeService } from '../../../rh-parametrage/type-conge/typeConge.service';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthoritiesConge } from '../../../../authorisation/authoritiesConge';
 
@Component({
  selector: 'ngx-add-conge',
  templateUrl: './add-conge.component.html',
  styleUrls: ['./add-conge.component.scss']
})
export class AddCongeComponent implements OnInit {

   config: ToasterConfig;
    destroyByClick = true;
    duration = 10000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
    preventDuplicates = false;
    status: NbToastStatus
    title: string;
    content = ` `;
    conge :CongeModel ;
    conge2 :any ;

    congeComplet : CongeShowModel ;
   periode : PeriodeModel ;
   typeConge : TypeCongeModel[] ;
   A: string;
   value:any;
   solde : string ;
   idContrat : string ;
   nbrJours : any ;
   test : boolean=true ;
   authoritiesConfirm: boolean = true;
   authoritiesPasserDemande: boolean = true;
  
    ngOnInit() {
     
      this.conge = new CongeModel() ;
      let e = localStorage.getItem('e');
      if (e === '0') {
        this.A = 'Faire demande';
      }
      this.typeCongeService.getAllCongeTypes().subscribe(
        data => { 
        
          this.typeConge = data; 
        },
        error => {
           }
      );     
     this.solde = localStorage.getItem('sodle');
     this.idContrat = localStorage.getItem('idC');   


     if (Authorities.hasAutorities(AuthoritiesConge.CONGE_CONFIRM_VALUE)) {
      this.authoritiesConfirm = false;  
    }
    if (Authorities.hasAutorities(AuthoritiesConge.CONGE_ADD_VALUE)) {
      this.authoritiesPasserDemande = false;  
    }

     }
     constructor(
      public windowRef: NbWindowRef,
      private toastrService: NbToastrService,
      public router: Router, public  service : CongeService ,public typeCongeService : TypeCongeService ) {     
    }

    passerDemande() {
      this.verif(this.conge.dateDebut , this.conge.dateFin );

      if (this.conge.congeType.payer == "Oui" && this.nbrJours >  this.solde){
        this.content = 'Impossible de passer une demande : solde congé insuffisant'
        this.status = NbToastStatus.DANGER;
        this.makeToast();
      }
      else {
        this.conge.nbrJours = this.nbrJours ;
        this.service.addConge(this.conge , +this.idContrat)
          .subscribe(data => {

            localStorage.removeItem('e');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["pages/rh/conge"]));
              this.content = 'Demande congé affectuer'
              this.status = NbToastStatus.SUCCESS;
              this.makeToast();
              this.windowRef.close();
          },
            error => {
              this.content = 'Impossible de passer une demande '
              this.status = NbToastStatus.DANGER;
              this.makeToast();
                  });
                }
    }
    

verif(D1 : Date , D2 : Date){
 
this.periode = new PeriodeModel()
this.periode.date1 = D1
this.periode.date2 = D2
      this.service.verifierDate(+this.idContrat, this.periode).subscribe(
        data => {

          this.nbrJours = data ;
          localStorage.removeItem('nbrJ');
          localStorage.setItem('nbrJ',this.nbrJours)
             if( this.nbrJours > 0)
             {
               this.test= false;
             }
             else this.test = true ;
       
        },
        error => {
        }
      )
    
 }
 confirmer(){

  this.verif(this.conge.dateDebut , this.conge.dateFin );

  if (this.conge.congeType.payer == "Oui" && this.nbrJours >  this.solde){
    this.content = 'Solde congé insuffisant'
    this.status = NbToastStatus.DANGER;
    this.makeToast();
  }
  else {
    this.conge.nbrJours = this.nbrJours ;
    this.service.addConge(this.conge , +this.idContrat)
      .subscribe(data => {
        this.conge2 = data;
        localStorage.removeItem('e');
        this.service.confirm(this.conge2.idConge).subscribe(
          data2 => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["pages/rh/conge"]));
            this.content = ' congé affectuer'
            this.status = NbToastStatus.SUCCESS;
            this.makeToast();
            this.windowRef.close();
          },
          error2 => {
          }
        )
      },
        error => {
          this.content = 'Impossible de passer une demande '
          this.status = NbToastStatus.DANGER;
          this.makeToast();
              });
   }
 


}
    close() {
   this.windowRef.close();
    this.router.navigate(['/pages/rh/conge']);
  
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
      const titleContent = title ? `. ${title}` : '';    this.toastrService.show(
        body,
        `${titleContent}`,
        config);
    }
  
// v(){
// if ((this.conge.dateDebut && this.conge.dateFin && this.conge.congeType)) {

//   if (this.conge.nbrJours > 0) {
//     return false ;
//   }
// console.log ('f2')
// return true ;
//   }
//  else {
//    console.log('t')
//   return true;
// }
// }

    // changeValue(){
    //   if(this.conge.congeType!=null)
    //   {
    //  this.value=this.conge.congeType.designation;
    //   }
    // }

  }
  





