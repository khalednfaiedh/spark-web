import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf'
import { AdresseLivraison } from '../../../admin/client/adresse-livraison-client/AdresseLivraison.model';
import { AdresseLivraisonClientService } from '../../../admin/client/adresse-livraison-client/service/adresse-livraison-client.service';
import { ClientModel } from '../../../admin/client/client.model';
import { ClientService } from '../../../admin/client/client.service';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { CommandeModel } from '../../commande/commande.model';
import { CommandeService } from '../../commande/commande.service';
import { DemandePrixClientAdresseDeLivraisonService } from '../../demande-prix-client/demande-prix-client-adresse-de-livraison.service';
import { DevisClientModel } from '../../devis-client/devis-client.model';
import { DevisClientService } from '../../devis-client/devis-client.service';
import { EcheanceDePaiementModel } from '../../echeance-de-paiement/echeance-de-paiement-model';
import { EcheanceDePaiementServiceService } from '../../echeance-de-paiement/echeance-de-paiement-service.service';
import { FactureClientModel } from '../../facture/Facture.model';
import { FactureService } from '../../facture/facture.service';
import { QuantityProductService } from '../../quantity-product/quantity-product.service';

import { FactureAvoirService } from '../facture-avoir.service';
import { FactureAvoirModel } from '../FactureAvoir-model';

@Component({
  selector: 'ngx-show-facture-avoir',
  templateUrl: './show-facture-avoir.component.html',
  styleUrls: ['./show-facture-avoir.component.scss']
})
export class ShowFactureAvoirComponent implements OnInit {
  factureAvoir: FactureAvoirModel = new FactureAvoirModel()
  quantiteProducts: any[]
  facture: FactureClientModel = new FactureClientModel()
  client: ClientModel = new ClientModel()
  devis: DevisClientModel = new DevisClientModel()
  commande: CommandeModel = new CommandeModel()
  modePaiement: ModeDePaiementModel = new ModeDePaiementModel()
  conditionPaiement: ConditionDePaiementModel = new ConditionDePaiementModel()
  echeancePaiement: EcheanceDePaiementModel = new EcheanceDePaiementModel()
  referenceclient: string
  adresse: AdresseLivraison = new AdresseLivraison()
  adresses: any[] = []
  @ViewChild('contentToConvert') contentRef: ElementRef;
  constructor(private serviceFA: FactureAvoirService, private serviceQuantityProduct: QuantityProductService,
    private serviceFacture: FactureService, private serviceBC: CommandeService, private serviceDevis: DevisClientService,
    private serviceCLT: ClientService, private serviceModePaiement: ModeDePaiementService, private serviceConditionPaiement: ConditionDePaiementService,
    private serviceEcheancedePaiement: EcheanceDePaiementServiceService,
    private serviceDemandeLivraison: DemandePrixClientAdresseDeLivraisonService,
    private serviceLivraison: AdresseLivraisonClientService, private windowRef: NbWindowRef) { }

  ngOnInit() {
    let idFA = localStorage.getItem('idFactureAvoir')
    this.serviceFA.getFactureAvoirById(+idFA).subscribe(dataFA => {
      this.factureAvoir = dataFA
      console.log("this.factureAvoir", this.factureAvoir)
      this.serviceFacture.getFactureById(this.factureAvoir.code_fac).subscribe(data => {
        this.facture = data
        console.log(data)
        this.serviceBC.getCommandeById(this.facture.code_cmd).subscribe(
          dataCommande => {
            this.commande = dataCommande;
            this.client.code_clt = this.commande.code_clt
            this.referenceclient = "CLT" + this.client.code_clt

            this.serviceCLT.getClientById(+this.client.code_clt).subscribe(
              data1 => {
                this.client = data1;
              },
              error => {
                console.log(error);
              },
            );
            this.serviceDevis.getDevisById(dataCommande.id_devis).subscribe(dataDevis => {
              this.devis = dataDevis
              this.serviceDemandeLivraison.getAdressesbyDemande(this.devis.code_list).subscribe(dataDemande => {
                for (let x = 0; x < dataDemande.length; x++) {
                  this.serviceLivraison.getAdressebyid(dataDemande[x].idLivraison).subscribe(dataL => {
                    this.adresse = dataL;
                    this.adresses.push({
                      "adresse": dataL.adresse,
                      "codePostal": dataL.codePostal,
                      "ville": dataL.ville, "pays": dataL.pays
                    })
                    console.log("data====>", this.adresses)
                  })

                }
              })
            })
            this.serviceModePaiement.getModeDePaiementById(this.factureAvoir.idPaiement).subscribe(dataMP => {
              this.modePaiement = dataMP
            })
            this.serviceConditionPaiement.getConditionById(this.factureAvoir.idConditonement).subscribe(dataC => {
              this.conditionPaiement = dataC
            })
            this.serviceEcheancedePaiement.getEcheancheDePaiementFactureAvoir(this.factureAvoir.code_fac_av).subscribe(dataEP => {
              this.echeancePaiement = dataEP
            })
            this.serviceQuantityProduct.getAllquantityProductFactureAvoir(this.factureAvoir.code_fac_av).subscribe(data => {
              this.quantiteProducts = data
            })
          })
      })


    })
  }

  onclose() {
    this.windowRef.close();
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
      pdf.save('FCTAV' + this.factureAvoir.code_fac_av + "-" + this.facture.code_fac + '.pdf'); // Generated PDF   
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
  close() {
    this.windowRef.close();

  }
}
