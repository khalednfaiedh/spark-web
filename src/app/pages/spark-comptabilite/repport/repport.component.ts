import { Component, OnInit } from '@angular/core';
import { RepportManuelleComponent } from './repport-manuelle/repport-manuelle.component';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'ngx-repport',
  templateUrl: './repport.component.html',
  styleUrls: ['./repport.component.scss']
})
export class RepportComponent implements OnInit {

  constructor(private windowService: NbWindowService) { }

  ngOnInit() {


    this.windowService.open(RepportManuelleComponent, { title: `Report à nouveau` }); 
  }

}
