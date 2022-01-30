import { Component, OnInit } from '@angular/core';
import { NbWindowService } from "@nebular/theme";
import { TaxeService } from "./services/taxe.service";
import { ModalTaxeComponent } from './modal-taxe/modal-taxe.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesTaxe } from '../../../authorisation/authorities-taxe';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-taxe',
  templateUrl: './taxe.component.html',
  styleUrls: ['./taxe.component.scss']
})
export class TaxeComponent implements OnInit {
  public static urlTaxe = "/pages/admin/taxe";
  public static urlRefreshTaxe = "/pages/admin/refreshtaxe";
  source: any;
  add = true;
  constructor(private windowService: NbWindowService, private service: TaxeService,
    private translate: TranslateService, public datepipe: DatePipe) { }

  ngOnInit() {
    let idEntr = localStorage.getItem('current_entreprise')
    this.service.getAllTaxes(+idEntr).subscribe(
      data => { this.source = data; },
      error => { console.log(error); });

    if (Authorities.hasAutorities(AuthoritiesTaxe.TAXE_ADD_VALUE)) {
      this.add = false;
    }

    if (Authorities.hasAutorities(AuthoritiesTaxe.TAXE_UPDATE_VALUE)) {
      this.settings.actions.custom.push({
        name: 'editAction',
        title: '<i class="nb-edit" title="Edit"></i>',
      })
    }
    if (Authorities.hasAutorities(AuthoritiesTaxe.TAXE_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
  }
  settings = {
    noDataMessage: this.translate.instant('datatable.noDataMessage'),
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
      name: {
        title: 'Intitulé',
        type: 'string',
        filter: true,
      },
      type: {
        title: 'Type',
        type: 'string',
        filter: true,
      },
      pourcentageDecimal: {
        title: 'Valeur',
        type: 'string',
        filter: true,
      },
      uniteDeTransaction: {
        title: 'Unité de transaction',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell, row) {
          return cell.sigle;
        }
      }

    },
  };


  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    localStorage.setItem('e', '0');

    this.windowService.open(ModalTaxeComponent,
      { title: 'Ajouter une taxe' });
  }

  onCustom(event) {

    event.action === 'editAction'
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    localStorage.setItem('e', '1');
    localStorage.setItem('idRC', event.data.idT);
    this.windowService.open(ModalTaxeComponent,
      { title: 'Modifier une taxe', context: event.data.idT });

  }

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette taxe?`)) {
      event.confirm.resolve(this.service.deleteTaxe(event.data.idT).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
}
