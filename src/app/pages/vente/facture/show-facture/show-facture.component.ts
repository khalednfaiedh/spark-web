import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FactureService } from '../facture.service';
import { CommandeService } from '../../commande/commande.service';
import { CommandeModel } from '../../commande/commande.model';
import { LocalDataSource } from 'ng2-smart-table';
import { NbWindowRef } from '@nebular/theme';
import * as jspdf from 'jspdf'
import { ClientModel } from '../../../admin/client/client.model';
import { ClientService } from '../../../admin/client/client.service';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { EcheanceDePaiementModel } from '../../echeance-de-paiement/echeance-de-paiement-model';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { EcheanceDePaiementServiceService } from '../../echeance-de-paiement/echeance-de-paiement-service.service';
import { QuantityProductService } from '../../quantity-product/quantity-product.service';
import { DevisClientService } from '../../devis-client/devis-client.service';
import { FactureClientModel } from '../Facture.model';
import { DevisClientModel } from '../../devis-client/devis-client.model';
import { QuantityProductModel } from '../../quantity-product/quantity-product-model';
import html2canvas from 'html2canvas';
import { AdresseLivraisonClientService } from '../../../admin/client/adresse-livraison-client/service/adresse-livraison-client.service';
import { DemandePrixClientAdresseDeLivraisonService } from '../../demande-prix-client/demande-prix-client-adresse-de-livraison.service';
import { AdresseLivraison } from '../../../admin/client/adresse-livraison-client/AdresseLivraison.model';

@Component({
  selector: 'ngx-show-facture',
  templateUrl: './show-facture.component.html',
  styleUrls: ['./show-facture.component.scss']
})
export class ShowFactureComponent implements OnInit {
  ttc: number;
  e = localStorage.getItem('e');
  id = localStorage.getItem('idRC');
  facture: FactureClientModel = new FactureClientModel();
  devis: DevisClientModel = new DevisClientModel()
  commande: CommandeModel = new CommandeModel()
  client: ClientModel = new ClientModel();
  article: any[] = []
  referenceclient: string;
  source: LocalDataSource;
  quantityProducts: QuantityProductModel[]
  modePaiement: ModeDePaiementModel = new ModeDePaiementModel()
  conditionPaiement: ConditionDePaiementModel = new ConditionDePaiementModel()
  echeancePaiement: EcheanceDePaiementModel = new EcheanceDePaiementModel();
  adresse: AdresseLivraison = new AdresseLivraison()
  adresses: any[] = []
  @ViewChild('contentToConvert') contentRef: ElementRef;
  constructor(
    private serviceFacture: FactureService,
    private serviceBC: CommandeService,
    private serviceCLT: ClientService,
    private serviceDevis: DevisClientService,
    private serviceModePaiement: ModeDePaiementService,
    private serviceConditionPaiement: ConditionDePaiementService,
    private serviceEcheanceDePaiement: EcheanceDePaiementServiceService,
    private serviceQuantityProduct: QuantityProductService,
    private serviceDemandeLivraison: DemandePrixClientAdresseDeLivraisonService,
    private serviceLivraison: AdresseLivraisonClientService,
    public windowRef: NbWindowRef,) { }

  ngOnInit() {
    this.serviceFacture.getFactureById(+this.id).subscribe(data => {
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
            this.serviceModePaiement.getModeDePaiementById(this.devis.idpaiement).subscribe(dataModeP => {
              this.modePaiement = dataModeP
              console.log("dataModeP", dataModeP)

            })
            this.serviceConditionPaiement.getConditionById(this.devis.idConditionpaiement).subscribe(dataCP => {
              this.conditionPaiement = dataCP
            })
            this.serviceEcheanceDePaiement.getEcheancheDePaiementDevis(this.devis.id_devis).subscribe(dataEP => {
              this.echeancePaiement = dataEP
            })
          })
          this.serviceQuantityProduct.getAllquantityProductDevis(dataCommande.id_devis).subscribe(dataQP => {
            this.quantityProducts = dataQP
          })
        },
        error => {
          console.log(error);
        },
      );
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
      pdf.save('FCT' + this.facture.code_fac + '.pdf'); // Generated PDF   
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

