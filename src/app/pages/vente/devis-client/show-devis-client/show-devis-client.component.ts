import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DevisClientModel } from '../devis-client.model';
import { DemandePrixClientModel } from '../../demande-prix-client/demande-prix-client.model';
import { NbDateService, NbWindowRef } from '@nebular/theme';
import { DevisClientService } from '../devis-client.service';
import { DemandePrixClientService } from '../../demande-prix-client/demande-prix-client.service';
import * as jspdf from 'jspdf'
import html2canvas from 'html2canvas';
import { ClientModel } from '../../../admin/client/client.model';
import { ProductModel } from '../../../admin/product/product.model';
import { ClientService } from '../../../admin/client/client.service';
import { QuantityProductService } from '../../quantity-product/quantity-product.service';
import { TarifsDeVentesService } from '../../tarifs-de-vente/service/tarifs-de-ventes.service';
import { TarifsDeVenteModel } from '../../tarifs-de-vente/tarifs-de-vente.model';
import { QuantityProductModel } from '../../quantity-product/quantity-product-model';
import { QuantityClientService } from '../../demande-prix-client/quantity-client.service';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { EcheanceDePaiementServiceService } from '../../echeance-de-paiement/echeance-de-paiement-service.service';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { EcheanceDePaiementModel } from '../../echeance-de-paiement/echeance-de-paiement-model';
import { AdresseLivraison } from '../../../admin/client/adresse-livraison-client/AdresseLivraison.model';
import { DemandePrixClientAdresseDeLivraisonService } from '../../demande-prix-client/demande-prix-client-adresse-de-livraison.service';
import { AdresseLivraisonClientService } from '../../../admin/client/adresse-livraison-client/service/adresse-livraison-client.service';
@Component({
  selector: 'ngx-show-devis-client',
  templateUrl: './show-devis-client.component.html',
  styleUrls: ['./show-devis-client.component.scss']
})
export class ShowDevisClientComponent implements OnInit {

  ARCM: string;
  source: LocalDataSource;
  e = localStorage.getItem('e');
  id = localStorage.getItem('idRC');
  devis = new DevisClientModel();
  reference = "DVS" + this.id;
  referenceclient: string;
  quantitys: any[];
  quantityProductModel: any[];
  client: ClientModel = new ClientModel();
  tarifs: TarifsDeVenteModel = new TarifsDeVenteModel();
  addProductList: ProductModel[] = [];
  demandeprix: DemandePrixClientModel = new DemandePrixClientModel();
  modePaiement: ModeDePaiementModel = new ModeDePaiementModel()
  conditionPaiement: ConditionDePaiementModel = new ConditionDePaiementModel()
  echeancePaiement: EcheanceDePaiementModel = new EcheanceDePaiementModel();
  adresse: AdresseLivraison = new AdresseLivraison();
  adresses: any[] = []
  @ViewChild('contentToConvert') contentRef: ElementRef;

  constructor(
    protected dateService: NbDateService<Date>,
    public windowRef: NbWindowRef,
    public service: DevisClientService,
    private serviceCLT: ClientService,
    private sercicePrix: DemandePrixClientService,
    private servicequantityProduct: QuantityProductService,
    private serviceModePaiement: ModeDePaiementService,
    private serviceConditionPaiement: ConditionDePaiementService,
    private serviceEcheanceDePaiement: EcheanceDePaiementServiceService,
    private serviceDemandeLivraison: DemandePrixClientAdresseDeLivraisonService,
    private serviceLivraison: AdresseLivraisonClientService,
  ) { }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

  settings = {


    actions: {
      edit: false,
      add: false,

      delete: false,
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
      prix_unit: {
        title: 'Prix Unitaire',
        type: 'number',
        valuePrepareFunction(cell, row) {
          row.prix_unit = row.prix_unit.prix_unit
          //this.p=row.prix_tot
          return (row.prix_unit)
        }
      },
      quantity: {
        title: 'Quantité',
        type: 'number',
        filter: false,
      },
      prix_tot: {
        title: 'Prix Total',
        type: 'number',
        filter: false,
      },
    },
  };

  ngOnInit() {
    this.service.getDevisById(+this.id).subscribe(
      data => {
        this.devis = data;
        this.sercicePrix.getDemandePrixById(+this.devis.code_list).subscribe(
          data2 => {
            this.demandeprix = data2;
            this.serviceCLT.getClientById(+this.demandeprix.code_clt).subscribe(
              data1 => {
                this.client = data1;
              },
              error => {
                console.log(error);
              },
            );
            this.referenceclient = "Clt" + data2.code_clt
            this.serviceDemandeLivraison.getAdressesbyDemande(this.demandeprix.iddp).subscribe(dataDemande => {
              console.log("demdAdre====>", dataDemande)

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
              console.log("dataP", dataModeP)
            })
            this.serviceConditionPaiement.getConditionById(this.devis.idConditionpaiement).subscribe(dataCP => {
              this.conditionPaiement = dataCP
            })
            this.serviceEcheanceDePaiement.getEcheancheDePaiementDevis(this.devis.id_devis).subscribe(dataEP => {
              this.echeancePaiement = dataEP
            })

          },
          error => {
            console.log(error);
          },
        );

        this.source = new LocalDataSource(data.quantityProducts);
      },
      error => {
        console.log(error);
      },
    );

    this.servicequantityProduct.getAllquantityProductDevis(+this.id).subscribe(dataQuantityProduct => {
      this.quantityProductModel = dataQuantityProduct
    })

  }

  close() {
    this.windowRef.close();
  }

  onCustom(event) {
  }

  onSaveConfirm(event) {
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
      pdf.save('DVS' + this.devis.id_devis + '.pdf'); // Generated PDF   
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
