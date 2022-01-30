import { Component, OnInit } from '@angular/core';
import { DeductionLogementService } from './DeductionLogement.service';
import { FormDeductionComponent } from './form-deduction/form-deduction.component';
import { NbWindowService } from '@nebular/theme';
import { Router } from '@angular/router';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthoritiesDeductionLogement } from '../../../../authorisation/authoritiesDeductionLogement';

@Component({
  selector: 'ngx-deduction-logement',
  templateUrl: './deduction-logement.component.html',
  styleUrls: ['./deduction-logement.component.scss']
})
export class DeductionLogementComponent implements OnInit {

authoritiesAdd = false
source: any;
constructor(private service: DeductionLogementService, private windowService: NbWindowService, private router: Router) { }

ngOnInit(): void {
  let idContrat = localStorage.getItem("idContrat")
  this.service.getAllDeductionLogement(+idContrat).subscribe(
    data => {this.source = data; },
    error => {console.log(error); },
  );
  if (Authorities.hasAutorities(AuthoritiesDeductionLogement.DEDUCTION_LOGEMENT_ADD_VALUE)) {
    this.authoritiesAdd = true;  
  }
  // if (Authorities.hasAutorities(AuthoritiesDeductionLogement.DEDUCTION_LOGEMENT_VALUE)) {
  //   this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });
  // }
  if (Authorities.hasAutorities(AuthoritiesDeductionLogement.DEDUCTION_LOGEMENT_UPDATE_VALUE)) {
    this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
  }

  if (Authorities.hasAutorities(AuthoritiesDeductionLogement.DEDUCTION_LOGEMENT_DELETE_VALUE)) {
    this.settings.actions.delete= true;
   } 
}
settings = {
  hideSubHeader: true,

  delete: {
    deleteButtonContent: '<i class="nb-trash"></i>',
    confirmDelete: true,
  },
  actions: {
    add: false,
    edit: false,
    delete: false,
    position: 'right',
    custom: [ ],
  },
  columns:{
    designation: {
      title: 'Désignation',
      type: 'list',
      width: '300px',
      filter: {
        type: 'list',
        config: {
          selectText: 'DéductionLogement',
          list: [{ value: 'Déduction Logement', title: 'Déduction Logement' }],
        },
      },
      editor: {
        type: 'list',
        config: {
          selectText: 'DéductionLogement',
          list: [{ value: 'Déduction Logement', title: 'Déduction Logement' }],
        },
      },
    },
    montant:{
      title: 'Montant',
      type:'number',

    },
    
    moisDebut:{
      title: 'Date début',
      type:'number',
      valuePrepareFunction: (cell: any, row: any) => {
        if (row.moisDebut < 10) {
         return '0'+row.moisDebut +'-'+row.anneeDebut;
        }
        else  return row.moisDebut +'-'+row.anneeDebut;
     }, 
    },
    // anneeDebut:{
    //   title: 'Annee Début',
    //   type:'number'
    // },

    moisFin:{
      title: 'Date fin',
      type:'number',
      valuePrepareFunction: (cell: any, row: any) => {
        if (row.moisFin < 10) {
         return '0'+row.moisFin +'-'+row.anneeFin;
        }
        else  return row.moisFin +'-'+row.anneeFin;
     },
    },
    // anneeFin:{
    //   title: 'Annee Fin',
    //   type:'number'
    // },
  },
};
onCustom(event): any {
  if (event.action === 'editAction') {
    localStorage.removeItem('e');
    localStorage.setItem('idDeduction', event.data.idDeductionLogement);
    localStorage.setItem('e', '1');
    this.windowService.open(FormDeductionComponent, {
      title: 'Modifier cette déduction',
      context: event.data.idAvance
    });
  }
}
onDeleteConfirm(event): void {
  if (window.confirm(`Vous etes sure de supprimer cette déduction ?`)) {
    event.confirm.resolve(this.service.deleteDeductionLogement(event.data.idDeductionLogement).subscribe(
      data => {
        this.source.filter(p => p !== event.data);
      }),
    );
  } else {
    event.confirm.reject();
  }
}


openWindow() {
  localStorage.setItem('e', '0');
  this.windowService.open(FormDeductionComponent, { title: 'Ajouter une déduction' });
}
onBack() {
  this.router.navigate(['/pages/rh/contrat'])
}

}