import { Component, OnInit } from '@angular/core';
import { HistoriqueCommandeService } from './historique-commande.service';

@Component({
  selector: 'ngx-historique-commande',
  templateUrl: './historique-commande.component.html',
  styleUrls: ['./historique-commande.component.scss']
})
export class HistoriqueCommandeComponent implements OnInit {
source: any;
  constructor(public service: HistoriqueCommandeService) { }

  ngOnInit() {
    let idC = localStorage.getItem("idCommande");
    this.service.getAllHistoriqueCommandeByCommande(+idC).subscribe(
      data=>{this.source = data},
      error=>{console.log("error");});
  }

  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-trash" title="supprimer"></i>',
      confirmDelete: true,
    },
    actions: false,
    // {  add: false,
    //   edit: false,
    //   position: 'right',
    //   custom: [
    //     {
    //       name: 'modal',
    //       title: '<i class="nb-sunny" title="Afficher"></i>',
    //     },
    //     // {
    //     //   name: 'bilan',
    //     //   title: '<i class="nb-paper-plane" title="Bilan"></i>',
    //     // },
    //     {
    //       name: 'evaluation',
    //       title: '<i class="nb-compose" title="Evaluation"></i>',
    //     },
    //   ],
    // },
    columns: {
      idBC: {
        title: 'Référence',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell,row){
          return "BC"+ cell
        }
      },
      dateCommande: {
        title: 'Date Commande',
        type: 'Date',
        filter: true,
      },
      dateLivraison: {
        title: 'Date Livraison  ',
        type: 'Date',
        filter: true,
      },
      statut :{
        title: 'Status',
        type: 'string',
        filter: true,

      },
    },
  };
}
