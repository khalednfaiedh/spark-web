import { Component, OnInit } from '@angular/core';
import { NbWindowService, NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { FichePaieService } from './fiche-paie.service';
import { GenerateOneComponent } from './generate-one/generate-one.component';
import { GenerateAllComponent } from './generate-all/generate-all.component';
import { ShowFicheComponent } from './show-fiche/show-fiche.component';
import { FichePaieModel, Cloture } from './fichePaie.model';
import { Router } from '@angular/router';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ClotureComponent } from './cloture/cloture.component';
import { PopupComponent } from './popup/popup.component';
import { CongePayerComponent } from './conge-payer/conge-payer.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesFichePaie } from '../../../authorisation/authoritiesFichePaie';
import { AuthoritiesSoldeToutCompte } from '../../../authorisation/authoritiesSoldeToutCompte';

@Component({
  selector: 'ngx-fiche-paie',
  templateUrl: './fiche-paie.component.html',
  styleUrls: ['./fiche-paie.component.scss']
})
export class FichePaieComponent implements OnInit {
  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus
  title: string;
  content = ` `;

  check = new Cloture();
  fiche = new FichePaieModel;
  boolean: boolean;

  fichePaie: FichePaieModel[];
  C: string;
  Disabled: boolean;
  mois: any;
  annee: any;
  idEntreprise: any;
  authoritiesAdd: boolean = false;
  authoritiesVersementSoldeToutCompte: boolean = false;
  authoritiesGenerateAll: boolean = false;
  authoritiesGenerateOne: boolean = false;
  authoritiesCloturer: boolean = false;
  authoritiesDecloturer: boolean = false;
  authoritiesGenerateSoldeToutCompte: boolean =false;
  authoritiesSelect: boolean =false;
  constructor(private toastrService: NbToastrService, private windowService: NbWindowService, private router: Router,
    private service: FichePaieService) { }
  ngOnInit(): void {
    this.mois = localStorage.getItem('MOIS')
    this.annee = localStorage.getItem('ANNEE')
    this.idEntreprise = localStorage.getItem('current_entreprise')
    this.fichePaie = new Array<FichePaieModel>();
    this.service.getFichesByEntrepriseAndMonth(this.idEntreprise, this.mois, this.annee).subscribe(
      data => {
        this.fichePaie = data;

        if (this.fichePaie.length == 0) {
          this.C = 'BROUILLON'
          this.Disabled = true
        }
        else {
          this.Disabled = false
          this.C = 'CLOTURE'
          for (let index = 0; index < this.fichePaie.length; index++) {
            if (this.fichePaie[index].status == 0) { this.C = 'BROUILLON' }
          }
        }
        localStorage.setItem('cloture', this.C)
      },
      error => { console.log("error get fiche"); }
    );
    this.service.checkCloture(this.idEntreprise, this.mois, this.annee).subscribe(
      data => {
        this.check = data;

      },
      error => { console.log("non cloturer"); }
    );
    if (Authorities.hasAutorities(AuthoritiesFichePaie.FICHE_PAIE_ADD_VALUE)) {
      this.authoritiesAdd = true;
    }
    if (Authorities.hasAutorities(AuthoritiesSoldeToutCompte.SOLDE_TOUT_COMPTE_ADD_VALUE && AuthoritiesFichePaie.FICHE_PAIE_GENERATE_AVEC_VERSEMENT_SOLDE_CONGE)) {
      this.authoritiesSelect = true;
    }
    if (Authorities.hasAutorities(AuthoritiesSoldeToutCompte.SOLDE_TOUT_COMPTE_ADD_VALUE)) {
      this.authoritiesGenerateSoldeToutCompte = true;
    }
    if (Authorities.hasAutorities(AuthoritiesFichePaie.FICHE_PAIE_GENERATE_AVEC_VERSEMENT_SOLDE_CONGE)) {
      this.authoritiesVersementSoldeToutCompte = true;
    }
    if (Authorities.hasAutorities(AuthoritiesFichePaie.FICHE_PAIE_GENERATE_ALL)) {
      this.authoritiesGenerateAll = true;
    }
    if (Authorities.hasAutorities(AuthoritiesFichePaie.FICHE_PAIE_GENERATE_ONE)) {
      this.authoritiesGenerateOne = true;
    }

    if (Authorities.hasAutorities(AuthoritiesFichePaie.FICHE_PAIE_CLOTURER && AuthoritiesFichePaie.FICHE_PAIE_DECLOTURER)) {
      this.authoritiesCloturer = true;
    }

    if (Authorities.hasAutorities(AuthoritiesFichePaie.FICHE_PAIE_CLOTURER && AuthoritiesFichePaie.FICHE_PAIE_DECLOTURER)) {
      this.authoritiesDecloturer = true;
    }

    if (Authorities.hasAutorities(AuthoritiesFichePaie.FICHE_PAIE_VALUE)) {
      this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });
    }

    if (Authorities.hasAutorities(AuthoritiesFichePaie.FICHE_PAIE_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }

  }
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette fiche?`)) {
      event.confirm.resolve(this.service.deleteFichePaie(event.data.idFiche).subscribe(
        data => {
          this.fichePaie.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  openWindowGenerateOne() {

    if (this.check.result) {
      this.windowService.open(GenerateOneComponent, { title: 'Générer fiche' },);
    } else {
      localStorage.setItem('M', this.check.mois.toString())
      localStorage.setItem('Y', this.check.annee.toString())
      this.windowService.open(PopupComponent, { title: 'Attention' })
    }
  }
  openWindowGenerateAll() {

    if (this.check.result) {
      this.windowService.open(GenerateAllComponent, { title: 'Générer toutes les fiches' },);
    } else {
      localStorage.setItem('M', this.check.mois.toString())
      localStorage.setItem('Y', this.check.annee.toString())
      this.windowService.open(PopupComponent, { title: 'Attention' })
    }

  }
  openOption(x) {
    if (this.check.result) {
      if (x === 2) { this.windowService.open(CongePayerComponent, { title: 'Générer fiche avec indemnité congés payés' },); }
      else if (x === 1) { this.router.navigate(['/pages/rh/soldetoutcompte']); }
    } else {
      localStorage.setItem('M', this.check.mois.toString())
      localStorage.setItem('Y', this.check.annee.toString())
      this.windowService.open(PopupComponent, { title: 'Attention' })
    }
  }

  onCustom(event): any {
    if (event.action === 'showAction') {
      localStorage.setItem('idFiche', event.data.idFiche);
      this.windowService.open(ShowFicheComponent, {
        context: event.data.idFiche
      });
    }
  }
  buttonShow() {
    if ((this.fiche.moisFiche == null) && (this.fiche.anneeFiche == null)) {
      return true;
    }
    else
      if ((this.fiche.moisFiche == null) || (this.fiche.anneeFiche == null)) { return true; }
    return false;
  }
  openFichePresence() {
    this.router.navigate(['/pages/rh/paie']);
  }
  openJournalPaie() {
    this.router.navigate(['/pages/rh/journalPaie']);
  }

  openWindowCloture() {
    this.windowService.open(ClotureComponent, { title: 'Clôturer/Declôturer paie' },);
  }

  cloturer() {
    this.service.cloturerPaie(this.idEntreprise, this.mois, this.annee).subscribe(
      data => {

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(["pages/rh/fichePaie"]));
        this.content = 'Mois clôturer'
        this.status = NbToastStatus.SUCCESS;
        this.makeToast();
      },

      error => {
        this.content = 'Clôturer impossible'
        this.status = NbToastStatus.DANGER;
        this.makeToast();
      }
    );
  }
  decloturer() {
    this.service.decloturerPaie(this.idEntreprise, this.mois, this.annee).subscribe(
      data => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(["pages/rh/fichePaie"]));
        this.content = 'Mois décloturer'
        this.status = NbToastStatus.SUCCESS;
        this.makeToast();
      },
      error => {
        this.content = 'Décloturage impossible'
        this.status = NbToastStatus.DANGER;
        this.makeToast();
      }
    );
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
    const titleContent = title ? `. ${title}` : ''; this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        // {
        //   name: 'showAction',
        //   title: '<i class="nb-sunny" title="Afficher"></i>',
        // },
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
        filter: true,
      },
      prenom: {
        title: 'Prénom',
        type: 'String',
        filter: true,
      },
      nom: {
        title: 'Nom',
        type: 'String',
        filter: true,
      },
      regime: {
        title: 'Régime',
        type: 'String',
        filter: true,
      },
      // present: {
      //   title: 'Présent',
      //   type: 'Number',
      //   valuePrepareFunction: (present,moisFiche) => {
      //     if(moisFiche < 13){
      //     if (present < 10) {
      //       return '0'+present  ;
      //     }else  return present  ;
      //   }else return "-";
      // },
      // },
      salaireBase: {
        title: 'Salaire De base',
        type: 'Number',
        filter: true,
      },
      totalDesPrimes: {
        title: 'Total des primes',
        type: 'Number',
        filter: true,
      },
      salaireBrut: {
        title: 'Salaire brut',
        type: 'Number',
        filter: true,
      },
      net: {
        title: 'Salaire net',
        type: 'Number',
        filter: true,
      },
      avanceMens: {
        title: 'Avance',
        type: 'Number',
        filter: true,
        valuePrepareFunction: (avanceMens) => {
          if (avanceMens == 0) {
            return '-';
          }
          else return avanceMens;
        },
      },
      echeance: {
        title: 'Prêt',
        type: 'Number',
        filter: true,
        valuePrepareFunction: (echeance) => {
          if (echeance == 0) {
            return '-';
          }
          else return echeance;
        },

      },
      netFinal: {
        title: 'Net à payer',
        type: 'Number',
        filter: true,
      },
      status: {
        title: 'État',
        type: 'string',
        filter: true,
        valuePrepareFunction: (status) => {
          if (status == 0) {
            return 'Brouillon';
          }
          return 'Clôturer';
        },
      },
    },

  };



  settings2 = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Afficher"></i>',
        },
      ],
    },

    columns: {
      matricule: {
        title: 'Matricule',
        type: 'number',
        filter: true,
      },
      prenom: {
        title: 'Prénon',
        type: 'String',
        filter: true,
      },
      nom: {
        title: 'Nom',
        type: 'String',
        filter: true,
      },
      regime: {
        title: 'Régime',
        type: 'String',
        filter: true,
      },
      // present: {
      //   title: 'Présent',
      //   type: 'Number',
      //   valuePrepareFunction: (present,moisFiche) => {
      //     if(moisFiche < 13){
      //     if (present < 10) {
      //       return '0'+present  ;
      //     }else  return present  ;
      //   }else return "-";
      // },
      // },
      salaireBase: {
        title: 'Salaire de base',
        type: 'Number',
        filter: true,
      },
      totalDesPrimes: {
        title: 'Total des primes',
        type: 'Number',
        filter: true,
      },
      salaireBrut: {
        title: 'Salaire brut',
        type: 'Number',
        filter: true,
      },

      net: {
        title: 'Salaire net',
        type: 'Number',
        filter: true,
      },
      avanceMens: {
        title: 'Avance',
        type: 'Number',
        filter: true,
        valuePrepareFunction: (avanceMens) => {
          if (avanceMens == 0) {
            return '-';
          }
          else return avanceMens;
        },
      },
      echeance: {
        title: 'Prêt',
        type: 'Number',
        filter: true,
        valuePrepareFunction: (echeance) => {
          if (echeance == 0) {
            return '-';
          }
          else return echeance;
        },
      },
      netFinal: {
        title: 'Net à payer',
        type: 'Number',
        filter: true,
      },

      status: {
        title: 'État',
        type: 'string',
        filter: true,
        valuePrepareFunction: (status) => {
          if (status == 0) {
            return 'Brouillon';
          }
          return 'Clôturer';
        },
      },
    },
  };
}
