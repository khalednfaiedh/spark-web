import { Component, OnInit } from '@angular/core';
import { FournisseurCategorieService } from './fournisseur-categorie.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbGlobalPhysicalPosition, NbWindowService, NbToastrService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { ModalFourniseurCategorieComponent } from './modal-fourniseur-categorie/modal-fourniseur-categorie.component';
import { ModalGammeOperatoireComponent } from '../../gpao/gamme-operatoire/modal-gamme-operatoire/modal-gamme-operatoire.component';

@Component({
  selector: 'ngx-fournisseur-categorie',
  templateUrl: './fournisseur-categorie.component.html',
  styleUrls: ['./fournisseur-categorie.component.scss']
})
export class FournisseurCategorieComponent implements OnInit {

  source: any;
 
  constructor(private service: FournisseurCategorieService,
    private windowService: NbWindowService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService) { }

 

  ngOnInit() {
    let id = localStorage.getItem('current_entreprise')
      this.service.getAll(+id).subscribe(
        data => { this.source = data;  },
        error => { console.log(error); },
      );
    
   
  }
  settings = {
    actions :{
        position: 'right',
        custom: [
          
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
          
          name:{
            title: 'Nom',
            type: 'string',
             
            sortDirection: 'asc'
            
          },
          categorieFournisseur:{
            title: 'Catégorie Parent',
            type: 'number',
            filter: true,
            valuePrepareFunction( cell) {

              if(cell != null)
              {
                return cell.name
              }
              else
              return "";
              
            }
            
          },
          
       
         
 

        
         

          
        // },
       
         
          
           
        },
      };


  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette catégorie ?`)) {
      event.confirm.resolve(this.service.delete(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }


  onCustom(event) {
    if (event.action === 'showAction') {
       
      this.windowService.open(  ModalFourniseurCategorieComponent,
        {
          title: 'Afficher les informations de ce    Catégorie Fournisseur',
          context: { data: event.data,
                     etat:'show',
                     disabled:true,
                    }
        });
    }
    if (event.action === 'editAction') {
      this.windowService.open( ModalFourniseurCategorieComponent,
        {
          title: ' Modfier   les informations de ce     Catégorie Fournisseur ',
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


  add()
  {
    this.windowService.open(    ModalFourniseurCategorieComponent, { title: `Créer Catégorie Fournisseur`,
  context:{etat:"add" , } });  
  }
  
   

}
