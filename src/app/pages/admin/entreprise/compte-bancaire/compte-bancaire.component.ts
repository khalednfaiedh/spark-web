import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { CompteBancaireModel } from './compte-bancaire.model';
import { AddCompteComponent } from './add-compte/add-compte.component';
import { ShowCompteComponent } from './show-compte/show-compte.component';
import { CompteBancaireService } from './compte-bancaire.service';

@Component({
  selector: 'ngx-compte-bancaire',
  templateUrl: './compte-bancaire.component.html',
  styleUrls: ['./compte-bancaire.component.scss']
})
export class CompteBancaireComponent implements OnInit {
comptes : CompteBancaireModel[]
  constructor(private compteService : CompteBancaireService,
    private router: Router,private windowService: NbWindowService ) {}

  ngOnInit() {
    let idEntreprise = localStorage.getItem("idEntreprise")
    this.compteService.getAllCompte(+idEntreprise).subscribe(
      data => {this.comptes = data;
              },
      error => {console.log(error);}
      );
  }
  goback(){
    this.router.navigate(['/pages/admin/entreprise']);
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
        banque:{
          title: 'Banque',
          type: 'string' ,
          valuePrepareFunction: (banque) => {
            return banque.nom  ;
        },
        }, 
       agence:{
          title: 'Agence',
          type: 'string'
        },
       rib:{
          title: 'RIB',
          type: 'string'
        }, 
      },
    };

    
    addCompte() {
        localStorage.setItem("e","0");
        this.windowService.open(AddCompteComponent, { title: `Ajouter un compte bancaire` });  
      }

      onDeleteConfirm(event):void {
        if (window.confirm(`Vous êtes sûre de vouloir supprimer ce compte bancaire?`)) {
          console.log(event.data.enterpriseId);
          event.confirm.resolve(this.compteService.deleteCompte(event.data.idC).subscribe(
            data => {this.comptes.filter(p => p !== event.data);},
            error => {console.log(error);})
          );
        } else {
          event.confirm.reject();
        }
      }    
      onCustom(event): any {
        if (event.action === 'editAction') {
         
          localStorage.setItem("e", "1");
          localStorage.setItem('idCompte',event.data.idC.toString());
          this.windowService.open(AddCompteComponent, {title: 'Modifier compte', context: event.data.id});
        }
        if (event.action === 'showAction') {
          localStorage.setItem('idCompte',event.data.idC.toString());
          this.windowService.open( ShowCompteComponent, {title: 'Afficher compte', context: event.data.id});
        }
      }

}
