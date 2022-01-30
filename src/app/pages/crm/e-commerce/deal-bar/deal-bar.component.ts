import { Component, OnInit, Input } from '@angular/core';
import { LeadRow } from '../../entities/row/LeadRow';
import { LeadModalComponent } from '../lead-modal/lead-modal.component';
import { NbWindowService } from '@nebular/theme';
import { LeadList } from '../../entities/row/LeadList';

@Component({
  selector: 'ngx-deal-bar',
  templateUrl: './deal-bar.component.html',
  styleUrls: ['./deal-bar.component.scss']
})
export class DealBarComponent implements OnInit {

  constructor(private windowService:NbWindowService) { }
  value = 25;
  @Input() item:LeadList;
  
  setValue(newValue) {
    this.item.leadProgress = Math.min(Math.max(newValue, 0), 100)
  }
  
  get status() {
    if (this.item.leadProgress <= 25) {
      return 'danger';
    } else if (this.item.leadProgress <= 50) {
      return 'warning';
    } else if (this.item.leadProgress <= 75) {
      return 'info';
    } else {
      return 'success';
    }
  }
  openWindowType() { 
    console.log("what ?its this one?"+this.item.leadID);
   
    this.windowService.open(LeadModalComponent, {title: 'Details Lead', context :this.item});
  }
  ngOnInit() {
    //this.item=new Lead(0,"1","20",4);
    //console.log(this.item)
  }

}
