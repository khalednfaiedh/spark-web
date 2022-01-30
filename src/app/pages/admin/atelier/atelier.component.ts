import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { ModalAtelierComponent } from './modal-atelier/modal-atelier.component';
import { NbWindowService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { SiteService } from '../entreprise/site/site.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { AtelierService } from './atelier.service';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';



@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" size="xsmall" status="success" value="Ilot"/>\n' +
    '    </div>',
  })
export class ButtonIlot implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private router: Router, private windowService: NbWindowService) {}
  onClick() {
 
            this.router.navigate(['/pages/gpao/ilots',this.rowData.id]);
  }
  }
@Component({
  selector: 'ngx-atelier',
  templateUrl: './atelier.component.html',
  styleUrls: ['./atelier.component.scss']
})
export class AtelierComponent implements OnInit {

  source=[]
  constructor(private windowService: NbWindowService,
     private toastrService: NbToastrService, 
     private  siteService:SiteService,
     private ateleirService:AtelierService) { }

  ngOnInit() {

    let id = localStorage.getItem('current_entreprise');

    this.ateleirService.getAllAtelier(id).subscribe(

      data=>{this.source=data},
      err=>{}
    )
  }

  settings = {
    actions :{
        position: 'right',
        
        custom: [
          {
            name: 'showAction',
            title: '<i class="nb-sunny" title="Show"></i>',
          },
          {
            name: 'editAction',
            title: '<i class="nb-edit" title="Edit"></i>',
    
          },
        ],
          add: false,
          edit: false,
    },
        delete: {
          deleteButtonContent: '<i class="nb-trash"></i>',
          confirmDelete: true,
        },
        columns: {
          
           code:{
            title: 'Référence',
            type: 'string',
            
          },
          designation:{
            title: 'Désignation',
            type: 'string',
          
          },
       
         

        dateCreation:{
          title: 'Date Création',
          type: 'string'
        },
         ilot: {
         filter:false,
          title: 'Ilots',
          type: 'custom',
          width:"10%",
          renderComponent: ButtonIlot
         },
        
          
           
        },
      };


      add()
      {
        this.windowService.open(  ModalAtelierComponent, { title: `Créer un   Atelier`,
      context:{etat:"add"} });  
      }
      

      onDeleteConfirm(event): void {
        if (window.confirm(`Vous etes sure de supprimer ce  Atelier?`)) {
          event.confirm.resolve(this.ateleirService.deleteAtelierById(event.data.id).subscribe(
            data => {
              
              this.showToast(NbToastStatus.SUCCESS, "SUCCESS", " Atelier est supprimer avec succéss")
            }),
          );
        } else {
          event.confirm.reject();
        }
      }
      onCustom(event) {
        if (event.action === 'showAction') {
           
          this.windowService.open( ModalAtelierComponent,
            {
              title: 'Afficher les informations de ce    Atelier',
              context: { data: event.data,
                         etat:'show',
                         disabled:true}
            });
        }
        if (event.action === 'editAction') {
          this.windowService.open( ModalAtelierComponent,
            {
              title: ' Modfier   les informations de ce    Atelier',
              context: { data: event.data,
                         etat:'edit',
                         disabled:false,
                        
                       }
            });
        }
      }

      private showToast(type: NbToastStatus, title: string, body: string) {
        const config = {
          status: type,
          destroyByClick: true,
          duration: 20000,
          hasIcon: true,
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          preventDuplicates: false
        };
        const titleContent = title ? ` ${title}` : "";
        this.toastrService.show(body, `${titleContent}`, config);
      }

}
