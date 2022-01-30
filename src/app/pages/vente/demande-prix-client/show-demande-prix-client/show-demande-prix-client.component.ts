import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DemandePrixClientModel } from '../demande-prix-client.model';
import { Router } from '@angular/router';
import { NbDateService, NbWindowRef, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { DemandePrixClientService } from '../demande-prix-client.service';
import { DatePipe } from '@angular/common';
import * as jspdf from 'jspdf'
import html2canvas from 'html2canvas';
import { ClientModel } from '../../../admin/client/client.model';
import { ClientService } from '../../../admin/client/client.service';
import { ProductService } from '../../../admin/product/product.service';
import { AdresseLivraisonClientService } from '../../../admin/client/adresse-livraison-client/service/adresse-livraison-client.service';
import { AdresseLivraison } from '../../../admin/client/adresse-livraison-client/AdresseLivraison.model';
import { ModeDePaiementService } from '../../../admin/mode-de-paiement/service/mode-de-paiement.service';
import { ConditionDePaiementService } from '../../../admin/condition-de-paiement/condition-de-paiement.service';
import { ModeDePaiementModel } from '../../../admin/mode-de-paiement/mode-de-paiement-model';
import { ConditionDePaiementModel } from '../../../admin/condition-de-paiement/condition-de-paiement-model';
import { DemandePrixClientAdresseDeLivraisonService } from '../demande-prix-client-adresse-de-livraison.service';



@Component({
  selector: 'ngx-show-demande-prix-client',
  templateUrl: './show-demande-prix-client.component.html',
  styleUrls: ['./show-demande-prix-client.component.scss']
})

export class ShowDemandePrixClientComponent implements OnInit {

  source: LocalDataSource;
  e = localStorage.getItem('e');
  id = localStorage.getItem('idRC');
  @ViewChild('contentToConvert') contentRef: ElementRef;
  referenceclient: string
  demandeprix: DemandePrixClientModel = new DemandePrixClientModel();
  client: ClientModel = new ClientModel();
  modePaiement: ModeDePaiementModel = new ModeDePaiementModel();
  condition: ConditionDePaiementModel = new ConditionDePaiementModel();
  adresse: AdresseLivraison = new AdresseLivraison();
  liste: any[] = []
  quantitys: any = []
  adresses: any[] = []
  constructor(private router: Router,
    protected dateService: NbDateService<Date>,
    public windowRef: NbWindowRef,
    public serviceCLT: ClientService,
    private serviceDP: DemandePrixClientService,
    private serviceDemandeLivraison: DemandePrixClientAdresseDeLivraisonService,
    private serviceLivraison: AdresseLivraisonClientService,
    private servicemodePaiement: ModeDePaiementService,
    private serviceCondition: ConditionDePaiementService,
    private toastrService: NbToastrService,
    private serviceP: ProductService,
    public datepipe: DatePipe) { }


  settings = {

    actions: {
      edit: false,
      add: false,
      delete: false,
      position: 'right',
    },
    columns: {
      code: {
        title: 'Code de produit',
        type: 'number',
        filter: true,
        editable: false,
        addable: false,
      },
      designation: {
        title: 'Produit',
        type: 'string',
        filter: true,
        editable: false,
        addable: false,
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
        filter: false,
      },
    },
  };

  ngOnInit() {
    this.serviceDP.getDemandePrixById(+this.id).subscribe(
      data => {
        this.demandeprix = data
        console.log("demande de prix:", this.demandeprix)
        this.serviceCLT.getClientById(this.demandeprix.code_clt).subscribe(
          data => { this.client = data })

        this.serviceDemandeLivraison.getAdressesbyDemande(this.demandeprix.iddp).subscribe(dataDemande => {
          console.log("get addres by demande====>", dataDemande)

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

        this.servicemodePaiement.getModeDePaiementById(this.demandeprix.idPaiement).subscribe(
          data => { this.modePaiement = data }
        );
        if (this.demandeprix.idConditionPaiement != null) {
          this.serviceCondition.getConditionById(this.demandeprix.idConditionPaiement).subscribe(
            data => { this.condition = data }
          );
        }

        for (let i = 0; i < data.quantity.length; i++) {
          this.serviceP.getProductById(data.quantity[i].idProduct).subscribe(
            data2 => {
              this.quantitys.push({ "code": data2.code, "designation": data2.designation, "quantity": data.quantity[i].quantity })
              this.source = new LocalDataSource(this.quantitys);
            })
        }
      },
      error => {
        console.log(error);
      },
    );
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
}


