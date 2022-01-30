import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbGlobalPosition, NbGlobalLogicalPosition, NbWindowRef } from '@nebular/theme';
import { FichePaieService } from '../fiche-paie.service';
import { Router } from '@angular/router';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-cloture',
  templateUrl: './cloture.component.html',
  styleUrls: ['./cloture.component.scss']
})
export class ClotureComponent implements OnInit {
  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus
  title: string;
  content = ` `;

  mois: any;
  annee: any;
  C: any;
  idEntreprise: any;
  constructor(private toastrService: NbToastrService,  private router : Router ,  public windowRef: NbWindowRef
    ,private service: FichePaieService) { }

  ngOnInit() {
    this.mois = localStorage.getItem('MOIS')
    this.annee = localStorage.getItem('ANNEE')
    this.C = localStorage.getItem('cloture')
    this.idEntreprise = localStorage.getItem('current_entreprise')
  }
  cloturer(){
    this.service.cloturerPaie(this.idEntreprise, this.mois, this.annee).subscribe(
      data => {
  
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["pages/rh/fichePaie"]));
        this.title = 'SUCCESS'
          this.content = 'Mois clôturer'
          this.status = NbToastStatus.SUCCESS;
          this.makeToast();
          this.windowRef.close();
        },
          error => {
            this.title = 'ERROR'

              this.content = 'Clôture impossible'
              this.status = NbToastStatus.DANGER;
              this.makeToast();
        }
    
    );
  }
  decloturer(){
    this.service.decloturerPaie(this.idEntreprise, this.mois, this.annee).subscribe(
      data => {
  
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["pages/rh/fichePaie"]));
        this.title = 'SUCCESS'
          this.content = 'Mois décloturer'
          this.status = NbToastStatus.SUCCESS;
          this.makeToast();
          this.windowRef.close();
        },
          error => {
              this.title = 'ERROR'
              this.content = 'Décloturage impossible'
              this.status = NbToastStatus.DANGER;
              this.makeToast();
        } 
    );
  }
  onClose(){
    this.windowRef.close();
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
