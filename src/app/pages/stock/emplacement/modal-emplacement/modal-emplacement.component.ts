import { Component, Inject, OnInit } from '@angular/core';
import { EmplacementService } from '../services/emplacement.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { Magasin } from '../../magasin/magasin.model';
import { MagasinService } from '../../magasin/services/magasin.service';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';

@Component({
  selector: 'ngx-modal-emplacement',
  templateUrl: './modal-emplacement.component.html',
  styleUrls: ['./modal-emplacement.component.scss']
})
export class ModalEmplacementComponent implements OnInit {
  btn : string
  show :boolean 
  emplacement: any = new Object() ;
  magasins : Magasin[];
  source: LocalDataSource = new LocalDataSource() ;
  constructor(public windowRef : NbWindowRef, private magasinService : MagasinService,
    private router: Router,private serviceEmplacement: EmplacementService,
    @Inject(NB_WINDOW_CONTEXT) context
    ) {
      if (context.e === '0') {
        this.btn = 'Modifier'
        this.emplacement = context.emp
        this.show = false
      } 
       if (context.e === '1'){
        this.btn = 'Ajouter'
        this.show = false
      }
      if (context.e === '2'){
        this.show = true
      }
    }
  ngOnInit() {

    let idEntr = +localStorage.getItem('current_entreprise')
    this.magasinService.getMagasinByEntreprise(+idEntr).subscribe(
      data => {this.magasins = data},
      error => {console.log(error)}) 
  }
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
      mode:"external"
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
      mode:"inline"
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash" title="supprimer"></i>',
      confirmDelete: true,
    },
    actions: {
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
    },
  };
  close(){
    this.windowRef.close();
  }
save(){
  console.log( this.emplacement)
  this.serviceEmplacement.addEmplacement(this.emplacement).subscribe(
    data => {
      this.windowRef.close();
      this.router.navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["/pages/stock/emplacement"]));
    },
    error => {console.log(error)})
  }



  // addSousEmplacement(event){
  //   event.confirm.resolve()
  // }
  
  // modifie(){
  //   this.emplacement.isFinal=false;
  //   for (let i=0;i<this.emplacement.emplacements.length;i++){
  //     this.emplacement.emplacements[i].idMagasin=this.emplacement.idMagasin;
  //   }
    
  //   this.serviceEmplacement.updateEmplacement(this.emplacement.idEmplacement,this.emplacement).subscribe(data=>{
  //     this.serviceEmplacement.updateFinal(this.emplacement.idEmplacement,this.emplacement)
  //     localStorage.removeItem('e');
  //         this.router.navigate(['/pages/stock/refreshEmplacement']);
  //         this.windowRef.close();
  //   },
  //   error=>{
  //     console.log(error)
  //   })
  // }
  // onDeleteConfirm(event): void {
  //   if (window.confirm(`Vous etes sure de supprimer cet emplacement?`)) {
  //     event.confirm.resolve(this.serviceEmplacement.deleteEmplacement(event.data.idEmplacement).subscribe(
  //       data => {
  //         this.source.remove(event)
  //       }),
  //     );
  //   } else {
  //     event.confirm.reject();
  //   }
  // }


}
