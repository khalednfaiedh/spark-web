import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { RegimeHoraireeService } from '../regimeHoraire.service';
import { RegimeHoraireModel } from '../regimeHoraire.model';

@Component({
  selector: 'ngx-add-regime-horaire',
  templateUrl: './add-regime-horaire.component.html',
  styleUrls: ['./add-regime-horaire.component.scss']
})
export class AddRegimeHoraireComponent implements OnInit {
  regimeH=["Mensuelle","Par heure"]
  mensualites=["12","13","14","15","16"]
  nbrJourParMois=["18","22","26","30"]
  regime :RegimeHoraireModel ;
   A: string;

  constructor(private service: RegimeHoraireeService, private router: Router, public windowRef: NbWindowRef) { }

  ngOnInit() {
    this.regime = new RegimeHoraireModel();

    let e = localStorage.getItem('e');
    if (e === '0' ) {
      this.A = 'Confirmer';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let idRegime = localStorage.getItem('idRegime');
      this.service.getRegimeById(+idRegime).subscribe(data => { this.regime = data;
          
          },
        error => {
          console.log('erreur');
        });
    }
  }
  addRegime() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.service.addRegime(this.regime).subscribe
         (data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idRegime');
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["pages/parametrage/regime"]));
          },
        error => {
          console.log("error");
        });
    }
    if (e === '1') {
      this.service.updateRegime(this.regime).subscribe(
        data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idRegime');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['pages/parametrage/regime']));
          this.windowRef.close();
        },
        error => {
          console.log('error');
        });
    }
  }
  onClose(){
    this.windowRef.close();
  }
}
