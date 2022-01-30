import { Component, OnInit } from '@angular/core';
import { CoordonneesBancaireModel } from '../CoordonneBancaire.Model';
import { CoordonnesBancaireClientService } from '../service/coordonnes-bancaire-client.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { BanqueService } from '../../../banque/banque.service';
import { BanqueModel } from '../../../banque/Banque.modal';
import { Router } from '@angular/router';
import { NbWindowRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { element } from '@angular/core/src/render3';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-modal-coordonne-bancaire-client',
  templateUrl: './modal-coordonne-bancaire-client.component.html',
  styleUrls: ['./modal-coordonne-bancaire-client.component.scss']
})
export class ModalCoordonneBancaireClientComponent implements OnInit {
  coordonneBancaie: CoordonneesBancaireModel = new CoordonneesBancaireModel()
  public documentGrp1: FormGroup;
  ARCP: string
  e = localStorage.getItem('e')
  banques: BanqueModel[]
  banque: BanqueModel
  codeCLT = localStorage.getItem('idClient');
  constructor(private serviceCB: CoordonnesBancaireClientService, private formBuilder: FormBuilder,
    private serviceBanque: BanqueService, private router: Router, public windowRef: NbWindowRef,
    private toastrService: NbToastrService) { }

  ngOnInit() {
    let idEntr = localStorage.getItem('current_entreprise')
    this.serviceBanque.getAllBanques(+idEntr).subscribe(
      data => {
        this.banques = data
      })
    if (this.e === '0') {
      this.documentGrp1 = this.formBuilder.group({
        itemss: this.formBuilder.array([this.createListCB()]),
      })
      this.ARCP = 'Ajouter'
    }
    if (this.e === '1') {
      this.ARCP = 'Modifier'
      this.documentGrp1 = this.formBuilder.group({
        itemss: this.formBuilder.array([]),
      })
      this.serviceCB.getCoordonneesBancairesClient(+this.codeCLT).subscribe(data => {
        const lines1 = this.documentGrp1.get('itemss') as FormArray;
        data.forEach(element => {
          lines1.push(this.UpdateListCB(element))
        })
      })
    }
  }
  get itemss(): FormArray {
    return this.documentGrp1.get('itemss') as FormArray;
  };
  addItem(): void {
    this.itemss.push(this.createListCB());
  }

  removeItem(index: number) {
    if (this.itemss.value[index].idC != null) {
      this.serviceCB.deleteCoordonneesBancairesClient(this.itemss.value[index].idC).subscribe(data => {
        this.showToast(NbToastStatus.SUCCESS, "Coordonnée bancaire", " est supprimer avec succéss")
        this.ngOnInit()
      })
    } else {
      this.itemss.removeAt(index);
    }


  }
  createListCB(): FormGroup {
    return this.formBuilder.group({
      banque: new FormControl(this.banque),
      agence: new FormControl(),
      rib: new FormControl(),
      bic: new FormControl(),
      iban: new FormControl()
    });
  }
  UpdateListCB(listCB: any): FormGroup {
    return this.formBuilder.group({
      idC: new FormControl(listCB.idC || new Number),
      banque: new FormControl(listCB.banque || new String),
      agence: new FormControl(listCB.agence || new String),
      rib: new FormControl(listCB.rib || new String),
      bic: new FormControl(listCB.bic || new String),
      iban: new FormControl(listCB.iban || new String)
    });
  }
  addCB(formValue) {
    if (this.e === '0') {
      formValue.itemss.forEach(element1 => {
        // console.log("element1BC", +element1)
        this.serviceCB.addCoordonneesBancairesClient(element1, + this.codeCLT).subscribe(data2 => {
          this.showToast(NbToastStatus.SUCCESS, "Coordonnée bancaire", " est ajouter avec succéss")
        },
          error => {
            console.log('error');
          });
      });
    } if (this.e === '1') {
      formValue.itemss.forEach(element1 => {
        console.log("element1BC", element1)
        if (element1.id != null) {
          this.serviceCB.updateCoordonneesBancairesClient(element1, element1.id, + this.codeCLT).subscribe(data2 => {
            this.showToast(NbToastStatus.SUCCESS, "Coordonnée bancaire", " est modifier avec succéss")
          },
            error => {
              console.log('error');
            });
        } else {

          this.serviceCB.addCoordonneesBancairesClient(element1, + this.codeCLT).subscribe(data2 => {
            this.showToast(NbToastStatus.SUCCESS, "Coordonnée bancaire", " est modifier avec succéss")
          },
            error => {
              console.log('error');
            });

        }


      })
    }
  }
  onclose() {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate(["/pages/admin/client"]));
    this.windowRef.close();
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 10000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
