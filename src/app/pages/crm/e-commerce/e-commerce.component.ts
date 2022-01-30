import { Component, OnInit } from '@angular/core';

import { LeadRow } from '../entities/row/LeadRow';

  import { from } from 'rxjs';
import { ActionRow } from '../entities/row/ActionRow';
import { ActionStatus } from '../entities/cell/ActionStatus';
import { ActionService } from '../services/action.service';
import { ActionStatusService } from '../services/actionstatus.service';
import { LeadService } from '../services/lead.service';
import { LeadList } from '../entities/row/LeadList';
@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  styles :[
    `
    .container {
      display: flex;
      align-items: center;
    }

    nb-progress-bar {
      flex: 1;
    }
    table {
  
      border-collapse: collapse;
 
    }
    
    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
    
    tr:nth-child(even) {
      background-color: #f5f7fc;
    }
    .example-viewport {
      height: 400px;
      width: 100%;
   
    }
    
    .example-item {
      height: 50px;
    }
  `
  ]
})

export class ECommerceComponent implements OnInit {
l:LeadRow
  items// = Array.from<LeadRow>({length: 100}).map<LeadRow>((_, i) => new LeadRow(new Date(),i+1,`Lead #${i+1}`,Math.round((i+1)*Math.random()*500),Math.round(Math.random()*100)));




  
  source:LeadList[];
  status:ActionStatus[]=[];
  divided_actions=[];
 
 constructor( private actionService:ActionService,

  private leadService:LeadService,){
  
//if ((this.connectedTo.length==0) || (this.divided_leads.length==0)){


 }
 ngOnInit(){
  this.leadService.getLeadsTable().subscribe(
    data => { this.source=data;console.log(this.source);
      this.items=data;
    },
  error => { console.log("error"); }); 
}
  
}
