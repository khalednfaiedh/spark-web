import { Component, OnInit } from '@angular/core';
import { ModalMachineComponent } from './modal-machine/modal-machine.component';
import { ShowMachineComponent } from './show-machine/show-machine.component';
import { NbWindowService } from '@nebular/theme';
import { MachineService } from './machine.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {
  source: any;
  add= true;
    constructor(private windowService: NbWindowService, private service: MachineService,
      private translate: TranslateService) { }
  
    ngOnInit() {
      let idEntreprise= localStorage.getItem('current_entreprise')
      this.service.getAllMachinesByEntreprise(+idEntreprise).subscribe(data=>{
        this.source = data;
        console.log(this.source);
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
          
          
        ],
      },
      columns: {
        reference: {
          title: 'Réference',
          type: 'string',
          filter: true,
        }, 
        marque: {
          title: 'Maque',
          type: 'string',
          filter: true,
        },
        modele: {
          title: 'Modele',
          type: 'string',
          filter: true,
        },
        numSerie: {
          title: 'Numeor de Serie',
          type: 'string',
          filter: true,
        },
        fonction: {
          title: 'Fonction',
          type: 'string',
          filter: true,
        },
      },
    };
  
  
    openWindow() {
      localStorage.removeItem('e');
      localStorage.removeItem('idMachine');
      localStorage.setItem('e', '0');
  
      this.windowService.open(ModalMachineComponent,
        {title:this.translate.instant('machine.add')});
    }
  
    onCustom(event) {
      if (event.action === 'showAction') {
        localStorage.removeItem('e');
        localStorage.removeItem('idMachine');
        localStorage.setItem('idMachine', event.data.id);
        this.windowService.open(ShowMachineComponent,
          {title:this.translate.instant('machine.show'),
            context: event.data.id});
      }
      if (event.action === 'editAction') {
        localStorage.removeItem('e');
        localStorage.removeItem('idMachine');
        localStorage.setItem('e', '1');
        localStorage.setItem('idMachine', event.data.id);
        this.windowService.open(ModalMachineComponent,
          {title:this.translate.instant('machine.edit'), context: event.data.id});
      }
    }
  
    onDeleteConfirm(event): void {
      if (window.confirm(this.translate.instant('machine.delete'))) {
        event.confirm.resolve(this.service.deleteMachine(event.data.id).subscribe(
          data => {
            this.source.filter(p => p !== event.data);
          }),
        );
      } else {
        event.confirm.reject();
      }
    }

}
