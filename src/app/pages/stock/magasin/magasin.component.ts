import { MagasinService } from './services/magasin.service';
import { ShowMagasinComponent } from './show-magasin/show-magasin.component';
import { ModalMagasinComponent } from './modal-magasin/modal-magasin.component';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NbWindowService } from '@nebular/theme';
import { ContactMagasinComponent } from './contact-magasin/contact-magasin.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesMagasin } from '../../../authorisation/authorities-magasin';
import { EntrepriseService } from '../../admin/entreprise/entreprise.service';
import { UpdateMagasinComponent } from './update-magasin/update-magasin.component';

@Component({
  selector: 'ngx-button-view',
  template:
  '<div class="button-container">\n' +
  '      <button (click)="onClick()" nbButton status="success" '+
  '      style="padding:5px 5px;" type="submit" title="Liste de contact(s)"><i class="fas fa-phone"></i> </button> \n'+ 
  '    </div>',
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService) {
  }
  onClick() {
    localStorage.setItem('idMagasin', this.rowData.idMagasin);
    this.windowService.open(ContactMagasinComponent, {title: 'Liste des contacts'});
  }
}


@Component({
  selector: 'ngx-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.scss']
})
export class MagasinComponent implements OnInit {
  public static urlMagasin = "/pages/stock/magasin";
  source: LocalDataSource = new LocalDataSource();
  idEntreprise: number;
  entreprises: any;
  constructor(private windowService: NbWindowService,
    private serviceEntreprise: EntrepriseService,
    private serviceMagasin: MagasinService) { }
  magasins: any[] = []
  add = true;
  ngOnInit() {

    let idEntreprise = localStorage.getItem("current_entreprise");
    this.serviceMagasin.getMagasinByEntreprise(+idEntreprise).subscribe(data => {
      this.source = new LocalDataSource(data)
    },
      error => {
        console.log("error");
      })

    // this.serviceMagasin.getAllMagasin().subscribe(magasins => {
    //   this.source = new LocalDataSource(magasins)
    // })

    if (Authorities.hasAutorities(AuthoritiesMagasin.MAGASIN_ADD_VALUE)) {
      this.add = false;
    }
    if (Authorities.hasAutorities(AuthoritiesMagasin.MAGASIN_VALUE)) {
      this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesMagasin.MAGASIN_VALUE)) {
      this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Modifier"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesMagasin.MAGASIN_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
  }
  openWindow() {
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    localStorage.setItem('e', '0');

    this.windowService.open(ModalMagasinComponent,
      { title: 'Ajouter Magasin' });
  }
  settings = {
    delete: {
      deleteButtonContent: '<i class="nb-trash" title="supprimer"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
      ],
    },
    columns: {

      identifiantMagasin: {
        title: 'Référence',
        type: 'string',
        filter: true
      },
      nameMagasin: {
        title: 'Nom du Magasin',
        type: 'string',
        filter: true,
      },
      typeMagasin: {
        title: 'Type',
        type: 'string',
        filter: true,
      },
      evaluation: {
        title: 'Évaluation',
        type: 'string',
        filter: true,
      },
      surfaceMagasin: {
        title: 'Surface',
        type: 'string',
        filter: true,
        valuePrepareFunction: (row) => {
          return row + ' m²' ;
      },
      },
      volumeMagasin: {
        title: 'Volume',
        type: 'string',
        filter: true,
        valuePrepareFunction: (row) => {
          return row + ' m³' ;
      },
      },
      contact: {
        title: 'Contact',
        type: 'custom',
        filter: false,
        renderComponent: ButtonViewComponent,
      },
    },
  };


  onCustom(event) {

    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.idContrat);
      this.windowService.open(ShowMagasinComponent,
        { title: 'Magasin détails', context: { id: event.data.idMagasin } });
    }
    if (event.action === 'editAction'){
      this.windowService.open(UpdateMagasinComponent, {
        title: "Modifier magasin",
        context: { id: event.data.idMagasin }
      });
    }

  }
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette magasin?`)) {
      event.confirm.resolve(this.serviceMagasin.deleteMagasin(event.data.idMagasin).subscribe(
        data => {
          this.source.remove(event)
        }),
      );
    } else {
      event.confirm.reject();
    }
  }

  onChargeentreprise(event) {
    if (this.idEntreprise != null) {
      this.serviceMagasin.getMagasinByEntreprise(this.idEntreprise).subscribe(
        data => {
          this.source = data;
        },
        error => {
          console.log("error");
        })
    }
    else {
      this.source = null;
    }
  }

}
