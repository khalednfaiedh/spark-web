import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
 
import { Router, ActivatedRoute } from '@angular/router';
import { NbWindowService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ModalIlotComponent } from './modal-ilot/modal-ilot.component';
import { IlotService } from './ilot.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" size="xsmall" status="success" value="section"/>\n' +
    '    </div>',
  })
export class ButtonSection implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private router: Router, private windowService: NbWindowService) {}
  onClick() {
 
            this.router.navigate(['/pages/gpao/sections',this.rowData.id]);
  }
  }
@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" size="xsmall" status="danger" value="ligne"/>\n' +
    '    </div>',
  })
export class ButtonLigne implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private router: Router, private windowService: NbWindowService) {}
  onClick() {
 
            this.router.navigate(['/pages/gpao/lignes',this.rowData.id]);
  }
  }
@Component({
  selector: 'ngx-ilot',
  templateUrl: './ilot.component.html',
  styleUrls: ['./ilot.component.scss']
})
export class IlotComponent implements OnInit {
id:number
source=[]
  constructor(private windowService: NbWindowService,
    private route: ActivatedRoute,
    private ilotService:IlotService,
    private toastrService: NbToastrService)
    { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.ilotService.getAllIlotByAtelier(+this.id).subscribe(
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
         ligne: {
          filter:false,
           title: 'Ligne',
           type: 'custom',
           width:"10%",
           renderComponent: ButtonLigne
          },
           section: {
            filter:false,
             title: 'Séction',
             type: 'custom',
             width:"10%",
             renderComponent: ButtonSection
            },
        
          
           
        },
      };


      add()
      {
        this.windowService.open(   ModalIlotComponent, { title: `Créer un    Ilot`,
      context:{etat:"add" , id:this.id} });  
      }
      

     onDeleteConfirm(event): void {
        if (window.confirm(`Vous etes sure de supprimer ce   ilot ?`)) {
          event.confirm.resolve(this.ilotService.deleteIlotById(event.data.id).subscribe(
            data => {
              
              this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "  ilot est supprimer avec succéss")
            }),
          );
        } else {
          event.confirm.reject();
        }
      }
      onCustom(event) {
        if (event.action === 'showAction') {
           
          this.windowService.open(  ModalIlotComponent,
            {
              title: 'Afficher les informations de ce     Ilot',
              context: { data: event.data,
                         etat:'show',
                         disabled:true,
                        id:this.id}
            });
        }
        if (event.action === 'editAction') {
          this.windowService.open( ModalIlotComponent,
            {
              title: ' Modfier   les informations de ce    ilot ',
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
