import { Component, OnInit } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Router } from '@angular/router';

import { FichePaieService } from '../fiche-paie.service';
import { FichePaieModel } from '../fichePaie.model';
import { EmployeListService } from '../../../admin/employe-list/employe-list.service';
import { ContratService } from '../../contrat/contrat.service';

@Component({
  selector: 'ngx-generate-one',
  templateUrl: './generate-one.component.html',
  styleUrls: ['./generate-one.component.scss']
})
export class GenerateOneComponent implements OnInit {

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
    employesMin = [] ;
    fiche: FichePaieModel;
    
    constructor(private toastrService: NbToastrService,
      public router: Router, public  service : FichePaieService, public employeService: EmployeListService, public contratService: ContratService ) { }
 
    ngOnInit() {
      this.fiche = new FichePaieModel();
      this.fiche.moisFiche = +localStorage.getItem('MOIS');
      this.fiche.anneeFiche = +localStorage.getItem('ANNEE');
      // this.employeService.getAllEmployes().subscribe(
      //   data => {
      //     this.employes = data;
      //     console.log(this.employes)
      //   },
      //   error=>{
      //     console.log("error");
      //   },
      // );
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
 
        this.service.generateOne(this.fiche.matricule,this.fiche.moisFiche,this.fiche.anneeFiche)
          .subscribe(data => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["pages/rh/fichePaie"])
            );
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
  