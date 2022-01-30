import { Component, OnInit, Input } from '@angular/core';
import { ActionService } from '../../services/action.service';
import { ActionStatusService } from '../../services/actionstatus.service';
import { ActionStatus } from '../../entities/cell/ActionStatus';
import { ActionRow } from '../../entities/row/ActionRow';

@Component({
  selector: 'ngx-action-pie-chart',
  templateUrl: './action-pie-chart.component.html',
  styleUrls: ['./action-pie-chart.component.scss']
})
export class ActionPieChartComponent implements OnInit {
  @Input() chart:[]=[]
 chart2;
  source:ActionRow[];
  status:ActionStatus[]=[];
  divided_actions=[];
 
  
  constructor(
              private actionService:ActionService,

              private actionStatusService:ActionStatusService,

    ) {

   
   }

  ngOnInit() {
    this.chart2=[]
    this.actionStatusService.getActionStatusTable().subscribe( 
      data=>{this.status=data;
             this.actionService.getActionsTable().subscribe(
                data => { this.source=data;
                          this.divided_actions=[]
                          for(let i=0;i<this.status.length;i++){
                            this.divided_actions.push({
                            id:this.status[i].statusName,
                            actions:this.source.filter(x=>x.actionStatus!=null).filter(x=>x.actionStatus.statusID==this.status[i].statusID)
                          })
                        }
                        for(let i=0;i<this.divided_actions.length;i++){
                          this.chart2.push({
                            "name": this.divided_actions[i].id,
                            "value": this.divided_actions[i].actions.length
                          })
                        }
                        console.log("received chart",this.chart2)
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
