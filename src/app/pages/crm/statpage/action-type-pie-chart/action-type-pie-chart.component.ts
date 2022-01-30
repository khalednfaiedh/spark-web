import { Component, OnInit } from '@angular/core';
import { ActionRow } from '../../entities/row/ActionRow';
import { ActionStatus } from '../../entities/cell/ActionStatus';
import { ActionService } from '../../services/action.service';
import { ActionTypeService } from '../../services/actiontype.service';
import { ActionTypeCell } from '../../entities/cell/ActionTypeCell';

@Component({
  selector: 'ngx-action-type-pie-chart',
  templateUrl: './action-type-pie-chart.component.html',
  styleUrls: ['./action-type-pie-chart.component.scss']
})
export class ActionTypePieChartComponent implements OnInit {
  chart2;
  source:ActionRow[];
  types:ActionTypeCell[]=[];
  divided_actions=[];
 
  
  constructor(
              private actionService:ActionService,

              private actionTypeService:ActionTypeService,

    ) {

   
   }

  ngOnInit() {
    this.chart2=[]
    this.actionTypeService.getActionTypesTable().subscribe( 
      data=>{this.types=data;
             this.actionService.getActionsTable().subscribe(
                data => { this.source=data;
                          this.divided_actions=[]
                          for(let i=0;i<this.types.length;i++){
                            this.divided_actions.push({
                            id:this.types[i].typeName,
                            actions:this.source.filter(x=>x.actionType!=null).filter(x=>x.actionType.typeID==this.types[i].typeID)
                          })
                        }
                        for(let i=0;i<this.divided_actions.length;i++){
                          this.chart2.push({
                            "name": this.divided_actions[i].id,
                            "value": this.divided_actions[i].actions.length
                          })
                        }
                        console.log("received chart on the types",this.chart2)
                        Object.assign(this.chart2)
                        this.chart2=[...this.chart2]
                },
     error => { console.log("Cant get actions for lead chart",error); }); 
    },
    error=>{ console.log("Cant get status for lead chart",error)
   })

 
    console.log("assigned chart",this.chart2)
  }
}
