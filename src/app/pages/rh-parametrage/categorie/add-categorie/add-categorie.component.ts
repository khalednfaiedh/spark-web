import { Component, OnInit } from '@angular/core';
import { CategorieModel } from '../categoeie.model';
import { CategorieService } from '../categorie.service';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {
  categorie: CategorieModel;
   A: string;
  x :number
  constructor(private service: CategorieService, private router: Router, public windowRef: NbWindowRef) {
  }

  ngOnInit(): void {
    this.categorie =  new CategorieModel();
    let e = localStorage.getItem('e');
    if (e === '0' ) {
      this.A = 'Ajouter';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let idCategorie = localStorage.getItem('idCategorie');
    
      this.service.getCategorieById(+idCategorie).subscribe(data => { this.categorie = data;
        
          },
        error => {
          console.log('erreur');
        });
    }

  }
  onAdd() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.service.addCategorie(this.categorie).subscribe
         (data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idCategorie');
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["pages/parametrage/categorie"]));
          },
        error => {
          console.log("error");
        });
    }
    if (e === '1') {
      this.service.updateCategorie(this.categorie).subscribe(
        data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idCategorie');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['pages/parametrage/categorie']));
          this.windowRef.close();
        },
        error => {
          console.log('error');
        });
    }
  }

}
