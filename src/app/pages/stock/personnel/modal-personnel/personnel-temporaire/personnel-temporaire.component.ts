import { Component, OnInit } from '@angular/core';
import { PersonnelModel } from '../../personnel.model';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { PersonnelService } from '../../services/personnel.service';
import { EntrepriseService } from '../../../../admin/entreprise/entreprise.service';

@Component({
  selector: 'ngx-personnel-temporaire',
  templateUrl: './personnel-temporaire.component.html',
  styleUrls: ['./personnel-temporaire.component.scss']
})
export class PersonnelTemporaireComponent implements OnInit {

  ARCM: string;
  entreprises: any;
  personneltemporaire: PersonnelModel;
  constructor(private service: PersonnelService,
    private serviceEntreprise: EntrepriseService,
              private router: Router, 
              private windowRef: NbWindowRef) { }

  ngOnInit() {
    this.personneltemporaire = new PersonnelModel();
    let e = localStorage.getItem('e');
    if ( e === '0' ) {
      this.ARCM = 'Ajouter';
    }

    this.serviceEntreprise.getAllEnterprise().subscribe(data=>{
      this.entreprises= data;
    },
    error=>{
      console.log("error");
    })

    if ( e === '1' ) {
      let id = localStorage.getItem('idRC');
      this.ARCM = 'Modifier';
      this.service.getPersonnelById(+id).subscribe(
        data => { this.personneltemporaire = data; },
        error => { console.log('error'); }
      );
    }
  }



  onAddRCM() {
    let e = localStorage.getItem('e');
    if ( e === '0' ) {
      this.personneltemporaire.typeP="Temporaire"
      this.service.addPersonnel(this.personneltemporaire).subscribe(
          data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idRC');
          this.windowRef.close();
          this.router.navigate(['/pages/stock/refreshPersonnel']);
          },
          error => {console.log('error'); });
    }
    if ( e === '1' ) {
      this.service.updatePersonnel(this.personneltemporaire).subscribe(
          data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idRC');
          this.windowRef.close();
          this.router.navigate(['/pages/stock/refreshPersonnel']);
          },
          error => {console.log('error'); });
    }
  }
  onclose(){
    this.windowRef.close();
  }
}
