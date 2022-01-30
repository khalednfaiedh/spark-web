import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ContratClientService } from '../contrat-client.service';
import { LocalDataSource } from 'ng2-smart-table';
import * as jspdf from 'jspdf'
import html2canvas from 'html2canvas';
import { ClientModel } from '../../../admin/client/client.model';
import { ClientService } from '../../../admin/client/client.service';

@Component({
  selector: 'ngx-show-contrat-client',
  templateUrl: './show-contrat-client.component.html',
  styleUrls: ['./show-contrat-client.component.scss']
})
export class ShowContratClientComponent implements OnInit {

  contrat: any = new Object();
  source: LocalDataSource = new LocalDataSource();
  idContrat = localStorage.getItem("idContrat");
  prixTotal: number = 0;
  prixTTC: number = 0;
  client: ClientModel = new ClientModel();
  dateDebut: any;
  dateFin: any;
  @ViewChild('contentToConvert') contentRef: ElementRef;


  constructor(
    private serviceCLT: ClientService,
    public windowRef: NbWindowRef,
    private serviceContrat: ContratClientService,
    public datepipe: DatePipe,
    private router: Router) { }

  ngOnInit() {
    this.serviceContrat.getContratById(+this.idContrat).subscribe(contrat => {
      var dateDebut = new Date(contrat.dateDebut)
      var dateFin = new Date(contrat.dateFin)
      var dateContratstr = this.datepipe.transform(dateDebut, 'dd-MM-yyyy')
      var dateFinstr = this.datepipe.transform(dateFin, 'dd-MM-yyyy')
      contrat.dateContrat = dateContratstr
      contrat.dateFin = dateFinstr
      this.contrat = contrat;
      this.source = new LocalDataSource(contrat.quantityProducts)
      contrat.quantityProducts.forEach(element => {
        this.prixTotal += element.prix_tot
      });
      this.prixTTC = this.prixTotal + ((this.prixTotal * contrat.taxe) / 100)
      this.serviceCLT.getClientById(+contrat.code_clt).subscribe(client => {
        this.client = client
      })
    })
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
          return (row.prix_unit)
        }
      },
      quantitytot: {
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

  close() {
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

