import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { BonDeLivraisonService } from './service/bon-de-livraison.service';
import { ShowBonDeLivraisonComponent } from './show-bon-de-livraison/show-bon-de-livraison.component';
import { ShowNumeriqueBonDeLivraisonComponent } from './show-numerique-bon-de-livraison/show-numerique-bon-de-livraison.component';
import { UpdateBonDeLivraisonComponent } from './update-bon-de-livraison/update-bon-de-livraison.component';

@Component({
  selector: 'ngx-bon-de-livraison',
  templateUrl: './bon-de-livraison.component.html',
  styleUrls: ['./bon-de-livraison.component.scss']
})
export class BonDeLivraisonComponent implements OnInit {
  public static urlBonLivraison = "/pages/vente/bonLivraison";
  public static urlRefreshBonLivraison = "/pages/vente/refreshBonLivraison";
  source: LocalDataSource = new LocalDataSource()
  liste: any[] = []
  settings: any
  constructor(private serviceBondelivraison: BonDeLivraisonService, private windowService: NbWindowService) { }

  ngOnInit() {
    this.serviceBondelivraison.getAllBonLivraison().subscribe(dataBonLivraison => {
      for (let i = 0; i < dataBonLivraison.length; i++) {
        this.liste.push({
          "code_fac": dataBonLivraison[i].code_fac,
          "code_cmd": dataBonLivraison[i].code_cmd,
          "code_clt": dataBonLivraison[i].code_clt,
          "id": dataBonLivraison[i].id,
          "datecreation": dataBonLivraison[i].datecreation,
          "dateLivraison": dataBonLivraison[i].dateLivraison,
          "statut": dataBonLivraison[i].statut,
          "date_depart": dataBonLivraison[i].date_depart,
          "date_arrivage": dataBonLivraison[i].date_arrivage

        })
        this.source = new LocalDataSource(this.liste)
      }
    })
    this.settings = {
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      edit: {
        editButtonContent: '<i class="nb-plus"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',

      },
      actions: {
        add: false,
        edit: false,
        delete: false,
        position: 'right',
        custom: [
          { name: 'editAction', title: `<i class="nb-edit" title="Modifier"></i>` },
        { name: 'showAction', title: `<i class="nb-sunny" title="Afficher"></i>` },
        { name: 'downloadAction', title: `<i class="fas fa-file-download" title="Télécharger"></i>` },
        ],
      },


      columns: {

        id: {
          title: 'Réf livraison',
          type: 'string',
          filter: true,
          width: "10%",
          valuePrepareFunction(cell, row) {

            return "LVR" + cell


          },
        },
        code_fac: {
          title: 'Réf facture',
          type: 'string',
          filter: true,
          width: "10%",
          valuePrepareFunction(cell, row) {
            return "FCT" + cell
          },

        },

        code_clt: {
          title: 'Réf client',
          type: 'string',
          filter: true,
          width: "10%",
          valuePrepareFunction(cell, row) {
            return "CLT" + cell
          },
        },

        dateLivraison: {
          title: 'Date livraison',
          type: 'Date',
          filter: true,
          width: "15%"
        },
        date_depart: {
          title: 'Date de départ',
          type: 'Date',
          filter: true,
          width: "15%"
        },
        date_arrivage: {
          title: "Date d'arrivage",
          type: 'Date',
          filter: true,
          width: "15%"
        },
        statut: {
          title: 'Statut',
          type: 'string',
          filter: true,
          width: "15%"

        }
      }
    }

  }
  onCustom(event) {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idBL');
      localStorage.setItem('idBL', event.data.id);
      localStorage.setItem('e', '1');
      this.windowService.open(UpdateBonDeLivraisonComponent,
        {
          title: 'Modifier les informations de cette bon de livraison',
          context: { id: event.data.id }
        });

    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idBL');
      localStorage.setItem('idBL', event.data.id);

      this.windowService.open(ShowNumeriqueBonDeLivraisonComponent,
        {
          title: 'Afficher les informations de cette bon de livraison',
          context: { id: event.data.id }
        });

    }
    if (event.action === 'downloadAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idBL');
      localStorage.setItem('idBL', event.data.id);

      this.windowService.open(ShowBonDeLivraisonComponent,
        {
          title: 'Afficher les informations de cette bon de livraison',
          context: { id: event.data.id }
        });

    }
  }

}
