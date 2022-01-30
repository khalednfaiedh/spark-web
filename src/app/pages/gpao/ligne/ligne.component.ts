import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { NbWindowService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { LigneService } from '../ligne/ligne.service';
import { ModalLigneComponent } from './modal-ligne/modal-ligne.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ViewCell } from 'ng2-smart-table';
 
@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" size="xsmall" status="success" value="Poste Charge"/>\n' +
    '    </div>',
  })
export class ButtonPosteCharge01 implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private router: Router, private windowService: NbWindowService) {}
  onClick() {
 
            localStorage.setItem('etat','Ligne')
            localStorage.setItem('idLigne',this.rowData.id)
            this.router.navigate(['/pages/gpao/posteCharge' ]);
  }
  }
@Component({
  selector: 'ngx-ligne',
  templateUrl: './ligne.component.html',
  styleUrls: ['./ligne.component.scss']
})
export class LigneComponent implements OnInit {

  id:number
  source=[]
    constructor(private windowService: NbWindowService,
      private route: ActivatedRoute,
      private  ligneService:LigneService,
      private toastrService: NbToastrService)
      { }
  
    ngOnInit() {
      this.id = this.route.snapshot.params['id'];
  
      this.ligneService.getAllLigneByIlot(+this.id).subscribe(
        data=>{this.source=data;console.log(data)}
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
           poste: {
            filter:false,
             title: 'Séction',
             type: 'custom',
             width:"10%",
             renderComponent: ButtonPosteCharge01
            },
           
          
            
             
          },
        };
  
  
        add()
        {
          this.windowService.open(    ModalLigneComponent, { title: `Créer un     Ligne`,
        context:{etat:"add" , id:this.id} });  
        }
        
  
       onDeleteConfirm(event): void {
          if (window.confirm(`Vous etes sure de supprimer ce   ligne ?`)) {
            event.confirm.resolve(this.ligneService.deleteLigneById(event.data.id).subscribe(
              data => {
                
                this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "  ligne est supprimer avec succéss")
              }),
            );
          } else {
            event.confirm.reject();
          }
        }
        onCustom(event) {
          if (event.action === 'showAction') {
             
            this.windowService.open(   ModalLigneComponent,
              {
                title: 'Afficher les informations de ce      Ligne',
                context: { data: event.data,
                           etat:'show',
                           disabled:true,
                          id:this.id}
              });
          }
          if (event.action === 'editAction') {
            this.windowService.open( ModalLigneComponent,
              {
                title: ' Modfier   les informations de ce    ligne ',
                context: { data: event.data,
                           etat:'edit',
                           disabled:false,
                           id:this.id
                          
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
