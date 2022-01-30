import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../product.model';
import { ProductService } from '../product.service';
import { TaxeModel } from '../../taxe/Taxe.Model';
import { NbWindowRef } from '@nebular/theme';
import { ProductTaxeModel } from '../product-taxe/product-taxe-model';
import { ProductConditionnementModel } from '../product-conditionnement/product-conditionnement-model';
import { FamilleDeProduitModel } from '../../famille-de-produit/famille-de-produit.model';
import { ConditionnementEmballageModel } from '../../conditionnement-emballage-product/ConditionnementEmballage.model';
import { AdminComponent } from '../../admin.component';
import { ConditionnementEmballageService } from '../../conditionnement-emballage-product/conditionnement-emballage.service';
import { UniteMesureService } from '../../unite-mesure-product/unite-mesure.service';

@Component({
  selector: 'ngx-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {
  product: ProductModel;
  payes = AdminComponent.PAYES_LIST
  productTaxes: ProductTaxeModel[];
  PConditionnement: ProductConditionnementModel[];
  familleDeProduits: FamilleDeProduitModel[];
  conditionnements: Array<ConditionnementEmballageModel> = [];
  conditionnements2: Array<ConditionnementEmballageModel> = [];
  taxes2: Array<TaxeModel> = [];
  productConditionnementID: any;
  productTaxeID: any;
  unities: any[]
  idEntr = localStorage.getItem('current_entreprise')
  constructor(private service: ProductService,
    // private serviceEntree: EntreeArticleService,
    private serviceCond: ConditionnementEmballageService,
    private serviceUniteMesure: UniteMesureService,
    private windowRef: NbWindowRef) { }

  ngOnInit() {
    this.product = new ProductModel();
    let id = localStorage.getItem('idProduct');
    this.serviceCond.getAllCondtionnement(+this.idEntr).subscribe(data => {
      this.conditionnements = data;
      console.log(data)
    },
      error => { console.log("error"); });
    this.serviceUniteMesure.getAllUniteMesure(+this.idEntr).subscribe(data => {
      this.unities = data;

    })
    this.service.getProductById(+id).subscribe(
      data => {
        this.product = data;
        this.product.productConditionnementEmballages.forEach(element => {
          this.conditionnements2.push({
            idC: element.conditionnementEmballage.idC,
            typeConditionnement: element.conditionnementEmballage.typeConditionnement
          });

        });
        this.productConditionnementID = this.conditionnements2
        // this.serviceEntree.getEntreeByProduit(+id).subscribe(
        //   data1 => {
        //     this.entreeArticle = data1;

        this.product.productTaxes.forEach(element => {
          this.taxes2.push({
            idT: element.taxe.idT,
            name: element.taxe.name,
            type: element.taxe.type,
            pourcentage: element.taxe.pourcentage,
            uniteDeTransaction: element.taxe.uniteDeTransaction,
          });
        });
        this.productTaxeID = this.taxes2;
        // },
        // error => {
        //   console.log("error");
        // });
      },
      error => { console.log(error); });
  }

  onclose() {
    this.windowRef.close();
  }
}
