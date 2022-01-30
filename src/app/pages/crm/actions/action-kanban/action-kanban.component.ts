import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation,} from '@angular/core';
import { transferArrayItem, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { ActionRow } from '../../entities/row/ActionRow';
import { ActionStatus } from '../../entities/cell/ActionStatus';
import { ActionService } from '../../services/action.service';

@Component({
  selector: 'ngx-action-kanban',
  templateUrl: './action-kanban.component.html',
  styleUrls: ['./action-kanban.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionKanbanComponent implements OnInit {
  @Input() divided_actions:[]=[]
  @Input() connectedTo:[]=[]
  @Input() test:String
  constructor(
    private actionService:ActionService
  ) { }

  ngOnInit() {
    console.log("are we missing somethis")
    console.log("connections connections",this.connectedTo) 
    console.log("stay divided",this.divided_actions)
  }
  drop(event: CdkDragDrop<ActionRow[]>) {
    console.log("connections connections",this.connectedTo) 
    console.log("stay divided",this.divided_actions)
   
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
/*                        console.log("lead ID supposedly",event.container.data[event.currentIndex].actionStatus.statusID)
                        console.log("step name",event.container.id)  */
                        let newStatus=new ActionStatus();newStatus.statusName= event.container.id
                        this.actionService.updateActionStatus(event.container.data[event.currentIndex].actionID,newStatus).subscribe(
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
