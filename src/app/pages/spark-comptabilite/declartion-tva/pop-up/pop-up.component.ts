import { Component, OnInit } from '@angular/core';
//import * as XLSX from 'xlsx';
import { JournalCentraliseComponent } from '../../journal/journal-centralise/journal-centralise.component';
import { DeclartionTVAService } from '../declartion-tva.service';
import { Excercice, ExcerciceService } from '../../excercice/excercice.service';
type AOA = any[][];
@Component({
  selector: 'ngx-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {
  data: AOA = [[], []];
  //wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  journals = []
  exercice = new Excercice();
  mois: number;
  annee: number;
  idEntreprise: number;

  constructor(private declartionTvaService: DeclartionTVAService, private exerciceService: ExcerciceService) { }

  ngOnInit() {
    let idEntreprise = localStorage.getItem('current_entreprise');
    this.idEntreprise = +idEntreprise;
  }

  onFileChange(evt: any) {
    /* wire up file reader */

    //  this.testEroor=false;
    const target: DataTransfer = <DataTransfer>(evt.target);
    /*  ////*/

    // console.log(evt.target.files[0].type);
    var extention = evt.target.files[0].name.split(".").pop()

    if ((extention !== 'xls') && (extention !== 'xlsx')) {
      // this.status= NbToastStatus.DANGER;
      //   this.title='Format invalide';
      //   this.content='Le fichier importé doit être d\'extension ".xls" ou ".xlsx" ';
      //   this.makeToast();
      // this.testEroor=true;
    }

    /*  ////*/

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      // const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      // const wsname: string = wb.SheetNames[0];
      //const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      //this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      var x = this.data[0].length.toString();
      console.log(x)
      if (x !== '2') {
        //  this.status= NbToastStatus.DANGER;
        // this.title='Format invalide';
        // this.content='Le fichier importé doit être contient deux colonne nom de compte et le code ';
        // this.makeToast();
        // this.testEroor=true;
      }
    };
    reader.readAsBinaryString(target.files[0]);


  }

  enregistrer() {


    this.data[0].splice(0, 6);

    this.data.forEach((b, index) => {


      var journal = new JournalPaie();
      if (index != 0 && index != 0) {
        journal.matricule = b[0];
        journal.salaireNet = b[1];
        journal.brut = b[2];
        journal.impossable = b[3];
        journal.irpp = b[4];
        journal.css = b[5];
        journal.annee = this.annee;
        journal.mois = this.mois;
        journal.idEntreprise = this.idEntreprise;
        this.journals.push(journal);




      }
    });

    this.declartionTvaService.saveAllJournal(this.journals).subscribe(
      data => { console.log(data) },
      error => { console.log("error") }

    )

    console.log(this.journals)

  }
}

export class JournalPaie {
  matricule: number;
  salaireNet: number;
  brut: number;
  impossable: number;
  irpp: number;
  css: number;
  annee: number;
  mois: number;
  idEntreprise: any
}