import { Component, OnInit } from '@angular/core';
import { ShowCategorieMachineComponent } from './show-categorie-machine/show-categorie-machine.component';
import { NbWindowService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { CategorieMachineService } from './categorie-machine.service';
import { ModalCategorieMachineComponent } from './modal-categorie-machine/modal-categorie-machine.component';

@Component({
  selector: 'ngx-categorie-machine',
  templateUrl: './categorie-machine.component.html',
  styleUrls: ['./categorie-machine.component.scss']
})
export class CategorieMachineComponent implements OnInit {
  source: any;
 
  constructor(private service: CategorieMachineService, private windowService: NbWindowService,
     private translate: TranslateService) { }

  ngOnInit() {
    let id= localStorage.getItem('current_entreprise')
    this.service.getAllCategorieMByEntreoriseId (+id).subscribe(data=>{
      this.source = data;
    },
    error=>{ console.log("error"); })   
     
      this.settings.actions.custom.push({
        name: 'editAction',
        title: '<i class="nb-edit" title="Edit"></i>',
      },);
      this.settings.actions.delete= true; 
      this.settings.actions.custom.push({
        name: 'showAction',
        title: '<i class="nb-sunny" title="Show"></i>',
      },);
    
  }

  settings = {
    noDataMessage: this.translate.instant('datatable.noDataMessage'),
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
    actions: {
      add: false,
      edit: false,
      delete:false,
      position: 'right',
      custom: [
      ],
    },

    columns: {
      nom: {
        title: 'Name',
        type: 'string',
      },
    },
  };
  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idCategorie');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalCategorieMachineComponent, {title:this.translate.instant('categoryM.add')}
      );
  }

  onDeleteConfirm(event): void {
    if (window.confirm(this.translate.instant('categoryM.delete'))) {
      event.confirm.resolve(this.service.deleteCategorieM(event.data.id).subscribe(
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
      localStorage.removeItem('idCategorie');
      localStorage.setItem('idCategorie' , event.data.id);
      localStorage.setItem('e', '1');
      this.windowService.open(ModalCategorieMachineComponent, {title:this.translate.instant('categoryM.edit')});
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idCategorie');
      localStorage.setItem('idCategorie' , event.data.id);
      this.windowService.open(ShowCategorieMachineComponent, {title:this.translate.instant('categoryM.show')});
      console.log('show');
    }
  }

}
