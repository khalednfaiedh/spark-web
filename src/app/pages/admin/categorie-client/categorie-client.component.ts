import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { CategorieClientService } from './categorie-client.service';
import { ModalCategorieClientComponent } from './modal-categorie-client/modal-categorie-client.component';
import { ShowCategorieClientComponent } from './show-categorie-client/show-categorie-client.component';

@Component({
  selector: 'ngx-categorie-client',
  templateUrl: './categorie-client.component.html',
  styleUrls: ['./categorie-client.component.scss']
})
export class CategorieClientComponent implements OnInit {

  source: any[]
  constructor(
    private windowService: NbWindowService,
    private categorieClientService: CategorieClientService

  ) { }

  ngOnInit() {
    let idEntr = localStorage.getItem('current_entreprise')
    this.categorieClientService.getAllCategorieClient(+idEntr).subscribe(
      data => {
        this.source = data
        console.log(this.source)
      })

  }



  settings = {
    actions: {
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
      name: {
        title: 'Nom Catégorie',
        type: 'string',
        filter: true,
      },
      grilleTarifs: {
        title: 'Grille de tarif',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell) {
          return (cell.designation)
        }
      },
      /*  typePiament: {
          title: 'Type Piament',
          type: 'string',
          filter: true,
        },
        modeDepaiement: {
          title: 'Mode de Paiement',
          type: 'number',
          filter: true,
          width: '30%',
          valuePrepareFunction(cell) {
            return (cell.typePaiement)
          }
        },
        conditionsDePaiements: {
          title: ' Condtion  de Paiement',
          type: 'string',
          filter: true,
          width: '30%',
          valuePrepareFunction(cell, row) {
            return (cell.listcondiontDePaiements.map(data => data.value + " " + data.option))
          }
  
        }*/
    },

  };



  openWindow() {

    localStorage.removeItem('e');
    localStorage.removeItem('idCategorie');
    localStorage.setItem('e', '0');
    this.windowService.open(ModalCategorieClientComponent,
      { title: 'Ajouter un  catégorie Client' });
  }

  onCustom(event) {
    if (event.action === 'showAction') {

      localStorage.removeItem('idCategorie');
      localStorage.setItem('idCategorie', event.data.id);
      this.windowService.open(ShowCategorieClientComponent,
        {
          title: 'Afficher les informations de ce  Catégorie',
          context: { data: event.data, disabled: true }
        });
    }
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idCategorie');
      localStorage.setItem('e', '1');
      localStorage.setItem('idCategorie', event.data.id);
      this.windowService.open(ModalCategorieClientComponent,
        {
          title: 'Modifier un  catégorie', context: {
            //  etat: "edit",
            data: event.data.id,
          }
        });
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce  catégorie ?`)) {
      event.confirm.resolve(this.categorieClientService.deleteCategorieClient(event.data.id).subscribe(
        data => {


        }),
      );
    } else {
      event.confirm.reject();
    }
  }
}
