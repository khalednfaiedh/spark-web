import { Component, OnInit } from '@angular/core';
import { MachineModel } from '../machine.model';
import { MachineService } from '../machine.service';
import { Router } from '@angular/router';
import { NbWindowRef, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { TranslateService } from '@ngx-translate/core'
import { CategorieMachineModel } from '../../categorie-machine/categorie-machine.model';
import { CategorieMachineService } from '../../categorie-machine/categorie-machine.service';
import { UniteMesureService } from '../../unite-mesure-product/unite-mesure.service';

@Component({
  selector: 'ngx-modal-machine',
  templateUrl: './modal-machine.component.html',
  styleUrls: ['./modal-machine.component.scss']
})
export class ModalMachineComponent implements OnInit {

  catalogitems1: any;
  ARCM: string;
  machine: MachineModel;
  categories: CategorieMachineModel[];
  selectedFile: File;
  etats = ["neuve", "occasion"]
  uniteproductions = ["Unite 1", "Unite 2", "Unite 3", "Unite 4"];
  unite = [
    "AFN",
    "EUR", "DZD",
    "AOA", " XCD",
    "AMD", "AWG", "AUD", "AZN", "BSD", "BHD", "BDT", "BBD", "BYR",
    "BZD",
    "XOF", "BMD", "BTN", "INR", "BOB", "BOV", "BAM", "BWP", "NOK", "BRL", "BND",
    "BGN", "BIF", "CVE", "KHR", "XAF", "CAD", "KYD", "CLF", "CLP", "CNY", "COP", "COU", "KMF", "CDF", "NZD", "CRC", "HRK", "ANG",
    "CUC", "CUP", "CZK", "DKK",
    "DJF", "DOP", "EGP", "SVC", "ERN", "ETB", "FKP",
    "FJD", "XPF", "GMD", "GEL", "GHS", "GIP", "GTQ", "GBP", "GNF",
    "GYD", "HTG", "HNL", "HKD", "HUF", "ISK", "IDR", "XDR",
    "IRR", "IQD", "JMD", "JPY", "JOD", "KZT", "KES", "KPW", "KRW", "KWD",
    "KGS", "LAK", "LBP", "LSL", "ZAR", "LRD", "LYD", "MOP", "MKD", "MGA",
    "MWK", "MYR", "MVR", "MRU", "MUR", "XUA", "MXN", "MXV", "MDL", "MNT",
    "MZN", "MMK", "NPR", "NGN", "OMR", "PKR", "PAB", "PGK", "PYG", "PHP",
    "PLN", "QAR", "RON", "RWF", "SHP", "WST", "STN", "SAR", "RSD", "SCR",
    "SLL", "SGD", "XSU", "SBD", "SOS", "SSP", "LKR", "SDG", "SRD", "SZL",
    "SEK", "CHE", "CHF", "CHW", "SYP", "TWD", "TJS", "TZS", "THB", "TOP",
    "TTD", "TND", "TRY", "TMT", "UGX", "UAH", "AED", "USN", "UYI", "UYU",
    "UZS", "VUV", "VEF", "VND", "USD", "MAD", "YER", "ZMW", "ZWL"
  ]
  dureeMachine = ["Année", "Mois", "Semaine", "Jour", "Heure", "Minute", "Seconde"]
  uniteMesure = []
  message = "";
  idEntr = localStorage.getItem('current_entreprise')
  constructor(private service: MachineService, private serviceCategorie: CategorieMachineService,
    private router: Router, private windowRef: NbWindowRef,
    private toastrS: NbToastrService, private translate: TranslateService, private uniteService: UniteMesureService) { }

  ngOnInit() {
    this.machine = new MachineModel();
    let e = localStorage.getItem('e');
    console.log(e);

    this.uniteService.getAllUniteMesure(+this.idEntr).subscribe(
      data => { this.uniteMesure = data }
    )

    let idEntreprise= localStorage.getItem('current_entreprise')
    this.machine.idEntreprise=+idEntreprise;
    this.serviceCategorie. getAllCategorieMByEntreoriseId(+idEntreprise).subscribe(data => {
 
      this.categories = data;
    },
      error => { console.log("error"); });
    if (e === '0') {
      this.message = "Ajouter"
    }
    if (e === '1') {
      let id = localStorage.getItem('idMachine');
      this.message = "Modfier"
      this.service.getMachineById(+id).subscribe(
        data => {
          this.machine = data;
          console.log(this.machine)
        },
        error => { console.log(error); },
      );
    }
  }

  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrS.show(body, `${titleContent}`, config);
  }

  onAddRCM() {
    let e = localStorage.getItem('e');
    console.log(this.machine)
    if (e === '0') {
      this.service.addMachineByCategorie(+this.machine.categorieMachine.id, this.machine)
        .subscribe(data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idMachine');
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/admin/machine"]));
          this.showToast(NbToastStatus.SUCCESS, 'SUCCESS', 'ajouter réussi');
        },
          error => {
            console.log('error');
          });
    }
    if (e === '1') {
      this.service.updateMachineByCategorie(this.machine, this.machine.categorieMachine.id, this.machine.id).subscribe(
        data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idMachine');
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/admin/machine"]));
          this.showToast(NbToastStatus.SUCCESS, 'SUCCESS', 'Modfier  réussi');

        },
        error => {
          console.log('error');
        });
    }

  }

  close() {
    this.windowRef.close();
    this.router.navigate(['/pages/admin/machine']);
  }

}
