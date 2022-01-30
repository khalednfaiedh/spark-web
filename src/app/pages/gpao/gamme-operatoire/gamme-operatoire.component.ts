import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { GammeOperatoire } from './gammeOperatoire';
import { GammeOperatoireService } from './gamme-operatoire.service';
import { ViewCell } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { NbWindowService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { ModalGammeOperatoireComponent } from './modal-gamme-operatoire/modal-gamme-operatoire.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" size="xsmall" status="success" value="phase"/>\n' +
    '    </div>',
  })
export class  ButtonOperation implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {

    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private router: Router, private windowService: NbWindowService) {}
  onClick() {
 
 
    localStorage.setItem('idGamme',this.rowData.id)
    this.router.navigate(['/pages/gpao/phase'])
            
  }
  }
@Component({
  selector: 'ngx-gamme-operatoire',
  templateUrl: './gamme-operatoire.component.html',
  styleUrls: ['./gamme-operatoire.component.scss']
})
export class GammeOperatoireComponent implements OnInit {
  source:GammeOperatoire[]=[];
  constructor(private gammeOperatoireService:GammeOperatoireService,
    private windowService: NbWindowService,
    private route: ActivatedRoute,
    
    private toastrService: NbToastrService) { }

  ngOnInit() {

    let id = localStorage.getItem('current_entreprise')
    this.gammeOperatoireService.getAllGammeOperatoireByEntreprise(+id).subscribe(
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
          
          reference:{
            title: 'Référence',
            type: 'string',
             
            sortDirection: 'asc'
            
          },
          designation:{
            title: 'Désignation',
            type: 'string',
          
          },
       
         

        //   type:{
        //   title: 'Type',
        //   type: 'string'
        
         

          
        // },
        modeGestion:{
          title: 'Mode Géstion',
          type: 'number',
          filter: true,
          
        },
         operation: {
          filter:false,
           title: 'Opération',
           type: 'custom',
           width:"10%",
           renderComponent: ButtonOperation
          },
          
           
        },
      };

      add()
      {
        this.windowService.open(    ModalGammeOperatoireComponent, { title: `Créer un   Gammes Opératoire`,
      context:{etat:"add" , } });  
      }
      

     onDeleteConfirm(event): void {
        if (window.confirm(`Vous etes sure de supprimer ce    Gamme ?`)) {
          event.confirm.resolve(this.gammeOperatoireService.deleteGammeOperatoireById (event.data.id).subscribe(
            data => {
              
              this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "   Gamme   supprimer avec succéss")
            }),
          );
        } else {
          event.confirm.reject();
        }
      }
      onCustom(event) {
        if (event.action === 'showAction') {
           
          this.windowService.open(  ModalGammeOperatoireComponent,
            {
              title: 'Afficher les informations de ce      Gamme',
              context: { data: event.data,
                         etat:'show',
                         disabled:true,
                        }
            });
        }
        if (event.action === 'editAction') {
          this.windowService.open( ModalGammeOperatoireComponent,
            {
              title: ' Modfier   les informations de ce     Gamme ',
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
