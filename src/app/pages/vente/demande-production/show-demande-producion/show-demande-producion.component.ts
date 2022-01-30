import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CommandeModel } from '../../commande/commande.model';
import { DemandeProductiontModel } from '../demande-production.model';
import { CommandeService } from '../../commande/commande.service';
import { NbWindowRef, NbDateService, NbToastrService } from '@nebular/theme';
import { DemandeProductionService } from '../demande-production.service';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf' 
import html2canvas from 'html2canvas';
import { ProductService } from '../../../admin/product/product.service';
@Component({
  selector: 'ngx-show-demande-producion',
  templateUrl: './show-demande-producion.component.html',
  styleUrls: ['./show-demande-producion.component.scss']
})

export class ShowDemandeProducionComponent implements OnInit {

  source: LocalDataSource ;
  sourceC : LocalDataSource;
  e = localStorage.getItem('e');
  id = localStorage.getItem('idRC');
  reference :string
  referenceCmd :string
  referenceC :string  
  quantityProductModel: any [] = [] ;
  commande: CommandeModel = new CommandeModel();
  demandeProduction : DemandeProductiontModel = new DemandeProductiontModel() ;
  dmp : any [] = []
  @ViewChild('contentToConvert') contentRef :  ElementRef;

  constructor(private router: Router,
    protected dateService: NbDateService<Date>,
    public windowRef : NbWindowRef,
    public serviceCmd : CommandeService,
    private serviceDP : DemandeProductionService,
    private serviceP : ProductService) { }

    settings = {
      actions: {
        delete: false,

        add: false,
        edit: false,
        position: 'right'},
      columns: {
        codeProduct: {
          title: 'Code Product',
          type: 'string',
          filter: false,
        },  
        quantity: {
          title: 'Quantité produit',
          type: 'number',
          filter: false,
        },
      }   
    };  

  ngOnInit() {
    this.serviceDP.getDemandeProductionById(+this.id).subscribe(
      data => {
        this.demandeProduction=data
        this.serviceCmd.getCommandeById(data.code_cmd).subscribe(
          data1=>{
            this.commande=data1;
              this.serviceP.getProductByCode(data.codeProduct).subscribe(
                data3=>{
                  this.dmp.push({"quantity":data.quantity,"codeProduct":data3.code})
                  this.source = new LocalDataSource(this.dmp)
                })
          })
        this.referenceCmd="CMD2019"+this.demandeProduction.code_cmd;
      },
      error => {
        console.log(error);
      },
    );
  }
  close(){
    this.windowRef.close();
  }
  onCustom(event) {
  }
   
   onSaveConfirm(event) {
   }   
 
    captureScreen()  
   {  
     var data = document.getElementById('contentToConvert');  
     html2canvas(data).then(canvas => {  
       // Few necessary setting options  
       var imgWidth = 200;   
       var pageHeight = 295;    
       var imgHeight = canvas.height * imgWidth / canvas.width;  
       var heightLeft = imgHeight;  
   
       const contentDataURL = canvas.toDataURL('image/png')  
       let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
       let pdf1= new jspdf()
       var position = 0;  
       pdf.addImage(contentDataURL, 'PNG', 5, 10, imgWidth, imgHeight)  
       pdf.save('dmdprod.pdf'); // Generated PDF   
     });  
   }
   
   downloadPDF(){
     let doc = new jspdf();
     let specialElementHandler={
       '#editor':function(element,renderer){
         return true;
       }
     };
     var content = this.contentRef.nativeElement;
     doc.fromHTML(content.innerHtml,15,15,{
       'width':190,
       'elementHandlers': specialElementHandler
     });
     doc.save('test.pdf')
   }

}
