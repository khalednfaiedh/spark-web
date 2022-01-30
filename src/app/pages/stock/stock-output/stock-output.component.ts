import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { format } from 'date-fns';
import { DemandeProduit } from '../../gpao/demande-produit/demande-produit.model';
import { DemandeProdService } from '../../gpao/demande-produit/demande-produit.service';
import { BonDeLivraisonClientModel } from '../../vente/bon-de-livraison/Bon-de-livraison-client-model';
import { BonDeLivraisonService } from '../../vente/bon-de-livraison/service/bon-de-livraison.service';
import { MvtService } from '../services/mouvementService';
import { PopupBlVenteComponent } from './popup-bl-vente/popup-bl-vente.component';
import { PopupDemandeGpaoComponent } from './popup-demande-gpao/popup-demande-gpao.component';

@Component({
  selector: 'ngx-stock-output',
  templateUrl: './stock-output.component.html',
  styleUrls: ['./stock-output.component.scss']
})
export class StockOutputComponent implements OnInit {

  public static url= "/pages/stock/sorties";
  source: any;
  blListe : BonDeLivraisonClientModel[] = []
  blLength : number = 0
  dLength : number = 0
  demandeListe: DemandeProduit[]= [];

  constructor(private windowService: NbWindowService,
     private mvtService: MvtService,
     private blService : BonDeLivraisonService,
     private demandeService :DemandeProdService) { }

  ngOnInit() {    
    this.mvtService.getAllMouvementsByentreprise("Sortie").subscribe(
      data=>{
        this.source = data;
      },
      error=>{console.log("error");}
    );
    this.blService.getAllInStock().subscribe(
      data=>{
        this.blListe = data;console.log(data)
        this.blLength = this.blListe.length
      },
      error=>{console.log("error");}
    );
    this.demandeService.getAllEnAttente().subscribe(
      data=>{
        this.demandeListe = data;console.log(data)
        this.dLength = this.demandeListe.length
      },
      error=>{console.log("error");}
    );
  }
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        { name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>'},      
        { name: 'editAction', title: `<i class="nb-edit" title="Modifier"></i>` },
      ],
    },
    columns: {
      reference: {
        title: 'Référence',
        type: 'string',
      },
      designation: {
        title: 'Désignation',
        type: 'string',
      },
      natureMvt: {
        title: 'Déstination',
        type: 'string'
      },
      dateOperation: {
        title: "Date de sortie",
        type: 'Date',
        valuePrepareFunction(cell, row) {
          return format(cell, "DD MMM YYYY")
        }
      },
    }
  } 
  onCustom(event) {
    if (event.action === 'showAction') {
      if(event.data.natureMvt === 'vente'){
         this.windowService.open(PopupBlVenteComponent,
           { title: 'Afficher sortie ', context: { data: event.data, show2 : true ,edit2 : false} });
      }else if(event.data.natureMvt === 'production'){
         this.windowService.open(PopupDemandeGpaoComponent,
           { title: 'Afficher sortie ', context: { data: event.data, show2 : true ,edit2 : false} });
        }
      }else  if (event.action === 'editAction') {
        if(event.data.natureMvt === 'vente'){
           this.windowService.open(PopupBlVenteComponent,
           { title: 'Modifier sortie ', context: { data: event.data, show2 : false, edit2 : true } });
        }else  if(event.data.natureMvt === 'production'){
          this.windowService.open(PopupDemandeGpaoComponent,
          { title: 'Modifier sortie ', context: { data: event.data, show2 : false, edit2 : true } });
       }
      }
  }
  settingsBl = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        { name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>'},      
        { name: 'editAction', title: `<i class="nb-edit" title="Modifier"></i>` },
      ],
    },
    columns: {
      id: {
        title: 'Référence',
        type: 'string',
      },
      statut: {
        title: 'Statut',
        type: 'string',
      },
      degreUrgent: {
        title: "Degré d'urgence",
        type: 'string'
      },
      date_depart: {
        title: "Date départ",
        type: 'Date',
        valuePrepareFunction(cell, row) {
          return format(cell, "DD MMM YYYY")
        }
      },
      dateLivraison: {
        title: "Date liv",
        type: 'Date',
        valuePrepareFunction(cell, row) {
          return format(cell, "DD MMM YYYY")
        }
      },
    }
  } 
  onCustomBl(event) {
    if (event.action === 'showAction') {
      this.windowService.open(PopupBlVenteComponent,
        { title: 'Sortie de stock (vente) ', context: { data: event.data, show : true, edit : false}});
    }else  if (event.action === 'editAction') {
      this.windowService.open(PopupBlVenteComponent,
        { title: 'Sortie de stock (vente) ', context: { data: event.data, show : false, edit : true }});
    }
  }

  settingsDem = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        { name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>'},      
        { name: 'editAction', title: `<i class="nb-edit" title="Modifier"></i>` },
      ],
    },
    columns: {

      reference: {
        title: 'Référence',
        type: 'string',

      },
      designation: {
        title: 'Désignation',
        type: 'string',

      },
      dateDemande: {
        title: 'Date demande',
        type: 'Date',
        sortDirection: 'desc',
        valuePrepareFunction(cell, row) {
          return format(cell, "DD MMM YYYY")
        }
      },
      dateLiv: {
        title: 'Date livraison',
        type: 'Date',
        sortDirection: 'desc',
        valuePrepareFunction(cell, row) {
          return format(cell, "DD MMM YYYY")
        }
      },
      livrer: {
        title: 'Statut',
        type: 'string',
        valuePrepareFunction(cell, row) {
          return cell ? 'Livrer' : 'En attente'
        }
      },
    },
  } 
  onCustomDem(event) {
    if (event.action === 'showAction') {
      this.windowService.open(PopupDemandeGpaoComponent,
        { title: 'Sortie de stock (GPAO) ', context: { data: event.data, show : true, edit : false}});
    }else  if (event.action === 'editAction') {
      this.windowService.open(PopupDemandeGpaoComponent,
        { title: 'Sortie de stock (GPAO) ', context: { data: event.data, show : false, edit : true }});
    }
  }
}
