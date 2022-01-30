import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { CompteBancaireModel } from './compte-bancaire.model';
import { AddCompteFournisseurComponent } from './add-compte/add-compte.component';
import { ShowCompteFournisseurComponent } from './show-compte/show-compte.component';
import { CompteBancaireService } from './compte-bancaire.service';


@Component({
  selector: 'ngx-compte-bancaire',
  templateUrl: './compte-bancaire.component.html',
  styleUrls: ['./compte-bancaire.component.scss']
})
export class FournisseurCompteBancaireComponent implements OnInit {
comptes : CompteBancaireModel[]
  constructor(private compteService : CompteBancaireService,
    private router: Router,private windowService: NbWindowService ) {}

  ngOnInit() {
    let idFournisseur = localStorage.getItem("idFournisseur")
    this.compteService.getAll(+idFournisseur).subscribe(
      data => {this.comptes = data;
              },
      error => {console.log(error);}
      );
  }
  goback(){
    this.router.navigate(['/pages/admin/fournisseur']);
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
  // ligne style work fine dont forgot css classes
  // rowClassFunction: (row) =>{
  //   if(row.data.agence ==='x'){
  //     return 'solved';
  //   }else {
  //     return 'aborted'
  //   }
  // },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        banque:{
          title: 'Banque',
          type: 'string' ,
          sort: true,
          sortDirection:'asc' ,
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
          type: 'string',
        }, 
      
      },
    };

  
    addCompte() {
        localStorage.setItem("e","0");
        this.windowService.open(AddCompteFournisseurComponent, { title: `Ajouter un compte bancaire` });  
      }

      onDeleteConfirm(event):void {
        if (window.confirm(`Vous êtes sûr(e) de vouloir supprimer ce compte bancaire ?`)) {
          console.log(event.data.enterpriseId);
          event.confirm.resolve(this.compteService.delete(event.data.idC).subscribe(
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
          this.windowService.open(AddCompteFournisseurComponent, {title: 'Modifier compte'});
        }
        if (event.action === 'showAction') {
          localStorage.setItem('idCompte',event.data.idC.toString());
          this.windowService.open( ShowCompteFournisseurComponent, {title: 'Afficher compte'});
        }
      }

}
