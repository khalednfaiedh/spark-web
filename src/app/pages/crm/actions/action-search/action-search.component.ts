import { Component, OnInit, Output ,EventEmitter  } from '@angular/core';
import { ActionFull } from '../../entities/full/ActionFull';
import { ActionService } from '../../services/action.service';
import { ActionStatusService } from '../../services/actionstatus.service';
import { UserService } from '../../services/user.service';
import { LeadService } from '../../services/lead.service';
import { LeadStepService } from '../../services/leadStep.service';
import { ActionTypeService } from '../../services/actiontype.service';
import { ActiontypeRow } from '../../entities/row/ActionTypeRow';
import { LeadCell } from '../../entities/cell/LeadCell';
import { ActionStatus } from '../../entities/cell/ActionStatus';
import { UserCell } from '../../entities/cell/UserCell';
import { ActionTypeCell } from '../../entities/cell/ActionTypeCell';

@Component({
  selector: 'ngx-action-search',
  templateUrl: './action-search.component.html',
  styleUrls: ['./action-search.component.scss']
})
export class ActionSearchComponent implements OnInit {
    types:ActiontypeRow[]
    leads:LeadCell[]
    status:ActionStatus[]
    users:UserCell[];
  @Output() searchAction:EventEmitter<ActionFull>=new EventEmitter();
  actionsearch:ActionFull;
  constructor(

    private actionService:ActionService,
    private actionStatusService:ActionStatusService,
    private userService:UserService,
    private leadService:LeadService,
    private actionTypeService:ActionTypeService,
 

  ) { 
      
   
    this.actionStatusService.getActionStatusTable().subscribe(
      data=>{
      this.status=data; 
    },
    error=>{
      console.log("ActionSearch Status get mistake")
    }
    )
    this.actionTypeService.getActionTypesTable().subscribe(
      data=>{
      this.types=data;

    },
    error=>{
      console.log("ActionType get mistake")
    }
    )
    // rami delete this
    // this.userService.getUsersCells().subscribe(

    //   data=>{
    //     this.users=data
    //   },
    //   error=>{
    //     console.log("action search cant get users")
    //   }
    // )

    this.leadService.getLeadCells().subscribe(
      data => { this.leads=data;

        //remember to add a way to sort out the won/lost deals that isnt dependant on their name  later 
        //maybe add a type attribute to determine if its a starting/in between/finishing step???
      //no need to he should be able to search done deals
        // this.leads=this.leads.filter(x=>(x.leadStep!=null) ).filter(x=>x.leadStep.stepName!="Won" && x.leadStep.stepName!="Lost")
  
    },
    error => { console.log("error"); }); 

  }


  ngOnInit() {
    this.actionsearch=new ActionFull()
    this.actionsearch=new ActionFull()
    this.actionsearch.actionType=new ActionTypeCell()
    this.actionsearch.actionStatus =new ActionStatus()
    this.actionsearch.lead=new LeadCell()
    this.actionsearch.user=new UserCell()
 
   // this.actionsearch.users=new User()
  }
  search(){
    console.log(this.actionsearch);
   this.searchAction.emit(this.actionsearch);
   }

}
