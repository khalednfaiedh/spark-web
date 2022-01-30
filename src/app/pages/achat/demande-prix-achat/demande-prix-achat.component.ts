import { Component, OnInit } from '@angular/core';
import { NbWindowService } from "@nebular/theme";
import { DemandePrixAchatService } from "./services/demande-prix-achat.service";
import { DatePipe } from '@angular/common'
import { ShowDemandePrixAchatComponent } from './show-demande-prix-achat/show-demande-prix-achat.component';
import { ModalDevisAchatComponent } from "../devis-achat/modal-devis-achat/modal-devis-achat.component";
import { LocalDataSource } from "ng2-smart-table";
import { ModalDemandePrixAchatComponent } from './modal-demande-prix/modal-demande-prix-achat.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesDemandePrixAchat } from '../../../authorisation/authorities-demande-prix-achat';
import { AuthoritiesDevisProduct } from '../../../authorisation/authorities-devis-product';

@Component({
  selector: 'ngx-demande-prix-achat',
  templateUrl: './demande-prix-achat.component.html',
  styleUrls: ['./demande-prix-achat.component.scss']
})
export class DemandePrixAchatComponent implements OnInit {
  public static urlDemandePrixAchat = "/pages/achat/demandePrixAchat";

  constructor(public datepipe: DatePipe, private windowService: NbWindowService, private service: DemandePrixAchatService) { }
  source: LocalDataSource;
  ngOnInit() {
    this.service.getAllDemandePrix().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          var dateDmp = new Date(data[i].dateDmp);
          var dateDmpstr = this.datepipe.transform(dateDmp, 'dd/MM/yyyy')
          data[i].dateDmp = dateDmpstr;
        }
        this.source = new LocalDataSource(data);
        console.log("this.source==>", this.source)
      },
      error => { console.log(error); });
    if (Authorities.hasAutorities(AuthoritiesDemandePrixAchat.DEMANDE_PRIX_ACHAT_VALUE)) {
      this.settings.actions.custom.push({
        name: 'showAction',
        title: '<i class="nb-sunny" title="Afficher"></i>',
      });
    }
    if (Authorities.hasAutorities(AuthoritiesDemandePrixAchat.DEMANDE_PRIX_ACHAT_UPDATE_VALUE)) {
      this.settings.actions.custom.push({
        name: 'editAction',
        title: '<i class="nb-edit" title="Modifier"></i>',
      });
    }
    if (Authorities.hasAutorities(AuthoritiesDevisProduct.DEVIS_ACHAT_ADD_VALUE)) {
      this.settings.actions.custom.push({
        name: 'devis',
        title: '<i class="nb-paper-plane" title="Devis"></i>',
      });
    }
    if (Authorities.hasAutorities(AuthoritiesDemandePrixAchat.DEMANDE_PRIX_ACHAT_DELETE_VALUE)) {
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
        // {
        //   name: 'editAction',
        //   title: '<i class="nb-edit" title="Afficher"></i>',
        // },
      ],
    },
    columns: {
      iddp: {
        title: 'Référence demande Prix',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell, row) {
          return "DMP" + cell
        }
      },
      demandeAchat: {
        title: 'Référence demande achat',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell, row) {
          console.log(row)
          return "DMA" + row.demandeAchat.idDemandeAchat
        }
      },
      creePar: {
        title: 'Crée par',
        type: 'string',
        filter: true,
      },
      dateDmp: {
        title: 'Date demande',
        type: 'date',
        filter: true,
      },
    },
  };
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce Produit?`)) {
      event.confirm.resolve(this.service.deleteDemandePrix(event.data.iddp).subscribe(
        data => {
          this.source.remove(event);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  onCustom(event) {
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.iddp);
      this.windowService.open(ShowDemandePrixAchatComponent,
        { title: 'Afficher demande de prix', context: { id: event.data.iddp } });
    }
    if (event.action == "devis") {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.iddp);
      this.windowService.open(ModalDevisAchatComponent, { title: 'Ajouter un devis', context: { id: event.data.iddp } })
    }
    if (event.action == "editAction") {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.iddp);
      localStorage.setItem('e', '1');
      this.windowService.open(ModalDemandePrixAchatComponent, { title: 'Modifier demande de prix', context: { id: event.data.iddp } })
    }
  }
}
