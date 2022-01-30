import { Component, OnInit } from '@angular/core';
import { JournalService } from '../../journal/journal.service';
import { ExcerciceService, Excercice } from '../../excercice/excercice.service';
import { ReportService } from '../report.service';
import { TostarService } from '../../tostar/tostar.service';
import { NbWindowRef } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-repport-manuelle',
  templateUrl: './repport-manuelle.component.html',
  styleUrls: ['./repport-manuelle.component.scss']
})
export class RepportManuelleComponent implements OnInit {


  codJournal:string;
  journals=[];
  exercie = new Excercice();
  constructor(  private journalService:JournalService,
                private exerciceService:ExcerciceService,
             private repportService:   ReportService,
             private tostarService:TostarService,
             public windowRef: NbWindowRef) { }

  ngOnInit() {

    let idExercice= localStorage.getItem('idExercice');
    
    this.exerciceService.getExcerciceById(+idExercice).subscribe(
      data=>{ this.exercie=data
        this.journalService.getAllJournalByExerciceAndJournalParent(data.id).subscribe(
          data2=>{this.journals=data2;
           
            console.log(data2)
          },
          error2=>{console.log("error get journals")}
        ) ;
      
      
      },
      error=>{console.log('error get exercice by id')}
      
    )}

    report()
    {
      console.log(this.codJournal)
      console.log(this.exercie.annee)
      
      this.repportService.reportManuelle(this.exercie.annee,this.codJournal).subscribe(
        data=>{console.log("ok ça marche")
        this.tostarService.showToast(NbToastStatus.SUCCESS,'SUCCESS','   Report à nouveau avec succès!')
     //   this.windowRef.close();
    },
        error=>{console.log("error report a nouveau manuelle") 
        this.tostarService.showToast(NbToastStatus.DANGER,'ERREUR','     Report à nouveau  non   effectué!')
      //  this.windowRef.close(); 
    }
      );
}
}
