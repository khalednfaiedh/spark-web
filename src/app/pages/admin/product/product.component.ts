import { Component, OnInit } from '@angular/core';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { NbWindowService } from '@nebular/theme';
import { ProductService } from './product.service';
import { ShowProductComponent } from './show-product/show-product.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesProduct } from '../../../authorisation/authorities-product';
import { TarifsDeVentesService } from '../../vente/tarifs-de-vente/service/tarifs-de-ventes.service';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public static urlProduct = "/pages/admin/product";
  public static urlRefreshProduct = "/pages/admin/refreshProduct";
  source: any;
  add = true;
  id: number;
  constructor(private windowService: NbWindowService, private service: ProductService, private serviceTarif: TarifsDeVentesService) { }

  ngOnInit() {

    let id = localStorage.getItem('current_entreprise')
    this.service.getAllproduct(+id).subscribe(
      data => { this.source = data; },
      error => { console.log(error); });

    if (Authorities.hasAutorities(AuthoritiesProduct.PRODUCT_ADD_VALUE)) {
      this.add = false;
    }
    if (Authorities.hasAutorities(AuthoritiesProduct.PRODUCT_VALUE)) {
      this.settings.actions.custom.push({
        name: 'showAction',
        title: '<i class="nb-sunny" title="Afficher"></i>',
      })
    }
    if (Authorities.hasAutorities(AuthoritiesProduct.PRODUCT_UPDATE_VALUE)) {
      this.settings.actions.custom.push({
        name: 'editAction',
        title: '<i class="nb-edit" title="Edit"></i>',
      })
    }
    if (Authorities.hasAutorities(AuthoritiesProduct.PRODUCT_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
  }
  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [


      ],
    },
    columns: {
      code: {
        title: 'Réference',
        type: 'string',
        filter: true,
        width: '10vw'
      },
      designation: {
        title: 'Désignation',
        type: 'string',
        filter: true,
      },
      // margeBenfecaire: {
      //   title: 'Taux de marge bénéficiaire',
      //   type: 'number',
      //   filter: true,
      // },
      // familleDeProduit: {
      //   title: 'Famille de produit',
      //   type: 'number',
      //   filter: true,
      //   valuePrepareFunction: (cell) => {
      //     return cell.nom;
      //   },
      // },
      // quantityStock: {
      //   title: 'Quantité',
      //   type: 'number',
      //   filter: true,
      //   width: '10vw',
      //   valuePrepareFunction: (q) => {
      //     if (q) {
      //       return q
      //     } else {
      //       return '-';
      //     }
      //   },
      // },
      // prixPropose: {
      //   title: 'Prix de vente',
      //   type: 'number',
      //   filter: true,
      //   width: '12vw',
      //   valuePrepareFunction: (q) => {
      //     if (q) {
      //       return q
      //     } else {
      //       return '-';
      //     }
      //   },
      // },
      // suiviStocks: {
      //   title: 'Suivi de stock',
      //   type: 'string',
      //   filter: true,
      // }
      typeProduct: {
        title: 'Type de produit',
        type: 'string',
        filter: true,
      },
      natureProduct: {
        title: 'Nature de produit',
        type: 'string',
        filter: true,
      },

    },
  };

  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idProduct');
    localStorage.setItem('e', '0');

    this.windowService.open(ModalProductComponent,
      { title: 'Ajouter un Produit' });
  }

  onCustom(event) {
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idProduct');
      localStorage.setItem('idProduct', event.data.idProduct);
      this.windowService.open(ShowProductComponent,
        {
          title: 'Afficher les informations de ce produit',
          context: event.data.id
        });
    }
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idProduct');
      localStorage.setItem('e', '1');
      localStorage.setItem('idProduct', event.data.idProduct);
      this.windowService.open(ModalProductComponent,
        { title: 'Modifier un Produit', context: event.data.idProduct });
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm(`Êtes-vous sur(e) de vouloir  supprimer ce produit?`)) {
      event.confirm.resolve(this.service.deleteProducts(event.data.idProduct).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
          this.serviceTarif.deletebyidProduct(event.data.idProduct).subscribe(data2 => {
            console.log(data2)
          })

        }),
      );
    } else {
      event.confirm.reject();
    }
  }
}