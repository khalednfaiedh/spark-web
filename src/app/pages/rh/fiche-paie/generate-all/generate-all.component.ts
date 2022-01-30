import { Component, OnInit } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { FichePaieModel } from '../fichePaie.model';
import { Router } from '@angular/router';
import { FichePaieService } from '../fiche-paie.service';
import { EmployeListService } from '../../../admin/employe-list/employe-list.service';
import { ContratService } from '../../contrat/contrat.service';


@Component({
  selector: 'ngx-generate-all',
  templateUrl: './generate-all.component.html',
  styleUrls: ['./generate-all.component.scss']
})
export class GenerateAllComponent implements OnInit {

  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus
  title: string;
  content = ` `;


  employes= [];

  fiche: FichePaieModel;
  
  constructor(private toastrService: NbToastrService,
    public router: Router, public  service : FichePaieService, public employeService: EmployeListService, 
    public contratService: ContratService,  public windowRef: NbWindowRef ) { }

  ngOnInit() {
    this.fiche = new FichePaieModel();
    let mois = localStorage.getItem('MOIS');
    let annee = localStorage.getItem('ANNEE');
    this.fiche.moisFiche = +mois ;
    this.fiche.anneeFiche = + annee ;
  }
onClose(){

    this.windowRef.close();
   // this.router.navigate(['/pages/rh/conge']);

}
  onAddM() {
     let idEntreprise = localStorage.getItem('current_entreprise')
      this.service.generateLot(+idEntreprise,this.fiche.moisFiche,this.fiche.anneeFiche)
        .subscribe(data => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(["pages/rh/fichePaie"]));
          this.windowRef.close();
            this.content = 'Fiches de paie générer avec succes'
            this.status = NbToastStatus.SUCCESS;
            this.makeToast();
        },
          error => {
            this.content = 'Impossible de genéré les fiches de paie'
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
