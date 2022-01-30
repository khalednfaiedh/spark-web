import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { MagasinService } from '../services/magasin.service';
import { Router } from '@angular/router';
import { EmployeListService } from '../../../admin/employe-list/employe-list.service';
import { PagesComponent } from '../../../pages.component';
import { AdminComponent } from '../../../admin/admin.component';

@Component({
  selector: 'ngx-modal-magasin',
  templateUrl: './modal-magasin.component.html',
  styleUrls: ['./modal-magasin.component.scss']
})
export class ModalMagasinComponent implements OnInit {
  magasin:any= new Object();
  ARCM:string="";
  entreprises: any;
  e= localStorage.getItem('e');
  source: any
  sommeSurface: number =0 
  employees: any;
  PAYS = AdminComponent.PAYES_LIST
  idEntr = localStorage.getItem('current_entreprise')

  constructor(public windowRef : NbWindowRef,
              private router: Router,  private employeeService:EmployeListService,
              private serviceMagasin:MagasinService) { }
  ngOnInit() {    
    this.magasin.emplacementMagasin=[]
    this.source= this.magasin.emplacementMagasin
    if (this.e==='0'){
      this.ARCM="Ajouter"
    }

    this.employeeService.getEmployesMinbyEntreprise(+this.idEntr).subscribe(
      data=>{this.employees=data;console.log(data)},
      err=>{console.log('err employee')}
    )
  }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
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
      },
    },
  };
  
  close(){
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    this.windowRef.close();
  }
  
  addEmplacement(event) {
    let t=0;
    event.confirm.resolve()
  }
  onDeleteConfirm(event): void {
    event.confirm.resolve(
       this.source.filter(p => p !== event.data)  
    );
  }

  onAddRCM() { 
    let accept=true
    this.sommeSurface=0
    for (let i =0 ; i<this.magasin.emplacementMagasin.length;i++){
      if (this.magasin.emplacementMagasin[i].hauteurEmplacement>this.magasin.hauteurMagasin){
        accept=false
        break
      }
      
      this.sommeSurface+=this.magasin.emplacementMagasin[i].surfaceEmplacement;
    }
    console.log(this.sommeSurface)
    if (this.sommeSurface>this.magasin.surfaceMagasin){
      alert("Surface des emplacements supérieur à la surface du magasin ")
    }
    if(accept==false){
      alert("Hauteur d'emplacement supérieur à l'hauteur du magasin")
    }
    else{
      this.magasin.idEntreprise = this.idEntr
      this.serviceMagasin.addMagasin(this.magasin).subscribe(
        data => { 
          localStorage.removeItem('e');
          this.router.navigate(['/pages//stock/refreshMagasin']);
          this.windowRef.close(); 
        },
        error => {
          console.log(error);
        });
      }
    }   
}