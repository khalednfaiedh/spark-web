import { Component, OnInit } from '@angular/core';
import { ModalTarifsDeVenteComponent } from './modal-tarifs-de-vente/modal-tarifs-de-vente.component';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowService } from '@nebular/theme';
import { TarifsDeVentesService } from './service/tarifs-de-ventes.service';
import { TarifsDeVenteModel } from './tarifs-de-vente.model';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesPrixProduct } from '../../../authorisation/authorities-prix-product';
import { ShowProductComponent } from '../../admin/product/show-product/show-product.component';
import { ShowTarifsDeVenteComponent } from './show-tarifs-de-vente/show-tarifs-de-vente.component';
import { ShowTarifsDeVenteProductComponent } from './show-tarifs-de-vente-product/show-tarifs-de-vente-product.component';
import { ProductModel } from '../../admin/product/product.model';
import { error } from 'console';
import { ProductService } from '../../admin/product/product.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Color, color } from 'highcharts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-tarifs-de-vente',
  templateUrl: './tarifs-de-vente.component.html',
  styleUrls: ['./tarifs-de-vente.component.scss']
})

export class TarifsDeVenteComponent implements OnInit {
  public static urlTarifsDeVente = "/pages/vente/tarifsDeVente";
  public static urlRefreshTarifsDeVente = "/pages/vente/refreshTarifsDeVente";
  tarifs: TarifsDeVenteModel[]
  source: any;
  add: any;
  name: string
  dateF: any
  today: any
  datetoday: any
  product: ProductModel;
  id: number;
  idEntr = localStorage.getItem('current_entreprise')
  constructor(private windowService: NbWindowService, private service: TarifsDeVentesService,
    private serviceProduct: ProductService, private toastrService: NbToastrService, public datepipe: DatePipe, ) { }

  ngOnInit() {
    this.today = new Date()
    this.datetoday = this.datepipe.transform(this.today, 'yyyy-MM-dd')
    this.service.getAllTarifs(+this.idEntr).subscribe(
      data => {
        this.tarifs = data
        for (let i = 0; i < this.tarifs.length; i++) {

          this.dateF = this.datepipe.transform(this.tarifs[i].finValidite, 'yyyy-MM-dd')
          this.tarifs[i].finValidite = this.dateF

        }
        this.source = data;
      },
      error => { console.log(error); },
    );

    if (Authorities.hasAutorities(AuthoritiesPrixProduct.PRIX_PRODUCT_ADD_VALUE)) {
      this.add = false;
    }
    if (Authorities.hasAutorities(AuthoritiesPrixProduct.PRIX_PRODUCT_VALUE)) {
      this.settings.actions.custom.push({
        name: 'showAction',
        title: '<i class="nb-sunny" title="Afficher"></i>',
      })
    }
    if (Authorities.hasAutorities(AuthoritiesPrixProduct.PRIX_PRODUCT_UPDATE_VALUE)) {
      this.settings.actions.custom.push({
        name: 'editAction',
        title: '<i class="nb-edit" title="Edit"></i>',
      })
    }
    if (Authorities.hasAutorities(AuthoritiesPrixProduct.PRIX_PRODUCT_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }

  }

  settings =
    {
      mode: "inline",
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      add: {
        addButtonContent: '<i class="nb-plus" ></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',

      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true
      },
      actions: {
        position: 'right',
        add: false,
        edit: false,
        delete: false,

        custom: [

        ],
      },
      rowClassFunction: (row) => {
        if (row.data.finValidite < this.datetoday) {
          return 'good';
        } else {
          return 'warning'
        }
      },
      columns: {
        designationGrilleTarif: {
          title: 'Grille de tarif',
          type: 'string',
          filter: true,
          width: '150px',
        },

        code: {
          title: 'Référence',
          type: 'string',
          filter: true,
        },
        designation: {
          title: 'Produit',
          type: 'String',
          filter: true,
        },
        uniteMesure: {
          title: 'Unité de mesure',
          type: 'String',
          filter: true,
        },

        prixdeventeProposeDecimal: {
          title: 'Prix de vente HT',
          type: 'number',
          filter: true,
          width: '140px',
        },
        devise: {
          title: 'Unité de transaction',
          type: 'string',
          filter: true,
        },
        debutValidite: {
          title: 'Début de validité',
          type: 'Date',
          filter: true,
          width: '150px',
        },
        finValidite: {
          title: 'Fin de validité',
          type: 'Date',
          filter: true,
          width: '150px',



        },

      },
    };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce tarif?`)) {
      event.confirm.resolve(this.service.deleteTarifs(event.data.idTar).subscribe(
        data => {
          this.source.remove(event);
          this.showToast(NbToastStatus.SUCCESS, "Prix de produit", " est supprimer avec succéss")
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  onCustom(event) {
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idTarift');
      localStorage.setItem('idTarif', event.data.idTar);
      this.windowService.open(ShowTarifsDeVenteComponent,
        {
          title: 'Afficher les informations de ce tarif',
          context: event.data.idProduct
        });
    }
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idTarif');
      localStorage.setItem('e', '1');
      localStorage.setItem('idTarif', event.data.idTar);
      this.windowService.open(ModalTarifsDeVenteComponent,
        { title: 'Modifier un tarif', context: event.data.idTar });
    }
  }

  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idTarif');
    localStorage.setItem('e', '0');

    this.windowService.open(ModalTarifsDeVenteComponent,
      { title: 'Ajouter un tarif' });
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }
}