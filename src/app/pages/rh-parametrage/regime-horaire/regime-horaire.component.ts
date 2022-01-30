import { Component, OnInit } from '@angular/core';
import { RegimeHoraireeService } from './regimeHoraire.service';
import { AddRegimeHoraireComponent } from './add-regime-horaire/add-regime-horaire.component';
import { NbWindowService } from '@nebular/theme';
import { RegimeHoraireModel } from './regimeHoraire.model';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesRegime } from '../../../authorisation/authoritiesRegime';

@Component({
  selector: 'ngx-regime-horaire',
  templateUrl: './regime-horaire.component.html',
  styleUrls: ['./regime-horaire.component.scss']
})
export class RegimeHoraireComponent implements OnInit {
  ADD = true
  source: RegimeHoraireModel[];
  constructor(private service: RegimeHoraireeService, private windowService: NbWindowService) { }

ngOnInit(): void {

  this.service.getAllRegimes().subscribe(
    data => {
      this.source = data; 
    },
    error => {
      console.log(error);
     },
  );

      if (Authorities.hasAutorities(AuthoritiesRegime.REGIME_ADD_VALUE)) {
        this.ADD = false;
      }

      if (Authorities.hasAutorities(AuthoritiesRegime.REGIME_UPDATE_VALUE)) {
        this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
      }
      if (Authorities.hasAutorities(AuthoritiesRegime.REGIME_DELETE_VALUE)) {
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
    custom: [
      // {
      //   name: 'editAction',
      //   title: '<i class="nb-edit" title="Edit"></i>',
      // },
    ],
  },
  columns: {
    designation: {
      title: 'Designation',
      type: 'String',
      width:'10vw'
    },
    regimeType: {
      title: 'Type',
      type: 'String',
    },
      nbrJoursParMois: {
          title: 'Nombre de jours par mois ',
          type: 'number',
          valuePrepareFunction: (nbrJoursParMois) => {
            if(nbrJoursParMois){
            return nbrJoursParMois +'/mois';}
            else return "-"
        },
      },
      nbrHeursParMois: {
        title: 'Nombre d\'heures par mois',
        type: 'number',
        valuePrepareFunction: (nbrHeursParMois) => {
          if(nbrHeursParMois){
          return nbrHeursParMois +'/mois'  ;}
          else return "-"
      },
      },
      nbrHeursParJour: {
        title: 'Nombre d\'heures par jour',
        type: 'number',
        valuePrepareFunction: (cell) => {
          return cell+'h/j';
         },
      },
      droitCongeParMois: {
        title: 'Droit de congé',
        type: 'number',
        valuePrepareFunction: (droitCongeParMois) => {
          if(droitCongeParMois){
          return droitCongeParMois +'/mois'  ;}
          else return '-';}
      },
      premierTauxDeMajoration: {
        title: '1ér Taux de majoration',
        type: 'number',
        valuePrepareFunction: (cell) => {
          return cell+'%';
         },
      },
      deuxiemeTauxDeMajoration: {
        title: '2éme Taux de majoration',
        type: 'number',
        valuePrepareFunction: (cell) => {
          return cell+'%';
         },
      },
      // mensualites: {          
      //   title: 'Mensualités',   // MODULE ADMIN ENTREPRISE
      //   type: 'number',
      // },
  },
};
openWindow() {
  localStorage.removeItem('e');
  localStorage.removeItem('idRegime');
  localStorage.setItem('e', '0');
  this.windowService.open(AddRegimeHoraireComponent, { title: 'Ajouter un nouveau régime' });
}
onCustom(event): any {
  if (event.action === 'editAction') {
    localStorage.removeItem('e');
    localStorage.removeItem('idRegime');
    localStorage.setItem('idRegime', event.data.idRegime);
    localStorage.setItem('e', '1');
    this.windowService.open(AddRegimeHoraireComponent, {
      title: 'Modifier ce regime',
      context: event.data.idRegime
    });
  }
}
 
onDeleteConfirm(event): void {
  if (window.confirm(`Vous etes sure de supprimer ce régime ?`)) {
  
    event.confirm.resolve(this.service.deleteRegimet(event.data.idRegime).subscribe(
      
      data => {
        
        this.source.filter(p => p !== event.data);
      }),
    );
  } else {
    event.confirm.reject();
  }
}
}
