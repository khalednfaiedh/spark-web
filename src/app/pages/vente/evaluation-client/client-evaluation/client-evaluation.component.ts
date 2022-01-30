import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { ClientService } from '../../../admin/client/client.service';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { EvaluationPVenteService } from '../evaluation-percentage-client/evaluation-p-vente.service';
import { EvaluationClientService } from '../service/evaluationService';
import { EvaluationPercentageClientModel } from '../evaluationPercentage-model';
import { EvaluationModel } from '../evaluation-model';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthoritiesEvaluationClient } from '../../../../authorisation/authorities-evaluation-client';
import { EvaluationPercentageClientComponent } from '../evaluation-percentage-client/evaluation-percentage-client.component';
import { ModalEvaluationClientComponent } from '../modal-evaluation-client/modal-evaluation-client.component';

@Component({
  selector: 'ngx-client-evaluation',
  templateUrl: './client-evaluation.component.html',
  styleUrls: ['./client-evaluation.component.scss']
})
export class ClientEvaluationComponent implements OnInit {
  public static urlClientEvaluation = "/pages/vente/clientEvaluation";
  idCMD = localStorage.getItem('idRC');

  note: number = 0
  source: LocalDataSource = new LocalDataSource()
  evaluationPercentage: EvaluationPercentageClientModel = new EvaluationPercentageClientModel()
  evaluation: EvaluationModel = new EvaluationModel()
  EP: EvaluationPercentageClientModel[]
  constructor(public datepipe: DatePipe, private windowService: NbWindowService,
    private serviceEP: EvaluationPVenteService,
    private serviceE: EvaluationClientService,) { }

  ngOnInit() {
    if (Authorities.hasAutorities(AuthoritiesEvaluationClient.EVALUATION_CLIENT_VALUE)) {
      this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });

    }

    this.serviceE.findAll().subscribe(dataE => {
      console.log("dataE", dataE)
      this.source = new LocalDataSource(dataE)
    })


  }
  settings = {

    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [


      ],


    },
    columns: {
      idEvaluation: {
        title: 'Référence évaluation',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell, row) {
          return "EVL" + cell
        }
      },
      code_cmd: {
        title: 'Référence bons de commande',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell, row) {
          return "CMD" + cell
        }
      },
      code_clt: {
        title: 'Référence de client',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell, row) {
          return "CLT" + cell
        }
      },
      dateEvaluation: {
        title: "Date d'évaluation",
        type: 'Date',
        filter: true,

      },

      note: {
        title: 'Note',
        type: 'string',
        filter: true,

      },


    },
  };
  onCustom(event) {
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idEvaluation');
      localStorage.setItem('idEvaluation', event.data.idEvaluation);
      this.windowService.open(EvaluationPercentageClientComponent,
        {
          title: 'Afficher  liste de cette evaluation',
          context: event.data.idEvaluation
        });
    }

  }
}
