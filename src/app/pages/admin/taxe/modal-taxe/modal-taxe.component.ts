import { Component, OnInit, ErrorHandler } from '@angular/core';
import { TaxeService } from '../services/taxe.service';

import { NbWindowRef, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';
import { TaxeModel } from '../Taxe.Model';
import { MonnaisModel } from '../Monnais.Model';
import { TaxeComponent } from '../taxe.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { UniteDeTransactionService } from '../../unite-de-transaction/UniteDeTransaction.service';
import { element } from '@angular/core/src/render3';
import { UniteDeTransactionModel } from '../../unite-de-transaction/UniteDeTransaction.model';

@Component({
  selector: 'ngx-modal-taxe',
  templateUrl: './modal-taxe.component.html',
  styleUrls: ['./modal-taxe.component.scss']
})
export class ModalTaxeComponent implements OnInit {
  e = localStorage.getItem('e');
  ARCP: string;
  taxe: TaxeModel
  taxes: TaxeModel[]
  devises: UniteDeTransactionModel[]
  name: String
  pourct: number;
  thousands: any
  decimal: any
  precision: number
  idEntr = localStorage.getItem('current_entreprise')
  constructor(private service: TaxeService,
    public windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private serviceUnite: UniteDeTransactionService,
    public router: Router) {

  }

  ngOnInit() {
    this.taxe = new TaxeModel();
    console.log("devses", this.devises)
    if (this.e === '0') {
      this.ARCP = 'Ajouter';
      this.serviceUnite.getAllUniteDeTransaction(+this.idEntr).subscribe(data => {
        this.devises = data
        this.devises.forEach(element => {
          console.log("elementu", element)
          if (element.etat == "principal") {
            this.taxe.uniteDeTransaction = element
            this.setFormatNumber(element)
          }
        })
      })
    }
    if (this.e === '1') {
      let idT = localStorage.getItem('idRC');
      this.ARCP = 'Modifier';
      this.service.getTaxebyId(+idT).subscribe(
        data => { this.taxe = data; },
        error => { console.log('error'); });
    }

    this.service.getAllTaxes(+this.idEntr).subscribe(dataT => {
      this.taxes = dataT

    })
  }

  setFormatNumber(money: UniteDeTransactionModel) {
    if (money != null) {

      // partie entier
      if (money.separateur === "Point") {
        this.thousands = "."
      }
      if (money.separateur === "Espace") {
        this.thousands = ' '
      }
      if (money.separateur === "Virgule") {
        this.thousands = ','
      }
      if (money.separateur === "Point_Virgule") {
        this.thousands = ';'
      }
      if (money.separateur === "Double_Point") {
        this.thousands = ':'
      }
      // separateur partier entier et decimale partie  
      if (money.separateurVirguele === "Point") {
        this.decimal = '.'
      }
      if (money.separateurVirguele === "Espace") {
        this.decimal = ' '
      }
      if (money.separateurVirguele === "Virgule") {
        this.decimal = ','
      }
      if (money.separateurVirguele === "Point_Virgule") {
        this.decimal = ';'
      }
      if (money.separateurVirguele === "Double_Point") {
        this.decimal = ':'
      }

      this.precision = money.nbredecimale


    }
  }
  onAddRCM() {

    let e = localStorage.getItem('e');
    if (e === '0') {
      // for (let i = 0; i < this.taxes.length; i++) {
      //   if (this.taxe.name == this.taxes[i].name && this.taxe.pourcentage == this.taxes[i].pourcentage) {

      //     this.showToast(NbToastStatus.DANGER, "Taxe est existe", "")
      //     break;
      //   }
      // }

      console.log(this.taxe)




      this.service.addTaxe(this.taxe, +this.idEntr).subscribe(
        data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idRC');
          this.showToast(NbToastStatus.SUCCESS, "Taxe ", "est ajouter avec succéss")
          this.windowRef.close();
          this.router.navigate([TaxeComponent.urlRefreshTaxe]);

        },
        error => {

          console.log('error add taxe')

        });
      //  this.ngOnInit();

    }
    if (e === '1') {
      for (let i = 0; i < this.taxes.length; i++) {
        if (this.taxe.name == this.taxes[i].name && this.taxe.pourcentage == this.taxes[i].pourcentage) {

          this.showToast(NbToastStatus.DANGER, "ERREUR", "Taxe est existe")
        }
      }
      this.service.updateTaxe(this.taxe).subscribe(
        data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idRC');
          this.showToast(NbToastStatus.SUCCESS, "Taxe ", "est modifier avec succéss")
          this.windowRef.close();
          this.router.navigate([TaxeComponent.urlRefreshTaxe]);
        },

        error => {

        });
    }
  }
  onclose() {
    this.windowRef.close();
    this.router.navigate([TaxeComponent.urlRefreshTaxe])
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
