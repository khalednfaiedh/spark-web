import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { AvanceService } from '../avance.service';
import { AvanceModel } from '../avance.model';

@Component({
  selector: 'ngx-form-avance',
  templateUrl: './form-avance.component.html',
  styleUrls: ['./form-avance.component.scss']
})
export class FormAvanceComponent implements OnInit {
  Aj: string;
  avance: AvanceModel;
  annee = [
    "2015",
    "2016", "2017",
    "2018", " 2019",
    "2020", "2021", "2022", "2023", "2024", " 2025", "2026", "2027", "2028",
    " 2030",
    "2031 ", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040", " 2041",
    "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050"]
 mois = ["01","02","03","04","05","06","07","08","09","10","11","12"]

  constructor(
    private service: AvanceService, private router: Router, private windowRef: NbWindowRef) {
  }

  ngOnInit() {
    this.avance = new AvanceModel();
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.Aj = 'Ajouter';
    }
    if (e === '1') {
      let idAvance = localStorage.getItem('idAvance');
     
      this.Aj = 'Modifier';
      this.service.getAvanceById(+idAvance).subscribe(
        data => { this.avance = data;
         },
        error => { console.log('error 2'); });
    }
  }

  onAddA() {
    let e = localStorage.getItem('e');
    let id = localStorage.getItem('idCon');
  
    if (e === '0') {
      this.service.addAvance(this.avance, +id).subscribe(
        data => {
          localStorage.removeItem('e');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/rh/pret"]));
          this.windowRef.close();
        },
        error => {
          console.log('error');
        });
    }
    if (e === '1') {
      this.service.updateAvance(this.avance, +id).subscribe(
        data => {
          localStorage.removeItem('e');
         
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/rh/pret"]));
          this.windowRef.close();
        },
        error => {
          console.log('error 3');
        });
    }
  }
}