import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ɵConsole, Input } from '@angular/core';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { LeadRow } from '../../entities/row/LeadRow';
import { LeadStepService } from '../../services/leadStep.service';
import { LeadService } from '../../services/lead.service';
import { LeadList } from '../../entities/row/LeadList';
import { LocalDataSource } from 'ng2-smart-table';
import { LeadStepCell } from '../../entities/cell/leadStepCell';

@Component({
  selector: 'ngx-lead-kanban',
  templateUrl: './lead-kanban.component.html',
  styleUrls: ['./lead-kanban.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadKanbanComponent implements OnInit {
  @Input() divided_leads:[]=[]
  @Input() connectedTo:[]=[]

  
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  steps=[];
  status:string[]=['Dénomination','Responsable','Durée','Etape','Etat',];
  source2:LeadRow[] = Array.from<LeadRow>({length: 20}).map<LeadRow>((_, i) => new LeadRow( new Date(Math.round(Math.random()*3)*10,
                                                                                              Math.round(Math.random()*11),
                                                                                              Math.round(Math.random()*28)),
                                                                                            i+1,
                                                                                            `Lead #${i+1}`,
                                                                                            Math.round((i+1)*Math.random()*500),
                                                                                            Math.round(Math.random()*100),
                                                                                            this.status[Math.round(Math.random()*4)]),
                                                                                            );
  weeks = [];divided=[];
  connectedTo2 = [];connectedTo3 = [];
  source3:LeadList[]=Array<LeadList>();datasource3:LocalDataSource
  divided2=[];  
  testvar=1;
  x : number 
 
  ngOnInit(){

this.x = 85/ this.divided_leads.length
  }
  /*
  //angular drag drop material  dynamic doesnt work 
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];
  inprogress = [
    'Get down',
    'Whiten teeth',
    'Bath',
    'Check Twitter',
    'Feed Cat'
  ];
  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];
lists=[this.todo,this.inprogress,this.done]
  drop(event: CdkDragDrop<string[]>) {
    console.log("previous")

    console.log(event.previousContainer)
    console.log("current")

    console.log(event.container)
    if (event.previousContainer === event.container) {
      console.log("previous=current")

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log("previous not equal current")
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
 
  } */

  constructor(private leadStepService:LeadStepService,
              private leadService:LeadService){
                
    // using my leads,divided by statuts table
    /* this.leadService.getLeadsTable().subscribe(
      data => { 
    
              this.source3=new Array<LeadList>().concat(data)
             // this.source3=data;
              this.source3=this.source3.filter(x=>x.leadStep!=null)
              console.log("leads in the data ",this.source3);
              
              this.datasource3=new LocalDataSource(this.source3)
                console.log("leads in the datasource",this.datasource3)
             
                this.leadStepService.getSteps().subscribe(
                  data=>{
                    data.forEach(typePrime=>{
                        this.steps.push({value: typePrime.stepID, title: typePrime.stepName})
                    })
                   
                    for(let i=0;i<this.steps.length;i++){
                      console.log("push darling push")
                      this.divided2.push({
                          id:this.steps[i].title,
                          leads:this.source3.filter(x=>x.leadStep.stepID==this.steps[i].value)
                      })
                    }
                    for (let divider of this.divided2) {
                      this.connectedTo2.push(divider.id);
                    };        
                  },
                  error=>{
                    console.log("cant get those steps yo ")
                  }
              
              )
          
        
      },
    error => { console.log("error"); });  */
   
   this.testvar=this.testvar+1;

  
    for(let i=0;i<this.status.length;i++){
      this.divided.push({
          id:this.status[i],
          leads:this.source2.filter(x=>x.status==this.status[i])
      })
    }
    for (let divider of this.divided) {
    //  this.connectedTo.push(divider.id);
    };
   

    /*
    for (let divider of this.divided2) {
      this.connectedTo2.push(divider.id);
    }; */
  /*
    this.weeks = [
      {
        id:'week-1',
        weeklist:[
          "item 1",
          "item 2",
          "item 3",
          "item 4",
          "item 5"
        ]
      },{
        id:'week-2',
        weeklist:[
          "item 1",
          "item 2",
          "item 3",
          "item 4",
          "item 5"
        ]
      },{
        id:'week-3',
        weeklist:[
          "item 1",
          "item 2",
          "item 3",
          "item 4",
          "item 5"
        ]
      },{
        id:'week-4',
        weeklist:[
          "item 1",
          "item 2",
          "item 3",
          "item 4",
          "item 5"
        ]
      },{
        id:'week-5',
        weeklist:[
          "item 1",
          "item 2",
          "item 3",
          "item 4",
          "item 5"
        ]
      },
    ];
    for (let week of this.weeks) {
      this.connectedTo.push(week.id);
    };
    */
  }
 //same drop function used for angular doc,example and my lead 
 //angular doc was missing this.connected to loop (see above)

  drop(event: CdkDragDrop<LeadList[]>) {
    //console.log("connections connections",this.connectedTo) 
    //console.log("stay divided",this.divided_leads)
   
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                       console.log("lead ID supposedly",event.container.data[event.currentIndex].leadID)
                        console.log("step name",event.container.id) 
                        let newStep=new LeadStepCell();newStep.stepName= event.container.id
                        this.leadService.updateLeadStep(event.container.data[event.currentIndex].leadID,newStep).subscribe(
                          data=>{
                            console.log("data",data)
                          },
                            error=>{console.log("couldnt update")}
                        )
    } 
   // console.log("previous event",event.previousContainer.data[event.currentIndex].leadStep)
   //console.log(event)

  }
}


