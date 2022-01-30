import { Component, OnInit } from '@angular/core';
import {
  EvaluationPVenteService
}
  from '../evaluation-percentage-client/evaluation-p-vente.service';
import { EvaluationClientService } from '../service/evaluationService';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { ClientOrderComponent } from '../client-order/client-order.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvaluationFournisseurService } from '../../../achat/evaluation-fournisseur/service/evaluation-fournisseur.service';
import { EvaluationModel } from '../evaluation-model';
import { EvaluationPercentageClientModel } from '../evaluationPercentage-model';
import { CritereEvaluationService } from '../critere-evaluation/critere-evaluation.service';
import { CritereEvaluationModel } from '../critere-evaluation/critere-evaluation-model';
import { ClientEvaluationComponent } from '../client-evaluation/client-evaluation.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-modal-evaluation-client',
  templateUrl: './modal-evaluation-client.component.html',
  styleUrls: ['./modal-evaluation-client.component.scss']
})
export class ModalEvaluationClientComponent implements OnInit {
  test: number = 0
  somme: number = 0
  sommeCoef: number = 0
  sommePercentage: number = 0;
  criteres: CritereEvaluationModel[]
  evaluationPercentage: EvaluationPercentageClientModel = new EvaluationPercentageClientModel()
  EP: EvaluationPercentageClientModel[]
  note: number = 0
  noteS: string = ""
  nbrCritere: number = 0;
  evaluation: EvaluationModel = new EvaluationModel()
  critereForm: FormGroup
  readonly = false;
  idCMD = localStorage.getItem('idRC');
  coefficient: number = 0
  e = localStorage.getItem('e');
  constructor(private serviceEP: EvaluationPVenteService, public windowRef: NbWindowRef,
    private serviceE: EvaluationClientService,
    private serviceCritere: CritereEvaluationService,
    private toastrService: NbToastrService,
    private _fb: FormBuilder,
    private router: Router) { }



  ngOnInit() {

    this.critereForm = this._fb.group({
      critere: this._fb.array([this.addCritereEvaluationGroup()])
    });

    this.serviceCritere.getAllCritere().subscribe(dataC => {
      this.criteres = dataC
    })

    if (this.e === '1') {
      this.serviceE.getEvaluationbyIdBC(+this.idCMD).subscribe(dataE => {
        this.evaluation = dataE
        if (dataE != null) {
          this.note = this.evaluation.note
        }
        this.serviceEP.getEvaluaionPByIdEvaluation(dataE.idEvaluation).subscribe(dataEP => {
          this.EP = dataEP
        })
      })
    }

  }


  valider() {

    for (let i = 0; i < this.critereArray.length; i++) {
      console.log("this.critereArray", this.critereArray);
      this.test = this.critereArray.value[i].percentage * this.critereArray.value[i].name.coffecient
      console.log(" this.test", this.test);
      this.somme += this.test
      console.log("  this.somme", this.somme);
      this.sommeCoef += this.critereArray.value[i].name.coffecient
      console.log("this.sommeCoef", this.sommeCoef);
      this.note = this.somme / this.sommeCoef;

      console.log(this.note);

    }
    //}

  }
  close() {
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    this.windowRef.close();
  }

  addEvaluation() {
    if (this.e === '1') {
      for (let j = 0; j < this.EP.length; j++) {
        console.log("   this.EP[j].percentage", this.EP[j].percentage);
        this.sommePercentage += this.EP[j].percentage
        console.log("  this.sommePercentage", this.sommePercentage);
      }
      for (let i = 0; i < this.critereArray.length; i++) {
        console.log("this.critereArray", this.critereArray);
        this.test = this.critereArray.value[i].percentage
        console.log(" this.test", this.test);
        this.somme += this.test

        console.log("  this.somme", this.somme);

        this.note = (this.somme + this.sommePercentage) / (this.critereArray.length + this.EP.length);
        this.note.toFixed(2);
        console.log(this.note);
      }

    } else {
      let code_cmd = localStorage.getItem('idRC');
      this.evaluation.code_cmd = +code_cmd
      this.evaluation.dateEvaluation = new Date()
      this.evaluation.note = this.note;
      console.log(this.evaluation)
      this.serviceE.addEvalution(this.evaluation).subscribe(data => {
        this.evaluation = data
        for (let i = 0; i < this.critereArray.length; i++) {
          this.evaluationPercentage.idEvaluation = this.evaluation.idEvaluation
          this.evaluationPercentage.percentage = this.critereArray.value[i].percentage
          console.log(" this.critereArray.value[i].name", this.critereArray.value[i].name)
          this.evaluationPercentage.name = this.critereArray.value[i].name.designation
          this.serviceEP.addEvalutionP(this.evaluationPercentage).subscribe(dataEP => {
            this.evaluationPercentage = dataEP

          })
        }
        localStorage.removeItem('e');
        localStorage.removeItem('idRC');
        this.showToast(NbToastStatus.SUCCESS, "Evaluation", "est ajouter avec succéss")
        this.windowRef.close();
        this.router.navigate([ClientEvaluationComponent.urlClientEvaluation]);

      })
    }


  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }


  addCritereEvaluationGroup() {
    return this._fb.group({
      name: [null, Validators.required],
      percentage: [null, Validators.required],
      coefficent: [null,]
    })

  }

  getCoefficient() {
    for (let i = 0; i < this.critereArray.length; i++) {

      this.coefficient = this.critereArray.value[i].name.coffecient
    }
  }
  addCritere() {
    this.critereArray.push(this.addCritereEvaluationGroup());
  }
  removeCritere(index) {
    this.critereArray.removeAt(index);
  }
  get critereArray() {
    return <FormArray>this.critereForm.get('critere');

  }
}
