import { Component, OnInit } from '@angular/core';
import { AdresseLivraisonClientService } from './service/adresse-livraison-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthoritiesAdresseDeLivraison } from '../../../../authorisation/authorities-adresse-de-livraison';
import { ClientComponent } from '../client.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-adresse-livraison-client',
  templateUrl: './adresse-livraison-client.component.html',
  styleUrls: ['./adresse-livraison-client.component.scss']
})
export class AdresseLivraisonClientComponent implements OnInit {

  source: any;
  add: boolean = true;
  constructor(private service: AdresseLivraisonClientService, private route: ActivatedRoute,
    private router: Router, private windowRef: NbWindowRef, private toastrService: NbToastrService) { }
  ngOnInit() {
    let codeCLT = localStorage.getItem('idClient');
    this.service.getadresseDeLivraisonsClient(+codeCLT).subscribe(
      data => { this.source = data; },
      error => { console.log('error'); });
    if (Authorities.hasAutorities(AuthoritiesAdresseDeLivraison.ADRESSE_DE_LIVRAISON_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
    if (Authorities.hasAutorities(AuthoritiesAdresseDeLivraison.ADRESSE_DE_LIVRAISON_UPDATE_VALUE)) {
      this.settings.actions.edit = true
    }
    if (Authorities.hasAutorities(AuthoritiesAdresseDeLivraison.ADRESSE_DE_LIVRAISON_ADD_VALUE)) {
      this.add = false;
      this.settings.actions.add = true
    }
  }
  settings = {
    actions: {
      "position": "right",
      edit: false,
      delete: false,
      add: false,

    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      adresse: {
        title: 'Adresse',
        type: 'string',
        filter: true,
        width: '450px',
      },
      codePostal: {
        title: 'Code Postal',
        type: 'number',
        filter: true,
        width: '200px',
      },
      ville: {
        title: 'Ville',
        type: 'string',
        filter: true,
        width: '300px',
      },
      pays: {
        title: 'Pays',
        type: 'string',
        filter: true,
        width: '200px',
      },

    },
  };
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce contact?`)) {
      event.confirm.resolve(this.service.deleteadresseDeLivraisonsClient(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
          this.showToast(NbToastStatus.SUCCESS, "Adresse de livraison", " est supprimer avec succéss")
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event): void {
    let codeCLT = localStorage.getItem('idClient');
    if (+codeCLT == null) {
      this.showToast(NbToastStatus.DANGER, "Error", "Client introuvable !!")
    } else {
      this.service.addadresseDeLivraisonsClient(event.newData, +codeCLT).subscribe(
        data => {
          this.source.add(event.newData).refresh();
          this.showToast(NbToastStatus.SUCCESS, "Adresse de livraison", " est ajouter avec succéss")
        },
        error => {
          this.showToast(NbToastStatus.DANGER, "Erreur", " !!")
          console.log(error);
        },
        event.confirm.resolve(event.newData),
      );
    }
  }
  onSaveConfirm(event): any {
    let codeCLT = localStorage.getItem('idClient');
    this.service.updateadresseDeLivraisonsClient(event.newData, +codeCLT).subscribe(
      data => {
        this.source.update(event.newData);
        this.showToast(NbToastStatus.SUCCESS, "Adresse de livraison", " est modifer avec succéss")
      },
      error => {
        console.log('erreur update');
      },
      event.confirm.resolve(event.newData),
    );
  }
  onclose() {
    this.windowRef.close();
    this.router.navigate([ClientComponent.urlRefreshClient]);
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 10000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
