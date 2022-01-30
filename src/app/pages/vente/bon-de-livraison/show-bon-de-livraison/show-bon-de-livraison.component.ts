import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import html2canvas from 'html2canvas';
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
import { BonDeLivraisonService } from '../service/bon-de-livraison.service';
import { QuantityProductLivreService } from '../service/quantity-product-livre.service';
import * as jspdf from 'jspdf'
@Component({
  selector: 'ngx-show-bon-de-livraison',
  templateUrl: './show-bon-de-livraison.component.html',
  styleUrls: ['./show-bon-de-livraison.component.scss']
})
export class ShowBonDeLivraisonComponent implements OnInit {
  @ViewChild('contentToConvert') contentRef: ElementRef;
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
  referenceBL: string;
  nomcontact: string
  totalquantiteLivre: any;
  constructor(private serviceBonLivraison: BonDeLivraisonService,
    private serviceQuantityLivre: QuantityProductLivreService, private servicefacture: FactureService,
    private serviceCommande: CommandeService,
    private serviceClient: ClientService,
    private serviceContact: ContactClientService,
    private serviceAdresse: AdresseLivraisonClientService,
    private serviceadresseLivraison: DemandePrixClientAdresseDeLivraisonService,

    private router: Router,
    private windowRef: NbWindowRef
  ) { }

  ngOnInit() {
    let idBL = localStorage.getItem('idBL')
    let idFacture = localStorage.getItem('idFacture')
    this.serviceBonLivraison.getBondeLivraisonById(+idBL).subscribe(dataBL => {
      this.bonLivraison = dataBL
      this.referenceBL = "LVR" + this.bonLivraison.id
      this.servicefacture.getFactureById(+idFacture).subscribe(dataF => {
        this.facture = dataF
        this.referencefacture = "FCT" + this.facture.code_fac
        this.serviceCommande.getCommandeById(this.facture.code_cmd).subscribe(dataC => {
          this.referencecommande = "CMD" + dataC.code_cmd
          this.serviceClient.getClientById(dataC.code_clt).subscribe(dataCL => {
            this.client = dataCL
            this.referenceclient = "CLT" + dataCL.id
          })
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
      this.serviceContact.getContact(this.bonLivraison.idContact).subscribe(dataContact => {
        this.contactClient = dataContact
      })
      this.serviceQuantityLivre.getAllQuantityProductLivreBonDeLivraison(this.bonLivraison.id).subscribe(dataQL => {
        this.quantityProductLivre = dataQL
      })
    })
  }
  captureScreen() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 200;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      let pdf1 = new jspdf()
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 5, 10, imgWidth, imgHeight)
      pdf.save('LVR' + this.bonLivraison.id + '.pdf'); // Generated PDF   
    });
  }

  downloadPDF() {
    let doc = new jspdf();
    let specialElementHandler = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    var content = this.contentRef.nativeElement;
    doc.fromHTML(content.innerHtml, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandler
    });
    doc.save('test.pdf')
  }
}
