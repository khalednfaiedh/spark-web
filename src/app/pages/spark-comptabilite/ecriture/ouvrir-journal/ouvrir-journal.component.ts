import { Component, OnInit } from '@angular/core';
import { ExcerciceService, Excercice } from '../../excercice/excercice.service';
import { JournalService, Journal } from '../../journal/journal.service';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-ouvrir-journal',
  templateUrl: './ouvrir-journal.component.html',
  styleUrls: ['./ouvrir-journal.component.scss']
})
export class OuvrirJournalComponent implements OnInit {
 
  mois:string
  codJournal:string
  annee;
  Listmois=[]
  journals=[]
  exercice = new Excercice()
  journal = new  Journal();
  constructor(   private exerciceService: ExcerciceService,  
     private journalService:JournalService,private router: Router, 
      private windowRef: NbWindowRef) { }

  ngOnInit() {

    let idExercice1 = localStorage.getItem('idExercice')
    this.exerciceService.getExcerciceById(+idExercice1).subscribe(
      data => {
      this.exercice = data;
      this.annee=this.exercice.annee
      console.log(this.exercice.annee)
      /* init mois*/
      this.Listmois=[{id:"01", name:"JAN:"+this.annee},{id:"02", name:"FEV:"+this.annee},{id:"03", name:"MAR:"+this.annee},
                     {id:"04", name:"AVR:"+this.annee},{id:"05", name:"MAI:"+this.annee},{id:"06", name:"JUN:"+this.annee},
                     {id:"07", name:"JUL:"+this.annee},{id:"08", name:"AOUT:"+this.annee},{id:"09", name:"SEP:"+this.annee},
                     {id:"10", name:"OCT:"+this.annee},{id:"11", name:"NOV:"+this.annee},{id:"12", name:"D2C:"+this.annee}, ]
                     

       /* init cod journal*/
       this.journalService.getAllJournalByExerciceAndJournalParent(this.exercice.id).subscribe(
        data=>{this.journals=data;
          console.log(data)
        },
        error=>{console.log("error get journals")}
      ) ;
                  
        
      },
      error => { console.log(error); }
    );
  }


  getJournal()
  {
    console.log("get journal by cod + mois + annee")

    console.log(this.annee)
    console.log(this.codJournal)
    console.log(this.mois)

    this.journalService.getJournalByCodAndAnneAndMois(this.codJournal, this.annee,  this.mois ).subscribe(


    
      data=>{console.log(data),this.journal=data
      localStorage.setItem('idJournal2',this.journal.idJournal.toString());
      localStorage.setItem('annee',this.annee)
      localStorage.setItem('codJournal',this.codJournal)
      localStorage.setItem('mois',this.mois)
      this.windowRef.close();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/pages/comptabilite/ecritureByLot']));
      },

      error=>{"errror get journal"}
    );
  }
}

 