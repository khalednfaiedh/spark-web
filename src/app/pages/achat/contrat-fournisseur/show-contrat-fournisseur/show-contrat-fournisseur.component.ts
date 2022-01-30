import { DatePipe } from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';
import { ContratService } from '../service/contrat-fournisseur.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { DemandeAchatService } from '../../demande-achat/services/demande-achat.service';
import { NbWindowRef, NbToastrService } from '@nebular/theme';
import { DevisProduitAchatService } from '../../devis-achat/services/devis-produit-achat.service';
import { Router } from '@angular/router';
import { FournisseurModel } from '../../../admin/fournisseur/fournisseur.model';
import { FournisseurService } from '../../../admin/fournisseur/fournisseur.service';

@Component({
  selector: 'ngx-show-contrat-fournisseur',
  templateUrl: './show-contrat-fournisseur.component.html',
  styleUrls: ['./show-contrat-fournisseur.component.scss']
})
export class ShowContratFournisseurComponent implements OnInit {
  contrat: any = new Object();
  source: LocalDataSource = new LocalDataSource();
  idContrat = localStorage.getItem("idRC");
  prixTotal: number = 0;
  prixTTC: number = 0;
  fournisseur: FournisseurModel = new FournisseurModel();
  dateDebut: any;
  dateFin: any;
  @ViewChild('contentToConvert') contentRef: ElementRef;

  constructor(
    public windowRef: NbWindowRef,
    private serviceContrat: ContratService, 
    private serviceFournisseur: FournisseurService,
    private serviceDP: DevisProduitAchatService, public datepipe: DatePipe,
    private router: Router) { }

  ngOnInit() {
    this.serviceContrat.getContratById(+this.idContrat).subscribe(contrat => {

      var dateDebut = new Date(contrat.dateContrat)
      var dateFin = new Date(contrat.dateFin)
      var dateContratstr = this.datepipe.transform(dateDebut, 'dd-MM-yyyy')
      var dateFinstr = this.datepipe.transform(dateFin, 'dd-MM-yyyy')
      contrat.dateContrat = dateContratstr
      contrat.dateFin = dateFinstr
      this.contrat = contrat;
      this.source = new LocalDataSource(contrat.devisProduits)
      contrat.devisProduits.forEach(element => {
        this.prixTotal += element.prixTotale
      });
      this.prixTTC = this.prixTotal + ((this.prixTotal * contrat.taxe) / 100)
      this.serviceFournisseur.getFournisseurById(contrat.idF).subscribe(fournisseur => {
        this.fournisseur = fournisseur
        console.log(this.fournisseur)
      })
    })
  }
  settings = {


    actions: {

      add: false,
      edit: false,

      delete: false,
      position: 'right',

    },

    columns: {
      codeP: {
        title: 'Code',
        type: 'string',
        filter: true,
        editable: false,
        addable: false,
      },
      qte: {
        title: 'Quantité',
        type: 'number',
        filter: false,
        editable: false,
        addable: false,
      },
      prix: {
        title: 'Prix',
        type: 'number',
        filter: false,
      },
      prixTotale: {
        title: 'Prix Totale',
        type: 'number',
        filter: false
      },
    },
  };
  close() {
    this.windowRef.close();
  }
  captureScreen() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 200;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      let pdf1 = new jspdf()
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 5, 10, imgWidth, imgHeight)
      pdf.save('CTR2019' + this.contrat.idContrat + '.pdf'); // Generated PDF   
    });
  }

  downloadPDF() {


    let doc = new jspdf();
    let specialElementHandler = {
      '#editor': function (element, renderer) {
        return true;
      }

    };
    var content = this.contentRef.nativeElement;
    doc.fromHTML(content.innerHtml, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandler

    });
    doc.save('test.pdf')
  }
}