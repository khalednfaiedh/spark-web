import { Component,EventEmitter, OnInit, Input, Output } from '@angular/core';
import { NbWindowService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { PosteChargeService } from './poste-charge.service';
import { ModalPosteChargeComponent } from './modal-poste-charge/modal-poste-charge.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ViewCell } from 'ng2-smart-table';
import { CoutRevientComponent } from './cout-revient/cout-revient.component';
 

@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" size="xsmall" status="danger" value="Cout "/>\n' +
    '    </div>',
  })
export class ButtonCoutRevient implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private router: Router, private windowService: NbWindowService) {}
  onClick() {
 
    this.windowService.open(      CoutRevientComponent, { title: `  coût de revient  Poste  de Charge`,
    context:{ data:this.rowData } });  
  }
  }
@Component({
  selector: 'ngx-poste-charge',
  templateUrl: './poste-charge.component.html',
  styleUrls: ['./poste-charge.component.scss']
})
export class PosteChargeComponent implements OnInit {

  source=[]
    constructor(private windowService: NbWindowService,
      private route: ActivatedRoute,
      private   posteChargeService: PosteChargeService,
      private toastrService: NbToastrService)
      { }

  ngOnInit() {

    let etat = localStorage.getItem('etat')
    if( etat ==="Ligne")
    {
      let idLigne = localStorage.getItem('idLigne')
      console.log("ligne")
      console.log(idLigne)
      this.posteChargeService.getAllPosteChargeByLigne(+idLigne).subscribe(
        data=>{this.source=data}
      )
    }

    if( etat ==="Section")
    {
      let  idSection = localStorage.getItem('idSection')
      this.posteChargeService.getAllPosteChargeBySection(+idSection).subscribe(
        data=>{this.source=data}
      )
      console.log("section")
      console.log(idSection)
    }
    
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
            title: 'Réference',
            type: 'string',
            
          },
          designation:{
            title: 'Désignation',
            type: 'string',
          
          },
       
         

          capaciteTheorique:{
          title: 'Capacité théorique',
          type: 'number'
        },
        cofficientCapacite:{
          title: 'Cofficient Capacitée',
          type: 'number'
        },
         cout: {
          filter:false,
           title: 'Cout',
           type: 'custom',
           width:"10%",
           renderComponent: ButtonCoutRevient
          },
          
         
        
          
           
        },
      };


      add()
      {
        this.windowService.open(     ModalPosteChargeComponent, { title: `Créer  Poste  de Charge`,
      context:{etat:"add"  } });  

   
      }
      

     onDeleteConfirm(event): void {
        if (window.confirm(`Vous etes sure de supprimer ce    Poste  de  charge ?`)) {
          event.confirm.resolve(this.posteChargeService.deletePosteChargeById(event.data.id).subscribe(
            data => {
              
              this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "   Poste de charge est supprimer avec succéss")
            }),
          );
        } else {
          event.confirm.reject();
        }
      }
      onCustom(event) {
        if (event.action === 'showAction') {
           
          this.windowService.open(   ModalPosteChargeComponent,
            {
              title: 'Afficher les informations de ce       Poste de  charge',
              context: { data: event.data,
                         etat:'show',
                         disabled:true,
                        }
            });
        }
        if (event.action === 'editAction') {
          this.windowService.open( ModalPosteChargeComponent,
            {
              title: ' Modfier   les informations de ce    Poste de  charge  ',
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
