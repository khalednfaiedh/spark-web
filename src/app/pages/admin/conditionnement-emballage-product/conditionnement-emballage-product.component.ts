import { Component, OnInit } from '@angular/core';
import { ConditionnementEmballageModel } from './ConditionnementEmballage.model';
import { ConditionnementEmballageService } from './conditionnement-emballage.service';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesModeDePaiement } from '../../../authorisation/authorities-mode-de-paiement';
import { AuthoritiesConditionnementEmballage } from '../../../authorisation/authorities-conditionnement-emballage';
import { NbWindowService } from '@nebular/theme';
import { CaracteristiqueEmballageComponent } from '../caracteristique-emballage/caracteristique-emballage.component';


@Component({
  selector: 'ngx-conditionnement-emballage-product',
  templateUrl: './conditionnement-emballage-product.component.html',
  styleUrls: ['./conditionnement-emballage-product.component.scss']
})
export class ConditionnementEmballageProductComponent implements OnInit {
  public static urlConditionnementEmballageProduct = "/pages/admin/conditionnementEmballage";
  constructor(private service: ConditionnementEmballageService, private windowService: NbWindowService) { }
  add: any
  idEntr = localStorage.getItem('current_entreprise')
  source: any;
  condtionnement = ConditionnementEmballageModel;




  ngOnInit() {
    if (Authorities.hasAutorities(AuthoritiesConditionnementEmballage.CONDITIONNEMENT_EMBALLAGE_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
    if (Authorities.hasAutorities(AuthoritiesConditionnementEmballage.CONDITIONNEMENT_EMBALLAGE_UPDATE_VALUE)) {
      this.settings.actions.edit = true
    }
    if (Authorities.hasAutorities(AuthoritiesConditionnementEmballage.CONDITIONNEMENT_EMBALLAGE_ADD_VALUE)) {
      this.add = false;
      this.settings.actions.add = true
    }
    this.service.getAllCondtionnement(+this.idEntr).subscribe(
      data => { this.source = data; console.log(this.source); },
      error => { console.log(error); },
    );
  }
  settings = {
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
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
      custom: [

        { name: 'caracteristique', title: '<i class="ion-clipboard ng-star-inserted" title="Caractéristiques"></i>' }

      ],
    },
    columns: {
      typeConditionnement: {
        title: 'Conditionnement',
        type: 'String',
        filter: true,
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette Conditionnement?`)) {
      event.confirm.resolve(this.service.deleteCondtionnement(event.data.idC).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event): void {
    this.service.addCondtionnement(event.newData, +this.idEntr).subscribe(
      data => { this.source.add(event.newData).refresh(); },

      error => { alert(error); },
      event.confirm.resolve(event.newData),


    );


  }
  onSaveConfirm(event): any {
    this.service.updateCondtionnement(event.newData).subscribe(
      data => { this.source.update(event.newData).refresh(); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }
  onCustom(event) {
    if (event.action === 'caracteristique') {
      localStorage.removeItem('e');
      localStorage.removeItem('idC');
      localStorage.setItem('idC', event.data.idC);
      this.windowService.open(CaracteristiqueEmballageComponent,
        {
          title: 'Ajouter des caractéritiques',
          context: event.data.idC
        });
    }
  }
}


