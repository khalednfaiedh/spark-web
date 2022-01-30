import { Component, OnInit } from '@angular/core';
import { ImputationService } from './imputation.service';
import { NbWindowService } from '@nebular/theme';
import { ModalImputationHeureComponent } from './modal-imputation-heure/modal-imputation-heure.component';
import { ModalImputationComponent } from './modal-imputation-mensuelle/modal-imputation.component';

@Component({
  selector: 'ngx-imputation',
  templateUrl: './imputation.component.html',
  styleUrls: ['./imputation.component.scss']
})
export class ImputationComponent implements OnInit {
  source: any;
  regime : any;
  constructor(private windowService: NbWindowService,
    private service: ImputationService) {
  }
ngOnInit(): void {
  this.service.getAllImputation().subscribe(
    data => {   this.source = data;       },
    error => {console.log("error get imputation"); }
  );
}

settings = {
  delete: {
    deleteButtonContent: '<i class="nb-trash"></i>',
    confirmDelete: true,
  },
  actions: {
    add: false,
    edit: false,
    delete:false,
    position: 'right',
  },
  columns: {
    matricule: {
      title: 'Matricule',
      type: 'number',
      width: '150px',
      filter:true,
  },
  nom: {
    title: 'Nom',
    type: 'String',
    filter:true,
},
prenom: {
  title: 'Prenom',
  type: 'String',
  filter:true,
},
  regime: {
      title: 'Régime',
      type: 'String',
      filter : true ,
    },
 
    mois: {
      title: 'Mois',
      type: 'number',
      filter : true ,
      valuePrepareFunction: (mois) => {
        if (mois < 10) {
          return '0'+mois  ;
        }
         else  return mois  ;
    },
     },
    annee: {
      title: 'Année',
      type: 'Number',
      sort : true ,
      sortDirection :	'desc',
      },
      nombre: {
        title: 'Absent(M)/Present(H)',
        type: 'Number',
        filter: true,
     
      },
    }, 

};

onDeleteConfirm(event): void {
  if (window.confirm(`Vous etes sure de supprimer cette Imputation?`)) {
    event.confirm.resolve(this.service.deleteImputation(event.data.idImp).subscribe(
      data => {
        this.source.filter(p => p !== event.data);
      }),
    );
  } else {
    event.confirm.reject();
  }
}

openWindowMensuelle() {
  localStorage.removeItem('idImp');
  localStorage.removeItem('e');
  localStorage.setItem('e', '0');
  localStorage.setItem('modification', '0');
  this.windowService.open(ModalImputationComponent, { title: 'Employés regime mensuelle' },

  );
}

openWindowHeure() {
  localStorage.removeItem('idImp');
  localStorage.removeItem('e');
  localStorage.setItem('e', '0');
  localStorage.setItem('modification', '0');
  this.windowService.open(ModalImputationHeureComponent, { title: 'Employés regime par heure' },
  );
}

onCustom(event): any {
  if (event.action === 'editAction') {
    localStorage.setItem('modification', '1');
    localStorage.removeItem('matricule');
    localStorage.removeItem('idImp');
    localStorage.removeItem('e');
    localStorage.setItem('idImp', event.data.idImp);
    localStorage.setItem('matricule', event.data.matricule);
    localStorage.setItem('e', '1');
    if (event.data.contrat.regimeHoraire === 'Mensuelle') {

      this.windowService.open(ModalImputationComponent, {
        title: 'Modifier',
        context: event.data.idImp
        });
    } else if (event.data.contrat.regimeHoraire === 'Par heure')  {
          this.windowService.open(ModalImputationHeureComponent, {
       title: 'Modifier',
       context: event.data.idImp
       });
    }

  }
}
}
