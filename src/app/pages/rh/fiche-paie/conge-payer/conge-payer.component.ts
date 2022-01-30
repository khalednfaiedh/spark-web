import { Component, OnInit } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Router } from '@angular/router';
import { FichePaieService } from '../fiche-paie.service';
import { EmployeListService } from '../../../admin/employe-list/employe-list.service';
import { ContratService } from '../../contrat/contrat.service';

@Component({
  selector: 'ngx-conge-payer',
  templateUrl: './conge-payer.component.html',
  styleUrls: ['./conge-payer.component.scss']
})
export class CongePayerComponent implements OnInit {

  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus
  title: string;
  content = ` `;
  
  
  
  employesMin = [] ;
  
  matricule : number ;
  nbrJourMax : number ;
  nbrJour : number ;
  anneeFiche : number ;
  moisFiche : number ;
  constructor(private toastrService: NbToastrService,
    public router: Router, public  service : FichePaieService, public employeService: EmployeListService, public contratService: ContratService ) { }

  ngOnInit() {
    let idEntreprise = localStorage.getItem('current_entreprise')
    this.employeService.getAllEmployees2(+idEntreprise).subscribe(
      data => {
        this.employesMin = data;
      },
      error=>{
      },
    );
  }


  versementSoldeConge(){
    this.moisFiche = +localStorage.getItem('MOIS')
    this.anneeFiche = +localStorage.getItem('ANNEE')
 
    if (this.nbrJour>this.nbrJourMax) {
      this.content = 'Le nobmre de jour ne doit pas dépasser le solde congé'
      this.status = NbToastStatus.DANGER;
      this.makeToast();
    } else {
      
      this.service.generateOne12(this.matricule,this.moisFiche,this.anneeFiche,this.nbrJour)
      .subscribe(data => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["pages/rh/fichePaie"]));
          this.content = 'Fiche de paie générer avec succes'
          this.status = NbToastStatus.SUCCESS;
          this.makeToast();
      },
        error => {
          this.content = 'Impossible de genéré fiche de paie'
          this.status = NbToastStatus.DANGER;
          this.makeToast();
              });
    }

  }
  getInformations(x){
   
     this.employesMin.forEach(element => {
       if (x === element.matricule) {
      
         this.nbrJourMax = element.sodleConge 
       }
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
