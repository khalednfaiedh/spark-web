import { Component, OnInit } from '@angular/core';
import { OuvrirJournalComponent } from '../ouvrir-journal/ouvrir-journal.component';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'ngx-open-window',
  templateUrl: './open-window.component.html',
  styleUrls: ['./open-window.component.scss']
})
export class OpenWindowComponent implements OnInit {

  constructor(private windowService: NbWindowService) { }

  ngOnInit() {

     
    this.windowService.open(OuvrirJournalComponent, { title: `Ouvrir un Journal ` });  
  }

}
