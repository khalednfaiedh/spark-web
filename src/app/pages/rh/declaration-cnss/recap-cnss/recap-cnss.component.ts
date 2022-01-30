import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategorieService } from '../../../rh-parametrage/categorie/categorie.service';
import { CategorieModel } from '../../../rh-parametrage/categorie/categoeie.model';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { EntrepriseService } from '../../../admin/entreprise/entreprise.service';
import { Entreprise } from '../../../admin/entreprise/entreprise';
// import * as jsPDF from 'jspdf'
@Component({
  selector: 'ngx-recap-cnss',
  templateUrl: './recap-cnss.component.html',
  styleUrls: ['./recap-cnss.component.scss']
})
export class RecapCNSSComponent implements OnInit {
  codeExpl: any
  soldeFinal: any
  trimestre: String;
  annee: String;
  totSecuriteSoc: number;
  totAccidentTrav: number;
  totFinal: number;
  CATEGORIE: CategorieModel;
  entreprise: Entreprise;
  
  constructor(private service: CategorieService, private entrepriseService: EntrepriseService) { }

  ngOnInit() {
    this.CATEGORIE = new CategorieModel;

    this.codeExpl = localStorage.getItem('codeExpl');
    this.soldeFinal = localStorage.getItem('soldeFinal');
    this.trimestre = localStorage.getItem('trimestre');
    this.annee = localStorage.getItem('annee');
    this.service.getCategorieByCode(this.codeExpl).subscribe(
      data => {
        this.CATEGORIE = data;
        this.totSecuriteSoc = (this.CATEGORIE.pourcentageSecuriteSoc * this.soldeFinal) / 100
        this.totAccidentTrav = (this.CATEGORIE.pourcentageAccident * this.soldeFinal) / 100
        this.totFinal = this.totSecuriteSoc + this.totAccidentTrav
      },
      error => {

      });
    this.entreprise = new Entreprise()
    let idEntreprise = localStorage.getItem('current_entreprise')
    this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
      data => { this.entreprise = data },
      error => { }
    )

  }

  downloadPDF() {
    var data = document.getElementById('contentToConvertRecap');
    html2canvas(data).then(canvas => {
      var imgWidth = 200;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      pdf.addImage(contentDataURL, 'PNG', 5, 10, imgWidth, imgHeight)
      pdf.save('RecapCNSS_' + this.trimestre + '_' + this.annee + '.pdf'); // Generated PDF   
    });
  }
}