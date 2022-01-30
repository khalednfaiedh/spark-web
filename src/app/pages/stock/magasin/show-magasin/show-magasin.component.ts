import { EmplacementService } from './../../emplacement/services/emplacement.service';
import { LocalDataSource } from 'ng2-smart-table';
import { MagasinService } from './../services/magasin.service';
import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { EntrepriseService } from '../../../admin/entreprise/entreprise.service';
import { EmployeListService } from '../../../admin/employe-list/employe-list.service';
import { EmployeMinModel } from '../../../admin/employe-list/employe-list.model';

@Component({
  selector: 'ngx-show-magasin',
  templateUrl: './show-magasin.component.html',
  styleUrls: ['./show-magasin.component.scss']
})
export class ShowMagasinComponent implements OnInit {
  id= localStorage.getItem("idRC")
  magasin: any = new Object()
  source:LocalDataSource=new LocalDataSource();
  responsable : string
  constructor(private serviceMagasin: MagasinService,
    private serviceEmploye: EmployeListService,
    public windowRef : NbWindowRef,private serviceEmp : EmplacementService) { }

  ngOnInit() {


    this.serviceMagasin.getMagasinByID(+this.id).subscribe(magasin=>{
      this.magasin=magasin
      this.serviceEmploye.getEmployeMinById(this.magasin.idEmploye).subscribe(e => {this.responsable = e.matriculeNomPrenom})
      this.serviceEmp.getEmplacementByIdMagasin(+this.id).subscribe(emps=>{
        this.source=new LocalDataSource(emps)
      })
      
    })
  }
  settings = {
    actions: {
      edit:false,
      delete:false,
      add: false,
      position: 'right',
    },
   
      
      columns: {
        ref: {
          title: 'Référence',
          type: 'string',
          filter: false ,
        },
        nameEmplacement: {
          title: 'Libellé',
          type: 'string',
          filter: false ,
          width:'20vw'
        },
        largeurEmplacement: {
          title: 'Largeur(m)',
          type: 'number',
          filter: false,
        },
        longeurEmplacement: {
          title: 'Longeur(m)',
          type: 'number',
          filter: false,
        },
        hauteurEmplacement: {
          title: 'Hauteur(m)',
          type: 'number',
          filter: false,
        }
      }
  }
  close(){
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    this.windowRef.close();
  }

}
