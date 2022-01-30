import { Component, OnInit } from '@angular/core';
import { EtatFinancierService } from './etat-financier.service';
import { NbWindowService } from '@nebular/theme';
import { ModalEtatfinancierComponent } from './modal-etatfinancier/modal-etatfinancier.component';
import { ShowEtatfinancierComponent } from './show-etatfinancier/show-etatfinancier.component';
import { ToastService } from './toast.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { GenerateBilanCteResultatComponent } from './generate-bilan-cte-resultat/generate-bilan-cte-resultat.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-etat-financier',
  templateUrl: './etat-financier.component.html',
  styleUrls: ['./etat-financier.component.scss']
})
export class EtatFinancierComponent implements OnInit {

  source:any
  constructor(private etatFinancierService:EtatFinancierService,
  private windowService: NbWindowService,
  private TS: ToastService,
  private translate: TranslateService
  ) { }

  ngOnInit() {
    this.etatFinancierService.getAllEtatFinancier().subscribe(
      data=>{this.source=data;console.log(this.source)},
      error=>{console.log("error getAll etats")} 
    );
  }
  test()
  {
    console.log()
  }
 
  settings = {
    actions :{
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
          {
            name: 'genererAction',
            title: '<i class="nb-loop" title="Generate"></i>',
          },

        ],
          add: false,
          edit: false,
          generer: false,
    },
        add: {
          addButtonContent: '<i class="nb-plus"></i>',
          createButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
          editButtonContent: '<i class="nb-edit"></i>',
          saveButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
          deleteButtonContent: '<i class="nb-trash"></i>',
          confirmDelete: true,
        },
        generer: {
          genererButtonContent: '<i class="nb-loop"></i>',
          saveButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
        },

        columns: {
          startDate:{
            title: this.translate.instant('etatfinancier.date'),
            type: 'Date'
          }, 
          endDate:{
            title: this.translate.instant('etatfinancier.date2'),
            type: 'Date'
          },         
          description:{
            title: 'Description',
            type: 'string'
          },  
        },
      };
    
      addEtatFinancier() {
        localStorage.setItem("e","0");
        this.windowService.open(ModalEtatfinancierComponent, { title: this.translate.instant('etatfinancier.list2') });  
      }
      onDeleteConfirm(event):void {
        if (window.confirm( this.translate.instant('etatfinancier.list3'))) {
          console.log(event.data.id);
          event.confirm.resolve(this.etatFinancierService.deleteEtatFinancier(event.data.idEtat).subscribe(
            data => {this.source.filter(p => p !== event.data);},
          ));
          this.TS.makeToast(NbToastStatus.SUCCESS,this.translate.instant('etatfinancier.list4'),this.translate.instant('etatfinancier.listt'));
        } else {
          event.confirm.reject();
          this.TS.makeToast(NbToastStatus.DANGER,this.translate.instant('etatfinancier.list5'),this.translate.instant('etatfinancier.listt'));        
        }
      }
      onCustom(event): any {
        if (event.action === 'editAction') {
          console.log("ok",event.data.id);
          localStorage.setItem("e", "1");
          localStorage.setItem('idEtat',event.data.idEtat.toString());
          this.windowService.open( ModalEtatfinancierComponent, {title:this.translate.instant('etatfinancier.list7'), context: event.data.idEtat});
        }
        if (event.action === 'showAction') {
          console.log("test show etat");
          console.log(event.data.idEtat);
          localStorage.setItem('idEtat',event.data.idEtat.toString());
          this.windowService.open( ShowEtatfinancierComponent, {title:this.translate.instant('etatfinancier.list8')});
        }
        if (event.action === 'genererAction') {
          console.log("test generate etat");
          console.log(event.data.idEtat);
          localStorage.setItem('idEtat',event.data.idEtat.toString());
          this.windowService.open( GenerateBilanCteResultatComponent, {title:this.translate.instant('etatfinancier.list9')});
        }
      }
}
export class EtatfinancierDates {
  startDate :Date;
  endDate: Date;
}