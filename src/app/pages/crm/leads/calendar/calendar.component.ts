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
import { NbWindowService } from '@nebular/theme';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { LeadService } from '../../services/lead.service';
import { LeadList } from '../../entities/row/LeadList';
import { LeadDetailsComponent } from '../lead-details/lead-details.component';
import { LeadStepService } from '../../services/leadStep.service';
import { LeadStepCell } from '../../entities/cell/leadStepCell';

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
  selector: 'ngx-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarComponent implements OnInit{

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  locale:string ="fr"//Config.language;
leads:LeadList[]

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

  constructor(private windowService:NbWindowService,
              private leadService:LeadService,
              private leadStepService:LeadStepService) {
    this.leadService.getLeadsTable().subscribe(
      data => { this.leads=data;
        let topSteps:LeadStepCell[]=[]
        this.leadStepService.getSteps().subscribe(data=>{
          const maxStep = Math.max(...data.map(o => o.stepOrder), 0);
            topSteps=data.filter(x=>x.stepOrder==maxStep)
            for  (var i=0;i<this.leads.length;i++){
              let event:CalendarEvent
           if (topSteps.find(x=>this.leads[i].leadStep.stepID==x.stepID)){
              event= {
                start:new Date(this.leads[i].leadDateCreation),
                end:new Date(this.leads[i].leadDateExecution),
                title: this.leads[i].leadName,
                color: colors.yellow,
                id:this.leads[i].leadID.toString(),
                actions: this.actions,
                allDay: true,
               
              }  
            }
            else {
              event= {
                start:new Date(this.leads[i].leadDateCreation),
                end:new Date(this.leads[i].leadDateDeadline),
                title: this.leads[i].leadName,
                color: colors.yellow,
                id:this.leads[i].leadID.toString(),
                actions: this.actions,
                allDay: true,
               
              }  
             
            }
             this.events[i]=event
          }
        },
        error=>{

        })

      console.log("hello reeree")
       console.log( this.events)
      this.refresh.next();

      
      },
    error => { console.log("error"); }); 
    
    console.log(this.leads)
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
      this.windowService.open(LeadDetailsComponent, {title: 'Details Lead', context:{lead:event.id}})
   // this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
