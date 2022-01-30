import { Component, OnInit } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Router } from '@angular/router';
import { FichePaieService } from '../../fiche-paie.service';
import { EmployeListService } from '../../../../admin/employe-list/employe-list.service';
import { ContratService } from '../../../contrat/contrat.service';

@Component({
  selector: 'ngx-add-solde-tout-compte',
  templateUrl: './add-solde-tout-compte.component.html',
  styleUrls: ['./add-solde-tout-compte.component.scss']
})
export class AddSoldeToutCompteComponent implements OnInit {

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
  mois = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  annee : number ;
  moisPaiement : number;
  constructor(private toastrService: NbToastrService,
    public router: Router, public  service : FichePaieService, public employeService: EmployeListService, public contratService: ContratService ) { }

  ngOnInit() {
    
    
    this.annee = +localStorage.getItem('ANNEE');
    let idEntreprise = localStorage.getItem('current_entreprise')
    this.employeService.getAllEmployees2(+idEntreprise).subscribe(
      data => {
        this.employesMin = data;
       
      },
      error=>{
       
      },
    );
  }

  onAddM() {

      this.service.soldeToutCompte(this.matricule,this.moisPaiement,this.annee)
        .subscribe(data => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(["pages/rh/soldetoutcompte"])
          );
            this.content = 'Solde de tout compte générer avec succes'
            this.status = NbToastStatus.SUCCESS;
            this.makeToast();
        },
          error => {
            this.content = 'Impossible de genéré fiche de paie'
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
