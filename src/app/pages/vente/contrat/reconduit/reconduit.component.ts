import { Component, OnInit } from '@angular/core';
/*import { SousTraitant } from '../../sous-traitant/sous-traitant';
import { Contrat } from '../contrat';
import { NbWindowRef, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ContratService } from '../contrat.service';
import { ProduitService } from '../../produit/produit.service';
import { ContratProduitService } from '../../contrat-produit/contrat-produit.service';
import { ContratProduit } from '../../contrat-produit/contrat-produit';
import { Produit } from '../../produit/produit';
import { MachineService } from '../../machine/machine.service';
import { PersonnelService } from '../../personnel/personnel.service';
import { Machine } from '../../machine/machine';
import { ContratMachineService } from '../../contrat-machine/contrat-machine.service';
import { ContratMachine } from '../../contrat-machine/contrat-machine';
import { Personnel } from '../../personnel/personnel';
import { ContratPersonnelService } from '../../contrat-personnel/contrat-personnel.service';
import { error } from 'util';
import { element } from '@angular/core/src/render3';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';*/

@Component({
  selector: 'ngx-reconduit',
  templateUrl: './reconduit.component.html',
  styleUrls: ['./reconduit.component.scss']
})
export class ReconduitComponent implements OnInit {


  /* contratProduit: ContratProduit
   contratMachine: ContratMachine
   contratPersonnel: any
   contratProduitList = [];
   contratMachineList = [];
   contratEmployeList = [];
   contrat: any
   avenant: any
   produits = [];
   personnel: Personnel
   produit: Produit
   machine: Machine
   machines = [];
   personnels = [];
   sousTraitant: SousTraitant;
   ATM: string;
   source: any
   sourceCP: any
   sourceCPr: any
   sourceCM: any
   reconduit: any
 */
  constructor(/*public windowRef: NbWindowRef, private service: ContratService, private serviceMachine: MachineService, private servicePersonnel: PersonnelService, private router: Router, private serviceProduit: ProduitService,
    private serviceContratProduit: ContratProduitService, private translateService:TranslateService,
    private serviceContratMachine: ContratMachineService, private serviceContratPersonnel: ContratPersonnelService,private toastr: ToastrService*/) { }

  ngOnInit() {


    /*  let e = localStorage.getItem('e');
      let idST = localStorage.getItem('idST');
      this.contrat = new Contrat();
      this.reconduit = new Contrat();
      this.serviceProduit.produitListSousTraitant(+idST).subscribe(
        data => {
          data.forEach(produit => {
            this.produits.push({ value: produit.codeProduit, title: produit.codeProduit });
            this.settingsProduit.columns.codeProduit.filter.config.list = this.produits;
            this.settingsProduit.columns.codeProduit.editor.config.list = this.produits;
            this.settingsProduit = Object.assign({}, this.settingsProduit);
          });
        },
        () => { console.log("error") });
  
      this.serviceMachine.machineListSousTraitant(+idST).subscribe(
        data => {
          data.forEach(machine => {
            this.machines.push({ value: machine.reference, title: machine.reference });
            this.settingsMachine.columns.reference.filter.config.list = this.machines;
            this.settingsMachine.columns.reference.editor.config.list = this.machines;
            this.settingsMachine = Object.assign({}, this.settingsMachine);
          });
        },
        () => { console.log("error") });
  
      this.servicePersonnel.personnelListSousTraitant(+idST).subscribe(
        data => {
          data.forEach(personnel => {
            this.personnels.push({ value: personnel.cin, title: personnel.cin });
            this.settingsEmployes.columns.cin.filter.config.list = this.personnels;
            this.settingsEmployes.columns.cin.editor.config.list = this.personnels;
            this.settingsEmployes = Object.assign({}, this.settingsEmployes);
          });
        },
        () => { console.log("error") });
  
      this.ATM = 'Reconduit';
      let idContrat = localStorage.getItem('idContrat');
      this.service.retrieveContrat(+idContrat).subscribe(
        data => {
          this.contrat = data; },
          error => { console.log('error'); }
        )
    
          this.serviceContratProduit.ListContratProduit(+idContrat).subscribe(
            data => {
              this.sourceCPr = data;
              
            })
  
          this.serviceContratMachine.ListContratMachine(+idContrat).subscribe(
            data => {
              this.sourceCM = data;
              
            })
          this.serviceContratPersonnel.ListContratPersonnel(+idContrat).subscribe(
            data => {
              this.sourceCP = data;
             
            })
       
  
  
  
    }
  
    settingsEmployes = {
      noDataMessage: this.translateService.instant('datatable.noDataMessage'),
  
      // add: {
      //   addButtonContent: '<i class="nb-plus"></i>',
      //   createButtonContent: '<i class="nb-checkmark"></i>',
      //   cancelButtonContent: '<i class="nb-close"></i>',
      //   confirmCreate: true,
      // },
      // edit: {
      //   editButtonContent: '<i class="nb-edit"></i>',
      //   saveButtonContent: '<i class="nb-checkmark"></i>',
      //   cancelButtonContent: '<i class="nb-close"></i>',
      //   confirmSave: true,
      // },
      // delete: {
      //   deleteButtonContent: '<i class="nb-trash"></i>',
      //   confirmDelete: true,
      // },
      actions: {
        add:false,
        edit:false,
        delete:false,
        position: 'right'
      },
  
      columns: {
        cin: {
          title: this.translateService.instant('personnel.cin'),
          type: 'list',
          width: '350px',
  
          filter: {
            type: 'list',
            config: {
              selectText: 'Personnel',
              list: this.personnels,
            },
          },
          editor: {
            type: 'list',
            config: {
              selectText: 'Personnel',
              list: this.personnels,
            },
          }
        },
        qualification: {
          title: this.translateService.instant('personnel.qualification'),
          type: 'String',
          filter: true,
        },
        dateDebutEmploye: {
          title: this.translateService.instant('dateDebut'),
          type: 'String',
          filter: true,
        },
        dateFinEmploye: {
          title: this.translateService.instant('dateFin'),
          type: 'String',
          filter: true,
        }
      }
    }
  
  
  
  
    settingsMachine = {
      noDataMessage: this.translateService.instant('datatable.noDataMessage'),
  
      actions: {
        add:false,
        edit:false,
        delete:false,
        position: 'right',
      },
      // add: {
      //   addButtonContent: '<i class="nb-plus"></i>',
      //   createButtonContent: '<i class="nb-checkmark"></i>',
      //   cancelButtonContent: '<i class="nb-close"></i>',
      //   confirmCreate: true,
      // },
      // edit: {
      //   editButtonContent: '<i class="nb-edit"></i>',
      //   saveButtonContent: '<i class="nb-checkmark"></i>',
      //   cancelButtonContent: '<i class="nb-close"></i>',
      //   confirmSave: true,
      // },
      // delete: {
      //   deleteButtonContent: '<i class="nb-trash"></i>',
      //   confirmDelete: true,
      // },
  
      columns: {
        reference: {
          title: this.translateService.instant('machine.reference'),
          type: 'list',
          width: '350px',
          filter: {
            type: 'list',
            config: {
              selectText: 'Machine',
              list: this.machines,
            },
          },
          editor: {
            type: 'list',
            config: {
              selectText: 'Machine',
              list: this.machines,
            },
          },
        },
        dateDebutMachine: {
          title: this.translateService.instant('dateDebut'),
          type: 'String',
          filter: true,
        },
        dateFinMachine: {
          title: this.translateService.instant('dateFin'),
          type: 'String',
          filter: true,
        }
  
      }
    }
  
    settingsProduit = {
      noDataMessage: this.translateService.instant('datatable.noDataMessage'),
  
      actions: {
        add:false,
        edit:false,
        delete:false,
        position: 'right',
      },
      // add: {
      //   addButtonContent: '<i class="nb-plus"></i>',
      //   createButtonContent: '<i class="nb-checkmark"></i>',
      //   cancelButtonContent: '<i class="nb-close"></i>',
      //   confirmCreate: true,
      // },
      // edit: {
      //   editButtonContent: '<i class="nb-edit"></i>',
      //   createButtonContent: '<i class="nb-checkmark"></i>',
      //   cancelButtonContent: '<i class="nb-close"></i>',
      //   confirmSave: true,
      // },
  
      // delete: {
      //   deleteButtonContent: '<i class="nb-trash"></i>',
      //   confirmDelete: true,
      // },
      columns: {
        codeProduit: {
          title: this.translateService.instant('produit.codeProduit'),
          type: 'list',
          width: '350px',
          filter: {
            type: 'list',
            config: {
              selectText: 'Produit',
              list: this.produits,
  
            },
          },
          editor: {
            type: 'list',
            config: {
              selectText: 'Produit',
              list: this.produits,
            },
          },
        },
        quantite: {
          title: this.translateService.instant('produit.quantite'),
          type: 'number',
          filter: true,
        },
        qualite: {
          title: this.translateService.instant('produit.qualite'),
          type: 'String',
          filter: true,
        },
        prixPr: {
          title: this.translateService.instant('produit.prix'),
          type: 'number',
          filter: true,
  
        },
        devis: {
          title: this.translateService.instant('produit.devis'),
          type: 'list',
          width: '200px',
  
  
          filter: {
            type: 'list',
            config: {
              selectText: this.translateService.instant('produit.devis'),
              list: [{ value: 'TND', title: 'TND' },
              { value: 'EUR', title: 'EUR' },
              { value: 'USD', title: 'USD' },
              { value: 'SAR', title: 'SAR' },
              { value: 'KWD', title: 'KWD' },
              { value: 'QAR', title: 'QAR' },
              { value: 'SEK', title: 'SEK' },
              { value: 'NOK', title: 'NOK' },
              { value: 'Kef', title: 'Kef' },
              { value: 'GBP', title: 'GBP' },
              { value: 'AED', title: 'AED' },
              { value: 'CHF', title: 'CHF' },
              { value: 'CAD', title: 'CAD' }]
  
            },
          },
          editor: {
            
            type: 'list',
            config: {
            selectText: this.translateService.instant('produit.devis'),
            list: [{ value: 'TND', title: 'TND' },
            { value: 'EUR', title: 'EUR' },
            { value: 'USD', title: 'USD' },
            { value: 'SAR', title: 'SAR' },
            { value: 'KWD', title: 'KWD' },
            { value: 'QAR', title: 'QAR' },
            { value: 'SEK', title: 'SEK' },
            { value: 'NOK', title: 'NOK' },
            { value: 'Kef', title: 'Kef' },
            { value: 'GBP', title: 'GBP' },
            { value: 'AED', title: 'AED' },
            { value: 'CHF', title: 'CHF' },
            { value: 'CAD', title: 'CAD' }]
          },
        },
      },
    }
    }
  
  
    
    
  
    onAddTM() {
      let e = localStorage.getItem('e');
      let idST = localStorage.getItem('idST');
  
      this.contrat.contratProduits= this.sourceCPr
      this.contrat.contratPersonnels=this.sourceCP
      this.contrat.contratMachines= this.sourceCM
      this.service.addReconduit(+this.contrat.idContrat, this.contrat).subscribe(
        data => {
          this.reconduit = data;
          console.log(this.reconduit.idContrat1);
          this.toastr.success(this.translateService.instant('succe'));
          localStorage.removeItem('e');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/pages/contrat']));
          this.windowRef.close();
        },
        error => { console.log('error');
        this.toastr.error(this.translateService.instant('erreur')); });
  
    }
    
    onclose() {
      this.windowRef.close();
    }*/
  }


}
