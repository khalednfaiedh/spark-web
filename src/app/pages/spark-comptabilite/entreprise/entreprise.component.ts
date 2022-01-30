import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { EntrepriseService, Entreprise } from './entreprise.service';
import { ModalEntrepriseComponent } from './modal-entreprise/modal-entreprise.component';
import { ShowEntrepriseComponent } from './show-entreprise/show-entreprise.component';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" name="exercice" value="Exercices"/>\n' +
    '    </div>',
  })
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService,
              private router: Router,) {
                
  }
  onClick() {
    console.log(this.rowData.id);
    localStorage.setItem('idEntreprise',this.rowData.enterpriseId);
    this.router.navigate(['/pages/comptabilite/exercice']);
  
  }
  }
@Component({
  selector: 'ngx-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss']
})
export class EntrepriseComponent implements OnInit {

  constructor(private windowService: NbWindowService,
    private entrepriseService : EntrepriseService,) { }

    source:any
    entreprise = new Entreprise

  ngOnInit() {

    this.entrepriseService.getAllEnterprise().subscribe(
      data => {this.source = data;
              },
      error => {console.log(error);}
      );
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
          // {
          //   name: 'deleteAction',
          //   title: '<i class="nb-trash" title="Delete"></i>',
          // }, 
        ],
          add: false,
          edit: false,
    },
        add: {
          addButtonContent: '<i class="nb-plus"></i>',
          createButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
          editButtonContent: '<i class="nb-edit"></i>',
          saveButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
          deleteButtonContent: '<i class="nb-trash"></i>',
          confirmDelete: true,
        },
        columns: {
          socialReason:{
            title: 'Raison Sociale',
            type: 'string'
          },
          juridicForm:{
            title: 'Forme Juridique',
            type: 'string',
          },
          nature:{
            title: 'Nature',
            type: 'string'
          },
        
        // capital:{
        //   title: 'Capital',
        //   type: 'number',
        //   valuePrepareFunction: (value, row) => 
        //   { return value === 'Total'? value : Intl.NumberFormat('en-US',{style:'currency', currency: row.money
        //   // this.data.forEach(element => {return element.money;})
        //     }).format(value)}
        // },
         exercice: {
          title: 'Exercices',
          type: 'custom',
          
          renderComponent: ButtonViewComponent
         }
        // entEmail:{
        //   title: 'E-mail',
        //   type: 'string'
        // },
        //   telephone:{
        //     title: 'Tel',
        //     type: 'number'
        //   },
          // activity:{
          //   title: 'Activité',
          //   type: 'string'
          // },
        },
      };

      
         addDossier() {
          localStorage.setItem("e","0");
          this.windowService.open(ModalEntrepriseComponent, { title: `Créer un dossier` });  
        }

        onDeleteConfirm(event):void {
          if (window.confirm(`Vous êtes sûre de vouloir supprimer ce Dossier?`)) {
            console.log(event.data.enterpriseId);
            event.confirm.resolve(this.entrepriseService.deleteEnterprise(event.data.enterpriseId).subscribe(
              data => {this.source.filter(p => p !== event.data);},
              error => {console.log(error);})
            );
          } else {
            event.confirm.reject();
          }
        }    
        onCustom(event): any {
          if (event.action === 'editAction') {
            console.log(event.data.id);
            localStorage.setItem("e", "1");
            localStorage.setItem('idEntreprise',event.data.enterpriseId.toString());
            this.windowService.open(ModalEntrepriseComponent, {title: 'Modifier Dossier', context: event.data.id});
          }
          if (event.action === 'showAction') {
            console.log(event.data.id);
            localStorage.setItem('idEntreprise',event.data.enterpriseId.toString());
            this.windowService.open( ShowEntrepriseComponent, {title: 'Afficher Dossier', context: event.data.id});
          }
        }

}
