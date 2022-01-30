import { NbWindowService } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { BilanService } from './services/bilan.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit } from '@angular/core';
import { ShowBilanComponent } from './show-bilan/show-bilan.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.scss']
})
export class BilanComponent implements OnInit {
  public static urlBilan = "/pages/achat/bilan";
  source: LocalDataSource = new LocalDataSource()
  constructor(private serviceBilan: BilanService, public datepipe: DatePipe,
    private windowService: NbWindowService, private translate: TranslateService,
    // @Inject(NB_AUTH_OPTIONS) protected options = {}
    ) { 
    }

  ngOnInit() {
    this.serviceBilan.getAllBilans().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        var date = new Date(data[i].dateBilan)
        var dateBilanstr = this.datepipe.transform(date, 'dd-MM-yyyy')
        data[i].dateBilan = dateBilanstr

      }

      this.source = new LocalDataSource(data);
    })
  }
  settings = {
    noDataMessage: this.translate.instant('datatable.noDataMessage'),
    delete: {
      deleteButtonContent: '<i class="nb-trash" title="supprimer"></i>',
      confirmDelete: true,
    },
    actions: {

      add: false,
      edit: false,
      position: 'right',
      custom: [
        {
          name: 'show',
          title: '<i class="nb-sunny" title="Afficher"></i>',
        },
      ],
    },
 
    columns: {

      idBilan: {
        title: 'Référence Bilan',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell, row) {
          return ("BLn" + row.idBilan)
        }
      },
      idBC: {
        title: 'Référence bon de commande',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell, row) {
          return "BC" + cell
        }
      },
      code: {
        title: 'Code Product',
        type: 'string',
        filter: true,

      },

      dateBilan: {
        title: 'Date Bilan',
        type: 'date',
        filter: true,
      },
    },
  };
  onCustom(event) {

    if (event.action === 'show') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.idBilan);
      this.windowService.open(ShowBilanComponent,
        { title: 'Afficher Bilan', context: { id: event.data.idBilan } });
    }

  }
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce Bilan?`)) {
      event.confirm.resolve(this.serviceBilan.deleteBilan(event.data.idBilan).subscribe(
        data => {
          this.source.remove(event);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  // getConfigValue(key: string): any {
  //   return getDeepFromObject(this.options, key, null);
  // }
}
