import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { Router } from '@angular/router';
import { FichePaieService } from '../fiche-paie.service';
import { FichePaieModel } from '../fichePaie.model';
import { ViewSoldeToutCompteComponent } from './view-solde-tout-compte/view-solde-tout-compte.component';
import { AddSoldeToutCompteComponent } from './add-solde-tout-compte/add-solde-tout-compte.component';

@Component({
  selector: 'ngx-solde-tout-compte',
  templateUrl: './solde-tout-compte.component.html',
  styleUrls: ['./solde-tout-compte.component.scss']
})
export class SoldeToutCompteComponent implements OnInit {
  source : FichePaieModel[]
  annee : number 
  constructor(private toastrService: NbToastrService,private windowService: NbWindowService,private router : Router ,
    private service: FichePaieService) { }

  ngOnInit(): void {
    this.annee = +localStorage.getItem('ANNEE')
    this.service.getAllSoldeToutCompte(this.annee).subscribe(
      data => {
        this.source = data; 
      },
      error => {
        
       },
    );
  }
  settings = { 
    actions: {
      add: false,
      edit: false,
      position: 'right',
      custom: [
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Afficher"></i>',
        },
      ],
    },
  delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
  columns: {
      matricule: {
        title: 'Matricule',
        type: 'number',
        filter:true,
    },
  prenom: {
      title: 'Prénom',
      type: 'String',
      filter:true,
  },
  nom: {
    title: 'Nom',
    type: 'String',
    filter:true,
  },
  regime: {
    title: 'Régime',
    type: 'String',
    filter:true,
  },
  present: {
     title: 'Présent',
     type: 'Number',
    valuePrepareFunction: (present,soldeTtCmpt) => {
    if(soldeTtCmpt == 0){
      if (present < 10) {
          return '0'+present  ;
       }else  return present  ;
      }else return "-";
     },
  },
  soldeConge :{
    title: 'Solde Congé',
    type: 'Number',
    filter: true,
  },
  indemnite :{
    title: 'Indemnite',
    type: 'Number',
    filter: true,
  },
        // salaireBase: {
        //   title: 'Salaire De base',
        //   type: 'Number',
        //   filter: true,
        // },
        // totalDesPrimes: {
        //   title: 'Total des primes',
        //   type: 'Number',
        //   filter: true,
        // }, 
        salaireBrut: {
          title: 'Salaire brut',
          type: 'Number',
          filter: true,
        },
        net : {
          title: 'Salaire net',
          type: 'Number',
          filter: true,
        },
        avanceMens : {
          title: 'Avance',
          type: 'Number',
          filter: true,
          valuePrepareFunction: (avanceMens) => {
            if (avanceMens == 0) {
              return '-';
            }
             else  return avanceMens  ;
        },
        },
        echeance : {
          title: 'Prêt',
          type: 'Number',
          filter: true,
          valuePrepareFunction: (echeance) => {
            if (echeance == 0) {
              return '-';
            }
             else  return echeance  ;
        },
          
        },
        netFinal : {
          title: 'Net à payer',
          type: 'Number',
          filter: true,
        },
  
      },
  
  };
  
  openAddWindow() {
    this.windowService.open(AddSoldeToutCompteComponent, { title: 'Ajouter un solde de tout compte' });
  }

  openJournalPaie(){
    this.router.navigate(['/pages/rh/journalPaie']);
  }
  
  onCustom(event): any {
    if (event.action === 'showAction') {
      localStorage.setItem('idFiche', event.data.idFiche);
      this.windowService.open(ViewSoldeToutCompteComponent, {
       title: 'Solde de tout compte',
        context: event.data.idFiche
      });
    }
  }
   
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce solde de tout compte ?`)) {
      event.confirm.resolve(this.service.deleteSoldeToutCompte(event.data.idFiche).subscribe(     
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  openFichePaie() {
    this.router.navigate(['/pages/rh/fichePaie']);
  }
  }
  