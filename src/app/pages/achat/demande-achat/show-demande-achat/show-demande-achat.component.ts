import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { DemandeAchatModel } from '../model/demande-achat.model'
import { LocalDataSource } from 'ng2-smart-table';

import { NbDateService } from '@nebular/theme';
import { DemandeAchatService } from '../services/demande-achat.service';
import { ProductModel } from '../../../admin/product/product.model';
import { ProductService } from '../../../admin/product/product.service';



@Component({
  selector: 'ngx-show-demande-achat',
  templateUrl: './show-demande-achat.component.html',
  styleUrls: ['./show-demande-achat.component.scss']
})
export class ShowDemandeAchatComponent implements OnInit {

  source: LocalDataSource;
  id = localStorage.getItem('idRC');

  demandeAchat: DemandeAchatModel = new DemandeAchatModel();
  addProductList: ProductModel[] = [];
  quantityProduct: any = []




  constructor(private router: Router,
    protected dateService: NbDateService<Date>,
    public windowRef: NbWindowRef,
    public service: DemandeAchatService,
    private productService: ProductService,
  ) {
  }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }
  ngOnInit() {

    this.service.getDemandeAchatById(+this.id).subscribe(
      data => {
        this.demandeAchat = data;
        for (let i = 0; i < data.quantityProducts.length; i++) {
          this.productService.getProductById(data.quantityProducts[i].idProduct).subscribe(data2 => {
            this.quantityProduct.push({ "designation": data2.designation, "code": data2.code, "quantity": data.quantityProducts[i].quantity })
            this.source = new LocalDataSource(this.quantityProduct);
          })
        }
      },
      error => {
        console.log(error);
      },
    );
  }
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      designation: {
        title: 'Désignation',
        type: 'string',
        filter: true,
        editable: false,
        addable: false,
      },
      code: {
        title: 'Référence',
        type: 'number',
        filter: true,
        editable: false,
        addable: false,
      },
      quantity: {
        title: 'Quantité',
        type: 'number',
        filter: false,



      },
    },
  };

  close() {
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    this.windowRef.close();
  }


  // annuler(){
  //   this.demandeAchat.statut = "Annulée"

  //   this.service.updateDemandeAchats(this.demandeAchat).subscribe(
  //     data => {
  //       this.windowRef.close();
  //       this.router.navigate(['/pages/refreshDemandeAchat']);
  //     },
  //     error => {
  //       console.log('error');
  //     });
  // }

}
