import { Component, OnInit } from '@angular/core';
import { AvanceModel } from './avance.model';
import { NbWindowService } from '@nebular/theme';
import { AvanceService } from './avance.service';
import { Router } from '@angular/router';
import { FormAvanceComponent } from './form-avance/form-avance.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesPret } from '../../../authorisation/authoritiesPret';

@Component({
  selector: 'ngx-avance',
  templateUrl: './avance.component.html',
  styleUrls: ['./avance.component.scss']
})
export class AvanceComponent implements OnInit {
  authoritiesAdd = false;
  source: AvanceModel[];
  constructor(private windowService: NbWindowService, private service: AvanceService, private router: Router) { }

  openWindow() {
    localStorage.setItem('e', '0');
    this.windowService.open(FormAvanceComponent, { title: 'Ajouter un prêt' });
  }

  ngOnInit() {
    let id = localStorage.getItem('idCon');
    this.service.getAllAvancesByContrat(+id).subscribe(
      data => { this.source = data;},
      error => { console.log('error list des avances'); });
   
       if (Authorities.hasAutorities(AuthoritiesPret.PRET_ADD_VALUE)) {
        this.authoritiesAdd = true;  
      }
      // if (Authorities.hasAutorities(AuthoritiesPret.PRET_VALUE)) {
      //   this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });
      // }
      if (Authorities.hasAutorities(AuthoritiesPret.PRET_UPDATE_VALUE)) {
        this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
      }

      if (Authorities.hasAutorities(AuthoritiesPret.PRET_DELETE_VALUE)) {
        this.settings.actions.delete= true;
       }  
  }
settings = {
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
    columns: {
      // idAvance: {
      //   title: 'N° prêt',
      //   type: 'number',
      //   filter: true,
      // },
      montant: {
        title: 'Montant',
        type: 'number',
        filter: true,
      },
      moisDebutRembourcement: {
        title: 'Date Début Remboursement',
        type: 'number',
        filter: true,
         valuePrepareFunction: (cell: any, row: any) => {
           if (row.moisDebutRembourcement < 10) {
            return '0'+row.moisDebutRembourcement +'-'+row.anneeDebutRembourcement;
           }
           else  return row.moisDebutRembourcement +'-'+row.anneeDebutRembourcement;
        }, 
      },
      nombreEcheance: {
        title: 'Nombre Échéances',
        type: 'number',
        filter: true,
        width:'10vw'
      },
      dateCreation:{
        title: 'Date Création',
        type: 'Date',
        filter: true,
      }
    },
  };

  onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer ce prêt ?`)) {
      event.confirm.resolve(this.service.deleteAvance(event.data.idAvance).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

  onBack() {
    this.router.navigate(['/pages/rh/contrat'])
  }

  onCustom(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.setItem('idAvance', event.data.idAvance);
      localStorage.setItem('e', '1');
      this.windowService.open(FormAvanceComponent, {
        title: 'Modifier ce prêt',
        context: event.data.idAvance
      });
    }
  }

}