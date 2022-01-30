import { Component, OnInit } from '@angular/core';
//import { SousTraitant } from '../../sous-traitant/sous-traitant';
import { Contrat } from '../contrat';
import { NbWindowRef, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ContratService } from '../contrat.service';
/*import { ProduitService } from '../../produit/produit.service';
import { ContratProduitService } from '../../contrat-produit/contrat-produit.service';
import { ContratProduit } from '../../contrat-produit/contrat-produit';
import { Produit } from '../../produit/produit';
import { MachineService } from '../../machine/machine.service';
import { PersonnelService } from '../../personnel/personnel.service';
import { Machine } from '../../machine/machine';
import { ContratMachineService } from '../../contrat-machine/contrat-machine.service';
import { ContratMachine } from '../../contrat-machine/contrat-machine';
import { Personnel } from '../../personnel/personnel';
import { ContratPersonnelService } from '../../contrat-personnel/contrat-personnel.service';*/
import { error } from 'util';
import { element } from '@angular/core/src/render3';
import { TranslateService } from '@ngx-translate/core';
/*import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesPersonnel } from '../../../authorisation/authorities-personnel';
import { AuthoritiesContratPersonnel } from '../../../authorisation/authorities-contrat-personnel';
import { AuthoritiesContratMachine } from '../../../authorisation/authorities-contrat-machine';
import { AuthoritiesContratProduit } from '../../../authorisation/authorities-contrat-produit';
import { ToastrService } from 'ngx-toastr';*/


@Component({
  selector: 'ngx-modal-contrat',
  templateUrl: './modal-contrat.component.html',
  styleUrls: ['./modal-contrat.component.scss']
})
export class ModalContratComponent implements OnInit {
  p: any

  //contratProduit: ContratProduit
  //contratMachine: ContratMachine
  contratPersonnel: any
  contratProduitList = [];
  contratMachineList = [];
  contratEmployeList = [];
  contratProduits = [];
  contrat: any;
  avenant: any;
  produits = [];
  //personnel: Personnel;
  //produit: Produit;
  //machine: Machine;
  machines = [];
  personnels = [];
  //sousTraitant: SousTraitant;
  ATM: string;
  source: any;
  sourceCP: any;
  sourceCPr: any;
  sourceCM: any;
  reconduit: any;

  constructor(public windowRef: NbWindowRef,
    private service: ContratService,
    //  private serviceMachine: MachineService,
    //  private servicePersonnel: PersonnelService,
    private router: Router,
    // private serviceProduit: ProduitService,
    //private serviceContratProduit: ContratProduitService,
    // private serviceContratMachine: ContratMachineService,
    //private serviceContratPersonnel: ContratPersonnelService,
    private translateService: TranslateService) { }

  ngOnInit() {
    // if(Authorities.hasAutorities(AuthoritiesContratPersonnel.CONTRAT_PERSONNEL_ADD_VALUE)){
    //   this.settingsEmployes.actions.add= true;
    // }
    // if(Authorities.hasAutorities(AuthoritiesContratPersonnel.CONTRAT_PERSONNEL_DELETE_VALUE)){
    //   this.settingsEmployes.actions.delete= true;
    // }
    // if(Authorities.hasAutorities(AuthoritiesContratPersonnel.CONTRAT_PERSONNEL_UPDATE_VALUE)){
    //   this.settingsEmployes.actions.edit= true;
    // }
    // if(Authorities.hasAutorities(AuthoritiesContratMachine.CONTRAT_MACHINE_ADD_VALUE)){
    //   this.settingsMachine.actions.add= true;
    // }
    // if(Authorities.hasAutorities(AuthoritiesContratMachine.CONTRAT_MACHINE_DELETE_VALUE)){
    //   this.settingsMachine.actions.delete= true;
    // }
    // if(Authorities.hasAutorities(AuthoritiesContratMachine.CONTRAT_MACHINE_UPDATE_VALUE)){
    //   this.settingsMachine.actions.edit= true;
    // }
    // if(Authorities.hasAutorities(AuthoritiesContratProduit.CONTRAT_PRODUIT_ADD_VALUE)){
    //   this.settingsProduit.actions.add= true;
    // }
    // if(Authorities.hasAutorities(AuthoritiesContratProduit.CONTRAT_PRODUIT_DELETE_VALUE)){
    //   this.settingsProduit.actions.delete= true;
    // }
    // if(Authorities.hasAutorities(AuthoritiesContratProduit.CONTRAT_PRODUIT_UPDATE_VALUE)){
    //   this.settingsProduit.actions.edit= true;
    // }

    let e = localStorage.getItem('e');
    let idST = localStorage.getItem('idST');
    this.contrat = new Contrat();
    this.avenant = new Contrat();
    /*  this.serviceProduit.produitListSousTraitant(+idST).subscribe(
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
      if (e === '0') {
        this.ATM = this.translateService.instant('ajouter');
      }
      if (e === '1') {
        let idContrat = localStorage.getItem('idContrat');
        this.ATM = this.translateService.instant('modifier');
  
        this.serviceContratProduit.ListContratProduit(+idContrat).subscribe(
          data => {
            this.sourceCPr = data;
            data.forEach(element => {
              this.contratProduitList.push({
                "codeProduit": (element.codeProduit),
                "quantite": (element.quantite),
                "qualite": (element.qualite),
                "prixPr": (element.prixPr),
                "devis": (element.devis),
              });
            });
          })
  
        this.serviceContratMachine.ListContratMachine(+idContrat).subscribe(
          data => {
            this.sourceCM = data;
            data.forEach(element => {
              this.contratMachineList.push({
                "reference": (element.reference),
                "dateDebutMachine": (element.dateDebutMachine),
                "dateFinMachine": (element.dateFinMachine),
              });
            })
          })
        this.serviceContratPersonnel.ListContratPersonnel(+idContrat).subscribe(
          data => {
            this.sourceCP = data;
            data.forEach(element => {
              this.contratEmployeList.push({
                "cin": (element.cin),
                "qualification": (element.qualification),
                "dateDebutEmploye": (element.dateDebutEmploye),
                "dateFinEmploye": (element.dateFinEmploye),
              });
            })
          })
        this.service.retrieveContrat(+idContrat).subscribe(
          data => { this.contrat = data; },
          error => { console.log('error'); }
        )
      }
  
    }
  
    settingsEmployes = {
      noDataMessage: this.translateService.instant('datatable.noDataMessage'),
  
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      actions: {
        add: true,
        edit: true,
        delete: true,
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
          },
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
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      actions: {
        add: true,
        edit: true,
        delete: true,
        position: 'right'
      },
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
  
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      actions: {
        add: true,
        edit: true,
        delete: true,
        position: 'right'
      },
  
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
        },
        qualite: {
          title: this.translateService.instant('produit.qualite'),
          type: 'String',
        },
        prixPr: {
          title: this.translateService.instant('produit.prix'),
          type: 'number',
  
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
  
    }}
  
  
    //produit
    onCreateConfirmProduit(event): void {
      if (this.sourceCPr == null) {
        event.confirm.resolve();
        console.log("ici")
  
        this.contratProduitList.push({
          "codeProduit": (event.newData.codeProduit),
          "quantite": (event.newData.quantite),
          "qualite": (event.newData.qualite),
          "prixPr": (event.newData.prixPr),
          "devis": (event.newData.devis),
        });
      }
      else {
        this.sourceCPr.forEach(element => {
          console.log(element)
          if (element.codeProduit == event.newData.codeProduit) {
            window.confirm('Produit existe déjà'),
              event.confirm.reject();
          }
          else { event.confirm.resolve(event.newData); }
        });
      }
    }
  
    onSaveConfirmProduit(event): void {
      event.confirm.resolve(event.newData)
      console.log(this.sourceCPr);
    }
  
    //machine
    onCreateConfirmMachine(event): void {
      if (this.sourceCM == null) {
        event.confirm.resolve();
        this.contratMachineList.push({
          "reference": (event.newData.reference),
          "dateDebutMachine": (event.newData.dateDebut),
          "dateFinMachine": (event.newData.dateFin),
  
        });
      }
      else {
        this.sourceCM.forEach(element => {
          console.log(element)
          if (element.reference == event.newData.reference) {
            window.confirm('Machine existe déjà'),
              event.confirm.reject();
          }
          else { event.confirm.resolve(event.newData); }
        });
      }
    }
    onSaveConfirmMachine(event): void {
      event.confirm.resolve(event.newData)
      console.log(this.sourceCM);
    }
  
    //employe
    onCreateConfirmEmploye(event): void {
      if (this.sourceCP == null) {
        event.confirm.resolve();
        this.contratEmployeList.push({
          "cin": (event.newData.cin),
          "qualification": (event.newData.qualification),
          "dateDebutEmploye": (event.newData.dateDebut),
          "dateFinEmploye": (event.newData.dateFin),
        });
      }
      else {
        this.sourceCP.forEach(element => {
          console.log(element)
          if (element.cin == event.newData.cin) {
            window.confirm('Employé existe déjà'),
              event.confirm.reject();
          }
          else { event.confirm.resolve(event.newData); }
        });
      }
    }
  
    onSaveConfirmEmploye(event): void {
      event.confirm.resolve(event.newData)
      console.log(this.sourceCP);
    }
  
    onDeleteConfirmProduit(event): void {
      if (window.confirm('Are you sure you want to delete?')) {
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    }
    onDeleteConfirmPersonnel(event): void {
      let idCP = localStorage.getItem('idCP');
      event.confirm.resolve(this.serviceContratPersonnel.DeleteContratPersonnel(event.data.idCP).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    }
    onDeleteConfirmMachine(event): void {
      let idCM = localStorage.getItem('idCM');
      event.confirm.resolve(this.serviceContratMachine.DeleteContratMachine(event.data.idCM).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    }
  
    onAddTM() {
      let e = localStorage.getItem('e');
      let idST = localStorage.getItem('idST');
      if (e === '0') {
  
        this.contrat.contratProduits = this.contratProduitList
        this.contrat.contratPersonnels = this.contratEmployeList
        this.contrat.contratMachines = this.contratMachineList
  
        this.service.addContratSousTraitant(this.contrat, +idST).subscribe(
          data => {
            this.contrat = data;
            this.toastr.success(this.translateService.instant('succe'));
  
            localStorage.removeItem('e');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(['/pages/contrat']));
            this.windowRef.close();
          },
          () => {
            console.log("error");
            this.toastr.error(this.translateService.instant('erreur'));
          });
      }
      if (e === '1') {
  
        console.log(this.contratProduitList)
        this.contrat.contratProduits = this.sourceCPr
        this.contrat.contratPersonnels = this.sourceCP
        this.contrat.contratMachines = this.sourceCM
  
  
  
        this.service.addContrat(+this.contrat.idContrat, this.contrat).subscribe(
          data => {
  
            this.avenant = data;
            this.toastr.success(this.translateService.instant('succeM'));
            localStorage.removeItem('e');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(['/pages/contrat']));
            this.windowRef.close();
          },
          error => {
            console.log('error');
            this.toastr.error(this.translateService.instant('erreur'));
          });
      }
    }
  
    onclose() {
      this.windowRef.close();
    }*/
  }
}