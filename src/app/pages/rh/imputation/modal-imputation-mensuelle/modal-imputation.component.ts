import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImputationService } from '../imputation.service';
import { ImputationModel } from '../imputation.model';
import { NbGlobalLogicalPosition, NbGlobalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToasterConfig } from 'angular2-toaster';
import { EmployeListService } from '../../../admin/employe-list/employe-list.service';
import { ContratService } from '../../contrat/contrat.service';
@Component({
  selector: 'ngx-modal-imputation',
  templateUrl: './modal-imputation.component.html',
  styleUrls: ['./modal-imputation.component.scss']
})
export class ModalImputationComponent implements OnInit {
  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus
  title: string;
  content = ` `;
  annee = [
    // "2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014",
    "2015", "2016", "2017", "2018", " 2019", "2020", "2021", "2022", "2023", "2024", " 2025", "2026", "2027", "2028", " 2030","2031 ", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040", " 2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050"]
  // mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"]
 mois = ["01","02","03","04","05","06","07","08","09","10","11","12"]
  employes= [];
  contrat=[];
  A : string = 'Confirmer';;

  imputation: ImputationModel;
  constructor(private toastrService: NbToastrService,
    public router: Router,
     public  imputationservice : ImputationService,
      public employeService: EmployeListService, public contratService: ContratService,  public windowRef: NbWindowRef ) { }

  ngOnInit() {
    this.imputation = new ImputationModel();
    this.imputation.nombre = 0 ;
    this.imputation.nbrTaux1 = 0 ;
    this.imputation.nbrTaux2 = 0 ;
    let e = localStorage.getItem('e');
    let idEntreprise = localStorage.getItem('current_entreprise')
    this.employeService.getAllEmployesMensuelle(+idEntreprise).subscribe(
      data => {
        this.employes = data;    
      },
      error=>{
        console.log("error");
      },);
 
  }



  onAddM() {
    let mois = localStorage.getItem('MOIS')
    let annee = localStorage.getItem('ANNEE')
    this.imputation.mois = +mois ;
    this.imputation.annee = +annee ;

     this.imputationservice.addImputation(this.imputation.matricule, this.imputation)
        .subscribe(data => {
            localStorage.removeItem('e');

            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/rh/paie"]));
            this.content = ' Ajout réussi'
            this.status = NbToastStatus.SUCCESS;
            this.makeToast();
        },
          error => {         
            this.content = 'Déja effectuée'
            this.status = NbToastStatus.DANGER;
            this.makeToast();
          });
  
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
    const titleContent = title ? `. ${title}` : '';    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}
