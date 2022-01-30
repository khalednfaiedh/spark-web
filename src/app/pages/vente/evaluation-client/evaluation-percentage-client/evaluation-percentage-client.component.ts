import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit } from '@angular/core';
import { EvaluationPVenteService } from './evaluation-p-vente.service';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthoritiesEvaluationPVente } from '../../../../authorisation/authorities-p-vente';
import { EvaluationPercentageClientModel } from '../evaluationPercentage-model';
import { EvaluationClientService } from '../service/evaluationService';
import { EvaluationModel } from '../evaluation-model';
import { CritereEvaluationService } from '../critere-evaluation/critere-evaluation.service';
import { ClientEvaluationComponent } from '../client-evaluation/client-evaluation.component';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { FormControl } from '@angular/forms';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-evaluation-percentage-client',
  templateUrl: './evaluation-percentage-client.component.html',
  styleUrls: ['./evaluation-percentage-client.component.scss']
})
export class EvaluationPercentageClientComponent implements OnInit {
  public static urlEvaluationPercentageClient = "/pages/vente/evaluationPourcentageClient"
  source: LocalDataSource = new LocalDataSource()
  evaluationPercentage: any[] = []
  evaluationP: EvaluationPercentageClientModel = new EvaluationPercentageClientModel()
  evaluation: EvaluationModel = new EvaluationModel()
  idCMD = localStorage.getItem('idRC')
  somme: number = 0
  sommeCof: number = 0
  test: number = 0
  sommePercentage: number = 0
  note: number = 0
  cof: number
  read = true;
  id: number
  per = new FormControl('')
  constructor(private serviceEP: EvaluationPVenteService, private serviceE: EvaluationClientService,
    private serviceCritere: CritereEvaluationService, private router: Router,
    private toastrService: NbToastrService,
    private windowRef: NbWindowRef) { }


  ngOnInit() {
    let idEvaluation = localStorage.getItem('idEvaluation')

    this.serviceE.getEvaluationbyId(+idEvaluation).subscribe(data => {
      this.evaluation = data
      this.note = this.evaluation.note
    })
    this.serviceEP.getEvaluaionPByIdEvaluation(+idEvaluation).subscribe(data => {
      this.evaluationPercentage = data
      console.log('this.evaluationPercentage ', this.evaluationPercentage)
    },
      error => {
        console.log(error)
      })


    /* if (Authorities.hasAutorities(AuthoritiesEvaluationPVente.EVALUATION_P_VENTE_DELETE_VALUE)) {
   
     }
     if (Authorities.hasAutorities(AuthoritiesEvaluationPVente.EVALUATION_P_VENTE_ADD_VALUE)) {
   
     }
     if (Authorities.hasAutorities(AuthoritiesEvaluationPVente.EVALUATION_P_VENTE_UPDATE_VALUE)) {
   
     }*/
  }
  changeStatut(id: number) {
    this.id = id
    console.log("this.id", this.id)
    this.read = false

  }
  modifier() {
    console.log("per", this.per)
    this.serviceEP.getEvaluaionPById(this.id).subscribe(
      data => {
        console.log("this.evaluationP", data)
        this.evaluationP.name = data.name
        this.evaluationP.idEvaluation = data.idEvaluation
        this.evaluationP.percentage = this.per.value
        this.serviceEP.updateEvalutionP(this.evaluationP, this.id).subscribe(dataUpdate => {
          this.evaluationP = dataUpdate
          console.log("dataUpdate", dataUpdate)
          this.read = true
          this.showToast(NbToastStatus.SUCCESS, this.evaluationP.name, "est modifier avec succés ")
        })

      }
    )

  }


  delete(id: number, event) {
    if (window.confirm(`Vous êtes sure de supprimer cette evaluation ??`)) {
      this.serviceEP.deleteEvalutionP(id).subscribe(data => {
        this.ngOnInit()
      })
      this.ngOnInit()

    } else {
      event.confirm.reject();
    }

  }
  evaluer() {
    this.serviceCritere.getAllCritere().subscribe(dataC => {
      for (let i = 0; i < dataC.length; i++) {
        for (let j = 0; j < this.evaluationPercentage.length; j++) {
          if (dataC[i].designation === this.evaluationPercentage[j].name) {
            this.cof = dataC[i].coffecient
            this.test = this.evaluationPercentage[j].percentage * this.cof
            this.somme += this.test
            this.sommeCof += this.cof
            this.note = this.somme / this.sommeCof
            this.evaluation.note = this.note
          }
        }

      }
      this.serviceE.updateEvalution(this.evaluation.idEvaluation, this.evaluation).subscribe(dataE => {
        this.evaluation = dataE
        localStorage.removeItem('e');
        localStorage.removeItem('idEvaluation');
        this.showToast(NbToastStatus.SUCCESS, "Evaluation", "est modifier avec succés ")
        this.windowRef.close();
        this.router.navigate([ClientEvaluationComponent.urlClientEvaluation]);
      })

    })




  }
  close() {
    this.windowRef.close();
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 20000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };




    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }
}