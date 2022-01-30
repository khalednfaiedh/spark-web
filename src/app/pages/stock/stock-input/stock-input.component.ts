import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { format } from 'date-fns';
import { BonDeLivraisonAchatService } from '../../achat/bon-de-livraison-achat/bon-de-livraison-achat.service';
import { BonLivraisonProdService } from '../../gpao/bon-livraison-prod/bonLivraisonProd.service';
import { ReclamationService } from '../../vente/facture/reclamation.service';
import { MvtService } from '../services/mouvementService';
import { PopubBlComponent } from './popub-bl/popub-bl.component';
import { PopupProdComponent } from './popup-prod/popup-prod.component';
import { PopupReclamationComponent } from './popup-reclamation/popup-reclamation.component';

@Component({
  selector: 'ngx-stock-input',
  templateUrl: './stock-input.component.html',
  styleUrls: ['./stock-input.component.scss']
})
export class StockInputComponent implements OnInit {
  eLength: number = 0;
  rLength: number = 0;
  prodLength : number = 0;
  entrees: any
  reclamation: any
  blProd : any
  mvt : any
  constructor(private BlService: BonDeLivraisonAchatService,
    private reclamationService: ReclamationService,
    private windowService: NbWindowService,
    private blProdService : BonLivraisonProdService,
    private mouvementService :MvtService
   ) { }

  ngOnInit() {
    this.BlService.getBonDeLivraisonEnAttente().subscribe(
      data => { this.entrees = data
        this.eLength = this.entrees.length
      })

    this.reclamationService.getReclamationAvecRetour().subscribe(
      data => { this.reclamation = data; 
                this.rLength = this.reclamation.length  }
    )
    this.blProdService.getAllEnAttente().subscribe(
      data => {this.blProd = data
        this.prodLength= this.blProd.length })
        
    this.mouvementService.getAllMouvementsByentreprise("Entree").subscribe(
      data => {this.mvt = data; }
    )
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
        title: 'Source',
        type: 'string'
      },
      dateOperation: {
        title: "Date d'entée",
        type: 'Date',
        valuePrepareFunction(cell, row) {
          return format(cell, "DD MMM YYYY")
        }
      },
      datePreemption: {
        title: "Date préemption",
        type: 'Date',
        valuePrepareFunction(cell, row) {
          return format(cell, "DD MMM YYYY")
        }
      },
    }
  }  
  onCustom(event) {
    if (event.action === 'editAction') {
      if (event.data.natureMvt === 'achat') {
          console.log(event.data)
          this.windowService.open(PopubBlComponent,{ title: 'Modifier cette entrée',
          context: { data: event.data, show2 : false, edit : true }
        }); 
      }else  if (event.data.natureMvt === 'vente') {
        console.log(event.data)
        this.windowService.open(PopupReclamationComponent,{ title: 'Modifier cette entrée',
        context: { data: event.data, show2 : false, edit : true }
      }); 
     } else  if (event.data.natureMvt === 'production') {
      console.log(event.data)
      this.windowService.open(PopupProdComponent,{ title: 'Modifier cette entrée',
      context: { data: event.data, show2 : false, edit : true }
    }); 
   }  
    }
    if (event.action === 'showAction') {
      if (event.data.natureMvt === 'achat') {
        this.windowService.open(PopubBlComponent,{ title: 'Détails entrée stock',
         context: { data: event.data, show2 : true, edit : true }});
      }else  if (event.data.natureMvt === 'vente') {
        this.windowService.open(PopupReclamationComponent,{ title: 'Détails entrée stock',
        context: { data: event.data, show2 : true, edit : true }
      }); 
    }else  if (event.data.natureMvt === 'production') {
      this.windowService.open(PopupProdComponent,{ title: 'Détails entrée stock',
      context: { data: event.data, show2 : true, edit : true }
    }); 
  }
    }
  }

  settingsProd = {
    actions: {
      position: 'right',
      custom: [
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Show"></i>',
        },
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Edit"></i>',
        },
      ],
      add: false,
      edit: false,
      delete:false
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
      stocker: {
        title: 'Statut',
        type: 'string',
        valuePrepareFunction(cell, row) {
          return cell ? 'Stocker' : 'En attente'
        }
      },
      fini: {
        title: 'Etat',
        type: 'string',
        valuePrepareFunction(cell, row) {
          return cell ? 'Produit fini' : 'Produit non fini'
        }
      },
      reserver: {
        title: 'Réserver',
        type: 'string',
        valuePrepareFunction(cell, row) {
          return cell ? 'Oui' : 'Non'
        }
      },
      date: {
        title: 'Date sortie',
        type: 'Date',
        sortDirection: 'desc',
        valuePrepareFunction(cell, row) {
          return format(cell, "DD MMM YYYY")
        }
      },
    },
  };

  onCustomProd(event) {
    if (event.action === 'editAction') {
      this.windowService.open(PopupProdComponent,{ title: 'Entrée en stock',
          context: { data: event.data, show : false }
        });
    }
    if (event.action === 'showAction') {
      this.windowService.open(PopupProdComponent,{ title: 'Détails entrée en stock',
          context: { data: event.data, show : true }
        });
    }
  }
  settingsBL = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        { name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>'} ,     
        { name: 'editAction', title: `<i class="nb-edit" title="Modifier"></i>` },
      ]
    },

    columns: {
      reference: {
        title: 'Référence BL',
        type: 'string',
      },
      dateCommande: {
        title: 'Date livraison',
        type: 'Date',
        valuePrepareFunction(cell, row) {
          return format(cell, "DD MMM YYYY")
        }
      },

      dateLivraison: {
        title: "Date d'arrivage",
        type: 'Date',
        valuePrepareFunction(cell, row) {
          return format(cell, "DD MMM YYYY")
        }
      },
      statut: {
        title: 'Statut',
        type: 'string',
        valuePrepareFunction(cell) {
          return cell ? 'Stocker' : 'En attente de magasinage'
        }
      }
    }
  }

  onCustomBl(event) {
    if (event.action === 'editAction') {
      this.windowService.open(PopubBlComponent,{ title: 'Entree en stock',
          context: { data: event.data, show : false }
        });
    }
    if (event.action === 'showAction') {
      this.windowService.open(PopubBlComponent,{ title: 'Entree en stock',
          context: { data: event.data, show : true }
        });
    }
  }

  settingsRec = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        { name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>'},
        { name: 'editAction', title: `<i class="nb-edit" title="Modifier"></i>` }
      ],
    },
    columns: {
      id: {
        title: 'Référence',
        type: 'string',
      },
      dateReclamation: {
        title: 'Date réclamation',
        type: 'Date',
        valuePrepareFunction(cell, row) {
          return format(cell, "DD MMM YYYY")
        }
      },

      dateLivraison: {
        title: "Date d'arrivage",
        type: 'Date',
        valuePrepareFunction(cell, row) {
          return format(cell, "DD MMM YYYY")
        }
      },
      type: {
        title: 'Type',
        type: 'string',
      }
    }
  }  
  onCustomRec(event) {
    if (event.action === 'editAction') {
      this.windowService.open(PopupReclamationComponent,{ title: 'Retour marchandise',
          context: { data: event.data, show : false }
        });
    }
    if (event.action === 'showAction') {
      this.windowService.open(PopupReclamationComponent,{ title: 'Retour marchandise',
          context: { data: event.data, show : true }
        });
    }
  }

}

