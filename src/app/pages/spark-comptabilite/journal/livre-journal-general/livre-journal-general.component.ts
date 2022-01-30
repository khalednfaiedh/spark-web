import { Component, OnInit } from '@angular/core';
import { JournalService, Journal } from '../journal.service';
import { ExcerciceService } from '../../excercice/excercice.service';

@Component({
  selector: 'ngx-livre-journal-general',
  templateUrl: './livre-journal-general.component.html',
  styleUrls: ['./livre-journal-general.component.scss']
})
export class LivreJournalGeneralComponent implements OnInit {
 journals=[];
 sousJournals=[];
 code="";
 designation="";
 mois="";
  livreJournal= new  LivreJournalGeneral();
  exerciceBoolean: boolean;
  constructor( private journalService:JournalService,
               private exerciceService:ExcerciceService,) { }

  ngOnInit() {
    
    let idExercice= localStorage.getItem('idExercice');

    if( idExercice == null)
    {
      this.exerciceBoolean =true;
    }
    else
    {
      this.exerciceBoolean=false;
    }
    
    this.exerciceService.getExcerciceById(+idExercice).subscribe(
      data=>{ 
        this.livreJournal.annee=data.annee;
        this.journalService.getAllJournalByExerciceAndJournalParent(data.id).subscribe(
          data=>{this.journals=data;

            var j= new Journal();
            j.code='Tous';
            this.journals.splice(0,0,j);
          
          },
          error=>{console.log("error get journals")}
        ) ;
      
        this.journalService.getSousJournalWithOperation(data.annee).subscribe(

          data=>{this.sousJournals=data; console.log(data);
                 },
          error=>{console.log("errror get  under journal with operation")}
          )
      
      },
      error=>{console.log('error get exercice by id')}
      
    )

    
  }

  filterLivreJournal()
  {
    console.log(this.livreJournal)

    this.journalService.filtreSousJournalWithOperation(this.livreJournal).subscribe(
      data=>{console.log(data);
      this.sousJournals=data;},
      error=>{console.log("error filtre operation with two  date")}
    )
  }

  getCodCompteTier(listOperation)
{
  if(listOperation.compteTiers == null)
  return "";
  else
  return listOperation.compteTiers.codeCompte;
}

  getTotalDebit(i)
{
  var x=0;
   for(let j=0;j<this.sousJournals[i].listOperation.length;j++)
   {
   
     
     x=x+this.sousJournals[i].listOperation[j].debit;
     
   }

  return x;
}

getTotalCredit(i)
{
  var x=0;
   for(let j=0;j<this.sousJournals[i].listOperation.length;j++)
   {
     x=x+this.sousJournals[i].listOperation[j].credit;
   }

  return x;
}
}

export class LivreJournalGeneral {

  annee:string;
  dateDebut:Date;
  dateFin:Date;
  codeJournal:String
}