import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { ProductService } from '../product.service';
import { ProductModel } from '../product.model';
import { ConditionnementEmballageService } from '../../conditionnement-emballage-product/conditionnement-emballage.service';
import { ConditionnementEmballageModel } from '../../conditionnement-emballage-product/ConditionnementEmballage.model';
import { TaxeModel } from '../../taxe/Taxe.Model';
import { TaxeService } from '../../taxe/services/taxe.service';
import { FamilleDeProduitModel } from '../../famille-de-produit/famille-de-produit.model';
import { ProductComponent } from '../product.component';
import { FamilleDeProduitService } from '../../famille-de-produit/famille-de-produit.service';
import { SuiviStocksModel } from '../SuiviStocks.model';
import { ProductTaxeService } from '../product-taxe/product-taxe.service';
import { ProductTaxeModel } from '../product-taxe/product-taxe-model';
import { ProductConditionnementService } from '../product-conditionnement/product-conditionnement.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { AdminComponent } from '../../admin.component';
import { UniteMesureService } from '../../unite-mesure-product/unite-mesure.service';
import { UniteMesureModel } from '../../unite-mesure-product/Unite-mesure.model';

@Component({
  selector: 'ngx-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss'],
})
export class ModalProductComponent implements OnInit {
  payes = AdminComponent.PAYES_LIST
  ARCM: string;
  show: boolean = true;
  file: File;
  product: ProductModel;
  nom: string;
  source: any
  familleDeProduits: FamilleDeProduitModel[];
  familleDeProduit: FamilleDeProduitModel;
  productTaxe: ProductTaxeModel;
  productConditionnementID: any
  conditionnements: Array<ConditionnementEmballageModel> = [];
  conditionnements2: Array<ConditionnementEmballageModel> = [];
  suiviStocks = Object.values(SuiviStocksModel);
  taxes: TaxeModel[];
  taxes2: Array<any> = [];
  productTaxeID: any
  selectedFile: File
  test: boolean = false;
  fullName: string
  idEntr = localStorage.getItem('current_entreprise')
  unities: UniteMesureModel[]
  newArray: any = [];

  constructor(private serviceFamilleDeProduit: FamilleDeProduitService,
    private service: ProductService,
   // private serviceEntreeProduit: EntreeArticleService,
    private serviceCond: ConditionnementEmballageService,
    private serviceProductConditionnement: ProductConditionnementService,
    private serviceProductTaxe: ProductTaxeService,
    private serviceUniteMesure: UniteMesureService,
    private serviceTaxe: TaxeService, private router: Router,
    private windowRef: NbWindowRef, private toastrService: NbToastrService) {

  }

  ngOnInit() {

    this.product = new ProductModel();
    this.productTaxe = new ProductTaxeModel();

    let e = localStorage.getItem('e');
    console.log(e);
    let idEntreprise = localStorage.getItem('current_entreprise')
    this.serviceFamilleDeProduit.getAllFamilleDeProduit(+idEntreprise).subscribe(data => {
      this.familleDeProduits = data;

    },
      error => { console.log("error"); });
    this.serviceCond.getAllCondtionnement(+this.idEntr).subscribe(data => {
      this.conditionnements = data;
      console.log(data)
    },
      error => { console.log("error"); });
    this.serviceUniteMesure.getAllUniteMesure(+this.idEntr).subscribe(data => {
      this.unities = data;
      console.log("dataUinite", data)

    },
      error => { console.log("error"); });

    let idEntr = localStorage.getItem('current_entreprise')
    this.serviceTaxe.getAllTaxes(+idEntr).subscribe(res => {
      /*  let ress: any[]; ress = res; ress.map((i) => {
          i.fullName = i.name + '= ' + i.pourcentage
          return i;
        });*/
      this.taxes = res;
      console.log("taxes", this.taxes)
      // this.productTaxeID = [this.taxes[0], this.taxes[1]]
    },
      error => { console.log("error"); });
    if (e === '0') {
      this.ARCM = 'Ajouter';
    }

    if (e === '1') {
      this.test = true;
      let id = localStorage.getItem('idProduct');
      this.ARCM = 'Modifier';
      this.service.getProductById(+id).subscribe(
        data => {

          this.product = data;
          console.log("get product", this.product)
          this.product.productConditionnementEmballages.forEach(element => {
            this.conditionnements2.push({
              idC: element.conditionnementEmballage.idC,
              typeConditionnement: element.conditionnementEmballage.typeConditionnement
            });

          });
          this.productConditionnementID = this.conditionnements2


          // this.serviceEntreeProduit.getEntreeByProduit(+id).subscribe(data1 => {
          //   this.entreeArticle = data1
          // },
          //   error => {
          //     console.log("error");
          //   })

        },
        error => { console.log(error); },
      );
    }
  }

  onSelectFile(event) {
    const file = event.target.files[0];
    this.file = file;
  }

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  onAddRCM() {
    let idEntreprise = localStorage.getItem('current_entreprise')
    //this.product.listConditionnement = this.productConditionnementID;
    //this.product.listTaxe = this.productTaxeID;
    let e = localStorage.getItem('e');
    if (e === '0') {
      // const uploadImageData = new FormData();
      // const product = this.product;
      // uploadImageData.append('imageFile', this.selectedFile);
      // uploadImageData.append('product', JSON.stringify(product));
      // console.log("product  v2 ", this.product);

      this.product.listConditionnement = this.productConditionnementID;

      this.service.addProducts(+idEntreprise, this.product)

        .subscribe(data => {
          this.product = data;
        //   this.serviceEntreeProduit.addEntreeByProduit(+data.idProduct, this.entreeArticle).subscribe(
        //     data1 => {
              this.showToast(NbToastStatus.SUCCESS, "Produit", " est ajouter avec succéss")
              localStorage.removeItem('e');
             localStorage.removeItem('idProduct');
            this.windowRef.close();
              this.router.navigate([ProductComponent.urlRefreshProduct]);

        //     },
        //     error => { console.log("error"); });
         },
          error => {
            this.showToast(NbToastStatus.SUCCESS, "Error", "")
            console.log('erreur')

          })

    }
    if (e === '1') {

      this.product.listConditionnement = this.productConditionnementID;


      this.service.updateProducts(+idEntreprise, this.product).subscribe(

        data => {
          console.log("Produit update", data)
          // this.serviceEntreeProduit.updateEntree(+data.idProduct, this.entreeArticle).subscribe(
          //   data1 => {
          localStorage.removeItem('idProduct');
          this.windowRef.close();
          this.router.navigate([ProductComponent.urlRefreshProduct]);
          // },
          // error => { console.log(error); });
        },
        error => { console.log(error); });
    }


  }


  onclose() {
    this.windowRef.close();
    this.router.navigate([ProductComponent.urlRefreshProduct]);
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 10000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }

}

