import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { CategorieService } from './categorie.service';
import { Router } from '@angular/router';
import { CategorieModel } from './categoeie.model';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { ViewCell } from 'ng2-smart-table';
import { ChargesCnssComponent } from './charges-cnss/charges-cnss.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesCategorieCnss } from '../../../authorisation/authoritiesCategorieCNSS';
@Component({
  selector: 'ngx-button-view3',
  template:
    '<div class="button-container">\n' +
    '      <input (click)="onClick()" nbButton type="submit" class="btn btn-hero-info xsmall" size="small" status="success" value="Charges CNSS"/> </div>',
})
export class ButtonViewCNSSComponent implements ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService, private router: Router) {
  }
  onClick() {
    localStorage.removeItem('idCategorie');
    localStorage.setItem('idCategorie', this.rowData.idCategorie);
    this.windowService.open(ChargesCnssComponent);
  }
}
@Component({
  selector: 'ngx-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  constructor(private windowService: NbWindowService, private service: CategorieService, private router: Router) {
  }

  source: CategorieModel[];
  ADD = true
  ngOnInit() {
    this.service.getAllCategorie().subscribe(
      data => {
        this.source = data;
      },
      error => {
        console.log(error);
      });

    if (Authorities.hasAutorities(AuthoritiesCategorieCnss.CATEGORIE_CNSS_ADD_VALUE)) {
      this.ADD = false;
    }

    if (Authorities.hasAutorities(AuthoritiesCategorieCnss.CATEGORIE_CNSS_DELETE_VALUE)) {
      this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
    }
    // if (Authorities.hasAutorities(AuthoritiesCategorieCnss.CATEGORIE_CNSS_DELETE_VALUE)) {
    //   this.settings.actions.delete= true;
    //  }
  }

  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idCategorie');
    localStorage.setItem('e', '0');
    this.windowService.open(AddCategorieComponent, { title: 'Ajouter une catégorie' });
  }

  settings = {
    hideSubHeader: true,
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
      ],
    },
    columns: {

      codeExploitation: {
        title: "Code d'éxploitation",
        type: 'number',
        filter: true,
      },

      nom: {
        title: 'Désignation',
        type: 'string',
        filter: true,
      },

      cnss: {
        title: 'Charges',
        filter: false,
        type: 'custom',
        renderComponent: ButtonViewCNSSComponent,
      },
    },
  };
  onCustom(event): any {
    if (event.action === 'editAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idCategorie');
      localStorage.setItem('idCategorie', event.data.idCategorie);
      localStorage.setItem('e', '1');
      this.windowService.open(AddCategorieComponent, {
        title: 'Modifier cette catégorie',
        context: event.data.idCategorie
      });
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous êtes sure de supprimer cette catégorie?`)) {
      event.confirm.resolve(this.service.deleteCategorie(event.data.idCategorie).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
}
