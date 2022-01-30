import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FichePaieService } from '../fiche-paie.service';
import { FichePaieModel } from '../fichePaie.model';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';
import { EntrepriseService } from '../../../admin/entreprise/entreprise.service';
import { Entreprise } from '../../../admin/entreprise/entreprise';
@Component({
  selector: 'ngx-show-fiche',
  templateUrl: './show-fiche.component.html',
  styleUrls: ['./show-fiche.component.scss']
})
export class ShowFicheComponent implements OnInit {
  fiche: FichePaieModel;
  entreprise: Entreprise;
  idF : string ;
  idEntreprise : number;
  constructor(private service: FichePaieService ,private entrepriseService : EntrepriseService, protected httpClient: HttpClient) { }

  ngOnInit() {

    this.fiche = new FichePaieModel();
    this.idF = localStorage.getItem('idFiche');
    this.service.getFichePaieById(+this.idF).subscribe(
      data => { this.fiche = data;
        },
      error => {
        console.log('error get fiche')
      },
    );

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

  exportFicheToExcel() {
    this.service.ficheToExcel(+this.idF).subscribe(x => {
			const blob = new Blob([x], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob)
     }
               const data= window.URL.createObjectURL(blob);

      const link = document.createElement('a')
      link.href = data       
      link.download ="Fiche-Paie-N°"+this.idF+".xlsx"
      link.dispatchEvent(new MouseEvent('click', {bubbles:true,cancelable:true,view:window}))
      setTimeout(function(){
        window.URL.revokeObjectURL(data)
        link.remove;
      },100);
      
    })
}
// @ViewChild('content') contentRef: ElementRef;
// downloadPDF(){   

//   var data = document.getElementById('contentToConvert');
//   html2canvas(data).then(canvas => {
//     // Few necessary setting options  
//     var imgWidth = 200;
//     var pageHeight = 295;
//     var imgHeight = canvas.height * imgWidth / canvas.width;
//     var heightLeft = imgHeight;
//     const contentDataURL = canvas.toDataURL('image/png')
//     let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
//     let pdf1= new jspdf()
//     var position = 0;
//     pdf.addImage(contentDataURL, 'PNG', 5, 10, imgWidth, imgHeight)
//     pdf.save('Fiche_Paie_'+this.fiche.moisFiche+'_'+this.fiche.anneeFiche+'.pdf'); // Generated PDF   
//   });
// }
  @ViewChild('content') contentRef: ElementRef;
  downloadPDF(){   
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 200;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      pdf.addImage(contentDataURL, 'PNG', 5, 10, imgWidth, imgHeight)
      pdf.save('Fiche_Paie_'+this.fiche.moisFiche+'_'+this.fiche.anneeFiche+'.pdf'); // Generated PDF   
    });
  }
 
}
