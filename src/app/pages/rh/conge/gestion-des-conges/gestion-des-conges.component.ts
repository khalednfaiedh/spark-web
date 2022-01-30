import { Component, OnInit } from '@angular/core';
import { CongeService } from '../conge.service';
import { CongeModel } from '../conge.model';
import { Router } from '@angular/router';
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthoritiesConge } from '../../../../authorisation/authoritiesConge';

@Component({
  selector: 'ngx-gestion-des-conges',
  templateUrl: './gestion-des-conges.component.html',
  styleUrls: ['./gestion-des-conges.component.scss']
})
export class GestionDesCongesComponent implements OnInit {

  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus
  title: string;
  content = ` `;
  idEntreprise ;
  authoritiesConfirm: boolean = false;
  authoritiesDecline: boolean  = false;
  authoritiesDelete: boolean  = false;
  constructor(private toastrService: NbToastrService, public  service : CongeService , public router: Router) { }
  congeEnAttente : any ;
  congeTraiter : any ;

  ngOnInit() {
    this.idEntreprise = localStorage.getItem('current_entreprise') ;
    this.ngINitCongesEnAttente();
    this.ngInitCongesTraiter();
   
    if (Authorities.hasAutorities(AuthoritiesConge.CONGE_CONFIRM_VALUE)) {
      this.authoritiesConfirm = true;  
    }
    if (Authorities.hasAutorities(AuthoritiesConge.CONGE_ANNULER_VALUE)) {
      this.authoritiesDecline = true;  
    }
    if (Authorities.hasAutorities(AuthoritiesConge.CONGE_DELETE_VALUE)) {
      this.authoritiesDelete = true;  
    }


  }
  ngINitCongesEnAttente(){
  this.service.getAllCongesEnAttenteByEntreprise(this.idEntreprise).subscribe(
    data => { 
      this.congeEnAttente = data; 
    },
    error => { }
  );
}
ngInitCongesTraiter(){
  this.service.getAllCongesTraiterByEntreprise(this.idEntreprise).subscribe(
    data => { 
      this.congeTraiter = data; 
    },
    error => { }
  );
}
settings = {

  actions: {
    add: false,
    edit: false,
    delete: false,
    position: 'right',
    custom: [
 
    ],
  },
  columns: {
    matriculeEmploye: {
      title: 'Matricule ',
      type: 'string',
      filter: true,
    },

    nomEmploye: {
      title: 'Nom ',
      type: 'string',
      filter: true,
    },

    prenomEmploye: {
      title: 'Prénom ',
      type: 'string',
      filter: true,
    },

    fonction: {
      title: 'Fonction ',
      type: 'string',
      filter: true,
    },

    congeType : {
      title: 'Désignation ',
      type: 'string',
      filter: true,
      valuePrepareFunction: (cell) => {
           return cell.designation;
          },
      
    },
    dateDebut: {
      title: 'Date Début',
      type: 'date',
      filter: true,
      width:'150px'
    },
    dateFin: {
      title: 'Date Fin',
      type: 'Date',
      filter: true,
      width:'150px'
    },
    
    nbrJours: {
      title: 'Jours ',
      type: 'number',
      filter: true,
      width:'50px',
      valuePrepareFunction: (cell) => {
        return cell +'j';
       },
    },

    etat: {
      title: 'Etat',
      type: 'list',
      width: '150px',
      filter: {
        type: 'list',
        config: {
          selectText: 'Etat',
          list: [{ value: '0', title: 'Annuler' }, { value: '2', title: 'Confirmer' }],
        },
      },
      editor: {
        type: 'list',
        config: {
          selectText: 'Etat',
          list: [{ value: '0', title: 'annuler' }, { value: '2', title: 'Confirmer' },],
        },
      },
      valuePrepareFunction: (cell) => {
        if (cell == 2) {
          return 'Confirmer'
        }else return 'Annuler'
       },
    },
    dateConfirmation: {
      title: 'Date Confirmation',
      type: 'Date',
      filter: true,
    },
  },
}

confirmer(CONGE){
      this.service.confirm(CONGE.idConge).subscribe(
        data => {
          this.ngINitCongesEnAttente();
          this.ngInitCongesTraiter();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(["pages/rh/conge"]));
          this.content = 'Congé valider'
          this.status = NbToastStatus.SUCCESS;
          this.makeToast();
        },
        error => {
                if(error.status == 503){                        
                            this.title = 'Erreur'
                            this.content = "Solde congé n'est plus suffisant" 
                            this.status = NbToastStatus.DANGER;
                            this.makeToast();
                }
          }
      )  
  }
  
  annuler(CONGE){
    this.service.annuler(CONGE.idConge).subscribe(
      data => {  
        this.ngINitCongesEnAttente();
        this.ngInitCongesTraiter();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["pages/rh/conge"]));
        this.content = 'Congé annuler '
        this.status = NbToastStatus.INFO;
        this.makeToast();  },
      error => { }) }
  supprimer(CONGE){
    this.service.deleteconge(CONGE.idConge).subscribe(
      data => {
        this.ngINitCongesEnAttente();
        this.ngInitCongesTraiter();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["pages/rh/conge"]));
        this.content = 'Congé supprimer '
        this.status = NbToastStatus.DANGER;
        this.makeToast();
      },
      error=>{ })
    }

  makeToast() {
    this.showToast(this.status, this.title, this.content);
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}
