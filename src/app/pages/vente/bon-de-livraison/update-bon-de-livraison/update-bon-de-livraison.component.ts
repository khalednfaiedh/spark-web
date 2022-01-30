import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { id } from '@swimlane/ngx-charts/release/utils';
import { LocalDataSource } from 'ng2-smart-table';
import { AdresseLivraisonClientService } from '../../../admin/client/adresse-livraison-client/service/adresse-livraison-client.service';
import { ClientModel } from '../../../admin/client/client.model';
import { ClientService } from '../../../admin/client/client.service';
import { Contact } from '../../../admin/client/contact-client/Contact.model';
import { ContactClientService } from '../../../admin/client/contact-client/service/contact-client.service';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { CommandeService } from '../../commande/commande.service';
import { DemandePrixClientAdresseDeLivraisonService } from '../../demande-prix-client/demande-prix-client-adresse-de-livraison.service';
import { DemandePrixClientAdresseDeLivraisonModel } from '../../demande-prix-client/demande-prix-client-adresses-de-livraison-model';
import { DevisClientModel } from '../../devis-client/devis-client.model';
import { DevisClientService } from '../../devis-client/devis-client.service';
import { EcheanceDePaiementModel } from '../../echeance-de-paiement/echeance-de-paiement-model';
import { EcheanceDePaiementServiceService } from '../../echeance-de-paiement/echeance-de-paiement-service.service';
import { FactureClientModel } from '../../facture/Facture.model';
import { FactureService } from '../../facture/facture.service';
import { BonDeLivraisonClientModel } from '../Bon-de-livraison-client-model';
import { BonDeLivraisonComponent } from '../bon-de-livraison.component';
import { BonDeLivraisonService } from '../service/bon-de-livraison.service';
import { QuantityProductLivreService } from '../service/quantity-product-livre.service';

@Component({
  selector: 'ngx-update-bon-de-livraison',
  templateUrl: './update-bon-de-livraison.component.html',
  styleUrls: ['./update-bon-de-livraison.component.scss']
})
export class UpdateBonDeLivraisonComponent implements OnInit {
  bonLivraison: BonDeLivraisonClientModel = new BonDeLivraisonClientModel()
  quantityProductLivre: any[]
  modeDePaiementDevis: ModeDePaiementModel = new ModeDePaiementModel();
  conditonPaiementDevis: ConditionDePaiementModel = new ConditionDePaiementModel();
  echeancePaiementDevis: EcheanceDePaiementModel = new EcheanceDePaiementModel();
  client: ClientModel = new ClientModel();
  contactClient: Contact = new Contact()
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
  nomcontact: string
  totalquantiteLivre: any;
  constructor(private serviceBonLivraison: BonDeLivraisonService,
    private serviceQuantityLivre: QuantityProductLivreService, private servicefacture: FactureService,
    private serviceCommande: CommandeService,
    private serviceClient: ClientService,
    private serviceContact: ContactClientService,
    private serviceModePaiement: ModeDePaiementService,
    private serviceConditionP: ConditionDePaiementService,
    private serviceDevis: DevisClientService,
    private serviceAdresse: AdresseLivraisonClientService,
    private serviceadresseLivraison: DemandePrixClientAdresseDeLivraisonService,
    private serviceecheancePaiement: EcheanceDePaiementServiceService,
    private toastrService: NbToastrService,
    private router: Router,
    private windowRef: NbWindowRef
  ) { }

  ngOnInit() {
    let idBL = localStorage.getItem('idBL')
    let idFacture = localStorage.getItem('idFacture')
    this.serviceBonLivraison.getBondeLivraisonById(+idBL).subscribe(dataBL => {
      this.bonLivraison = dataBL
      this.servicefacture.getFactureById(dataBL.code_fac).subscribe(dataFacture => {
        this.facture = dataFacture;
        this.referencefacture = "FCT" + this.facture.code_fac
        this.serviceCommande.getCommandeById(this.facture.code_cmd).subscribe(dataCommande => {
          this.referencecommande = "CMD" + dataCommande.code_cmd;
          this.serviceClient.getClientById(dataCommande.code_clt).subscribe(dataClient => {
            this.client = dataClient
            this.referenceclient = "CLT" + this.client.code_clt
            this.serviceContact.getContact(dataBL.idContact).subscribe(dataContact => {
              this.contactClient = dataContact
              this.nomcontact = this.contactClient.nom + " " + " " + this.contactClient.prenom + ":" + this.contactClient.fonction
            })
          })

          this.serviceadresseLivraison.getAdressesbyBonLivraison(+idBL).subscribe(dataAL => {
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
          this.serviceDevis.getDevisById(dataCommande.id_devis).subscribe(dataDevis => {
            this.devis = dataDevis
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
        })
        this.serviceQuantityLivre.getAllQuantityProductLivreBonDeLivraison(this.bonLivraison.id).subscribe(dataQPL => {
          this.source = new LocalDataSource(dataQPL)
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
        delete: false,
        edit: false,
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

        quantiteLivre: {
          title: 'Quantité livré',
          type: 'number',
          filter: true
        },
        quantiteReste: {
          title: 'Quantité reste',
          type: 'number',
          filter: true,

        }
      }
    }

  }
  ModifierBC() {
    let idBL = localStorage.getItem('idBL')
    this.bonLivraison.code_fac = this.bonLivraison.code_fac
    this.serviceBonLivraison.updateBonDeLivraison(this.bonLivraison, +idBL).subscribe(dataBL => {
      this.bonLivraison = dataBL
    })
    localStorage.removeItem('e');
    localStorage.removeItem('idBL');
    this.showToast(NbToastStatus.SUCCESS, "Bon de livraison", "est modifier avec succéss")
    this.router.navigate([BonDeLivraisonComponent.urlBonLivraison]);
    this.windowRef.close();
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

