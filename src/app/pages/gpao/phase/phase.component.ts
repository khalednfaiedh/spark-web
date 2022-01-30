import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Phase } from './phase';
import { PhaseService } from './phase.service';
import { NbWindowService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewCell } from 'ng2-smart-table';
import { ModalPhaseComponent } from './modal-phase/modal-phase.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { GammeOperatoire } from '../gamme-operatoire/gammeOperatoire';
import { GammeOperatoireService } from '../gamme-operatoire/gamme-operatoire.service';
@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" size="xsmall" status="success" value="Opération"/>\n' +
    '    </div>',
  })
export class  ButtonOperation02 implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {

    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private router: Router, private windowService: NbWindowService) {}
  onClick() {
 

    localStorage.setItem('idPhase',this.rowData.id)
    this.router.navigate(['/pages/gpao/operation',])
            
  }
  }
@Component({
  selector: 'ngx-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.scss']
})
export class PhaseComponent implements OnInit {
  gammes:GammeOperatoire[]=[]
  source:Phase[]=[];
  idGamme:number
  constructor(private  phaseService: PhaseService,
    private windowService: NbWindowService,
    private route: ActivatedRoute,
    private gammeOperatoireService:GammeOperatoireService,
    private toastrService: NbToastrService) { }

  ngOnInit() {

    let id = localStorage.getItem('current_entreprise')
    this.gammeOperatoireService.getAllGammeOperatoireByEntreprise(+id).subscribe(
      data=>{this.gammes=data;console.log(data)}
    )


    let idGamme=localStorage.getItem('idGamme')
    localStorage.removeItem('idGamme')

    if( +idGamme !== null)
    {
      this.getPhaseByGammeId(idGamme);
    }

 
    // )
  }

getPhaseByGammeId(id)

{
  console.log(id)
  this.phaseService.getAllPhaseByGamme(+id).subscribe(

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
       
         

          gammeOperatoire:{
          title: 'Gamme',
          type: 'string',
          filtre:true,
          valuePrepareFunction(cell){
            return cell.designation
          },

        
         

          
         },
       
         operation: {
          filter:false,
           title: 'Opération',
           type: 'custom',
           width:"10%",
           renderComponent: ButtonOperation02
          },
          
           
        },
      };

      add()
      {
        this.windowService.open(     ModalPhaseComponent, { title: `Créer un      Phase`,
      context:{etat:"add" , } });  
      }
      

     onDeleteConfirm(event): void {
        if (window.confirm(`Vous etes sure de supprimer ce     Phase ?`)) {
          event.confirm.resolve(this.phaseService.deletePhaseById  (event.data.id).subscribe(
            data => {
              
              this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "    Phase   supprimer avec succéss")
            }),
          );
        } else {
          event.confirm.reject();
        }
      }
      onCustom(event) {
        if (event.action === 'showAction') {
           
          this.windowService.open(  ModalPhaseComponent,
            {
              title: 'Afficher les informations de ce       Phase',
              context: { data: event.data,
                         etat:'show',
                         disabled:true,
                        }
            });
        }
        if (event.action === 'editAction') {
          this.windowService.open( ModalPhaseComponent,
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
