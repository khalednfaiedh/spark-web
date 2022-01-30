import { Component, OnInit } from '@angular/core';
import { ExcerciceService, Excercice } from '../../excercice/excercice.service';
import { RapprochementServiceService } from '../rapprochement-service.service';
import { Router } from '@angular/router';
import { JournalService, Journal } from '../../journal/journal.service';

@Component({
  selector: 'ngx-continuerapprochement',
  templateUrl: './continuerapprochement.component.html',
  styleUrls: ['./continuerapprochement.component.scss']
})
export class ContinuerapprochementComponent implements OnInit {
  exercice = new Excercice();
  rapprochement=[]
  selection = [];
  id:number;
  piece:string
  codJournal:string
  journal:Journal
  journals:Journal[]
  types=[{id:1,name:"Ecritures rapprochées"},{id:2,name:"Ecritures non rapprochées"},{id:3,name:" Tout Les Ecritures  "}]
  constructor(private exerciceService:ExcerciceService,
              private  RapprochementService :RapprochementServiceService,
              private router: Router , 
              private journalService:JournalService) { }

  ngOnInit() {



    let codJournal= localStorage.getItem('codJournal');
    
    console.log(codJournal);
this.codJournal=codJournal
    let idExercice= localStorage.getItem('idExercice')
    this.exerciceService.getExcerciceById(+idExercice).subscribe(
      data => {this.exercice = data;
        this.exercice=this.exercice;
        console.log(data)

               this.journalService.getJournalByAnneeAndNatureBanque(this.exercice.annee).subscribe(

                data=>{this.journals=data},
                err=>{console.log('err  get Journal by nature')}
               )



        /** get all */
        // this.RapprochementService.findAll(codJournal,this.exercice.annee).subscribe(
        //   data2=>{
        //     console.log(data2)
        //     this.rapprochement=data2;
          
        //   },
        //   error=>{console.log("error data2")}
        // )

        /***
         * finsh
         */
              },
      error => {console.log(error);}
      );
  }

  getSelection(item) {
    return this.selection.findIndex(s => s.idOperartionEcriture === item.idOperartionEcriture) !== -1;
  }

  changeHandler(item: any, event: KeyboardEvent) {
    const id = item.idOperartionEcriture;

    const index = this.selection.findIndex(u => u.idOperartionEcriture === id);
    if (index === -1) {
      // ADD TO SELECTION
      // this.selection.push(item);
      this.selection = [...this.selection, item];
    } else {
      // REMOVE FROM SELECTION
      this.selection = this.selection.filter(user => user.idOperartionEcriture !== item.idOperartionEcriture)
      // this.selection.splice(index, 1)
    }
  }
  filtreOperations()
  {
    if(this.id ==1)
    {
      console.log("ecriture rapprocher")

      this.RapprochementService.findByEtat( this.journal.plan.id,this.exercice.annee,this.journal.code,"oui").subscribe(
        data=>{this.rapprochement=data; console.log("ok"),console.log(data)},
        error=>{console.log("error")}

      )
    }
    else
    if(this.id==2)
    {
      this.RapprochementService.findByEtat( this.journal.plan.id,this.exercice.annee,this.journal.code,"non").subscribe(
        data=>{this.rapprochement=data; console.log("ok")},
        error=>{console.log("error")}

      )
    }
    else
    {
       this.findRapprochement();
    }
  }

controleSaisie()
{
  if(this.piece==null)
  {
    return true;
  }
  return false;
  }

  rapprocher()
  {
    console.log(this.selection)
    this.selection.forEach(element => {
      element.pieceTresorerie=this.piece;
    });

    this.RapprochementService.rapprocher(this.selection).subscribe(

      data=>{console.log(data)
        // this.router.navigateByUrl('/',{skipLocationChange: true}).then(()=>
        // this.router.navigate(['/pages/comptabilite/continueRapprochement']));

        this.findRapprochement()
      },
      error=>{console.log("error")}
    )
  }

  dataNotFound()
 {
   if( this.rapprochement.length===0)
       {
         return true;
       }
       else
       {
      return false;
       }
      }

      findRapprochement()
      {
        console.log(this.journal.code)
        console.log(this.journal.plan.id)
        this.RapprochementService.findAll( this.journal.plan.id,this.exercice.annee,this.journal.code).subscribe(
            data2=>{

              console.log('rapprochement bancair get alll')
              console.log(data2)
              this.rapprochement=data2;
            
            },
            error=>{console.log("error data2")}
          )
      }
}
