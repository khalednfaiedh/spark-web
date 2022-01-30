import { Component, OnInit } from '@angular/core';
import { NbWindowService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ModalSiteComponent } from './modal-site/modal-site.component';
import { SiteService } from './site.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
source=[]
  constructor(private windowService: NbWindowService,
     private toastrService: NbToastrService, 
     private  siteService:SiteService) { }

  ngOnInit() {

    let idEntreprise = localStorage.getItem('current_entreprise')
    this.siteService.getAllSiteByEntreprise(idEntreprise).subscribe(
      data=>{this.source=data;console.log(data)},
      err=>{console.log("err get liste site ")}
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
        
          
           
        },
      };


      addSite()
      {
        this.windowService.open( ModalSiteComponent, { title: `Créer un  site`,
      context:{etat:"add"} });  
      }
      

      onDeleteConfirm(event): void {
        if (window.confirm(`Vous etes sure de supprimer ce tarif?`)) {
          event.confirm.resolve(this.siteService.deleteSiteById(event.data.id).subscribe(
            data => {
              
              this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "Site est supprimer avec succéss")
            }),
          );
        } else {
          event.confirm.reject();
        }
      }
      onCustom(event) {
        if (event.action === 'showAction') {
           
          this.windowService.open( ModalSiteComponent,
            {
              title: 'Afficher les informations de ce   Site',
              context: { data: event.data,
                         etat:'show',
                         disabled:true}
            });
        }
        if (event.action === 'editAction') {
          this.windowService.open( ModalSiteComponent,
            {
              title: ' Modfier   les informations de ce   Site',
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
