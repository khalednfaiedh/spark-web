import { Component, OnInit } from '@angular/core';
import { ChargeCNSSService } from './charge-cnss.service';
import { ChargeCnssModel } from './charge-cnss.model';
import { Router } from '@angular/router';
import { NbWindowRef, NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthoritiesChargesCnss } from '../../../../authorisation/authoritiesChargesCNSS';

@Component({
  selector: 'ngx-charges-cnss',
  templateUrl: './charges-cnss.component.html',
  styleUrls: ['./charges-cnss.component.scss']
})
export class ChargesCnssComponent implements OnInit {
  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus
  title: string;
  content = ` `;
  constructor(private toastrService: NbToastrService,private service : ChargeCNSSService , private router: Router, public windowRef: NbWindowRef) { }
   x : any ;
chargesCNSS : ChargeCnssModel[] ;
isEmpty = true
 chargeCNSS : ChargeCnssModel ;
// allChargesCNSS :  ChargeCnssModel[] ;
designations : any ;
addAuthorities = false
 deleteAuthorities = false
  ngOnInit() {
    this.x = 0
   this.chargeCNSS = new ChargeCnssModel ;
   this.chargesCNSS = [] ;
    let idCatgorie = localStorage.getItem('idCategorie')
    this.service.getAllChargesCnss(+idCatgorie).subscribe(
      data => {this.chargesCNSS = data;
        if (this.chargesCNSS.length > 0) {
          this.isEmpty = false
        }
        
     },
      error => {console.log(error); },
    );

    this.service.getChargesCnssList().subscribe(
      data => {this.designations = data;
        
     },
      error => {console.log(error); },
    );
    if (Authorities.hasAutorities(AuthoritiesChargesCnss.CHARGES_CNSS_ADD_VALUE)) {
      this.addAuthorities = true;
    }
    if (Authorities.hasAutorities(AuthoritiesChargesCnss.CHARGES_CNSS_DELETE_VALUE)) {
      this.deleteAuthorities = true;
    }

  }
change(){
  if (this.x == 1) {
    this.x = 0
  }else this.x = 1 ;
}
ajouterCharge(){
  let idCatgorie = localStorage.getItem('idCategorie') ;
  this.service.addChargeCnss(this.chargeCNSS ,+idCatgorie).subscribe
  (data => {
  // localStorage.removeItem('idCategorie');
   this.content = 'Charge CNSS ajoutée avec success '
   this.status = NbToastStatus.SUCCESS;
   this.makeToast();
  // this.windowRef.close();

     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
     this.router.navigate(["pages/parametrage/categorie"]));
   this.ngOnInit();
   },
 error => {
   console.log("error");
 });
}
supprimer(charge){

  this.service.deleteChargeCnss(charge.idCNSS).subscribe(
    data => {
      this.ngOnInit();
      this.content = 'Charge CNSS supprimer '
      this.status = NbToastStatus.DANGER;
      this.makeToast();
    },
    error=>{
      console.log('err delete')
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
