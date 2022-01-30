import { Component, OnInit } from '@angular/core';
import { UniteDeTransactionService } from './UniteDeTransaction.service';
import { NbWindowService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ModalUniteTransactionComponent } from './modal-unite-transaction/modal-unite-transaction.component';

@Component({
  selector: 'ngx-unite-de-transaction',
  templateUrl: './unite-de-transaction.component.html',
  styleUrls: ['./unite-de-transaction.component.scss']
})
export class UniteDeTransactionComponent implements OnInit {

  public static UniteDeTransaction = "/pages/admin/unite-de-transaction"
  private source: any;
  idEntr = localStorage.getItem('current_entreprise')
  ngOnInit(): void {
    this.service.getAllUniteDeTransaction(+this.idEntr).subscribe(
      data => { this.source = data; console.log(this.source); },
      error => { console.log(error); },
    );

  }


  constructor(private service: UniteDeTransactionService,
    private windowService: NbWindowService,
    private route: ActivatedRoute,

    private toastrService: NbToastrService) {
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
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      // idT: {
      //   title: 'N°',
      //   type: 'number',
      //   filter: true,
      //   editable: false,
      // },
      designation: {
        title: 'Designation',
        type: 'String',
        filter: true,
      },
      sigle: {
        title: 'Monnaie',
        type: 'String',
        filter: true,
      },
      separateur: {
        title: 'Séparateur  Partie entier',
        type: 'String',
        filter: true,
      },
      separateurVirguele: {
        title: 'Séparateur entre  Partie entier et décimale',
        type: 'String',
        filter: true,
      },
      nbredecimale:
      {
        title: 'Nombre de chiffre partie Décimale',
        type: 'String',
        filter: true,

      }
    },

  };

  add() {
    this.windowService.open(ModalUniteTransactionComponent, {
      title: `Créer  unité de transaction`,
      context: { etat: "add", }
    });
  }


  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette unité de transaction?`)) {
      event.confirm.resolve(this.service.deleteUniteDeTransaction(event.data.idT).subscribe(
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

      this.windowService.open(ModalUniteTransactionComponent,
        {
          title: 'Afficher les informations de ce    cette unité de transaction    ',
          context: {
            data: event.data,
            etat: 'show',
            disabled: true,
          }
        });
    }
    if (event.action === 'editAction') {
      this.windowService.open(ModalUniteTransactionComponent,
        {
          title: ' Modfier   les informations de ce   cette unité de transaction    ',
          context: {
            data: event.data,
            etat: 'edit',
            disabled: false,


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