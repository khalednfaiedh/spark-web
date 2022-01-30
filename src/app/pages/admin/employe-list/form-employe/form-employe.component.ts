import {Component, OnInit} from '@angular/core';
import {EmployeListModel} from '../employe-list.model';
import {EmployeListService} from '../employe-list.service';
import {Router} from '@angular/router';
import {NbWindowRef} from '@nebular/theme';

@Component({
  selector: 'ngx-form-employe',
  templateUrl: './form-employe.component.html',
  styleUrls: ['./form-employe.component.scss'],
})
export class FormEmployeComponent implements OnInit {
  employe: EmployeListModel;
   A: string;
  constructor(private service: EmployeListService, private router: Router, public windowRef: NbWindowRef) {
  }

  ngOnInit(): void {
    this.employe =  new EmployeListModel();
    let e = localStorage.getItem('e');
    if (e === '0' ) {
      this.A = 'Ajouter';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let matricule = localStorage.getItem('matriculeEmploye');
      this.service.getEmployesById(+matricule).subscribe(
        data => { 
          this.employe = data;
          this.employe.dateDelivranceCin = new Date(data.dateDelivranceCin);
          this.employe.dateNaissance = new Date(data.dateNaissance);
          },
        error => {
        });
    }


  }
  onAdd() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.service.addEmployes(this.employe).subscribe
         (data => {
          localStorage.removeItem('e');
          localStorage.removeItem('matriculeEmploye');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(["/pages/rh/employe"]));
          this.windowRef.close();
          },
        error => {
        
        });
    }
    if (e === '1') {
      this.service.updateEmployes(this.employe).subscribe(
        data => {
          localStorage.removeItem('e');
          localStorage.removeItem('matriculeEmploye');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(["/pages/rh/employe"]));
          this.windowRef.close();
        },
        error => {
       
        });
    }
  }
  close() {
    this.windowRef.close();
  }
}
