import { Component, OnInit } from '@angular/core';
import { ConditionDePaiementService } from '../condition-de-paiement.service';
import { ConditionDePaiementModel } from '../condition-de-paiement-model';
import { Router } from '@angular/router';
import { NbWindowRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { timingSafeEqual } from 'crypto';
import { ThrowStmt } from '@angular/compiler';
import { element } from '@angular/core/src/render3';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'ngx-modal-condition-de-paiement',
  templateUrl: './modal-condition-de-paiement.component.html',
  styleUrls: ['./modal-condition-de-paiement.component.scss']
})
export class ModalConditionDePaiementComponent implements OnInit {
  conditionPaiement: ConditionDePaiementModel = new ConditionDePaiementModel()
  public documentGrp1: FormGroup;
  ARCP: string
  e = localStorage.getItem('e')
  lengthCheckToaddMore: any;
  totalFileName: any;
  test: number
  sommePourcentage: number = 0
  valuesolde: number
  source2 = interval()
  subscription: Subscription
  idEntr = localStorage.getItem('current_entreprise')
  constructor(private serviceCP: ConditionDePaiementService, private router: Router,
    private windowRef: NbWindowRef,
    private formBuilder: FormBuilder, private toastrService: NbToastrService) { }

  ngOnInit() {

    if (this.e === '0') {
      this.documentGrp1 = this.formBuilder.group({
        itemss: this.formBuilder.array([this.createListCP()]),
      })
      this.ARCP = 'Ajouter'

    }
    if (this.e === '1') {
      this.documentGrp1 = this.formBuilder.group({
        itemss: this.formBuilder.array([]),
      })
      this.ARCP = 'Modifier'
      let idCP = localStorage.getItem('idCP')
      this.serviceCP.getConditionById(+idCP).subscribe(data => {
        this.conditionPaiement = data

        if (this.conditionPaiement.listcondiontDePaiements.length != null) {
          const lines1 = this.documentGrp1.get('itemss') as FormArray;
          data.listcondiontDePaiements.forEach(element => {
            lines1.push(this.createListCPUpdate(element))
          });

        }
      })

    }
  }
  get itemss(): FormArray {
    return this.documentGrp1.get('itemss') as FormArray;
  };
  addItem(): void {
    this.itemss.push(this.createListCP());
  }

  removeItem(index: number) {
    this.itemss.removeAt(index);
  }
  createListCP(): FormGroup {
    return this.formBuilder.group({
      typeEcheance: new FormControl(),
      pourcentage: new FormControl(),
      nombreDejour: new FormControl(),
      option: new FormControl()
    });
  }
  createListCPUpdate(listCP: any) {
    return this.formBuilder.group({
      id: new FormControl(listCP.id || new Number),
      typeEcheance: new FormControl(listCP.typeEcheance || new String),
      pourcentage: new FormControl(listCP.pourcentage || new Number),
      nombreDejour: new FormControl(listCP.nombreDejour || new Number),
      option: new FormControl(listCP.option || new String),
    });
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

  calculeValueSolde(event) {
    console.log("this.sommePourcentage", event)
    for (let i = 0; i < this.itemss.length; i++) {
      if (event == "Solde") {
        this.sommePourcentage += this.itemss.value[i].pourcentage

        if (this.itemss.value[i].typeEcheance == "Solde") {
          this.itemss.at(i).patchValue({
            pourcentage: 100 - this.sommePourcentage
          })
          this.sommePourcentage += this.itemss.value[i].pourcentage
        }
      }
    }

  }
  addCP(formValu1) {
    if (this.e === '0') {
      if (this.sommePourcentage != 100) {
        this.showToast(NbToastStatus.DANGER, "DANGER", " Pourcentage != 100 %")
        this.sommePourcentage = 0
      } else {
        this.serviceCP.addConditionDePaiements(this.conditionPaiement, +this.idEntr).subscribe(data => {
          this.conditionPaiement = data
          formValu1.itemss.forEach(element1 => {

            this.serviceCP.addlistConditionDePaiements(element1, + this.conditionPaiement.id).subscribe(data2 => {
            },
              error => {
                console.log('error');
              });
          });
          this.router
            .navigateByUrl("/", { skipLocationChange: true })
            .then(() => this.router.navigate(["/pages/admin/conditionDePaiement"]));
          this.windowRef.close();

        },
          error => { console.log('error'); });
      }


    }

    if (this.e === '1') {
      for (let i = 0; i < this.itemss.length; i++) {
        this.sommePourcentage += +this.itemss.value[i].pourcentage

      }
      console.log(" this.sommePourcentageupdate", this.sommePourcentage)
      if (this.conditionPaiement.strategie == 'Fixation en pourcentage' && this.sommePourcentage != 100) {

        this.showToast(NbToastStatus.DANGER, "DANGER", " Pourcentage != 100 %")
        this.sommePourcentage = 0

      } else {
        this.serviceCP.update(this.conditionPaiement, +this.idEntr).subscribe(data => {
          this.conditionPaiement = data
          formValu1.itemss.forEach(element1 => {
            if (element1.id != null) {
              this.serviceCP.updatelistConditionDePaiements(element1, + element1.id, this.conditionPaiement.id).subscribe(data2 => {

              },
                error => {
                  console.log('error');
                });
            } else {
              this.serviceCP.addlistConditionDePaiements(element1, + this.conditionPaiement.id).subscribe(data2 => {
              },
                error => {
                  console.log('error');
                });
            }
          });
          this.router
            .navigateByUrl("/", { skipLocationChange: true })
            .then(() => this.router.navigate(["/pages/admin/conditionDePaiement"]));
          this.windowRef.close();
        })
      }
    }
  }
  onclose() {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate(["/pages/admin/conditionDePaiement"]));
    this.windowRef.close();
  }
}
