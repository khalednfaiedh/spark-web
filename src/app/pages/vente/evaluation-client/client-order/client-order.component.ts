import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbWindowService } from '@nebular/theme';
import { ClientEvaluationComponent } from '../client-evaluation/client-evaluation.component';
import { ClientService } from '../../../admin/client/client.service';

@Component({
  selector: 'ngx-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.scss']
})
export class ClientOrderComponent implements OnInit {
  public static urlClientOrder = "/pages/vente/clientOrder";
  source: LocalDataSource = new LocalDataSource();
  idEntr = localStorage.getItem('current_entreprise')
  constructor(private windowService: NbWindowService,
    private service: ClientService) { }
  clients: any[] = []


  ngOnInit() {
    this.service.getAllClient(+this.idEntr).subscribe(
      data => {

        data.forEach(client => {
          let note = 0
          let noteLength = 0
          if (client.commande.length != 0) {
            for (let i = 0; i < client.commande.length; i++) {
              if (client.commande[i].note != null && client.commande[i].note != 0) {
                note += client.commande[i].note
                noteLength += 1

              }



            }
            if (noteLength != 0) {
              note = (note / noteLength)
            }

            this.clients.push({ code_clt: client.code_clt, nameC: client.nameC, note: note })

          }
          else {
            this.clients.push({ code_clt: client.code_clt, nameC: client.nameC, note: 0 })
          }
        })
        this.source = new LocalDataSource(this.clients);
      },
      error => { console.log(error); });

  }
  settings = {

    actions: {
      delete: false,
      add: false,
      edit: false,
      position: 'right',
      custom: [
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Afficher"></i>',
        },

      ],
    },
    columns: {

      code_clt: {
        title: 'Ref',
        type: 'string',
        filter: false,
        valuePrepareFunction(cell, row) {
          return "Clt" + cell
        }
      },
      nameC: {
        title: 'Nom',
        type: 'string',
        filter: false,
      },
      note: {
        title: 'Note',
        type: 'string',
        filter: false,
        sortDirection: 'desc'
      },
    },
  };




  onCustom(event) {
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.code_clt);
      this.windowService.open(ClientEvaluationComponent,
        { title: 'Notes du client', context: event.data.code_clt });
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce fournisseur?`)) {
      event.confirm.resolve(this.service.deleteClient(event.data.code_clt).subscribe(
        data => {
          this.source.remove(event);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

}
