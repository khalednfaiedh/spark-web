import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FichePaieModel } from '../../fichePaie.model';
import { FichePaieService } from '../../fiche-paie.service';
import { MoisService } from '../../../paie/mois/mois.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Entreprise } from '../../../../admin/entreprise/entreprise';
import { EntrepriseService } from '../../../../admin/entreprise/entreprise.service';
@Component({
  selector: 'ngx-view-solde-tout-compte',
  templateUrl: './view-solde-tout-compte.component.html',
  styleUrls: ['./view-solde-tout-compte.component.scss']
})
export class ViewSoldeToutCompteComponent implements OnInit {

  fiche: FichePaieModel;
  nbrMens : Promise<Number> ;
  idEntreprise: number;
  entreprise: Entreprise;
  idF: number;
  constructor(private entrepriseService:EntrepriseService, private service: FichePaieService, private moisService :MoisService) { }

  ngOnInit() {
   this.idF = +localStorage.getItem('idFiche');
   this.fiche = new FichePaieModel();
    this.mensualiteNumberInit(this.idF);
    this.idEntreprise = +localStorage.getItem('current_entreprise')
    this.entreprise = new Entreprise()
    this.entrepriseService.getEnterpriseById(this.idEntreprise).subscribe(
      data =>{
        this.entreprise = data;
      },
      error =>{
        console.log('Entreprise not found');
      }
    ); 
}
getFiche(id){
  return this.service.getFichePaieById(id).toPromise()
}
getMensualiteNumber(idE){
 return this.moisService.mensualiteNumber(idE).toPromise()
}

async mensualiteNumberInit(idF) {
  this.fiche = await this.getFiche(idF) ;
  let idEntreprise = this.fiche.contrat.idEntreprise ;
  this.nbrMens =  this.getMensualiteNumber(idEntreprise);
 }
 exportStcToExcel() {
  this.service.SoldeToExcel(this.idF).subscribe(x => {
    const blob = new Blob([x], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob)
   }
             const data= window.URL.createObjectURL(blob);

    const link = document.createElement('a')
    link.href = data       
    link.download ="SOLDE DE TOUT COMPTE "+ this.fiche.nom + "-" + this.fiche.prenom + ".xlsx"
    link.dispatchEvent(new MouseEvent('click', {bubbles:true,cancelable:true,view:window}))
    setTimeout(function(){
      window.URL.revokeObjectURL(data)
      link.remove;
    },100);
    
  })
}
 @ViewChild('content') contentRef: ElementRef;
 downloadPDF(){   
   var data = document.getElementById('contentToConvert');
   html2canvas(data).then(canvas => {
     var imgWidth = 200;
     var imgHeight = canvas.height * imgWidth / canvas.width;
     const contentDataURL = canvas.toDataURL('image/png')
     let pdf = new jspdf('p', 'mm', 'a4'); 
     pdf.addImage(contentDataURL, 'PNG', 5, 10, imgWidth, imgHeight)
     pdf.save('SOLDE DE TOUT COMPTE '+this.fiche.nom+'-'+this.fiche.prenom+'.pdf'); 
   });
 }
}

