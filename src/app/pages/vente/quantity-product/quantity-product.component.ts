import { Component, OnInit } from '@angular/core';
import { QuantityProductModel } from './quantity-product-model';
import { ProductService } from '../../admin/product/product.service';
import { FamilleDeProduitService } from '../../admin/famille-de-produit/famille-de-produit.service';
import { ProductModel } from '../../admin/product/product.model';
import { FamilleDeProduitModel } from '../../admin/famille-de-produit/famille-de-produit.model';
import { LocalDataSource } from 'ng2-smart-table';
import { QuantityProductService } from './quantity-product.service';
import { UniteMesureService } from '../../admin/unite-mesure-product/unite-mesure.service';
import { UniteMesureComponent } from '../../admin/unite-mesure-product/unite-mesure.component';

@Component({
  selector: 'ngx-quantity-product',
  templateUrl: './quantity-product.component.html',
  styleUrls: ['./quantity-product.component.scss']
})
export class QuantityProductComponent implements OnInit {
  quatityProduct: QuantityProductModel
  product: ProductModel[];
  unite: UniteMesureComponent[];
  famille: FamilleDeProduitModel[];
  familles: any = [];
  products: any = [];
  unites: any = [];
  source: any
  idEntr = localStorage.getItem('current_entreprise')
  constructor(private serviceProduct: ProductService, private serviceFamille: FamilleDeProduitService, private serviceQuantityP: QuantityProductService
    , private serviceUnite: UniteMesureService) { }

  ngOnInit() {
    this.quatityProduct = new QuantityProductModel;

    let id = localStorage.getItem('current_entreprise')

    this.serviceUnite.getAllUniteMesure(+this.idEntr).subscribe(
      data => {
        console.log(data);
        data.forEach(unite => {
          this.unites.push({ value: unite.idUnite, title: unite.unite });
          // this.settings.columns.product.filter.config.list = this.products;
          this.settings.columns.uniteVente.editor.config.list = this.unites;
          this.settings = Object.assign({}, this.settings);

        })
      });
    this.serviceProduct.getAllproduct(+id).subscribe(
      data => {
        console.log(data);
        data.forEach(product => {
          this.products.push({ value: product.idProduct, title: product.designation });
          // this.settings.columns.product.filter.config.list = this.products;
          this.settings.columns.idProduct.editor.config.list = this.products;
          this.settings = Object.assign({}, this.settings);

        })
      });

  }
  settings = {

    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    add: {
      addButtonContent: '<i class="nb-plus" ></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,

    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    actions: {
      position: 'right',
      add: true,
      edit: true,
      delete: true,

      custom: [


      ],
    },

    columns: {

      code: {
        title: 'Réference',
        type: 'string',
        filter: true,
      },

      idProduct: {
        title: 'Produit',
        type: 'number',
        filter: true,
        valuePrepareFunction: (cell, row) => {
          return cell.designation;
        },

        editor: {
          type: 'list',
          config: {
            selectText: 'Produit',
            list: this.products,

          },
        },

      },
      prixachatMP: {
        title: "Prix d'achat",
        type: 'number',
        filter: true,
      },
      coutProduction: {
        title: "Cout de production",
        type: 'number',
        filter: true,
      },
      fraisfixe: {
        title: "Frais fixe",
        type: 'number',
        filter: true,
      },
      margeBen: {
        title: "Marge Béneficiaire",
        type: 'number',
        filter: true,
      },

      prix_unit: {
        title: 'Prix unitaire',
        type: 'number',
        filter: true,
        editable: false,
        addable: false,
        valuePrepareFunction(cell, row) {
          row.prix_unit = (row.prixachatMP + row.coutProduction + row.fraisfixe) * row.margeBen
          return (row.prix_unit)
        }
      },
      quantitytot: {
        title: 'Quantité totale',
        type: 'number',
        filter: true,
      },
      prix_tot: {
        title: 'Prix totale',
        type: 'number',
        filter: true,
        editable: false,
        addable: false,
        valuePrepareFunction(cell, row) {
          row.prix_tot = row.quantitytot * row.prix_unit
          return (row.prix_tot)
        }
      },
      uniteVente: {
        title: 'Unité de vente',
        type: 'string',
        filter: true,
        valuePrepareFunction: (cell, row) => {
          return cell.unite;
        },

        editor: {
          type: 'list',
          config: {
            selectText: 'Unité de vente',
            list: this.unites,

          },
        },

      },
      remise: {
        title: 'Remise(%)',
        type: 'number',
        filter: true,
      },
      prixavecremise: {
        title: 'Prix avec remise',
        type: 'number',
        filter: true,
        editable: false,
        addable: false,
        valuePrepareFunction(cell, row) {
          row.prixavecremise = row.prix_tot - ((row.prix_tot * row.remise) / 100)
          return (row.prixavecremise)
        }

      }
    },
  };
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce contact?`)) {
      event.confirm.resolve(this.serviceQuantityP.delete(event.data.idQuantityProduct).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event): void {
    let id = localStorage.getItem('idContrat');
    this.serviceQuantityP.addquantityProductContrat(+id, event.newData).subscribe(

      data => {
        this.source.add(event.newData);
      },
      error => {
        console.log(error);
      },
      event.confirm.resolve(event.newData),
    );
  }
  onSaveConfirm(event): any {
    let id = localStorage.getItem('idContrat');
    /* this.serviceQuantityP.updatequantityProductContrat(event.newData, +id).subscribe(
       data => {
         this.source.update(event.newData);
       },
       error => {
         console.log('erreur update');
       },
       event.confirm.resolve(event.newData),
     );*/
  }
}
