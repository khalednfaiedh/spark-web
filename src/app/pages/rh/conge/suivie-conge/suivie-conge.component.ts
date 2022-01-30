import { Component, OnInit } from '@angular/core';
import { NbWindowRef, NbToastrService, NbGlobalPosition, NbGlobalLogicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';
import { CongeService } from '../conge.service';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthoritiesConge } from '../../../../authorisation/authoritiesConge';

@Component({
  selector: 'ngx-suivie-conge',
  templateUrl: './suivie-conge.component.html',
  styleUrls: ['./suivie-conge.component.scss']
})
export class SuivieCongeComponent implements OnInit {
  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus
  title: string;
  content = ` `;

  authoritiesConfirm: boolean = false;
  authoritiesDecline: boolean  = false;
  authoritiesDelete: boolean  = false;
  constructor(private toastrService: NbToastrService , public windowRef: NbWindowRef,
    public router: Router, public  service : CongeService ) { }
    congeEnAttente: any;
    suivieConge : any ;
    conge : any ;

  ngOnInit() {
   
    this.OninitcongeEnAttente()
    this. OnInitCongeEnCours()
    if (Authorities.hasAutorities(AuthoritiesConge.CONGE_CONFIRM_VALUE)) {
      this.authoritiesConfirm = true;  
    }
    if (Authorities.hasAutorities(AuthoritiesConge.CONGE_ANNULER_VALUE)) {
      this.authoritiesDecline = true;  
    }
    if (Authorities.hasAutorities(AuthoritiesConge.CONGE_DELETE_VALUE)) {
      this.authoritiesDelete = true;  
    }

  }
  OninitcongeEnAttente(){
    let idContrat = localStorage.getItem('idC')
    this.service.getAllCongesEnAttenteByContrat(+idContrat).subscribe(
      data => { 
        this.congeEnAttente = data; 
      },
      error => { }
    );
  }
  OnInitCongeEnCours(){
    let idContrat = localStorage.getItem('idC')

    this.service.getCongesTraiterByContrat(+idContrat).subscribe(
      data => { 
        this.suivieConge = data; 
      },
      error => {
        
         }
    );
  }
confirm(CONGE){
    this.service.confirm(CONGE.idConge).subscribe(
      data => { 
        this.OninitcongeEnAttente()
        this. OnInitCongeEnCours()
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["pages/rh/conge"]));
        this.content = 'Congé valider'
        this.status = NbToastStatus.SUCCESS;
        this.makeToast();
      },
      error => {
        if(error.status == 503){                        
          this.title = 'Erreur'
          this.content = "Solde congé n'est plus suffisant" 
          this.status = NbToastStatus.DANGER;
          this.makeToast();
        }
      }
    )
}

annuler(CONGE){
  this.service.annuler(CONGE.idConge).subscribe(
    data => {
    
      this.OninitcongeEnAttente()
      this. OnInitCongeEnCours()
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(["pages/rh/conge"]));
      this.content = 'Congé annuler '
      this.status = NbToastStatus.DANGER;
      this.makeToast();
    },
    error => {
    }
  )
  
}
supprimer(CONGE){
 
  this.service.deleteconge(CONGE.idConge).subscribe(
    data => {
      this.OninitcongeEnAttente()
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(["pages/rh/conge"]));
          
    },
    error=>{
     
    }
  )
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
