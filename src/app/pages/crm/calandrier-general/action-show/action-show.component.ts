import { Component, Inject, OnInit } from '@angular/core';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { format } from 'date-fns';
import { ActionFull } from '../../entities/full/ActionFull';
import { ActionService } from '../../services/action.service';

@Component({
  selector: 'ngx-action-show',
  templateUrl: './action-show.component.html',
  styleUrls: ['./action-show.component.scss']
})
export class ActionShowComponent implements OnInit {
  idAction:number
  disabled:boolean=true
  action: ActionFull = new ActionFull();
  selectedHour: number;
  selectedMinute: number;
  actionDateLimite: string;
  constructor(    protected actionService : ActionService,
  
    @Inject(NB_WINDOW_CONTEXT) context) {
      this.idAction = context.idAction
    this.actionService.getAction(this.idAction ).subscribe(
      data => {
        console.log(data)
        this.action = data
        this.actionDateLimite = format(this.action.actionDateLimite, "MMM DD,YYYY HH:mm")
        this.action.actionDateCreation = new Date(this.action.actionDateCreation)
       // this.action.actionDateLimite = new Date(this.action.actionDateLimite)
      //  this.selectedHour = this.action.actionDateLimite.getHours()
      // this.selectedMinute = this.action.actionDateLimite.getMinutes() 
      
      }
    )
    }

  ngOnInit() {
  }

}
