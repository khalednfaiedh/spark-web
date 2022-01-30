
import { NbWindowService } from '@nebular/theme';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { Config } from '../../config/config';
import { ActionService } from '../../services/action.service';
import { ActionRow } from '../../entities/row/ActionRow';

import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarDateFormatter,
  DAYS_OF_WEEK
} from 'angular-calendar';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'ngx-dash-calendar',
  templateUrl: './dash-calendar.component.html',
  styleUrls: ['./dash-calendar.component.scss']
})
export class DashCalendarComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  
  CalendarView = CalendarView;

 viewDate: Date = new Date();
  locale:string ="fr"//Config.language;
   actionsList:ActionRow[]
  events: CalendarEvent[] = [];
   weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
   weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY]; 
  
   modalData: {
    action: string;
    event: CalendarEvent;
  };
ngOnInit(){
}
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();


  activeDayIsOpen: boolean = true;

  constructor(private windowService:NbWindowService,private actionService:ActionService) {
    this.actionService.getActionsTable().subscribe(
      data => { 
        this.actionsList=data;
        console.log("yes",this.actionsList);
        this.actionsList.forEach(action=>{
         action.actionDateCreation=subDays(new Date(),10)
        if (action.actionStatus !=null){
            if (action.actionStatus.statusName!="Done"){
              let event:CalendarEvent= {
                start:new Date(action.actionDateLimite),
                end:addHours(new Date(action.actionDateLimite),2),
                title:action.actionName,
                color:colors.blue,
/*
                { 
                        primary: action.actionType.typeColor,
                        secondary: '#FAE3E3'
                       }, 
*/
               
                id:action.actionID.toString(),
                actions: this.actions,
                //allDay: true
              }
              this.events.push(event)
            }
        }
      })
        this.refresh.next();

        console.log( this.events)
      },
    error => { console.log("error"); }); 
    
    console.log(this.actions)

  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    //this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
     // this.windowService.open(ActionDetailsComponent, {title: 'Details Action', context:{action:event.id}})
   // this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
