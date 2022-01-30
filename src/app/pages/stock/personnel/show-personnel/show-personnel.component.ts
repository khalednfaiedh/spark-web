import { Component, OnInit } from '@angular/core';
import { PersonnelModel } from '../personnel.model';
import { PersonnelService } from '../services/personnel.service';
import { NbWindowRef } from '@nebular/theme';
import { EntrepriseService } from '../../../admin/entreprise/entreprise.service';

@Component({
  selector: 'ngx-show-personnel',
  templateUrl: './show-personnel.component.html',
  styleUrls: ['./show-personnel.component.scss']
})
export class ShowPersonnelComponent implements OnInit {
  entreprises: any;
  personnelContracte: PersonnelModel;
  constructor(public service: PersonnelService,
    private serviceEntreprise: EntrepriseService,
    public windowRef: NbWindowRef) { }
  ngOnInit() {
    this.serviceEntreprise.getAllEnterprise().subscribe(data => {
      this.entreprises = data;
    },
      error => { console.log('error'); }
    );
    let id = localStorage.getItem('idRC');
    this.personnelContracte = new PersonnelModel();
    this.service.getPersonnelById(+id).subscribe(
      data => { this.personnelContracte = data; },
      error => { console.log('error'); }
    );
  }
  onclose() {
    this.windowRef.close();
  }
}
