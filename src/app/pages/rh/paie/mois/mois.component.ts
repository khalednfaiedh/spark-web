import { Component, OnInit } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Router } from '@angular/router';
import { MoisService } from './mois.service';
import { Entreprise } from '../../../admin/entreprise/entreprise';
import { EntrepriseRoutingModule } from '../../../admin/entreprise/entreprise-routing';
import { EntrepriseService } from '../../../admin/entreprise/entreprise.service';

@Component({
  selector: 'ngx-mois',
  templateUrl: './mois.component.html',
  styleUrls: ['./mois.component.scss']
})
export class MoisComponent implements OnInit {
  annee = [ "2015", "2016", "2017","2018", " 2019","2020", "2021", "2022", "2023", "2024", " 2025", "2026", "2027", "2028", " 2030", "2031 ", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040", " 2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050"]
  mensualitieNumber:Number
  mois:any
  anneeCourante : any
  moisCourant : any
  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus
  title: string;
  content = ` `;
  constructor( private moisService: MoisService, private toastrService: NbToastrService, private router : Router,
   private windowref : NbWindowRef) {}

  ngOnInit() {
   let idEntreprise = localStorage.getItem('current_entreprise')
    this.moisService.mensualiteNumber(+idEntreprise).subscribe(
      data => { this.mensualitieNumber = data ;
        switch (this.mensualitieNumber) {
          case 13:  this.mois = ["01","02","03","04","05","06","07","08","09","10","11","12","13"]; break;
          case 14:  this.mois = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14"]; break;
          case 15:  this.mois = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15"]; break;
          case 16:  this.mois = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16"]; break;
          case 12:  this.mois = ["01","02","03","04","05","06","07","08","09","10","11","12"]; break;
        } 
      });
 
      this.anneeCourante =localStorage.getItem('ANNEE') ;
      this.moisCourant =localStorage.getItem('MOIS') ;
  }
  fixerMois(){
      localStorage.setItem('MOIS',this.moisCourant)
      localStorage.setItem('ANNEE',this.anneeCourante)
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(["/pages/rh/paie"]));
      this.title = 'SUCCESS'
      this.content = 'Mois fixier'
      this.status = NbToastStatus.SUCCESS;
      this.makeToast();
      this.windowref.close()
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
