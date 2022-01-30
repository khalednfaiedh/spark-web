import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesFactureAvoirs } from '../../../authorisation/authorities-facture-avoirs';
import { FactureAvoirService } from './facture-avoir.service';
import { ShowFactureAvoirComponent } from './show-facture-avoir/show-facture-avoir.component';
import { ModalFactureAvoirComponent } from './modal-facture-avoir/modal-facture-avoir.component';

@Component({
  selector: 'ngx-facture-avoir',
  templateUrl: './facture-avoir.component.html',
  styleUrls: ['./facture-avoir.component.scss']
})
export class FactureAvoirComponent implements OnInit {
  public static urlFactureAvoir = "/pages/vente/factureAvoir";
  public static urlRefreshFactureAvoir = "/pages/vente/refreshFactureAvoir";
  source: any
  constructor(private serviceFactureAvoir: FactureAvoirService, private windowService: NbWindowService) { }

  ngOnInit() {
    if (Authorities.hasAutorities(AuthoritiesFactureAvoirs.FACTURE_AVOIRS_VALUE
    )) {
      this.settings.actions.custom.push({
       
        name: 'showAction', title: `<i class="nb-sunny" title="Afficher"></i>` 

      })
    }

    this.serviceFactureAvoir.findAllFA().subscribe(dataFA => {
      this.source = dataFA
      console.log("DataFA", dataFA)
    })

  }
  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-trash" title="supprimer"></i>',
      confirmDelete: true,
    },
    actions: {
      delete: false,
      add: false,
      edit: false,
      position: 'right',
      custom: [

      ],
    },

    columns: {
      code_fac_av: {
        title: 'Référence Facture Avoir',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell, row) {
          return ("FACAV" + row.code_fac_av + "-" + row.code_fac)
        }
      },
      code_fac: {
        title: 'Référence Facture',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell, row) {
          return ("FAC" + row.code_fac)
        }
      },
      // code_clt: {
      //   title: 'Référence Client',
      //   type: 'string',
      //   filter: true,
      //   valuePrepareFunction(cell) {
      //     return ("CLT" + cell.facture.code_clt)
      //   }
      // },
      date_fac_av: {
        title: 'Date ',
        type: 'Date',
        filter: true,

      },
    }
  }
  onCustom(event) {
    if (event.action === 'show') {
      localStorage.removeItem('e');
      localStorage.removeItem('idFactureAvoir');
      localStorage.setItem('idFactureAvoir', event.data.code_fac_av);
      this.windowService.open(ShowFactureAvoirComponent,
        { title: "Afficher et télécharger cette facture d'avoirs", context: { id: event.data.code_fac_av } });

    }
    if(event.action ==='showAction')
    {
      console.log(event.data)
      this.windowService.open( ModalFactureAvoirComponent,
        { title: "Afficher     cette facture d'avoirs", context: {   id: event.data.code_fac_av ,
                                                                     disabled:true ,
                                                                     etat:'show',
                                                                     data:event.data,
                                                                     codFacture:event.data.code_fac } });

    
    }
  }
}