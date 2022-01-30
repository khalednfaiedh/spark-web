import { Component, OnInit } from '@angular/core';
import { JournalService } from '../journal.service';
import { ExcerciceService } from '../../excercice/excercice.service';

@Component({
  selector: 'ngx-journal-centralise',
  templateUrl: './journal-centralise.component.html',
  styleUrls: ['./journal-centralise.component.scss']
})
export class JournalCentraliseComponent implements OnInit {
  journals=[];
  sousJournals=[];
  code="";
  designation="";
  mois="";
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
          console.log(data)

         this.journalService.getJournalCentralisee(data.annee).subscribe(
 
        data1=>{this.sousJournals=data1;
           console.log("sous journal"+ data1);
               },
        error=>{console.log("errror get  under journal with operation")}
        ) },
       error=>{console.log('error get exercice by id')}
     );
       
     

     
   }

  
  
 
   getCodCompteTier(listOperation)
 {
   if(listOperation.compteTiers == null)
   return "";
   else
   return listOperation.compteTiers.codeCompte;
 }
 
 getTotalDebitCompteBilan(i)
 {
   var x=0;
    for(let j=0;j<this.sousJournals[i].listOperation.length;j++)
    {
      
      if( this.sousJournals[i].listOperation[j].typeCompte == 'compteBilan')
      {
      x=x+this.sousJournals[i].listOperation[j].debit;
      }
    }
 
   return x;
 }
 
 getTotalCreditCompteBilan(i)
 {
   var x=0;
    for(let j=0;j<this.sousJournals[i].listOperation.length;j++)
    {
      if( this.sousJournals[i].listOperation[j].typeCompte == 'compteBilan')
       {
      x=x+this.sousJournals[i].listOperation[j].credit;
       }
    }
 
   return x;
 }

 getTotalDebitCompteGestion(i)
 {
   var x=0;
    for(let j=0;j<this.sousJournals[i].listOperation.length;j++)
    {
      
      if( this.sousJournals[i].listOperation[j].typeCompte == 'compteGestion')
      {
      x=x+this.sousJournals[i].listOperation[j].debit;
      }
    }
 
   return x;
 }
 
 getTotalCreditCompteGestion(i)
 {
   var x=0;
    for(let j=0;j<this.sousJournals[i].listOperation.length;j++)
    {
      if( this.sousJournals[i].listOperation[j].typeCompte == 'compteGestion')
       {
      x=x+this.sousJournals[i].listOperation[j].credit;
       }
    }
 
   return x;
 }
 }
 

