import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { format } from 'date-fns';
import { ViewCell } from 'ng2-smart-table';
import { ActionModel } from '../leads/edit-affaire/apopup/action';
import { HistoriqueActionComponent } from './historique-action/historique-action.component';
import { ProspecteurCalendrierComponent } from './prospecteur-calendrier/prospecteur-calendrier.component';
import { ProspecteurService } from './prospecteur.service';

@Component({
  selector: 'ngx-button-edit-affaire',
  template:
    '<div class="button-container">\n' +
    '      <button (click)="onClick()" nbButton style="padding: 0.5rem;" status="info" type="submit"><i class="fa fa-list" aria-hidden="true"></i>    </button> \n'+ 
    '    </div>',
})
export class ButtonViewActionHistory implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();
  
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService) {
  }
  onClick() {
    this.windowService.open(HistoriqueActionComponent, {
      title: 'Liste des actions de '+this.rowData.intervenant,
       context: { 
       prospecteur: this.rowData.intervenant}}); 
  }
}

@Component({
  selector: 'ngx-button-edit-affaire',
  template:
    '<div class="button-container">\n' +
    '      <button (click)="onClick()" style=" padding: 0.5rem;" nbButton status="info" type="submit"><i class="fa fa-calendar" aria-hidden="true"></i>   </button> \n'+ 
    '    </div>',
})
export class ButtonViewCalendrier implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();
  
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private router: Router) {
  }
  onClick() {
    localStorage.setItem('prospecteur',this.rowData.intervenant)
    this.router.navigate(['/pages/crm/prospecteurs/calendrier'])
    // this.windowService.open(ProspecteurCalendrierComponent, {
    //   title: 'Calendrier des actions de '+this.rowData.intervenant,
    //    context: { 
    //    prospecteur: this.rowData.intervenant}}); 
  }
}
@Component({
  selector: 'ngx-prospecteur',
  templateUrl: './prospecteur.component.html',
  styleUrls: ['./prospecteur.component.scss']
})
export class ProspecteurComponent implements OnInit {
  source: ActionModel[]
  constructor(protected prospecteurService: ProspecteurService) { }

  ngOnInit() {
    this.prospecteurService.getListe().subscribe(
      data => this.source = data
    )
  }
  settings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false
    },

    pager: {
      display: true,
      perPage: 15
    },
    columns: {
      intervenant: {
        title: 'Prospecteur',
        type: 'string',
      },
      lead: {
        title: 'Affaire',
        type: 'string',
       
        valuePrepareFunction(lead) {
          return lead ? lead.leadName : '-'
        }
      },
      actionType: {
        title: 'Dernière action',
        type: 'string',
        width: "15vw",
        valuePrepareFunction(actionType) {
          return actionType ? actionType.typeName : '-'
        }
      },
      actionDateLimite: {
        title: 'Date action',
        type: 'Date',
        valuePrepareFunction(actionDateLimite) {
          return actionDateLimite ? format(actionDateLimite, "DD/MM/YYYY HH:mm") : '-'
        }
      },
      actionDateCreation:{
        title: 'Date de création',
        type: 'Date',
        valuePrepareFunction(actionDateCreation){
          return actionDateCreation ? format(actionDateCreation,"DD/MM/YYYY HH:mm"):'-'
        }
      },
 
      actionStatus: {
        title: 'Statut',
        type: 'string',
        valuePrepareFunction(actionStatus) {
          return actionStatus ? actionStatus.statusName : '-'
        }
      },
      acton: {
        title: 'Liste',
        filter:false,
        type: 'custom',
        renderComponent: ButtonViewActionHistory,
      },
      Cal: {
        title: 'Calendrier',
        filter:false,
        type: 'custom',
        renderComponent: ButtonViewCalendrier,
      },
  
  }
}

}
