import { Component, OnInit } from '@angular/core';
import { Contrat } from '../contrat';
import { ContratService } from '../contrat.service';
/*import { ContratProduitService } from '../../contrat-produit/contrat-produit.service';
import { ContratPersonnelService } from '../../contrat-personnel/contrat-personnel.service';
import { ContratMachineService } from '../../contrat-machine/contrat-machine.service';*/
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-show-contrat',
  templateUrl: './show-contrat.component.html',
  styleUrls: ['./show-contrat.component.scss']
})
export class ShowContratComponent implements OnInit {
  contrat: Contrat;
  sourceCP: any;
  sourceCM: any
  sourceCPr: any
  constructor(/*private contratService: ContratService, protected serviceContratMachine: ContratMachineService,
    private translateService:TranslateService, protected serviceContratPersonnel: ContratPersonnelService, protected serviceContratProduit: ContratProduitService*/) { }

  ngOnInit() {

    /*  this.contrat = new Contrat();
      let idContrat = localStorage.getItem("idContrat");
      this.contratService.retrieveContrat(+idContrat).subscribe(
        data => { this.contrat = data; },
        error => { console.log(error); }
      );
  
      this.serviceContratMachine.ListContratMachine(+idContrat).subscribe(
        data => { this.sourceCM = data; })
  
  
      this.serviceContratPersonnel.ListContratPersonnel(+idContrat).subscribe(
        data => { this.sourceCP = data; })
  
  
      this.serviceContratProduit.ListContratProduit(+idContrat).subscribe(
        data => { this.sourceCPr = data; })
    }
  
  
    settingsEmployes = {
      noDataMessage: this.translateService.instant('datatable.noDataMessage'),
  
      actions: {
        add: false,
        edit: false,
        delete: false,
        position: 'right'
      },
  
      columns: {
        cin: {
          title: this.translateService.instant('personnel.cin'),
          type: 'number',
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
        add: false,
        edit: false,
        delete: false,
        position: 'right',
      },
  
  
      columns: {
        reference: {
          title: this.translateService.instant('machine.reference'),
          type: 'number',
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
        add: false,
        edit: false,
        delete: false,
        position: 'right',
      },
  
      columns: {
        codeProduit: {
          title: this.translateService.instant('produit.codeProduit'),
          type: 'number',
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
      }}*/
  }
}