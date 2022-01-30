import { Component, OnInit } from '@angular/core';
import { TypePrimeService } from './type-prime.service';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesTypePrime } from '../../../authorisation/authoritiesTypePrime';

@Component({
  selector: 'ngx-type-prime',
  templateUrl: './type-prime.component.html',
  styleUrls: ['./type-prime.component.scss'],
})
export class TypePrimeComponent implements OnInit {
  source: any;
  constructor(private service: TypePrimeService) { }

  ngOnInit(): void {
    this.service.getAllTypePrimes().subscribe(
      data => { this.source = data; },
      error => { console.log(error); },
    );
    if (Authorities.hasAutorities(AuthoritiesTypePrime.TYPE_PRIME_ADD_VALUE)) {
      this.settings.actions.add = true;
    }
    if (Authorities.hasAutorities(AuthoritiesTypePrime.TYPE_PRIME_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
    if (Authorities.hasAutorities(AuthoritiesTypePrime.TYPE_PRIME_UPDATE_VALUE)) {
      this.settings.actions.edit = true;
    }
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
      delete: false

    },
    columns: {
      nom: {
        title: 'Nom',
        type: 'string',
        filter: true,
        sort: true,
        sortDirection: 'asc',
      },
      defaultValeurPrime: {
        title: 'Valeur',
        type: 'number',
        filter: true,
        valuePrepareFunction: (defaultValeurPrime) => {
          return defaultValeurPrime + ' TND';
        },
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce type de prime?`)) {
      event.confirm.resolve(this.service.deleteTypePrimes(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),);
    } else {
      event.confirm.reject();
    }
  }
  onSaveConfirm(event): any {
    this.service.updateTypePrimes(event.newData).subscribe(
      data => { this.source.update(event.newData); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }
  onCreateConfirm(event): void {
    this.service.addTypePrimes(event.newData).subscribe(
      data => { this.source.add(event.newData).refresh(); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }
}
