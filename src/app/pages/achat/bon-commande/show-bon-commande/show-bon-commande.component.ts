import { ContratService } from '../../contrat-fournisseur/service/contrat-fournisseur.service';
import { DevisAchatService } from '../../devis-achat/services/devis-achat.service';
import { DevisProduitAchatService } from '../../devis-achat/services/devis-produit-achat.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { BonCommandeAchatModel } from '../model/bon-commande.model'
import { LocalDataSource } from 'ng2-smart-table';
import { BonCommandeService } from '../services/bon-commande.service';
import { MontantService } from '../services/montant.service';
import { FournisseurModel } from '../../../admin/fournisseur/fournisseur.model';
import { FournisseurService } from '../../../admin/fournisseur/fournisseur.service';
import { MagasinService } from '../../../stock/magasin/services/magasin.service';





@Component({
  selector: 'ngx-show-bon-commande',
  templateUrl: './show-bon-commande.component.html',
  styleUrls: ['./show-bon-commande.component.scss']
})
export class ShowBonCommandeComponent implements OnInit {

  ARCM: string;
  source: LocalDataSource = new LocalDataSource();
  montant: any[] = []
  e = localStorage.getItem('e');
  id = localStorage.getItem('idBC');


  bonCommande: BonCommandeAchatModel = new BonCommandeAchatModel();
  fournisseur: FournisseurModel = new FournisseurModel();
  prixtotHT: number = 0;
  prixtotTTC: number = 0;
  magasins: any;
  fournisseurs: any;


  constructor(private router: Router,
    public windowRef: NbWindowRef,
    private serviceFournisseur: FournisseurService,
    public service: BonCommandeService,
    private serviceDP: DevisProduitAchatService,
    private serviceD: DevisAchatService,
    private montantService: MontantService,
    private serviceContrat: ContratService,
    private serviceMagasin: MagasinService,
    private serviceF: FournisseurService) {
  }

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      code: {
        title: 'Code',
        type: 'string',
      },
      quantity: {
        title: 'Quantité',
        type: 'number',
      },
      taxeProduit: {
        title: 'Tva (%)',
        type: 'number',
        filter: false,
        addable: false,
        editable: false
      },
      prixBC: {
        title: 'Prix unitaire',
        type: 'number',
        filter: false,
      },
      remiseProduit: {
        title: 'Remise (%)',
        type: 'number',
        filter: false,
      },
      prixTotale: {
        title: 'Prix totale',
        type: 'number',
      },
      prixTTC: {
        title: 'Prix TTC',
        type: 'number',
        filter: false,
        editable: false,
        addable: false,
      },
    },
  };

  ngOnInit() {
    let id = localStorage.getItem('current_entreprise')
    this.serviceFournisseur.getAllfournisseur(+id).subscribe(data => {
      this.fournisseurs = data;
      console.log(this.fournisseurs);
    },
      error => {
        console.log("error")
      })

      this.serviceMagasin.getAllMagasin().subscribe(data=>{
        this.magasins= data;
      },
      error=>{
        console.log("error");
      })

    // let idEntreprise = localStorage.getItem("current_entreprise");
    // this.serviceMagasin.getMagasinByEntreprise(+idEntreprise).subscribe(data => {
    //   this.magasins = data;
    // },
    //   error => {
    //     console.log("error")
    //   })

    this.service.getBonCommandeById(+this.id).subscribe(
      data => {
        this.bonCommande = data;
        this.montantService.getAllMontantCommande(data.idBC).subscribe(
          dataM => {
            for (let i = 0; i < dataM.length; i++) {
              if (dataM[i].idDevisP != null) {
                this.serviceDP.getDevisProduits(dataM[i].idDevisP).subscribe(data2 => {
                  console.log(data2);
                  if (data2.idD != null) {
                    this.serviceD.getDevis(data2.idD).subscribe(data3 => {
                      console.log(data3);
                      this.serviceF.getFournisseurById(data3.demandeFournisseur.idF).subscribe(data4 => {
                        this.fournisseur = data4;
                      })
                    })
                  }
                  else {
                    this.serviceContrat.getContratById(data2.idContra).subscribe(contrat => {
                      console.log(contrat);
                      this.prixtotTTC = this.prixtotHT + ((this.prixtotHT * contrat.taxe) / 100);
                      this.serviceF.getFournisseurById(contrat.idF).subscribe(fournisseur => {
                        this.fournisseur = fournisseur;
                      })
                    })
                  }
                  this.montant.push({ code: data2.codeP, quantity: dataM[i].quantityBC, prixBC: dataM[i].prixBC, 
                    taxeProduit: dataM[i].taxeProduit, remiseProduit: dataM[i].remiseProduit, prixTotale: dataM[i].prixTotale,
                    prixTTC: dataM[i].prixTTC });
                  this.source = new LocalDataSource(this.montant);
                });
                this.source= dataM;
              }
            }
          });
      });
  }

  modifierStatus(status: string) {
    this.service.updateBonCommandesByStatus(+this.bonCommande.idBC, status).subscribe(data => {
      this.windowRef.close();
      this.router.navigate(['/pages/achat/refreshBonCommande']);
    }, error => {
      console.log("error");
    });
  }

  close() {
    localStorage.removeItem('e');
    localStorage.removeItem('idBC');

    this.windowRef.close();
  }

  annuler() {
    this.bonCommande.statut = "annulé";
    this.service.updateBonCommandes(this.bonCommande).subscribe(
      data => {
        this.windowRef.close();
        this.router.navigate(['/pages/achat/refreshBonCommande']);
      },
      error => {
        console.log('error');
      });
  }
}

