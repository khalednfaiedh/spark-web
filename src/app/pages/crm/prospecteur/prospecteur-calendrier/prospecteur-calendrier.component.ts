import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { CalendarDateFormatter, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { addHours, isSameMonth, isSameDay, addMinutes } from 'date-fns';
import { Subject } from 'rxjs';
import { CustomDateFormatter } from '../../actions/action-calendar/custom-date-formatter.provider';
import { ActionShowComponent } from '../../calandrier-general/action-show/action-show.component';
import { LeadFull } from '../../entities/full/LeadFull';
import { ActionRow } from '../../entities/row/ActionRow';
import { ConfirmDeleteComponent } from '../../leads/confirm-delete/confirm-delete.component';
import { DetailsAffaireComponent } from '../../leads/details-affaire/details-affaire.component';
import { ActionModel } from '../../leads/edit-affaire/apopup/action';
import { ProspecteurService } from '../prospecteur.service';
const colors: any = {
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  }
};
@Component({
  selector: 'ngx-prospecteur-calendrier',
  templateUrl: './prospecteur-calendrier.component.html',
  styleUrls: ['./prospecteur-calendrier.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})

export class ProspecteurCalendrierComponent implements OnInit {
  prospecteur: String
  source: ActionModel[];
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  locale: string = "fr"//Config.language;
  actionsList: ActionRow[]
  affaires: LeadFull[]
  events: CalendarEvent[] = [];
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = true;

  constructor(protected service: ProspecteurService, private windowService: NbWindowService,
    private router: Router) { }

  ngOnInit() {
    this.prospecteur = localStorage.getItem('prospecteur')
    console.log(this.prospecteur)
    this.service.getActions(this.prospecteur).subscribe(
      data => {
        this.source = data
        console.log(data)
        this.source.forEach(i => {
          i.actionName = i.actionType.typeName
          console.log(new Date(i.actionDateLimite))
          let event: CalendarEvent = {
            start: new Date(i.actionDateLimite),
            end: addHours(new Date(i.actionDateLimite), this.convertToHours(+i.actionduration)),//0.5 =30min = 1 cell
            title: i.actionName.toString() + '(' + i.lead.leadName + ')',
            color: colors.blue,
            id: i.actionID.toString(),
            //  actions: this.actions,           
          }
          this.events.push(event)
        })
        this.refresh.next();
      },
      error => { console.log(error) }
    )
  }
  convertToHours(min: number): number {
    if (min < 30) {
      min = 30
    }
    return min / 60
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
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  retour() {
    this.router.navigate(['/pages/crm/prospecteurs'])
  }
}




