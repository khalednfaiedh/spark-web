import { ShowEmplacementComponent } from './show-emplacement/show-emplacement.component';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbWindowService } from '@nebular/theme';
import { EmplacementService } from './services/emplacement.service';
import { ModalEmplacementComponent } from './modal-emplacement/modal-emplacement.component';
import { Authorities } from '../../../authorisation/authorities';
import { AuthoritiesEmplacement } from '../../../authorisation/authorities-emplacement';
import { MagasinService } from '../magasin/services/magasin.service';

@Component({
  selector: 'ngx-emplacement',
  templateUrl: './emplacement.component.html',
  styleUrls: ['./emplacement.component.scss']
})
export class EmplacementComponent implements OnInit {
  public static urlEmplacement = "/pages/stock/emplacement";
  source: LocalDataSource = new LocalDataSource();
  idMagasin: number; magasins: any;
  idEntreprise = +localStorage.getItem("current_entreprise");
t=' '
d=','
ref : number = 0.000
  constructor(private windowService: NbWindowService, private serviceEmplacement: EmplacementService,
    private serviceMagasin: MagasinService) { }

  ngOnInit() {
    this.serviceEmplacement.getEmplacementByEntreprise(this.idEntreprise).subscribe(data => { this.source = data; },
      error => { console.log("error"); });
    this.serviceMagasin.getMagasinByEntreprise(this.idEntreprise).subscribe(data => {
      this.magasins = data;
    }, error => { console.log("error"); })

    if (Authorities.hasAutorities(AuthoritiesEmplacement.EMPLACEMENT_VALUE)) {
      this.settings.actions.custom.push({ name: 'showAction', title: '<i class="nb-sunny" title="Afficher"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesEmplacement.EMPLACEMENT_UPDATE_VALUE)) {
      this.settings.actions.custom.push({ name: 'editAction', title: '<i class="nb-edit" title="Edit"></i>' });
    }
    if (Authorities.hasAutorities(AuthoritiesEmplacement.EMPLACEMENT_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
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
      ref: {
        title: 'Référence',
        type: 'string',
        filter: true,
      },
      nameEmplacement: {
        title: 'Libellé',
        type: 'string',
        filter: true,
      },
      magasin: {
        title: 'Magasin',
        type: 'string',
        filter: true,
        valuePrepareFunction: (magasin)=>{
          return magasin.nameMagasin
        }
      },
      surfaceEmplacement: {
        title: 'Surface',
        type: 'number',
        filter: true,
        valuePrepareFunction: (row) => {
          return row + ' m²';
        },
      },
      volumeEmplacement: {
        title: 'Volume',
        type: 'number',
        filter: true,
        valuePrepareFunction: (row) => {
          return row + ' m³';
        },
      },
    },
  };

  onCustom(event) {
    if (event.action === 'showAction') {
      this.windowService.open(ModalEmplacementComponent,
        { title: 'Afficher emplacement', context: { emplacement: event.data, e: '2' } });
    }
    if (event.action === 'editAction') {
      this.windowService.open(ModalEmplacementComponent,
        { title: 'Modifier emplacement', context: { emplacement: event.data, e: '0' } });
    }

  }
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette emplacement ?`)) {
      event.confirm.resolve(this.serviceEmplacement.deleteEmplacement(event.data.idEmplacement).subscribe(
        data => {
          this.source.remove(event)
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  openWindow(): void {
    this.windowService.open(ModalEmplacementComponent,
      { title: 'Ajouter un nouveau emplacement',context: { e:'1'} });
  }

  onChargeMagasin(event) {
    console.log(event)
    if (event == 'all'){
      this.serviceEmplacement.getEmplacementByEntreprise(this.idEntreprise).subscribe(data => { this.source = data; },
        error => { console.log("error"); });
    }
    else{
      this.serviceEmplacement.getEmplacementByIdMagasin(event.idMagasin).subscribe(
        data => {
          console.log(data);
          this.source = data;
        },
        error => {
          console.log("error");
        })
    }
   
  }
}
