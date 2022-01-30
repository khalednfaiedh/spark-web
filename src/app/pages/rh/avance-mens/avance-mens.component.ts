import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { Router } from '@angular/router';
import { AvanceMensModel } from './avanceMens.model';
import { FormAvanceMensComponent } from './form-avance-mens/form-avance-mens.component';
import { AvanceMensService } from './avanceMens.service';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesAvance } from '../../../authorisation/authoritiesAvance';

@Component({
  selector: 'ngx-avance-mens',
  templateUrl: './avance-mens.component.html',
  styleUrls: ['./avance-mens.component.scss']
})
export class AvanceMensComponent implements OnInit {
  source: AvanceMensModel[];
  authoritiesAdd = false
  constructor(private windowService: NbWindowService, private service: AvanceMensService, private router: Router) { }

  openWindow() {
    localStorage.setItem('e', '0');
    this.windowService.open(FormAvanceMensComponent, { title: 'Ajouter une avance' });
  }

  ngOnInit() {
    let id = localStorage.getItem('idCon');
    this.service.getAllAvancesMensByContrat(+id).subscribe(
      data => { this.source = data;
       },
      error => { });

      if (Authorities.hasAutorities(AuthoritiesAvance.AVANCE_ADD_VALUE)) {
        this.authoritiesAdd = true;  
      }
      // if (Authorities.hasAutorities(AuthoritiesAvance.AVANCE_VALUE)) {
      //   this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });
      // }
      if (Authorities.hasAutorities(AuthoritiesAvance.AVANCE_UPDATE_VALUE)) {
        this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
      }

      if (Authorities.hasAutorities(AuthoritiesAvance.AVANCE_DELETE_VALUE)) {
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
      custom: [
       
      ],
    },
    columns: {
      // idAvanceMens: {
      //   title: 'Num avance',
      //   type: 'number',
      //   filter: true,
      // },
      montantAvance: {
        title: 'Montant',
        type: 'number',
        filter: true,
      },
      moisRembourcement: {
        title: 'Date Remboursement',
        type: 'number',
        filter: true,
         valuePrepareFunction: (cell: any, row: any) => {
           if (row.moisRembourcement < 10) {
            return '0'+row.moisRembourcement +'-'+row.anneeRembourcement;
           }
           else  return row.moisRembourcement +'-'+row.anneeRembourcement;
        }, 
      },
      dateCreation:{
        title: 'Date Création',
        type: 'Date',
        filter: true,
      }

    },
  };

  onDeleteConfirm(event) {
    if (window.confirm(`Vous etes sure de supprimer cette avance?`)) {
      event.confirm.resolve(this.service.deleteAvanceMens(event.data.idAvanceMens).subscribe(
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
      localStorage.setItem('idAvance', event.data.idAvanceMens);
      localStorage.setItem('e', '1');
      this.windowService.open(FormAvanceMensComponent, {
        title: 'Modifier cette avance',
        context: event.data.idAvance
      });
    }
  }

}