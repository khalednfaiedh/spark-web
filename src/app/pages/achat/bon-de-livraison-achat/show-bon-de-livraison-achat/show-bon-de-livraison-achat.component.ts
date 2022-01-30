import { Component, OnInit } from '@angular/core';
import { BonDeLivraisonAchatService } from '../bon-de-livraison-achat.service';
import { DetailBonDeLivraisonAchatService } from '../detail-bon-de-livraison-achat.service';
import { BonDeLivraisonAchatModel } from '../bon-de-livraison-ahat.model';
import { BonCommandeService } from '../../bon-commande/services/bon-commande.service';
import { FournisseurService } from '../../../admin/fournisseur/fournisseur.service';
import { ProduitService } from '../../../crm/services/produit.service';
import { MagasinService } from '../../../stock/magasin/services/magasin.service';

@Component({
  selector: 'ngx-show-bon-de-livraison-achat',
  templateUrl: './show-bon-de-livraison-achat.component.html',
  styleUrls: ['./show-bon-de-livraison-achat.component.scss']
})
export class ShowBonDeLivraisonAchatComponent implements OnInit {
  commandes: any;
  source: any;
  magasins: any;
  fournisseurs: any;
  bonDeLivraisonAchat: BonDeLivraisonAchatModel;

  constructor(private service: BonDeLivraisonAchatService,
    private serviceBonCommande: BonCommandeService,
    private serviceFournisseur: FournisseurService,
    private serviceProduit: ProduitService,
    private serviceMagasin: MagasinService,
    private serviceDetailBonDeLivraison: DetailBonDeLivraisonAchatService) { }

  ngOnInit() {
    let idEntreprise = localStorage.getItem("current_entreprise");
    this.serviceMagasin.getMagasinByEntreprise(+idEntreprise).subscribe(data => {
      this.magasins = data;
    },
      error => { console.log("error"); });
      let id = localStorage.getItem('current_entreprise')
    this.serviceFournisseur.getAllfournisseur(+id).subscribe(data => {
      this.fournisseurs = data;
    },
    
      error => {
        console.log("error");
      })
    this.serviceBonCommande.getAllBonCommande().subscribe(data => {
      this.commandes = data;
    },
      error => {
        console.log("error");
      });
    this.bonDeLivraisonAchat = new BonDeLivraisonAchatModel();
    let idBL = localStorage.getItem("idBL");
    this.service.getBonDeLivraisonAchatById(+idBL).subscribe(data => {
      this.bonDeLivraisonAchat = data;
      this.serviceDetailBonDeLivraison.getAllDetailBonDeLivraisonAchatByBonDeLivraison(+idBL).subscribe(data1 => {
        this.source = data1;
      },
        error => {
          console.log("error");
        });
    },
      error => {
        console.log("error");
      });
  }

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      idProduit: {
        title: 'Produit',
        type: 'string',
        filter: true,
      },
      quantity: {
        title: 'Quantités',
        type: 'string',
        filter: true,
      },
    },
  };
}
