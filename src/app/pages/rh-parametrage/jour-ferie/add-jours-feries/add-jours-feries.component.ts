import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NbWindowRef} from '@nebular/theme';
import { JoursFerieService } from '../jourFerie.service';
import { JoursFerieModel } from '../jourFerie.model';

@Component({
  selector: 'ngx-add-jours-feries',
  templateUrl: './add-jours-feries.component.html',
  styleUrls: ['./add-jours-feries.component.scss']
})
export class AddJoursFeriesComponent implements OnInit {
  jour: JoursFerieModel;
   A: string;
  constructor(private service: JoursFerieService,
    private router: Router, public windowRef: NbWindowRef) { }


  ngOnInit(): void {
    this.jour =  new JoursFerieModel();
    let e = localStorage.getItem('e');
    if (e === '0' ) {
      this.A = 'Ajouter';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let idJourFerie = localStorage.getItem('idJ');
      this.service.getJourFerieById(+idJourFerie)
      .subscribe(data => { this.jour = data;
        
          },
        error => {
          console.log('erreur');
        });
    }


  }
  onAdd() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.service.addJourFerie(this.jour).subscribe
         (data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idJ');
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/pages/parametrage/joursferie']));
          this.windowRef.close();
          },
        error => {
          console.log("error");
        });
    }
    if (e === '1') {
      this.service.updateJourFerie(this.jour).subscribe(
        data => {
         
          localStorage.removeItem('e');
          localStorage.removeItem('idJ');
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/pages/parametrage/joursferie']));
          this.windowRef.close();
        },
        error => {
          console.log('error');
        });
    }
  }
}
