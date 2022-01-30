import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthorisationReclamation } from '../../../../authorisation/authorisationReclamation';
import { ReclamationService } from '../reclamation.service';
import { NbWindowService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ModalReclamationComponent } from '../modal-reclamation/modal-reclamation.component';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { ModalFactureAvoirComponent } from '../../facture-avoir/modal-facture-avoir/modal-facture-avoir.component';


@Component({
  selector: 'ngx-button-view',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" size="xsmall" status="danger" value="Facture Avoire "/>\n' +
    '    </div>',
})
export class ButtonnFactureAvoire implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private router: Router,
    private windowService: NbWindowService,
    private toastrService: NbToastrService) { }
  onClick() {


    if (this.rowData.status === "nonAccepte") {
      this.showToast(NbToastStatus.DANGER, "DANGER", " Impossible D'ajouter Facture Avoire \n Réclamation Non Acceptée ");
    }
    else {



      this.windowService.open(ModalFactureAvoirComponent,
        {
          title: 'Ajouter  Facture    Avoire  ', context: {
            codFacture: this.rowData.facture.code_fac,
            idReclamation: this.rowData.id
          }
        });
    }

  }


  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
@Component({
  selector: 'ngx-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {
  source = []

  constructor(private reclamationService: ReclamationService,
    private windowService: NbWindowService,
    private toastrService: NbToastrService) { }

  ngOnInit() {

    this.reclamationService.getAllReclamation().subscribe(
      data => { this.source = data; console.log(data) },
      err => { console.log("err get all reclamation") }

    )

    if (Authorities.hasAutorities(AuthorisationReclamation.RECLAMATION_VALUE)) {
      this.settings.actions.custom.push({
        name: 'showAction',
        title: '<i class="nb-sunny" title="Afficher"></i>',
      })
    }
    if (Authorities.hasAutorities(AuthorisationReclamation.RECLAMATION_UPDATE_VALUE)) {
      this.settings.actions.custom.push({
        name: 'editAction',
        title: '<i class="nb-edit" title="Edit"></i>',
      })
    }
    if (Authorities.hasAutorities(AuthorisationReclamation.RECLAMATION_UPDATE_VALUE)) {
      this.settings.actions.delete = true;
    }

  }

  settings =
    {
      mode: "inline",
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      add: {
        addButtonContent: '<i class="nb-plus" ></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',

      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true
      },
      actions: {
        position: 'right',
        add: false,
        edit: false,
        delete: false,

        custom: [

        ],
      },
      // rowClassFunction: (row) => {
      //   if (row.data.finValidite < this.datetoday) {
      //     return 'good';
      //   } else {
      //     return 'warning'
      //   }
      // },
      columns: {
        id: {
          title: 'Réference  Réclamation',
          type: 'string',
          filter: true,
          width: '15%',
          valuePrepareFunction(cell) {
            return ("RCL" + cell)
          }
        },
        facture: {
          title: 'Réference Facture',
          type: 'string',
          filter: true,
          width: '15%',
          valuePrepareFunction(cell) {
            return ("FAC" + cell.code_fac)
          }
        },
        dateReclamation: {
          title: 'Date',
          type: 'string',
          filter: true,
        },
        idClient: {
          title: 'Réference Client',
          type: 'String',
          filter: true,
          valuePrepareFunction(cell) {
            return ("CLT" + cell)
          }
        },
        stocker: {
          title: 'Statut',
          type: 'number',
          valuePrepareFunction(cell) {
            return cell ? 'Produits stockés' : 'En attente de magasinage'
          }
        },
        observation: {
          title: 'déscription',
          type: 'number',
          filter: true,
          width: '140px',
        },
        status: {
          title: 'Status',
          type: 'string',
          filter: true,
          valuePrepareFunction(cell) {
            if (cell === "accepte") {
              return ("acceptée")
            }
            else {
              return ("Non acceptée")
            }

          }
        },
        factureAvoire: {
          title: 'Facture Avoire',
          type: 'custom',
          width: "10%",
          renderComponent: ButtonnFactureAvoire
        },


      },
    };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce tarif?`)) {
      event.confirm.resolve(this.reclamationService.deleteReclamationById(event.data.id).subscribe(
        data => {

          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", " Reclamation est supprimer avec succéss")
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  onCustom(event) {
    if (event.action === 'showAction') {

      this.windowService.open(ModalReclamationComponent,
        {
          title: 'Afficher les informations de ce  Reclamation',
          context: {
            data: event.data,
            etat: 'show',
            disabled: true
          }
        });
    }
    if (event.action === 'editAction') {
      this.windowService.open(ModalReclamationComponent,
        {
          title: ' Modfier   les informations de ce  Reclamation',
          context: {
            data: event.data,
            etat: 'edit',
            disabled: false,
            idfacture2: event.data.facture.code_fac
          }
        });
    }
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }

}
