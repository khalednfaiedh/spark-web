import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
//import { SousTraitantService } from '../sous-traitant/sous-traitant.service';
import { Router } from '@angular/router';
import { ContratService } from './contrat.service';
//import { SousTraitant } from '../sous-traitant/sous-traitant';
import { ModalContratComponent } from './modal-contrat/modal-contrat.component';
import { ShowContratComponent } from './show-contrat/show-contrat.component';
import { ViewCell } from 'ng2-smart-table';
import { ReconduitComponent } from './reconduit/reconduit.component';
import { Contrat } from './contrat';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

//import { Authorities } from '../../authorisation/authorities';
//import { AuthoritiesContrat } from '../../authorisation/authorities-contrat';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container"><input (click)="onClick()" nbButton type="submit" value="Bons de commande"/> </div>',
})
export class ButtonBCommandeComponent implements ViewCell, OnInit {
  public static urlcontratMayssa = "/pages/vente/contratMayssa";
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService,
    private router: Router, private translateService: TranslateService) {

  }
  onClick() {
    console.log(this.rowData.idContrat);
    localStorage.setItem('idContrat', this.rowData.idContrat);
    this.router.navigate(['/pages/bonCommande']);

  }
}
@Component({
  selector: 'ngx-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.scss']
})
export class ContratComponent implements OnInit {
  public static urlcontratMayssa = "/pages/vente/contratMayssa";
  source: any;
  contrat: Contrat;
  //sousTraitant: SousTraitant;
  langs = ['en', 'fr'];
  //  add=true

  constructor(private windowService: NbWindowService, protected service: ContratService,
    /*protected serviceSousTraitant: SousTraitantService,*/ private datePipe: DatePipe, private router: Router, private translateService: TranslateService) { }

  ngOnInit() {
    // if (Authorities.hasAutorities(AuthoritiesContrat.CONTRAT_ADD_VALUE)) {
    //   this.add = false;
    // }
    // if (Authorities.hasAutorities(AuthoritiesContrat.CONTRAT_VALUE)) {
    //   this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Show"></i>' });
    // }
    // if (Authorities.hasAutorities(AuthoritiesContrat.CONTRAT_ADD_VALUE)) {
    //   this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
    // }
    // if (Authorities.hasAutorities(AuthoritiesContrat.CONTRAT_ADD_VALUE)) {
    //   this.settings.actions.custom.push({ name: 'addReconduit', title: '<i  class="nb-loop" title="Reconduit" ></i>' });
    // }
    // if (Authorities.hasAutorities(AuthoritiesContrat.CONTRAT_UPDATE_VALUE)) {
    //   this.settings.actions.delete = true;
    // }
    this.contrat = new Contrat();
    let idST = localStorage.getItem('idST');
    /* this.service.contratListActive(+idST).subscribe(
       data => {
         this.source = data;
       },
       error => { console.log("erreur"); },
     )*/
  }


  settings = {
    noDataMessage: this.translateService.instant('datatable.noDataMessage'),
    actions: {
      add: false,
      edit: false,


      position: 'right',
      custom: [

        {
          name: 'addReconduit',
          title: '<i  class="nb-loop" title="Reconduit" ></i>',

        },
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Show"></i>',
        },
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Edit"></i>',

        }
      ],

    },

    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      active: {
        title: this.translateService.instant('contrat.active'),
        type: 'list',
        width: '100px',
        filter: {
          type: 'list',
          config: {
            selectText: 'Active',
            list: [{ value: 'true', title: 'Oui' }, { value: 'false', title: 'Non' },],
          },
        },
        editor: {
          type: 'list',
          config: {
            selectText: 'Active',
            list: [{ value: 'true', title: 'Oui' }, { value: 'false', title: 'Non' },],
          },
        },
      },
      code: {
        title: this.translateService.instant('contrat.code'),
        type: 'Long',
        filter: true,
      },
      designation: {
        title: this.translateService.instant('contrat.designation'),
        type: 'String',
        filter: true,
      },

      dateDebut: {
        title: this.translateService.instant('contrat.dateDebut'),
        type: 'Date',
        filter: true,

      },
      dateFin: {
        title: this.translateService.instant('contrat.dateFin'),
        type: 'Date',
        filter: true,

      },
      BonCommandes: {
        title: this.translateService.instant('contrat.avenant'),
        filter: false,
        type: 'custom',
        renderComponent: ButtonBCommandeComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            localStorage.setItem('idContrat', row.bonCommande);
            console.log('idContrat')
          });
        }
      },




    }

  };
  addDossier() {
    localStorage.setItem("e", "0");
    this.windowService.open(ModalContratComponent, { title: this.translateService.instant('contrat.creer') });
  }

  onDeleteConfirm(event): void {
    //   let idContrat = localStorage.getItem('idContrat'); 
    //   this.service.retrieveContrat(+idContrat).subscribe(
    //     data => { this.contrat = data;

    //   console.log(this.contrat);
    //   if (window.confirm(`Vous etes sure de supprimer ce contrat?`)) {
    //     event.confirm.resolve(this.service.annuleContrat(+idContrat,this.contrat).subscribe(
    //       data => {this.source=data
    //         console.log(this.source);
    //       }),
    //     );
    //   } 
    // })
    /* if (window.confirm(this.translateService.instant('contrat.supprimer'))) {
       event.confirm.resolve(this.service.annuleContrat(event.data.idContrat, this.contrat).subscribe(
         data => {
           this.source = data
           console.log(this.source);
           // this.toastr.(this.translateService.instant('succeA'));
           localStorage.removeItem('e');
           this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
             this.router.navigate(['/pages/contrat']));
 
         }));
     }
 */

  }



  onBack() {
    this.router.navigate(['/pages/tabContrat']);
  }



  onCostum(event): any {
    if (event.action === 'editAction') {
      console.log(event.data.idContrat);
      localStorage.setItem("e", "1");
      localStorage.setItem('idContrat', event.data.idContrat.toString());
      this.windowService.open(ModalContratComponent, { title: this.translateService.instant('contrat.modifier'), context: event.data.idContrat });
    }
    if (event.action === 'addReconduit') {
      localStorage.setItem('idContrat', event.data.idContrat.toString());
      this.windowService.open(ReconduitComponent, { title: this.translateService.instant('contrat.addReconduit') });
    }
    if (event.action === 'showAction') {
      console.log(event.data.idContrat);
      localStorage.setItem('idContrat', event.data.idContrat.toString());
      this.windowService.open(ShowContratComponent, { title: this.translateService.instant('contrat.Afficher'), context: event.data.idContrat });
    }
  }

}
