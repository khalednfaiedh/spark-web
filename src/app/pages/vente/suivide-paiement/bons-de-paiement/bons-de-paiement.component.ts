import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import html2canvas from 'html2canvas';
import { ClientModel } from '../../../admin/client/client.model';
import { ClientService } from '../../../admin/client/client.service';
import { CommandeService } from '../../commande/commande.service';
import { FactureService } from '../../facture/facture.service';
import { SuiviDePaiementService } from '../suivi-de-paiement.service';
import * as jspdf from 'jspdf'
@Component({
  selector: 'ngx-bons-de-paiement',
  templateUrl: './bons-de-paiement.component.html',
  styleUrls: ['./bons-de-paiement.component.scss']
})
export class BonsDePaiementComponent implements OnInit {
  client: ClientModel = new ClientModel()
  suiviPaiement: any = new Object()
  referenceFacture: string;
  test: string
  @ViewChild('contentToConvert') contentRef: ElementRef;
  constructor(private serviceSP: SuiviDePaiementService, private windowService: NbWindowRef,
    public windowRef: NbWindowRef,
    private serviceFacture: FactureService, private serviceCommande: CommandeService, private serviceClient: ClientService
  ) { }

  ngOnInit() {
    let idSP = localStorage.getItem('idSP');
    this.serviceSP.getSuiviPaiementById(+idSP).subscribe(dataSP => {
      this.suiviPaiement = dataSP
      this.referenceFacture = "FCT" + this.suiviPaiement.code_fac;
      this.serviceFacture.getFactureById(this.suiviPaiement.code_fac).subscribe(dataF => {
        this.serviceCommande.getCommandeById(dataF.code_cmd).subscribe(dataC => {
          this.serviceClient.getClientById(dataC.code_clt).subscribe(dataCLT => {
            this.client = dataCLT
          })
        })
      })

    })
  }

  onclose() {
    this.windowService.close();
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
      pdf.save("Bons de paiement " + this.suiviPaiement.id + '.pdf'); // Generated PDF   
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
