import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { FilterGrandLIvreComponent } from '../filter-grand-livre/filter-grand-livre.component';

@Component({
  selector: 'ngx-open-pop-up',
  templateUrl: './open-pop-up.component.html',
  styleUrls: ['./open-pop-up.component.scss']
})
export class OpenPopUpComponent implements OnInit {

  constructor(private windowService: NbWindowService) { }

  ngOnInit() {

    
    this.windowService.open( FilterGrandLIvreComponent, { title: ` Choisire  un  exercice` });  
  }

}
