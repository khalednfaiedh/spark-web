import { Component, OnInit } from '@angular/core';
import { JournalService } from '../../journal/journal.service';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-modal-rapprochement',
  templateUrl: './modal-rapprochement.component.html',
  styleUrls: ['./modal-rapprochement.component.scss']
})
export class ModalRapprochementComponent implements OnInit {

  journals = []
  codJournal:string
  date = new Date();
  constructor(private journalService: JournalService, private router: Router,
    private windowRef: NbWindowRef) { }

  ngOnInit() {
    let idExercice = localStorage.getItem('idExercice')
    this.journalService.getAllJournalByExerciceAndJournalParent(+idExercice).subscribe(
      data => {
      this.journals = data;
        console.log(data)
      },
      error => { console.log("error get journals") }
    );

  }

  rapprochement()
  {
    console.log(this.codJournal)
    localStorage.setItem("codJournal",this.codJournal)
    this.windowRef.close();
    this.router.navigateByUrl('/',{skipLocationChange: true}).then(()=>
    this.router.navigate(['/pages/comptabilite/continueRapprochement']));
  }

}
