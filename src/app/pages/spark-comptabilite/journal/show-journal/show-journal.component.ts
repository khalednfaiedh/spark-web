import { Component, OnInit } from '@angular/core';
import { Journal, JournalService } from '../journal.service';

@Component({
  selector: 'ngx-show-journal',
  templateUrl: './show-journal.component.html',
  styleUrls: ['./show-journal.component.scss']
})
export class ShowJournalComponent implements OnInit {
journal = new Journal()
annee="";
  constructor(private journalService:JournalService) { }

  ngOnInit() {
    let  idJournal = localStorage.getItem('idJournal');
     localStorage.removeItem('idJournal')
    this.journalService.getJournalById(+idJournal).subscribe(
      data=>{this.journal = data; this.annee=this.journal.exercice.annee      },
      error=>{console.log(error);}
    );
  }

  }

