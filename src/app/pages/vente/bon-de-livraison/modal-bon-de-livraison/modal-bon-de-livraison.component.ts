import { Component, OnInit } from '@angular/core';
import { BonDeLivraisonClientModel } from '../Bon-de-livraison-client-model';
import { QuantityProductClientLivreModel } from '../quantity-product-livre-client-model';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { EcheanceDePaiementModel } from '../../echeance-de-paiement/echeance-de-paiement-model';
import { BonDeLivraisonService } from '../service/bon-de-livraison.service';
import { QuantityProductLivreService } from '../service/quantity-product-livre.service';
import { QuantityProductModel } from '../../quantity-product/quantity-product-model';
import { FactureService } from '../../facture/facture.service';
import { ClientService } from '../../../admin/client/client.service';
import { ClientModel } from '../../../admin/client/client.model';
import { Contact } from '../../../admin/client/contact-client/Contact.model';
import { ContactClientService } from '../../../admin/client/contact-client/service/contact-client.service';
import { FactureClientModel } from '../../facture/Facture.model';
import { DevisClientService } from '../../devis-client/devis-client.service';
import { CommandeService } from '../../commande/commande.service';
import { QuantityClientService } from '../../demande-prix-client/quantity-client.service';
import { QuantityProductService } from '../../quantity-product/quantity-product.service';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { EcheanceDePaiementServiceService } from '../../echeance-de-paiement/echeance-de-paiement-service.service';
import { LocalDataSource } from 'ng2-smart-table';
import { CommandeModel } from '../../commande/commande.model';
import { DemandePrixClientAdresseDeLivraisonService } from '../../demande-prix-client/demande-prix-client-adresse-de-livraison.service';
import { DevisClientModel } from '../../devis-client/devis-client.model';
import { AdresseLivraison } from '../../../admin/client/adresse-livraison-client/AdresseLivraison.model';
import { AdresseLivraisonClientService } from '../../../admin/client/adresse-livraison-client/service/adresse-livraison-client.service';
import { DemandePrixClientAdresseDeLivraisonModel } from '../../demande-prix-client/demande-prix-client-adresses-de-livraison-model';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { DevisClientComponent } from '../../devis-client/devis-client.component';
import { BonDeLivraisonComponent } from '../bon-de-livraison.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';


@Component({
  selector: 'ngx-modal-bon-de-livraison',
  templateUrl: './modal-bon-de-livraison.component.html',
  styleUrls: ['./modal-bon-de-livraison.component.scss']
})
export class ModalBonDeLivraisonComponent implements OnInit {
  bonLivraison: BonDeLivraisonClientModel = new BonDeLivraisonClientModel();
  quantityProductLivre: QuantityProductClientLivreModel = new QuantityProductClientLivreModel();
  quantityProducts: any[];
  quantityProductLivres: any[];
  liste: any[] = []
  modeDePaiementDevis: ModeDePaiementModel = new ModeDePaiementModel();
  conditonPaiementDevis: ConditionDePaiementModel = new ConditionDePaiementModel();
  echeancePaiementDevis: EcheanceDePaiementModel = new EcheanceDePaiementModel();
  client: ClientModel = new ClientModel();
  contactClient: Contact[]
  adressesLivraison: DemandePrixClientAdresseDeLivraisonModel[]
  facture: FactureClientModel = new FactureClientModel();
  devis: DevisClientModel = new DevisClientModel();

  adresses: any[] = []
  listasdresseDemande: DemandePrixClientAdresseDeLivraisonModel[]
  demandePrixAdresse: DemandePrixClientAdresseDeLivraisonModel = new DemandePrixClientAdresseDeLivraisonModel()
  source: LocalDataSource = new LocalDataSource();
  settings: any
  quantityReste: number;
  referenceclient: string;
  referencecommande: string;
  referencefacture: string;
  quatitytot: number
  totalquantiteLivre: any;
  constructor(private serviceBonLivraison: BonDeLivraisonService,
    private servicequantityProductLivre: QuantityProductLivreService,
    private servicequantityProduct: QuantityProductService,
    private servicefacture: FactureService,
    private serviceCommande: CommandeService,
    private serviceClient: ClientService,
    private serviceContact: ContactClientService,
    private serviceModePaiement: ModeDePaiementService,
    private serviceConditionP: ConditionDePaiementService,
    private serviceDevis: DevisClientService,
    private serviceAdresse: AdresseLivraisonClientService,
    private serviceadresseLivraison: DemandePrixClientAdresseDeLivraisonService,
    private serviceecheancePaiement: EcheanceDePaiementServiceService,
    private serviceDMDAdresses: DemandePrixClientAdresseDeLivraisonService,
    private toastrService: NbToastrService,
    public windowRef: NbWindowRef,
    private router: Router,
  ) { }

  ngOnInit() {
    let idFacture = localStorage.getItem('idFacture');
    this.servicefacture.getFactureById(+idFacture).subscribe(dataFacture => {
      this.facture = dataFacture;
      this.referencefacture = "FCT" + this.facture.code_fac
      this.serviceCommande.getCommandeById(this.facture.code_cmd).subscribe(dataCommande => {
        this.referencecommande = "CMD" + dataCommande.code_cmd;
        this.serviceClient.getClientById(dataCommande.code_clt).subscribe(dataClient => {
          this.client = dataClient
          this.referenceclient = "CLT" + this.client.code_clt
          this.serviceContact.getContactClient(this.client.code_clt).subscribe(dataContact => {
            this.contactClient = dataContact
          })
        })
        this.serviceDevis.getDevisById(dataCommande.id_devis).subscribe(dataDevis => {
          this.devis = dataDevis
          this.serviceadresseLivraison.getAdressesbyDemande(dataDevis.code_list).subscribe(dataAL => {
            console.log("dataAL", dataAL)
            this.listasdresseDemande = dataAL
            for (let i = 0; i < dataAL.length; i++) {

              this.serviceAdresse.getAdressebyid(dataAL[i].idLivraison).subscribe(dataAdresse => {
                this.adresses.push({
                  "id": dataAdresse.id,
                  "adresse": dataAdresse.adresse,
                  "ville": dataAdresse.ville,
                  "codePostal": dataAdresse.codePostal,
                  "pays": dataAdresse.pays
                })

              })
            }
          })
          this.serviceModePaiement.getModeDePaiementById(this.devis.idpaiement).subscribe(dataMP => {
            this.modeDePaiementDevis = dataMP
          })
          this.serviceConditionP.getConditionById(this.devis.idConditionpaiement).subscribe(dataCP => {
            this.conditonPaiementDevis = dataCP
          })
          this.serviceecheancePaiement.getEcheancheDePaiementDevis(dataCommande.id_devis).subscribe(dataEP => {
            this.echeancePaiementDevis = dataEP
          })
        })
        this.servicequantityProduct.getAllquantityProductDevisLivre(dataCommande.id_devis).subscribe(dataQP => {
          this.quantityProducts = dataQP
          console.log('dataQP ', dataQP)
          for (let i = 0; i < this.quantityProducts.length; i++) {
            if (this.quantityProducts[i].quantitytot != this.quantityProducts[i].quantityLivre) {
              this.liste.push({
                "idProduct": this.quantityProducts[i].idProduct,
                "designation": this.quantityProducts[i].designation,
                "code": this.quantityProducts[i].code,
                "quantitytot": this.quantityProducts[i].quantitytot,
                "quantityLivre": this.quantityProducts[i].quantityLivre,
                "quantiteLivre": 0,
                "quantiteReste": this.quantityProducts[i].quantiteReste
              })
            }
          }

          this.source = new LocalDataSource(this.liste);
        })


      })




    })

    this.settings = {
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      edit: {
        editButtonContent: '<i class="nb-plus"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
        mode: "inline"
      },
      actions: {
        add: false,
        delete: true,
        position: 'right',

      },


      columns: {

        code: {
          title: 'Code',
          type: 'string',
          filter: true,
          editable: false,
          addable: false,
        },
        designation: {
          title: 'Designation',
          type: 'string',
          filter: true,
          editable: false,
          addable: false,
        },

        quantitytot: {
          title: 'Quantité désirée',
          type: 'number',
          filter: true
        },
        quantityLivre: {
          title: 'Quantité déja livré',
          type: 'number',
          filter: true
        },
        quantiteLivre: {
          title: 'Quantité livré',
          type: 'number',
          filter: true
        },
        quantiteReste: {
          title: 'Quantité reste',
          type: 'number',
          filter: true,
          valuePrepareFunction(cell, row) {
            return row.quantiteReste = row.quantitytot - row.quantityLivre

          }
        }
      }
    }
  }
  show(event) {
    event.confirm.resolve()
    let t = 0;
    for (let i = 0; i < this.liste.length; i++) {
      if (this.liste[i].idProduct == event.newData.idProductLivre) {
        this.liste[i].quantiteLivre = +(event.newData.quantiteLivre)
        this.liste[i].quantitetot = event.newData.quantitetot
        this.liste[i].quantiteReste = +(event.newData.quantiteReste)
        this.liste[i].quantityLivre = event.newData.quantityLivre
        t = 1
        break
      }
    }
    if (t == 0) {

      this.liste.push({
        "idProduct": event.newData.idProduct,
        "designation": event.newData.designation,
        "quantiteLivre": (+event.newData.quantiteLivre),
        "code": event.newData.code,
        "quantitytot": event.newData.quantitytot,
        "quantityLivre": event.newData.quantityLivre,
        "quantityReste": +(event.newData.quantitytot - event.newData.quantityLivre)
      })


    }
  }
  onDeleteConfirm(event) {
    if (window.confirm(`Vous êtes sure de supprimer ce produit?`)) {
      event.confirm.resolve(this.liste = this.liste.filter(item => item !== event.data));

      this.source = new LocalDataSource(this.liste);
    } else {
      event.confirm.reject();
    }
  }
  addBonLivraison() {
    for (let i = 0; i < this.contactClient.length; i++) {
      this.bonLivraison.idContact = this.contactClient[i].id;
    }

    this.bonLivraison.code_fac = this.facture.code_fac
    this.bonLivraison.datecreation = new Date();
    this.serviceBonLivraison.addBondeLivraison(this.bonLivraison).subscribe(dataBL => {
      this.bonLivraison = dataBL
      for (let j = 0; j < this.adresses.length; j++) {
        this.demandePrixAdresse.idAdresseLivraison = this.listasdresseDemande[j].idAdresseLivraison

        this.serviceDMDAdresses.addDemandePrixAdressesBonLivraison(dataBL.id, this.demandePrixAdresse).subscribe(dataABL => {
          this.demandePrixAdresse = dataABL
        })
      }
      for (let j = 0; j < this.liste.length; j++) {
        this.quantityReste = this.liste[j].quantitytot - this.liste[j].quantiteLivre
        console.log("quantityReste", this.quantityReste)

        this.quantityProductLivre = {
          "idQuantityProductLivre": 0, "idProduct": this.liste[j].idProduct,
          "quantiteLivre": this.liste[j].quantiteLivre, "quantiteReste": this.quantityReste, "idBonLivraison": this.bonLivraison.id
        }
        this.servicequantityProductLivre.addQuantityProductLivre(this.quantityProductLivre).subscribe(data => { this.quantityProductLivre = data })
      }

      localStorage.removeItem('e');
      localStorage.removeItem('idFacture');
      this.showToast(NbToastStatus.SUCCESS, "Bon de livraison", "est ajouter avec succéss")
      this.router.navigate([BonDeLivraisonComponent.urlBonLivraison]);
      this.windowRef.close();
    })
  }
  onclose() {
    this.windowRef.close();
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
