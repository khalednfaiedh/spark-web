import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { EntrepriseService } from '../entreprise.service';
import { ModalEntrepriseComponent } from './modal-entreprise/modal-entreprise.component';
import { ShowEntrepriseComponent } from './show-entreprise/show-entreprise.component';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthoritiesEntreprise } from '../../../../authorisation/authoritiesEntreprise';
import { AuthoritiesCoordonneesBancaire } from '../../../../authorisation/authorities-coordonnees-bancaire';
@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton size="xsmall" status="info" type="submit" value="Exercices"/>\n' +
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
  constructor(private router: Router,) {}
  onClick() {
 
    localStorage.setItem('idEntreprise',this.rowData.enterpriseId);
    this.router.navigate(['/pages/comptabilite/exercice']);
  
  }
  }
  @Component({
    selector: 'ngx-button-view',
    template:
      '<div class="button-container">\n' +
      '      <button [disabled] =authoritiesAdd (click)="onClick()" nbButton  status="warning"  style="padding:5px 15px;" type="submit" title="Compte(s) bancaire(s)">\n' +
      ' <i style="font-size: 1.5rem;" class="fa fa-address-card" aria-hidden="true"></i> </button>  </div>',
    })
  export class ButtonViewCompteComponent implements ViewCell, OnInit {
    renderValue: string;
    authoritiesAdd: boolean = true;
    @Input() value: string | number;
    @Input() rowData: any;
    @Output() save: EventEmitter<any> = new EventEmitter();
    ngOnInit() {
      this.renderValue = this.value.toString().toUpperCase();
      if (Authorities.hasAutorities(AuthoritiesCoordonneesBancaire.COORDOONEES_BANCAIRE_VALUE)) {
        this.authoritiesAdd = false;  
      }
    }
    constructor(private router: Router) {  }
    onClick() {
    
      localStorage.setItem('idEntreprise',this.rowData.enterpriseId);
      this.router.navigate(['/pages/admin/entreprise/compte-bancaire']);
    
    }
    }
  @Component({
    selector: 'ngx-list-entreprise',
    templateUrl: './list-entreprise.component.html',
    styleUrls: ['./list-entreprise.component.scss']
  })
export class ListEntrepriseComponent implements OnInit {
  source:any
   // multiEntreprise: boolean = true;
    authoritiesAdd: boolean = true;
  constructor(private windowService: NbWindowService,
    private entrepriseService : EntrepriseService) { }

  ngOnInit() {
      this.entrepriseService.getAllEnterprise().subscribe(
      data => {this.source = data;

        console.log("ok")
        console.log(data)
        // if (data.length > 0) {
        //   this.multiEntreprise = true;  
        // }
        },
      error => {console.log(error);
        console.log("is not  ok")}
      );

      if (Authorities.hasAutorities(AuthoritiesEntreprise.ENTREPRISE_ADD)) {
        this.authoritiesAdd = false;  
      }
      if (Authorities.hasAutorities(AuthoritiesEntreprise.ENTREPRISE)) {
        this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });
      }
      if (Authorities.hasAutorities(AuthoritiesEntreprise.ENTREPRISE_ADD)) {
        this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Editer"></i>' });
      }

      if (Authorities.hasAutorities(AuthoritiesEntreprise.ENTREPRISE_ADD)) {
        this.settings.actions.delete= true;
       } 
  }

  settings = {
    actions :{
        position: 'right',
        custom: [
         
        ],
          add: false,
          edit: false,
          delete:false
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
          nature:{
            title: 'Nature',
            type: 'string',
            
          },
          formeJuridique:{
            title: 'Forme Juridique',
            type: 'string',
            valuePrepareFunction: (cell, row) => {
              return cell.nom
            }
          },
       
        //  capital:{
        //   title: 'Capital',
        //   type: 'number',
        //   valuePrepareFunction: (value, row) => 
        //   { return row.capital + row.money.sigle}
        //  },
        // capital:{
        //   title: 'Capital',
        //   type: 'number',
        //   valuePrepareFunction: (value, row) => 
        //   { return value === 'Total'? value : Intl.NumberFormat('en-US',{style:'currency', currency: row.money
        //   // this.data.forEach(element => {return element.money;})
        //     }).format(value)}
        // },

        entEmail:{
          title: 'E-mail',
          type: 'string'
        },
          telephone:{
            title: 'Tel',
            type: 'number'
          },
          activity:{
            title: 'Activité',
            type: 'string'
          },
           compte: {
            title: 'Compte Bancaire',
            type: 'custom',
            renderComponent: ButtonViewCompteComponent
           }
        },
      };

      
         add() {
          localStorage.setItem("e","0");
          this.windowService.open(ModalEntrepriseComponent, { title: `Ajouter une nouvelle entreprise` });  
        }

        onDeleteConfirm(event):void {
          if (window.confirm(`Vous êtes sûr(e) de vouloir supprimer cette entreprise?`)) {
         
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
          
            localStorage.setItem("e", "1");
            localStorage.setItem('idEntreprise',event.data.enterpriseId.toString());
            this.windowService.open(ModalEntrepriseComponent, {title: 'Modifier cette entreprise', context: event.data.id});
          }
          if (event.action === 'showAction') {
        
            localStorage.setItem('idEntreprise',event.data.enterpriseId.toString());
            this.windowService.open( ShowEntrepriseComponent, {title: 'Entreprise détails', context: event.data.id});
          }
        }

}
