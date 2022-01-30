import { Component, OnInit } from '@angular/core';
import { EcritureService, Ecriture } from '../ecriture.service';
import { error } from 'util';
import { Router } from '@angular/router';
import { NbWindowRef, NbGlobalLogicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-update-ecriture',
  templateUrl: './update-ecriture.component.html',
  styleUrls: ['./update-ecriture.component.scss']
})
export class UpdateEcritureComponent implements OnInit {
   ecriture= new Ecriture();
  
     
 //tost
 
config: ToasterConfig;
destroyByClick = true;
duration = 10000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
preventDuplicates = false;
status: NbToastStatus 
title: string;
content = ` `;
  constructor(private ecritureService:EcritureService,
    private router: Router, 
    private windowRef: NbWindowRef, private toastrService: NbToastrService,) { }

  ngOnInit() {
     
    let idEcriture=localStorage.getItem('idEcriture')
    localStorage.removeItem('idEcriture')
    this.ecritureService.getEcritureById(+idEcriture).subscribe(
      data=>{this.ecriture=data,
             this.ecriture.date=new Date(this.ecriture.date)},
      error=>{console.log("error data")}
    )
      }
  
  updateEcriture(){

    this.ecritureService.updateEcriture(this.ecriture).subscribe(

      data=>{
        this.ecriture=data,
        console.log("update ok"),
        localStorage.removeItem('e');
        this.windowRef.close();
        this.content=' update  écriture  réussi'
        this.status= NbToastStatus.SUCCESS;
        this.makeToast();
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/pages/ecritures']));
      },
      error=>{this.content = `Interdiction de saisir une date d'une écriture ayant une année et moi différente à l'année et mois en cours `;
      this.status= NbToastStatus.DANGER;
      this.makeToast()}
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
    const titleContent = title ? `. ${title}` : '';
  
  
    this.toastrService.show(
      body,
      `Toast ${titleContent}`,
      config);
  }

}
