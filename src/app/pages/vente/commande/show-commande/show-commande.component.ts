import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { CommandeModel } from '../commande.model'
import { LocalDataSource } from 'ng2-smart-table';
import { NbDateService } from '@nebular/theme';
import { CommandeService } from '../commande.service';

import * as jspdf from 'jspdf'
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
import { ClientModel } from '../../../admin/client/client.model';
import { ProductModel } from '../../../admin/product/product.model';
import { ClientService } from '../../../admin/client/client.service';
import { DevisClientModel } from '../../devis-client/devis-client.model';
import { DevisClientService } from '../../devis-client/devis-client.service';
import { QuantityProductService } from '../../quantity-product/quantity-product.service';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { EcheanceDePaiementServiceService } from '../../echeance-de-paiement/echeance-de-paiement-service.service';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { EcheanceDePaiementModel } from '../../echeance-de-paiement/echeance-de-paiement-model';
import { QuantityProductModel } from '../../quantity-product/quantity-product-model';
import { DemandePrixClientAdresseDeLivraisonService } from '../../demande-prix-client/demande-prix-client-adresse-de-livraison.service';
import { AdresseLivraisonClientService } from '../../../admin/client/adresse-livraison-client/service/adresse-livraison-client.service';

import { AdresseLivraison } from '../../../admin/client/adresse-livraison-client/AdresseLivraison.model';



@Component({
  selector: 'ngx-show-commande',
  templateUrl: './show-commande.component.html',
  styleUrls: ['./show-commande.component.scss']
})
export class ShowCommandeComponent implements OnInit {
  ttc: number = 0;
  ARCM: string;
  source: LocalDataSource;
  e = localStorage.getItem('e');
  code_cmd = localStorage.getItem('idCommande');
  commande = new CommandeModel();
  devis: DevisClientModel = new DevisClientModel();
  reference = "Cmd" + this.code_cmd;
  referenceclient: string;
  quantityProductModel: QuantityProductModel[] = [];
  client: ClientModel = new ClientModel();
  addProductList: ProductModel[] = [];
  modePaiement: ModeDePaiementModel = new ModeDePaiementModel()
  conditionPaiement: ConditionDePaiementModel = new ConditionDePaiementModel()
  echeancePaiement: EcheanceDePaiementModel = new EcheanceDePaiementModel();
  adresse: AdresseLivraison
  adresses: any[] = []
  @ViewChild('contentToConvert') contentRef: ElementRef;

  constructor(private router: Router,
    protected dateService: NbDateService<Date>,
    public windowRef: NbWindowRef,
    public service: CommandeService,
    private serviceCLT: ClientService,
    private serviceDevis: DevisClientService,
    private servicequantityProduct: QuantityProductService,
    private serviceModePaiement: ModeDePaiementService,
    private serviceConditionPaiement: ConditionDePaiementService,
    private serviceEcheanceDePaiement: EcheanceDePaiementServiceService,
    private serviceDemandeLivraison: DemandePrixClientAdresseDeLivraisonService,
    private serviceLivraison: AdresseLivraisonClientService,

    public datepipe: DatePipe,
  ) { }
  today = new Date()
  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

  close() {
    this.windowRef.close();
  }

  onCustom(event) {
  }

  onSaveConfirm(event) {
  }

  ngOnInit() {
    this.service.getCommandeById(+this.code_cmd).subscribe(datacommande => {
      this.commande = datacommande;
      console.log("idC==>", datacommande.code_cmd)
      /* this.source = new LocalDataSource(commande.quantityProducts)
       commande.quantityProducts.forEach(element => {
         this.ttc += element.prix_tot
       });
       this.ttc = this.ttc + ((this.ttc * commande.taxe) / 100)*/
      this.serviceDevis.getDevisById(datacommande.id_devis).subscribe(dataDevis => {
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
          console.log("dataP", dataModeP)
        })
        this.serviceConditionPaiement.getConditionById(this.devis.idConditionpaiement).subscribe(dataCP => {
          this.conditionPaiement = dataCP
        })
        this.serviceEcheanceDePaiement.getEcheancheDePaiementDevis(this.devis.id_devis).subscribe(dataEP => {
          this.echeancePaiement = dataEP
        })
        this.servicequantityProduct.getAllquantityProductDevis(this.devis.id_devis).subscribe(dataQuantityProduct => {
          this.quantityProductModel = dataQuantityProduct
        })
      })
      this.serviceCLT.getClientById(datacommande.code_clt).subscribe(dataclient => {
        this.client = dataclient
      })

    })

  }
  /* settings = {
 
 
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
   };*/

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
      pdf.save(this.client.nameC + '.pdf'); // Generated PDF   
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
  annuler() {
    let statut = "annulée"
    this.service.updateCommandeStatut(statut, this.commande.code_cmd).subscribe(data => {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      this.windowRef.close();
      this.router.navigate(['/pages/refreshCommande']);

    });
  }
}