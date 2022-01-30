import { Component, OnInit } from '@angular/core';
import { JournalPaieService } from './journalPaie.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { TypePayementComponent } from '../paiement/type-payement/type-payement.component';
import { PaiementService } from '../paiement/type-payement/paiement.service';
import { PaiementModel } from '../paiement/type-payement/paiement.model';
import { JournalPaieModel } from './journalPaie.model';
import { PagesComponent } from '../../pages.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesFichePaie } from '../../../authorisation/authoritiesFichePaie';
import { AuthoritiesDeclarationCNSS } from '../../../authorisation/authoritiesDeclarationCNSS';
import { AuthoritiesPaiement } from '../../../authorisation/authoritiesPaiement';

@Component({
  selector: 'ngx-journal-paie',
  templateUrl: './journal-paie.component.html',
  styleUrls: ['./journal-paie.component.scss']
})

export class JournalPaieComponent implements OnInit {
  url : string
  journal : any;
  selection = [];
  mois: any;
  annee: any;
  size : number;
  Paiement : PaiementModel ;
  idEntreprise : any ;
  select_all : boolean
  authoritiesViewCNSS: boolean = false;
  authoritiesViewPaiement: boolean = false;
  authoritiesAddPaiement: boolean = false;
  // check_all : boolean
    constructor( private journalService: JournalPaieService, private router: Router, private windowService: NbWindowService,
    private paiementService : PaiementService) { }

  ngOnInit() {
    // this.check_all = false
    this.size = 0 ;
    this.journal = new JournalPaieModel()
    this.mois = localStorage.getItem('MOIS');
    this.annee = localStorage.getItem('ANNEE');
    this.idEntreprise = localStorage.getItem('current_entreprise')
    this.journalService.getJournal(this.idEntreprise,this.mois, this.annee).subscribe(
      data => {
        this.journal = data;
        if (Authorities.hasAutorities(AuthoritiesPaiement.PAIEMENT_LIST_VALUE)) {
          for (let index = 0; index < this.journal.fichePaie.length; index++) {
            this.chekPayed(this.journal.fichePaie[index]) ;
          }    
        } 
        },
      error => { 
        console.log("error get journale");
       }
    );
    if (Authorities.hasAutorities(AuthoritiesDeclarationCNSS.DECLARATION_CNSS_LIST_VALUE)) {
      this.authoritiesViewCNSS = true;  
    }  
    if (Authorities.hasAutorities(AuthoritiesPaiement.PAIEMENT_LIST_VALUE)) {
      this.authoritiesViewPaiement = true;  
    }  
    if (Authorities.hasAutorities(AuthoritiesPaiement.PAIEMENT_ADD_VALUE)) {
      this.authoritiesAddPaiement = true;  
    } 
  }
  exportJournamToExcel() {
    this.journalService.journalToExcel(this.idEntreprise,this.mois,this.annee).subscribe(x => {
			const blob = new Blob([x], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob)
     }
               const data= window.URL.createObjectURL(blob);

      const link = document.createElement('a')
      link.href = data       
      link.download ="JOURNALE-PAIE-"+this.mois+"-"+this.annee+".xlsx"
      link.dispatchEvent(new MouseEvent('click', {bubbles:true,cancelable:true,view:window}))
      setTimeout(function(){
        window.URL.revokeObjectURL(data)
        link.remove;
      },100);
      
    })
}
  openDecCNSS() {
    this.router.navigate(['/pages/rh/declarationCNSS']);
  }
  openFichePaie() {
    this.router.navigate(['/pages/rh/fichePaie']);
  }

  getSelection(item) {
    return this.selection.findIndex(s => s.idFiche === item.idFiche) !== -1;
  }
  changeHandler(item: any, event: KeyboardEvent) {
    const id = item.idFiche;
    const index = this.selection.findIndex(u => u.idFiche === id);
    if (index === -1) {
      // ADD TO SELECTION
      // this.selection.push(item);
      this.selection = [...this.selection, item];
    } else {
      // REMOVE FROM SELECTION
      this.selection = this.selection.filter(fiche => fiche.idFiche !== item.idFiche)
      // this.selection.splice(index, 1)
    }
    this.size = this.selection.length 
  }
  onSelectAll(e: any): void { 
    if (this.select_all) {
      this.selection = [];
      for (let i = 0; i < this.journal.fichePaie.length; i++) {
        const item = this.journal.fichePaie[i];
        this.chekPayed(item) ;
        if (!item.checked) {
          this.selection = [...this.selection, item];
        }
      } 
    } else {
      for (let i = 0; i < this.journal.fichePaie.length; i++) {
        const item = this.journal.fichePaie[i];
        this.selection = this.selection.filter(fiche => fiche.idFiche !== item.idFiche)
      } 
     
    }
    this.size = this.selection.length 

  }


  payer() {
    localStorage.setItem('AllSelectedFiches', JSON.stringify(this.selection));
    this.windowService.open(TypePayementComponent, { title: 'Veuillez choisir le type de payement' });
  }
  open() {
    this.router.navigate(['/pages/rh/paiement']);
  }

  chekPayed(FICHE){
    this.paiementService.getOneByFiche(FICHE.idFiche).subscribe(
      data => {
         this.Paiement = data
        if(this.Paiement != null)
        {
          FICHE.checked = true;  // existe  dans la table paiement

        }
        else  {
         FICHE.checked = false // n'existe pas dans la table paiement 
        }
      });
  }

  downloadPDF2() {

      //   var data = document.getElementById('contentJournal');
      //   html2canvas(data).then(canvas => {
      //     var imgWidth = 200;
      //     var imgHeight = canvas.height * imgWidth / canvas.width;
      //     const contentDataURL = canvas.toDataURL('image/png')
      //     let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      //     pdf.addImage(contentDataURL, 'PNG', 5, 10, imgWidth, imgHeight)
      //     pdf.save('Journal_' + this.mois + '_' + this.annee + '.pdf'); // Generated PDF   
      //   });

   this.journalService.journalToPdf(this.idEntreprise,this.mois,this.annee).subscribe(x => {
			const blob = new Blob([x], { type: 'application/pdf' });
     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob)
     }
               const data= window.URL.createObjectURL(blob);

      const link = document.createElement('a')
      link.href = data       
      link.download ="JOURNALE-PAIE-"+this.mois+"-"+this.annee+".pdf"
      link.dispatchEvent(new MouseEvent('click', {bubbles:true,cancelable:true,view:window}))
      setTimeout(function(){
        window.URL.revokeObjectURL(data)
        link.remove;
      },100);
      
    })
  }
}
