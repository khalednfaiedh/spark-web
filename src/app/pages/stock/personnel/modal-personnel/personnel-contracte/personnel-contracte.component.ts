import { Component, OnInit } from '@angular/core';
import { PersonnelModel } from '../../personnel.model';
import { PersonnelService } from '../../services/personnel.service';
import { NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { EntrepriseService } from '../../../../admin/entreprise/entreprise.service';

@Component({
  selector: 'ngx-personnel-contracte',
  templateUrl: './personnel-contracte.component.html',
  styleUrls: ['./personnel-contracte.component.scss']
})
export class PersonnelContracteComponent implements OnInit {

  ARCM: string;
  personnelContracte: PersonnelModel;
  entreprises: any;
  constructor(private service: PersonnelService,
    private serviceEntreprise: EntrepriseService,
              private router: Router, private windowRef: NbWindowRef) { }

  ngOnInit() {
    this.personnelContracte = new PersonnelModel();
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
        data => { this.personnelContracte = data; },
        error => { console.log('error'); }
      );
    }
  }



  onAddRCM() {
    let e = localStorage.getItem('e');
    if ( e === '0' ) {
      this.personnelContracte.typeP="Contracté"
      this.service.addPersonnel(this.personnelContracte).subscribe(
          data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idRC');
          this.windowRef.close();
          this.router.navigate(['/pages/stock/refreshPersonnel']);
          },
          error => {console.log('error'); });
    }
    if ( e === '1' ) {
      this.service.updatePersonnel(this.personnelContracte).subscribe(
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
