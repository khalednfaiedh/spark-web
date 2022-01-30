import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { PrimeService } from './prime.service';
import { Router } from '@angular/router';
import { TypePrimeService } from '../../rh-parametrage/type-prime/type-prime.service';
import { ModalPrimeComponent } from './modal-prime/modal-prime.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesContrat } from '../../../authorisation/authoritiesContrat';
import { AuthoritiesPrime } from '../../../authorisation/authoritiesPrimes';

@Component({
  selector: 'ngx-prime',
  templateUrl: './prime.component.html',
  styleUrls: ['./prime.component.scss'],
})
export class PrimeComponent implements OnInit {
  source: any;
  typePrimes = [];
  authoritiesAdd = false
  constructor(private windowService: NbWindowService, private serviceTypePrime: TypePrimeService,
    private service: PrimeService, private router: Router) {
  }

  ngOnInit() {

    let idC = localStorage.getItem('idCon');
    this.service.getAllPrimes(+idC).subscribe(
      data => {
        this.source = data;
    
      },
      error => {
        console.log("error");
      });

      if (Authorities.hasAutorities(AuthoritiesPrime.PRIME_ADD_VALUE)) {
        this.authoritiesAdd = true;  
      }
      // if (Authorities.hasAutorities(AuthoritiesContrat.CONTRAT_VALUE)) {
      //   this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });
      // }
      if (Authorities.hasAutorities(AuthoritiesContrat.CONTRAT_UPDATE_VALUE)) {
        this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
      }
      if (Authorities.hasAutorities(AuthoritiesContrat.CONTRAT_DELETE_VALUE)) {
        this.settings.actions.delete= true;
       } 
  }

  settings = {
    
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [ ],
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      typePrime: {
        title: "Type de prime",
        type: 'string',
        valuePrepareFunction: (typePrime) => {
        return typePrime.nom;
      },
    },
    
      valeurPrime: {
        title: 'Montant',
        type: 'number',
        filter: true,
        // valuePrepareFunction: (typePrime) => {
        //   return typePrime.valeurPrime;
        // },

      },
      dateCreation:{
        title: 'Date Création',
        type: 'Date',
        filter: true,
      }


    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette prime ?`)) {
      event.confirm.resolve(this.service.deletePrimes(event.data.idPrime).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

  openWindow() {
    localStorage.removeItem('e');
    localStorage.setItem('e', '0');
    let idC = localStorage.getItem('idCon');
    this.windowService.open(ModalPrimeComponent, { title: 'Ajouter une prime' },
    );
  }

  onCustom(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.setItem('idPrime', event.data.idPrime);
      localStorage.setItem('e', '1');
      let idC = localStorage.getItem('idCon');
      this.windowService.open(ModalPrimeComponent, { title: 'Modifier cette prime' });
    }
  }


  onBack() {
    this.router.navigate(['/pages/rh/contrat'])
  }
}