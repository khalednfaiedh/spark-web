import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { NbWindowService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { NomenclatureService } from './nomenclature.service';
import { ModalNomenclatureComponent } from './modal-nomenclature/modal-nomenclature.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ViewCell } from 'ng2-smart-table';
import { ViewGraphComponent } from './view-graph/view-graph.component';
 
@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" size="xsmall" status="success" value="Hiérarchie"/>\n' +
    '    </div>',
  })
export class viewGraphe implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private router: Router, private windowService: NbWindowService) {}
  onClick() {
 
 
    this.router.navigate(['/pages/gpao/viewGraphe',this.rowData.id])
            
  }
  }
@Component({
  selector: 'ngx-nomenclature',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.scss']
})
export class NomenclatureComponent implements OnInit {

  source=[]
  constructor(private windowService: NbWindowService,
    private route: ActivatedRoute,
    private  nomencltureService:  NomenclatureService,
    private toastrService: NbToastrService)
    { }

  ngOnInit() {
    
let id = localStorage.getItem('current_entreprise')
    this.nomencltureService.getAllNomenclatureByEntreprise(+id).subscribe(
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
       
         

          type:{
          title: 'Type',
          type: 'string'
        },
        produit:   {
          title: 'Produit',
          type: 'string',
          filter: true,
          valuePrepareFunction(cell){
            return cell.designation
          },

          
        },
         cout:{
          title: 'coût',
          type: 'number',
          filter: true,
          valuePrepareFunction(row,cell){
            return 0 +"TND"
          },
        },
        viewGhraphe: {
          filter:false,
           title: 'Hiérarchie',
           type: 'custom',
           width:"10%",
           renderComponent: viewGraphe
          },
          
           
        },
      };


      add()
      {
        this.windowService.open(    ModalNomenclatureComponent, { title: `Créer un     Nomenclature`,
      context:{etat:"add"  }}
      );  
      }
      

     onDeleteConfirm(event): void {
        if (window.confirm(`Vous etes sure de supprimer ce   ilot ?`)) {
          event.confirm.resolve(this.nomencltureService.deleteNomenclatureById(event.data.id).subscribe(
            data => {
              
              this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "   Nomenclature est supprimer avec succéss")
            }),
          );
        } else {
          event.confirm.reject();
        }
      }
      onCustom(event) {
        if (event.action === 'showAction') {
           
          this.windowService.open(  ModalNomenclatureComponent,
            {
              title: 'Afficher les informations de ce Nomenclature',
              context: { data: event.data,
                         etat:'show',
                         disabled:true,
                         }
            });
        }
        if (event.action === 'editAction') {
          this.windowService.open( ModalNomenclatureComponent,
            {
              title: ' Modfier   les informations de ce     Nomenclature ',
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
