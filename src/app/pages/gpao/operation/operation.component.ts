import { Component, OnInit } from '@angular/core';
import { Phase } from '../phase/phase';
import { Operation } from './operation';
import { PhaseService } from '../phase/phase.service';
import { NbWindowService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { OperationService } from './operation.service';
import { ModalOperationComponent } from './modal-operation/modal-operation.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'ngx-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {

   phases: Phase[]=[]
  source: Operation[]=[];
  idphase:number
  constructor(private  phaseService: PhaseService,
    private windowService: NbWindowService,
    private route: ActivatedRoute,
    private operationService: OperationService,
    private toastrService: NbToastrService) { }

  ngOnInit() {

    let id = localStorage.getItem('current_entreprise')
    this.phaseService.getAllPhaseByEntreprise(+id).subscribe(
      data=>{this.phases=data ;console.log(data) },
      err=>{console.log('errr')}
    )

    let idPhase=localStorage.getItem('idPhase')
    localStorage.removeItem('idPhase')

    if( +idPhase !== null)
    {
      

      this.operationService.getAllOperationByPhase(+idPhase).subscribe(

        data=>{this.source=data}
      )
    }
    
    
    

     
     

 
    // )
  }

  getOperationByPhaseId(id)
  {

    this.operationService.getAllOperationByPhase(+id).subscribe(

      data=>{this.source=data}
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
          
           numero:{
            title: 'numéro',
            type: 'number',
             
            sortDirection: 'asc'
            
          },
          priorite:{
            title: '  Priorité',
            type: 'number',
            filter: true,
            
          },
          designation:{
            title: 'Désignation',
            type: 'string',
          
          },
       
         

          // gammeOperatoire:{
          // title: 'Gamme',
          // type: 'string',
          // filtre:true,
          // valuePrepareFunction(cell){
          //   return cell.designation
          // },

        
         

          
        // },
       
         
          
           
        },
      };

      add()
      {
        this.windowService.open(      ModalOperationComponent, { title: `Créer un       operation`,
      context:{etat:"add" , } });  
      }
      

     onDeleteConfirm(event): void {
        if (window.confirm(`Vous etes sure de supprimer ce    opération ?`)) {
          event.confirm.resolve(this.operationService.deleteOperationById (event.data.id).subscribe(
            data => {
              
              this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "     opération   supprimer avec succéss")
            }),
          );
        } else {
          event.confirm.reject();
        }
      }
      onCustom(event) {
        if (event.action === 'showAction') {
           
          this.windowService.open(  ModalOperationComponent,
            {
              title: 'Afficher les informations de ce       opération',
              context: { data: event.data,
                         etat:'show',
                         disabled:true,
                        }
            });
        }
        if (event.action === 'editAction') {
          this.windowService.open( ModalOperationComponent,
            {
              title: ' Modfier   les informations de ce   opération    ',
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
