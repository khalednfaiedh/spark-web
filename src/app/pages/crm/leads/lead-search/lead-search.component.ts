import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { LeadFull } from '../../entities/full/LeadFull';
import { User } from '../../entities/full/User';
import { UserCell } from '../../entities/cell/UserCell';
import { LeadStepCell } from '../../entities/cell/leadStepCell';
import { LeadStepService } from '../../services/leadStep.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ngx-lead-search',
  templateUrl: './lead-search.component.html',
  styleUrls: ['./lead-search.component.scss']
})
export class LeadSearchComponent implements OnInit {
  @Output() searchLead:EventEmitter<LeadFull>=new EventEmitter();
  leadsearch:LeadFull;
  tempUser:UserCell;
  stepID:number=200000;
  users:UserCell[]
  steps:LeadStepCell[]
  constructor(
    private leadStepService: LeadStepService,
    private userService: UserService,

  ) { 
      // rami delete this
    // this.userService.getUsersCells().subscribe(
    //   data => {
    //     this.users = data;
    //   },
    //   error => {
    //     console.log("error getting users list");
    //   }
    // );

    
    this.leadStepService.getSteps().subscribe(
      data => {
        this.steps = data;
      },
      error => {
        console.log("cant get those steps yo ");
      }
    );
    this.leadsearch=new LeadFull()
    this.leadsearch.leadStep=new LeadStepCell() 
    this.tempUser=new UserCell()
    this.leadsearch.users=[]
  }

  ngOnInit() {
  
  //  this.leadsearch.leadStep=new LeadStepCell()
  
   // this.leadsearch.users=new User()
  
  }
  search(){
    console.log(this.leadsearch);
    if( this.stepID!=null)
        this.leadsearch.leadStep=this.steps.find(x=>x.stepID==this.stepID)
      else   this.leadsearch.leadStep=null
    if(this.tempUser!=null)
        {this.leadsearch.users.push(this.tempUser);}
      else this.leadsearch.users=null
   this.searchLead.emit(this.leadsearch);
   this.leadsearch.users=[]
   }
}
