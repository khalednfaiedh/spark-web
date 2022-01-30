import { Component, OnInit } from '@angular/core';
import { LeadService } from '../../services/lead.service';
import { LeadStepService } from '../../services/leadStep.service';
import { LeadList } from '../../entities/row/LeadList';
import { LeadRow } from '../../entities/row/LeadRow';
import { LeadStepCell } from '../../entities/cell/leadStepCell';

@Component({
  selector: 'ngx-lead-bar-chart',
  templateUrl: './lead-bar-chart.component.html',
  styleUrls: ['./lead-bar-chart.component.scss']
})
export class LeadBarChartComponent implements OnInit {
 chart;
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Step';
  showYAxisLabel = true;
  yAxisLabel = 'Number of Leads';

  colorScheme = {
    domain: [ '#AAAAAA', '#C7B42C','#5AA454', '#A10A28']
  };
  source3:LeadList[];
  result:LeadRow[] ;
  typePrimes=[];
divided_leads=[]

  steps:LeadStepCell[]=[]
  constructor(
    private leadService:LeadService, 
    private leadStepService:LeadStepService,
  ) {
    
    }

  ngOnInit() {
    this.chart=[]
    this.divided_leads=[]
    this.leadStepService.getSteps().subscribe(
      data=>{
        this.steps=data
        this.leadService.getLeadsTable().subscribe(
          data => {
             this.source3=data;console.log(this.source3);
             this.source3=this.source3.sort((a,b)=>a.leadStep.position<b.leadStep.position?1:-1)
             for(let i=0;i<this.steps.length;i++){
              this.divided_leads.push({
                  id:this.steps[i].stepName,
                  leads:this.source3.filter(x=>x.leadStep!=null).filter(x=>x.leadStep.stepID==this.steps[i].stepID)
              })
            }
            for(let i=0;i<this.divided_leads.length;i++){
              this.chart.push({
                "name": this.divided_leads[i].id,
                "value": this.divided_leads[i].leads.length
              })
            }
            console.log("received bars",this.chart)
            Object.assign(this.chart)
            this.chart=[...this.chart]



          },
        error => { console.log("error"); }); 
      
   
      },
      error=>{
        console.log("cant get those steps yo ")
      }
  
  )

   
 



  }

}
