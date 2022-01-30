import { Component, OnInit } from '@angular/core';
import { JoursFerieService } from './jourFerie.service';
import { AddJoursFeriesComponent } from './add-jours-feries/add-jours-feries.component';
import { NbWindowService } from '@nebular/theme';
import { Router } from '@angular/router';
import { JoursFerieModel } from './jourFerie.model';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesRegime } from '../../../authorisation/authoritiesRegime';
import { AuthoritiesJoursFeries } from '../../../authorisation/authoritiesJoursFeries';

@Component({
  selector: 'ngx-jour-ferie',
  templateUrl: './jour-ferie.component.html',
  styleUrls: ['./jour-ferie.component.scss']
})
export class JourFerieComponent implements OnInit {

  // mois = ["01","02","03","04","05","06","07","08","09","10","11","12"]
  // jour = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]
  annee = [
    "2015",
    "2016", "2017",
    "2018", " 2019",
    "2020", "2021", "2022", "2023", "2024", " 2025", "2026", "2027", "2028",
    " 2030",
    "2031 ", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040", " 2041",
    "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050"]
  source: any;
  a : any ;
  jour : JoursFerieModel ;
  ADD = true;
  constructor(private windowService: NbWindowService,  private router: Router ,private service: JoursFerieService) { }
ngOnInit(): void {
  this.a =new Date().getFullYear();
  this.getByYear();
  if (Authorities.hasAutorities(AuthoritiesJoursFeries.JOURS_FERIES_ADD_VALUE)) {
    this.ADD = false;
  }
  if (Authorities.hasAutorities(AuthoritiesJoursFeries.JOURS_FERIES_UPDATE_VALUE)) {
    this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
  }
  if (Authorities.hasAutorities(AuthoritiesJoursFeries.JOURS_FERIES_DELETE_VALUE)) {
    this.settings.actions.delete= true;
   }
}
getByYear(){
  this.service.getAllJourFerieByYear(this.a).subscribe(
    data => {this.source = data; 
      },
    error => {console.log(error); },
  );
}
openWindow() {
  localStorage.setItem('e', '0');
  this.windowService.open(AddJoursFeriesComponent, { title: 'Ajouter un jour ferié' });
}
settings = {
delete: {
  deleteButtonContent: '<i class="nb-trash"></i>',
  confirmDelete: true,
},
actions: {
  add: false,
  edit: false,
  delete: false,
  position: 'right',
  custom: [
    // {
    //   name: 'editAction',
    //   title: '<i class="nb-edit" title="Edit"></i>',
    // },
  ],
},
columns: {
  designation: {
    title: 'Designation',
    type: 'string',
    filter: true,
  },
  dateJoursFerie: {
    title: 'Date',
    type: 'Date',
    filter: true,
    sort : true ,
    sortDirection :	'asc',
  },
},
};
onDeleteConfirm(event): void {
  if (window.confirm(`Vous etes sure de supprimer ce jour ferié?`)) {
    event.confirm.resolve(this.service.deleteJourFerie(event.data.idJour).subscribe(
      
      data => {
        this.source.filter(p => p !== event.data);
      }),
    );
  } else {
    event.confirm.reject();
  }
}
onCustom(event): any {
  if (event.action === 'editAction') {
    localStorage.removeItem('e');
    localStorage.removeItem('idJ');
    localStorage.setItem('idJ', event.data.idJour);
    localStorage.setItem('e', '1');
    this.windowService.open(AddJoursFeriesComponent, {
      title: 'Modifier ce jour ferié',
      context: event.data.matricule
    });
  }

}


// onCreateConfirm(event): void {
//   this.service.addJourFerie(event.newData).subscribe(
//     data => { this.source.add(event.newData).refresh(); },
//     error => { alert(error); },
//     event.confirm.resolve(event.newData),
//   );
// }

// onSaveConfirm(event): any {
//   this.service.updateJourFerie(event.newData).subscribe(
//     data => { this.source.update(event.newData); },
//     error => { alert(error); },
//     event.confirm.resolve(event.newData),
//   );
// }


}
