import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { ProductService } from '../../admin/product/product.service';
import { PopupParamComponent } from './popup-param/popup-param.component';
import { ProduitParamService } from './produit-param.service';

@Component({
  selector: 'ngx-produit-param',
  templateUrl: './produit-param.component.html',
  styleUrls: ['./produit-param.component.scss']
})
export class ProduitParamComponent implements OnInit {
  public static url = "/pages/stock/produit";
  produits: any;

  constructor(private windowService: NbWindowService, 
    private produitParamService: ProduitParamService,
    private produitSercie : ProductService
    ) { }

  ngOnInit() {
    this.produitParamService.getAll().subscribe(
      data => {this.produits = data
      },
      err => {console.log(err)}
    )   
  }
  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-trash" title="supprimer"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit: false,
      position: 'right',
      custom: [
        { name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>'},      
        { name: 'editAction', title: `<i class="nb-edit" title="Modifier"></i>` },
      ],
    },
    columns: {
      item: {
        title: 'Produit',
        type: 'string',
        filter: true,
      },
      stockInitial: {
        title: 'Stock initial',
        type: 'string',
        filter: true,
      },
      lot: {
        title: 'N° lot',
        type: 'string',
        filter: true,
        valuePrepareFunction: (l)=>{
          return l ? l : '-'
        }
      },
      prixUnit: {
        title: 'Prix unitaire',
        type: 'number',
      },
      stockSecurite: {
        title: 'Stock sécurite',
        type: 'number'
      },
      stockMinimum: {
        title: 'Stock minimum',
        type: 'number'
      },
      stockMaximum: {
        title: 'Stock maximum',
        type: 'number'
      },
    },
  };

  onCustom(event) {
    if (event.action === 'showAction') {
      this.windowService.open(PopupParamComponent,
        { title: 'Produit détails ', context: { produit: event.data, e: '2' } });
    }
    if (event.action === 'editAction') {
      this.windowService.open(PopupParamComponent,
        { title: 'Modifier', context: { produit: event.data, e: '0' } });
    }

  }
  onDeleteConfirm(event): void {
    if (window.confirm(`Etes-vous sûr(e) de vouloir supprimer ces information ?`)) {
      event.confirm.resolve(
        this.produitParamService.delete(event.data.id).subscribe(
        data => {
          this.produitSercie.patch(event.data.idProduct,false).subscribe(
            data => {console.log('success patch product')}
          )
          this.produits.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  openWindow(): void {
    this.windowService.open(PopupParamComponent,
      { title: 'Inisialisé produit ',context: { e:'1'} });
  }
}



