import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { RapportService } from './rapport.service';
import { ModalRapportComponent } from './modal-rapport/modal-rapport.component';
import { ShowRapportComponent } from './show-rapport/show-rapport.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesRapportQualite } from '../../../authorisation/authorities-rapport';

@Component({
  selector: 'ngx-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {
  source: any;
  public static urlRapport = "/pages/stock/rapport";
  constructor(private windowService: NbWindowService, private service: RapportService) { }
  add = true;

  ngOnInit() {
    if (Authorities.hasAutorities(AuthoritiesRapportQualite.RAPPORT_QUALITE_LIST_VALUE)) {
      this.service.getAllRapport().subscribe(
        data => { this.source = data; },
        error => { console.log("error") });
    }
    if (Authorities.hasAutorities(AuthoritiesRapportQualite.RAPPORT_QUALITE_ADD_VALUE)) {
      this.add = false;
    }
    if (Authorities.hasAutorities(AuthoritiesRapportQualite.RAPPORT_QUALITE_VALUE)) {
      this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesRapportQualite.RAPPORT_QUALITE_UPDATE_VALUE)) {
      this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesRapportQualite.RAPPORT_QUALITE_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
  }

  openWindow() {
    localStorage.setItem('e', '0');
    this.windowService.open(ModalRapportComponent,
      { title: 'Ajouter un Rapport' });

  }

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
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
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'Numero',
        type: 'number',
        filter: true,
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce rapport?`)) {
      event.confirm.resolve(this.service.deleteRapport(event.data.id).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

  onCustom(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRapport');
      localStorage.setItem('idRapport', event.data.id);
      localStorage.setItem('e', '1');
      this.windowService.open(ModalRapportComponent, { title: 'Modifier ce Rapport' });
    }
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRapport');
      localStorage.setItem('idRapport', event.data.id);
      this.windowService.open(ShowRapportComponent,
        { title: 'Afficher les informations de ce Rapport' });
      console.log('show');
    }
  }
}
