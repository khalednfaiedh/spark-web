import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EcritureService } from './ecriture.service';
import { error } from 'util';
import { NbWindowService } from '@nebular/theme';
import { ModalEcritureComponent } from './modal-ecriture/modal-ecriture.component';
import { ShowEcritureComponent } from './show-ecriture/show-ecriture.component';
import { Router } from '@angular/router';
import { JournalService, Journal } from '../journal/journal.service';
import { EntrepriseService } from '../entreprise/entreprise.service';
import { Enterprise } from '../entreprise/entreprise';
import { ExcerciceService, Excercice } from '../excercice/excercice.service';
import { ViewCell } from 'ng2-smart-table';
import { UpdateEcritureComponent } from './update-ecriture/update-ecriture.component';
import { Console } from '@angular/core/src/console';
import { getMilliseconds } from 'date-fns';

@Component({
  selector: 'ngx-button-view03',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" value="opération"/>\n' +
    '    </div>',
})
export class ButtonView04Component implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService,
    private router: Router, ) {

  }
  onClick() {

    localStorage.setItem('idEcriture', this.rowData.idEcriture);
    this.router.navigate(['/pages/comptabilite/operationEcriture']);

  }
}
@Component({
  selector: 'ngx-ecriture',
  templateUrl: './ecriture.component.html',
  styleUrls: ['./ecriture.component.scss']
})
export class EcritureComponent implements OnInit {
  source: any
  journal = new Journal();
  entreprise = new Enterprise();
  exercice = new Excercice();
  mois = "";
  b="";
  constructor(private ecritureService: EcritureService,
    private windowService: NbWindowService,
    private router: Router,
    private serviceJournal: JournalService,
    private entrepriseService: EntrepriseService,
    private exerciceService: ExcerciceService) { }

  ngOnInit() {
    let idJournalFils = localStorage.getItem('idJournalFils')
    localStorage.removeItem('idJournalFils')
    console.log(+idJournalFils);

    this.serviceJournal.getJournalById(+idJournalFils).subscribe(
      data => { this.journal = data ;
                this.b=data.mois;

                this.ecritureService.countEciture(this.journal).subscribe(
                  response=>{ 
                    localStorage.removeItem('numero');
                    localStorage.setItem('numero',response) ,
                  console.log(response)  },
                      
                  error=>{console.log("error count ecriture"); }
                );
              }

    )


    this.ecritureService.getAllEcritureByJournal(+idJournalFils).subscribe(

      data => { this.source = data; console.log(data) },
      error => { console.log(error) }

    )

    let idEntreprise = localStorage.getItem('current_entreprise');

    this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
      data => {
      this.entreprise = data;

        console.log(data);
      },
      error => {
        console.log(error);
      }
    );

    let idExercice = localStorage.getItem('idExercice')

    this.exerciceService.getExcerciceById(+idExercice).subscribe(
      data => {
      this.exercice = data;
        this.exercice = this.exercice;
      },
      error => { console.log(error); }
    );
this.b=this.journal.mois
console.log("b:"+this.b)
  

    localStorage.removeItem('idJournalFils');
  }


  selectedMois(journal:Journal):boolean
  {
    if(this.returnMois(journal) === "Choisir un Moi")
    {
      return true;
    }
    else
    {
      return false;
    }
  }


     returnMois(journal:Journal):string
  {

    var mois=""
    switch (journal.mois) {
      case "01": {
        mois = "Janvier:"+journal.exercice.annee
        break;
      }
      case "02": {
        mois = "Février:"+journal.exercice.annee
        break;
      }
      case "03": {
      mois = "Mars:"+journal.exercice.annee
        break;
      }
      case "04": {
        mois = "Avril:"+journal.exercice.annee
        break;
      } case "05": {
        mois = "Mai:"+journal.exercice.annee
        break;
      }
      case "06": {
        mois = "juin:"+journal.exercice.annee
        break;
      }
      case "07": {
        mois = "juillet:"+journal.exercice.annee
        break;
      }
      case "08": {
        mois = "août:"+journal.exercice.annee
        break;
      } case "09": {
        mois = "Séptember:"+journal.exercice.annee
        break;
      }
      case "10": {
        mois = "October:"+journal.exercice.annee
        break;
      }
      case "11": {
        mois = "November:"+journal.exercice.annee
        break;
      }
      case "12": {
        mois = "Décember:"+journal.exercice.annee
        break;
      }
      default: {
        return "Choisir un Moi"
        break;
      }
    }
    return  mois
  }
 


  settings = {
    actions: {
      position: 'right',
      custom: [
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Show"></i>',
        },
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Edit"></i>',

        },
        {
          name: 'deleteAction',
          title: '<i class="nb-trash" title="Delete"></i>',
        },
      ],
      add: false,
      edit: false,
      delete: false

    },


    columns: {
      numeroEcriture: {
        title: 'Numéro écriture',
        type: 'number',
        sortDirection :	'asc',

      }, numeroPiece: {
        title: 'Numéro pièce',
        type: 'number'
      },
      libelle: {
        title: 'Désignation',
        type: 'string',
      },
      date: {
        title: 'Date',
        type: 'Date'
      },
      
       

    },
  };
  onClick() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/comptabilite/journalFils']));

  }
  onClick2(){this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
  this.router.navigate(['/pages/comptabilite/journal']));}
  addEcritures() {

    localStorage.setItem("e", "0");

    this.router.navigate(['/pages/comptabilite/ajoutEcritures']);


  }

  onCustom(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem("e")
      localStorage.removeItem("idEcriture03")
      localStorage.setItem("e", "1");
      localStorage.setItem('idEcriture03', event.data.idEcriture);
      localStorage.setItem('numeroEcriture', event.data.numeroEcriture);
      localStorage.setItem('date', event.data.date);
      localStorage.setItem('numeroPiece', event.data.numeroPiece);
      localStorage.setItem('libille', event.data.libelle);
      // this.windowService.open( ModalEcritureComponent, { title: 'Modifier   Ecriture', context: event.data.idEcriture });
       this.router.navigate(['/pages/comptabilite/ajoutEcritures']);
    }
    if (event.action === 'showAction') {
      localStorage.setItem('idEcriture', event.data.idEcriture.toString());
      this.windowService.open(ShowEcritureComponent, { title: 'Afficher  Les informations de ce  écriture', context: event.data.idEcriture });
    }
  }

}
