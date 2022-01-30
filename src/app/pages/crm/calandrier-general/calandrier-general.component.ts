import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { CalendarDateFormatter, CalendarView, CalendarEvent, DAYS_OF_WEEK, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { subDays, addHours, isSameMonth, isSameDay } from 'date-fns';
import { Subject } from 'rxjs';
import { CustomDateFormatter } from '../actions/action-calendar/custom-date-formatter.provider';
import { DetailsAffaireComponent } from '../leads/details-affaire/details-affaire.component';
import { LeadService } from '../services/lead.service';
import { ActionRow } from '../entities/row/ActionRow';
import { Router } from '@angular/router';
import { ConfirmDeleteComponent } from '../leads/confirm-delete/confirm-delete.component';
import { ActionShowComponent } from './action-show/action-show.component';
import { LeadFull } from '../entities/full/LeadFull';


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
  selector: 'ngx-calandrier-general',
  templateUrl: './calandrier-general.component.html',
  styleUrls: ['./calandrier-general.component.scss'],


  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalandrierGeneralComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  locale: string = "fr"//Config.language;
  actionsList: ActionRow[]
  affaires: LeadFull[]
  selectedAffaire:LeadFull
  events: CalendarEvent[] = [];
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = true;

  constructor(private windowService: NbWindowService,
    private router: Router,
    private affaireService: LeadService) { 
      this.affaireService.getAffaires4Calandae().subscribe(
        data => {
          this.affaires = data;  
          this.showAll(this.affaires)
        },
        error => { console.log("error"); });
     }

  ngOnInit() {
  }

  showAll(affaireList){
    affaireList.forEach(i => {
      let A = i.actions.length
      let event: CalendarEvent = {
        start: addHours(new Date(i.leadDateCreation), 7), //8h du matin
        end: addHours(new Date(i.leadDateDeadline), 0.5),//0.5 =30min = 1 cell
        title: i.leadName + ': ' + A + ' action(s).',
        color: colors.blue,
        id: i.leadID.toString(),
        actions: this.actions,
      }
      this.events.push(event)
    })
    this.refresh.next();
  }
  showOne(affaire){
      let A = affaire.actions.length
      let event: CalendarEvent = {
        start: addHours(new Date(affaire.leadDateCreation), 7), //8h du matin
        end: addHours(new Date(affaire.leadDateDeadline), 0.5),//0.5 =30min = 1 cell
        title:affaire.leadName + ': ' + A + ' action(s).',
        color: colors.blue,
        id: affaire.leadID.toString(),
        actions: this.actions,
      }
      this.events.push(event)
   
    this.refresh.next();
  }


  changeSelect(affaire){
    console.log(typeof affaire)
    this.events = [];
    console.log(affaire);
    if (affaire == null || affaire == undefined) {
      console.log('empty select')
      console.log(this.affaires)
      this.showAll(this.affaires)
    } else if (affaire == 'all') {
      console.log('all select')
     this.showAll(this.affaires)
    }
   else {
      console.log('one')
      this.showOne(affaire)
  }
}


  // this.affaires.forEach(i => {
  //   let A = i.actions.length
  //   let event: CalendarEvent = {
  //     start: addHours(new Date(i.leadDateCreation), 7), //8h du matin
  //     end: addHours(new Date(i.leadDateDeadline), 0.5),//0.5 =30min = 1 cell
  //     title: i.leadName + ': ' + A + ' action(s).',
  //     color: colors.blue,
  //     id: i.leadID.toString(),
  //     actions: this.actions,
  //   }
  //   this.events.push(event)
  // })
  // this.refresh.next();


  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];



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

    if (event.color === colors.blue) {
      if (action === 'Edited') {
        this.router.navigate(["/pages/crm/affaire/edit", event.id])
      } else if (action === 'Deleted') {
        this.windowService.open(ConfirmDeleteComponent, {
          title: 'Archiver affaire', context: {
            idAffaire: event.id
          }
        });
      } else {
        this.windowService.open(DetailsAffaireComponent, { title: 'Affaire détails', context: { idAffaire: event.id } })
      }
    } else {
      this.windowService.open(ActionShowComponent, {
        title: 'Action détails', context: {
          idAction: event.id
        }
      });
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  // actions2: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fa fa-fw fa-pencil"></i>',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event);
  //     }
  //   },
  //   {
  //     label: '<i class="fa fa-fw fa-times"></i>',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter(iEvent => iEvent !== event);
  //       this.handleEvent('Deleted', event);
  //     }
  //   }
  // ];
}

