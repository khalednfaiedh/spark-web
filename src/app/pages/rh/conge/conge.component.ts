import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { CongeService } from './conge.service';
import { ViewCell } from 'ng2-smart-table';
import { AddCongeComponent } from './add-conge/add-conge.component';
import { SuivieCongeComponent } from './suivie-conge/suivie-conge.component';
import { GestionDesCongesComponent } from './gestion-des-conges/gestion-des-conges.component';
import { EntrepriseService } from '../../admin/entreprise/entreprise.service';
import { Entreprise } from '../../admin/entreprise/entreprise';

@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()"class="btn btn-hero-info xsmall" nbButton type="submit" size="small" value="Demande congé"/> </div>',
})
export class ButtonDemandeCongeComponent implements ViewCell, OnInit {
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
    localStorage.setItem('idC', this.rowData.idContrat);
    localStorage.setItem('sodle', this.rowData.congeAcuis);
    localStorage.setItem('idEmploye', this.rowData.matriculeEmploye);
    localStorage.setItem('e', '0');
    this.windowService.open(AddCongeComponent);
  }
}

@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" class="btn btn-hero-success xsmall" nbButton type="submit" size="small" value="Suivi congé"/> </div>',
})
export class ButtonSuivieCongeComponent implements ViewCell, OnInit {
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
    localStorage.setItem('idC', this.rowData.idContrat);
    localStorage.setItem('idEmploye', this.rowData.matriculeEmploye);
    this.windowService.open(SuivieCongeComponent);
  }
}
@Component({
  selector: 'ngx-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.scss']
})
export class CongeComponent implements OnInit {

  source: any;
  nbrCongeEnAttente : number ;
  entreprise = new Entreprise()
  constructor( private service: CongeService, private windowService: NbWindowService,
    private entrepriseService : EntrepriseService) {
  }

  ngOnInit() {
    let idEntreprise = localStorage.getItem('current_entreprise')
    this.service.getAllCongesEmployeeByEntreprise(+idEntreprise).subscribe(
      data => {
        this.source = data;
       },
      error => { console.log('erreur get all') });
  
        this.service.getAllCongesEnAttenteByEntreprise(+idEntreprise).subscribe(
          data => { 
            this.nbrCongeEnAttente = data.length;        
          },
          error => {
            console.log('nombre inconnu')
             }
        );
     this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
       data => {
         this.entreprise = data ;
       },
       error => {
         console.log('erreur entreprise')
       }
     )
  }

  settings = {
    actions: {
      add: false,
      edit: false,
      delete : false, 
    },

    columns: {    
    matriculeEmploye   : {
        title: 'Matricule',
        type: 'number',
        filter: true,

      },
      nomEmploye   : {
        title: 'Nom',
        type: 'String',
        filter: true,
      },
      prenomEmploye   : {
        title: 'Prénom',
        type: 'String',
        filter: true,
      },
      
      congeAcuis   : {
        title: 'Solde Congé',
        type: 'number',
        filter: true,
        valuePrepareFunction: (congeAcuis) => {
          return congeAcuis+' jours' ;
        }
      },
      conge: {
        title: 'Demande Congé',
        filter: false,
        type: 'custom',
        renderComponent: ButtonDemandeCongeComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {  
          });
        },
      },
      suivi: {
        title: 'Suivi',
        filter: false,
        type: 'custom',
        renderComponent: ButtonSuivieCongeComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          });
        },
      },
    },
  };
 openWindow() {
    this.windowService.open(GestionDesCongesComponent, { title: '' },
    );
  }

  }

