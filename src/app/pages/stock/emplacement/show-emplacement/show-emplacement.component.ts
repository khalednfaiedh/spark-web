import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { EmplacementService } from '../services/emplacement.service';

@Component({
  selector: 'ngx-show-emplacement',
  templateUrl: './show-emplacement.component.html',
  styleUrls: ['./show-emplacement.component.scss']
})
export class ShowEmplacementComponent implements OnInit {
  id= localStorage.getItem("IdRC");
  emplacement: any = new Object() ;
  source: LocalDataSource = new LocalDataSource() ;
  constructor(public windowRef : NbWindowRef,
    private router: Router,private serviceEmplacement: EmplacementService) { }

  ngOnInit() {
    this.serviceEmplacement.getEmplacementByID(+this.id).subscribe(emplacement=>{
      this.emplacement = emplacement
      this.source = new LocalDataSource(emplacement.emplacements)
    })
  }
  
  settings = {
    actions: {
      add:false,
      edit:false,
      delete:false,
      position: 'right',
    },
    columns: {
      nameEmplacement: {
        title: 'Identifiant',
        type: 'string',
        filter: false,
      },
      largeurEmplacement: {
        title: 'Largeur',
        type: 'number',
        filter: false,
      },
      longeurEmplacement: {
        title: 'Longeur',
        type: 'number',
        filter: false,
      },
      hauteurEmplacement: {
        title: 'Hauteur',
        type: 'number',
        filter: false,
      },
      surfaceEmplacement: {
        title: 'Surface',
        type: 'number',
        filter: false,
      },
      volumeEmplacement: {
        title: 'Volume',
        type: 'number',
        filter: false,
      },
    },
  };
  close(){
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    this.windowRef.close();
  }
}
