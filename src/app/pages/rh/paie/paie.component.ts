import { Component, OnInit } from '@angular/core';
import { ImputationService } from '../imputation/imputation.service';
import { ModalImputationComponent } from '../imputation/modal-imputation-mensuelle/modal-imputation.component';
import { ModalImputationHeureComponent } from '../imputation/modal-imputation-heure/modal-imputation-heure.component';
import { NbWindowService } from '@nebular/theme';
import { MoisComponent } from './mois/mois.component';
import { Router } from '@angular/router';
import { EntrepriseService } from '../../admin/entreprise/entreprise.service';
import { Entreprise } from '../../admin/entreprise/entreprise';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesPrime } from '../../../authorisation/authoritiesPrimes';
import { AuthoritiesContrat } from '../../../authorisation/authoritiesContrat';
import { AuthoritiesImputation } from '../../../authorisation/authoritiesImputation';

@Component({
  selector: 'ngx-paie',
  templateUrl: './paie.component.html',
  styleUrls: ['./paie.component.scss']
})
export class PaieComponent implements OnInit {
  entreprise: Entreprise;
  entreprises: Entreprise[]
  idEntreprise: any
  imputation = [];
  mois: any;
  annee: any;
  authoritiesAdd: boolean = false;
  constructor(private router: Router, private windowService: NbWindowService,
    private entrepriseService: EntrepriseService, private serviceImputation: ImputationService) { }


    
  ngOnInit() {
    
    this.asyncNgOnInit();
    if (Authorities.hasAutorities(AuthoritiesImputation.IMPUTATION_ADD_VALUE)) {
      this.authoritiesAdd = true;  
    }
    if (Authorities.hasAutorities(AuthoritiesImputation.IMPUTATION_DELETE_VALUE)) {
      this.imputationSettings.actions.delete= true;
     } 
  }

  getAllEntrprise() {
    return this.entrepriseService.getAllEnterprise().toPromise()
  }

  getEntreprisebyId(idE) {
    if (!this.idEntreprise) {
      this.entreprise = this.entreprises[0];
      this.idEntreprise = this.entreprises[0].enterpriseId
      localStorage.setItem('idEntreprise', this.idEntreprise);
      return this.entreprise
    } else
      return this.entrepriseService.getEnterpriseById(idE).toPromise();
  }
  getImputation(idE, mois, annee) {
    return this.serviceImputation.getImputationByEntrepriseAndMonth(idE, mois, annee).toPromise();
  }

  async asyncNgOnInit() {
    this.mois = localStorage.getItem('MOIS')
    this.annee = localStorage.getItem('ANNEE')
    // this.entreprises = await this.getAllEntrprise()
    // this.entreprise = await this.getEntreprisebyId(this.idEntreprise)
    this.idEntreprise = localStorage.getItem('current_entreprise')

    this.imputation = await this.getImputation(this.idEntreprise, this.mois, this.annee)
  }

  getimputation() {
    if (this.entreprise) {
      let idE = this.entreprise.enterpriseId.toString()
      localStorage.setItem('idEntreprise', idE);
      this.serviceImputation.getImputationByEntrepriseAndMonth(idE, this.mois, this.annee).subscribe(
        data => { this.imputation = data; },
        error => { console.log("error get imputation") })  
    }else localStorage.removeItem('idEntreprise');

  }

  imputationSettings = {
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
        width: '6vw',
        filter: true,
      },
      nom: {
        title: 'Nom',
        type: 'String',
        filter: true,
      },
      prenom: {
        title: 'Prénom',
        type: 'String',
        filter: true,
      },
      regime: {
        title: 'Régime',
        type: 'String',
        filter: true,
      },
      mois: {
        title: 'Mois',
        type: 'number',
        filter: true,
        valuePrepareFunction: (mois) => {
          if (mois < 10) {
            return '0' + mois;
          }
          else return mois;
        },
      },
      annee: {
        title: 'Année',
        type: 'Number',
        sort: true,
        sortDirection: 'desc',
      },
      nombre: {
        title: 'Absence(M)/Présence(H)',
        type: 'Number',
        filter: true,
        width: '10vw'
      },
      nbrTaux1: {
        title: 'H.Supp1',
        type: 'Number', 
        valuePrepareFunction: (h) => {
            return h+' h';        
      }
    },
      nbrTaux2: {
        title: 'H.Supp2',
        type: 'Number', 
      valuePrepareFunction: (h) => {
        return h +' h';       
        },
    },
  }};
  openWindowMensuelle() {
    localStorage.removeItem('idImp');
    localStorage.removeItem('e');
    localStorage.setItem('e', '0');
    localStorage.setItem('modification', '0');
    this.windowService.open(ModalImputationComponent, { title: 'Employés régime mensuel' },

    );
  }
  openWindowHeure() {
    localStorage.removeItem('idImp');
    localStorage.removeItem('e');
    localStorage.setItem('e', '0');
    localStorage.setItem('modification', '0');
    this.windowService.open(ModalImputationHeureComponent, { title: 'Employés régime par heure' },
    );
  }
  openChangeMonth() {
    this.windowService.open(MoisComponent, { title: 'Mois de la paie' });
  }
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette imputation?`)) {
      event.confirm.resolve(this.serviceImputation.deleteImputation(event.data.idImp).subscribe(
        data => {
          this.imputation.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  //   openFichePaie() {
  //     this.fichePaieservice.checkCloture().subscribe(
  //       data => {       
  //         this.check = data;  
  //         console.log("cloturer");        
  //         },
  //           error => {console.log("non cloturer"); }
  //     );
  //     if(this.check){
  //     this.router.navigate(['/pages/rh/fichePaie']);
  //   } else 
  //     this.windowService.open(PopupComponent, { title: 'Alert' })   
  // }

  openFichePaie() {
    this.router.navigate(['/pages/rh/fichePaie']);
  }
}  