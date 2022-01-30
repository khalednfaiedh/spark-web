import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../../entreprise.service';
import { NbWindowRef, NbToastrService, NbGlobalPhysicalPosition, NbGlobalPosition, NbGlobalLogicalPosition } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
// import { Excercice, ExcerciceService } from '../../excercice/excercice.service';
import { ToasterConfig } from 'angular2-toaster';
import { Entreprise, EntrepriseUniteTransactions } from '../../entreprise';
import { FormeJuridiqueService } from '../../../forme-juridique/forme-juridique.service';
import { UniteDeTransactionService } from '../../../unite-de-transaction/UniteDeTransaction.service';
import { FormeJuridiqueModel } from '../../../forme-juridique/forme-juridique.model';
import { UniteDeTransactionModel } from '../../../unite-de-transaction/UniteDeTransaction.model';
import { AdminComponent } from '../../../admin.component';
import { Router } from '@angular/router';
import { CONNREFUSED } from 'dns';

@Component({
  selector: 'ngx-modal-entreprise',
  templateUrl: './modal-entreprise.component.html',
  styleUrls: ['./modal-entreprise.component.scss']
})
export class ModalEntrepriseComponent implements OnInit {
  pi: number = 457574545454.1458;
  valider = "Ajouter";
  natures = ["TE", "PE"]
  payes = AdminComponent.PAYES_LIST
  juridicForms: FormeJuridiqueModel[]
  moneys: UniteDeTransactionModel[]
  mensualitesList = ["12", "13", "14", "15", "16"]
  enterprise: Entreprise;
  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus
  title: string;
  content = ` `;
  idEntr = localStorage.getItem('current_entreprise')
listUnite:any=[]
  constructor(private router: Router,
    private windowRef: NbWindowRef,
    private entrepriseService: EntrepriseService,
    // private exerciceService:ExcerciceService,
    private toastrService: NbToastrService, private formjusriduqueService: FormeJuridiqueService,
    private uniteDeTransService: UniteDeTransactionService) { }

  ngOnInit() {
    this.enterprise = new Entreprise();
    this.uniteDeTransService.getAllUniteDeTransaction(+this.idEntr).subscribe(
      data => { this.moneys = data })
    this.formjusriduqueService.getAllFormeJuridique(+this.idEntr).subscribe(
      data => { this.juridicForms = data }
    )
    let e = localStorage.getItem('e');
    if (e == '1') {
      this.valider = "Modifier"
      let idEntreprise = localStorage.getItem('idEntreprise');
      this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
        ent => { this.enterprise = ent;
        
        console.log(this.enterprise);
     
        
        
        },
        error => { console.log(error); }
      );

    }
  }



  addEntreprise() {
    let e = localStorage.getItem('e');
   


    if (e === '0') {

      console.log(this.enterprise)
      this.entrepriseService.addEnterprise(this.enterprise)
        .subscribe(data => {
          this.enterprise = data;
          localStorage.removeItem('e');

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/admin/entreprise"]));
          this.windowRef.close();
        },


          error => {
            console.log('error entreprise');
          });

    }
    if (e === '1') {
      this.entrepriseService.updateEnterprise(this.enterprise).subscribe(
        data => {
          this.router.navigateByUrl("/", { skipLocationChange: true })
            .then(() => this.router.navigate(["/pages/admin/entreprise"]));
          this.content = ' Mis À JOUR  entreprise  réussi'
          this.status = NbToastStatus.SUCCESS;
          this.makeToast();
          this.windowRef.close();

        },
        error => {
          console.log('error');
        });
    }
  }

  makeToast() {
    this.showToast(this.status, this.title, this.content);
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';


    this.toastrService.show(
      body,
      `Toast ${titleContent}`,
      config);
  }
}




