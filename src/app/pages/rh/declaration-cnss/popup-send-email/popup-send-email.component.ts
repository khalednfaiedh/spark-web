import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { ToasterConfig } from 'angular2-toaster';
import { DeclarationCNSSService } from '../declarationCNSS.service';

@Component({
  selector: 'ngx-popup-send-email',
  templateUrl: './popup-send-email.component.html',
  styleUrls: ['./popup-send-email.component.scss']
})
export class PopupSendEmailComponent implements OnInit {
idE : number
mail: string
codeExp : string
annee : number
trimestre : number
  loading: boolean  = false;
  constructor( protected service: DeclarationCNSSService,protected windowRef: NbWindowRef,
    protected toastrService : NbToastrService,
    @Inject(NB_WINDOW_CONTEXT) context) {
    this.idE = context.idE;
    this.mail = context.mail;
    this.trimestre = context.trimestre;
    this.annee = context.annee;
    this.codeExp = context.codeExp;  
  } 
  ngOnInit() { 
  }
  send(form: NgForm) {
    if (form.valid) {
     this.service.generateTxt(this.idE, this.trimestre,this.annee,this.codeExp,this.mail).subscribe(
        data => {
          this.windowRef.close();
          this.title = 'Félicitation '
          this.content = "E-mail envoyée avec success à l'adresse "+this.mail 
          this.status = NbToastStatus.SUCCESS;
          this.makeToast()
         },
        error =>  {
          this.title = 'Erreur téléchargement'
          this.content = 'Pas de déclaration à télécharger'
          this.status = NbToastStatus.DANGER;
          this.makeToast()
        }
      )
      this.loading = true;
      setTimeout(() => this.loading = false, 3000);
    }
  }

  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus
  title: string;
  content = ` `;
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
    const titleContent = title ? ` ${title}` : '';    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }  

}
