import { Component, OnInit } from '@angular/core';
import { AvanceMensModel } from '../avanceMens.model';
import { AvanceMensService } from '../avanceMens.service';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { MoisService } from '../../paie/mois/mois.service';
import { ContratModel } from '../../contrat/contrat.model';
import { ContratService } from '../../contrat/contrat.service';

@Component({
  selector: 'ngx-form-avance-mens',
  templateUrl: './form-avance-mens.component.html',
  styleUrls: ['./form-avance-mens.component.scss']
})
export class FormAvanceMensComponent implements OnInit {
  
  mensualitieNumber :Number  ;
  Aj: string;
  avanceMens: AvanceMensModel;
  annee = [ "2014","2015", "2016", "2017","2018", " 2019","2020", "2021", "2022", "2023", "2024", " 2025", "2026", "2027", "2028", " 2030", "2031 ", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040", " 2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050"]
  mois : any
  contrat : Promise<ContratModel>
  idEntreprise: number;
  constructor(private contratService : ContratService,
    private moisService: MoisService, private service: AvanceMensService, private router: Router, private windowRef: NbWindowRef) {
  }

  ngOnInit() {
    let idCon = localStorage.getItem('idCon')
    this.MensualiteInit(idCon)
    this.avanceMens = new AvanceMensModel();
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.Aj = 'Ajouter';
    }
    if (e === '1') {
      let idAvance = localStorage.getItem('idAvance');
  
      this.Aj = 'Modifier';
      this.service.getAvanceMensById(+idAvance).subscribe(
        data => { this.avanceMens = data;
         },
        error => { console.log('error 2'); });
    }

  }

  getContrat(idC) {
    return this.contratService.getContratsById(idC).toPromise();
  }
  getMensualiteNumber(idE){
    this.moisService.mensualiteNumber(idE).subscribe(
      data => { this.mensualitieNumber = data ;
        switch (this.mensualitieNumber) {
          case 13:  this.mois = ["01","02","03","04","05","06","07","08","09","10","11","12","13"]; break;
          case 14:  this.mois = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14"]; break;
          case 15:  this.mois = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15"]; break;
          case 16:  this.mois = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16"]; break;
          case 12:  this.mois = ["01","02","03","04","05","06","07","08","09","10","11","12"]; break;
        } 
      });
  }
  async MensualiteInit(idContrat) {
    this.contrat =  this.getContrat(idContrat) ;
    this.idEntreprise =(await this.contrat).idEntreprise ;
    this.getMensualiteNumber(this.idEntreprise);
   }
  onAddA() {
    let e = localStorage.getItem('e');
    let id = localStorage.getItem('idCon');
   
    if (e === '0') {
      this.service.addAvanceMens(this.avanceMens, +id).subscribe(
        data => {
          localStorage.removeItem('e');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/rh/avance"]));
          this.windowRef.close();
        },
        error => {
         
        });
    }
    if (e === '1') {
      this.service.updateAvanceMens(this.avanceMens, +id).subscribe(
        data => {
          localStorage.removeItem('e');
         
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/rh/avance"]));
          this.windowRef.close();
        },
        error => {
        
        });
    }
  }
}