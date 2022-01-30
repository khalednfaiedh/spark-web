import { Component, OnInit } from '@angular/core';
import { JournalService } from '../journal.service';
import { Router } from '@angular/router';
import { NbWindowService, NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-choisir-journal',
  templateUrl: './choisir-journal.component.html',
  styleUrls: ['./choisir-journal.component.scss']
})
export class ChoisirJournalComponent implements OnInit {
id:number
journals=[]
  constructor( private journalService:JournalService ,
    private windowService: NbWindowService,
    private router: Router,
    private windowRef: NbWindowRef) { }

  ngOnInit() {

    let idExercice = localStorage.getItem('idExercice')

    this.journalService.getAllJournalByExerciceAndJournalParent(+ idExercice).subscribe(

      data=>{this.journals=data ;console.log(data)}
    )
  }


  ouvrirJournal()
  {
    console.log(this.id)
    localStorage.setItem('idJournalParent',this.id.toString())
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
   this.router.navigate(['/pages/comptabilite/journalFils']));
   this.windowRef.close()
   
  }

}
