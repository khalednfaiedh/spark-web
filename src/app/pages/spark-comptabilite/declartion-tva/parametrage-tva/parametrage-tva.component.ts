import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { ParametrageTvaService } from './parametrage-tva.service';
import { ModalParametreTvaComponent } from './modal-parametre-tva/modal-parametre-tva.component';
import { TostarService } from '../../tostar/tostar.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ExcerciceService, Excercice } from '../../excercice/excercice.service';

@Component({
  selector: 'ngx-parametrage-tva',
  templateUrl: './parametrage-tva.component.html',
  styleUrls: ['./parametrage-tva.component.scss']
})
export class ParametrageTvaComponent implements OnInit {
  exercice = new Excercice()
  source = []
  id: number
  constructor(private windowService: NbWindowService,
    private parametrageService: ParametrageTvaService,
    private toastrService: TostarService,
    private exerciceService: ExcerciceService) { }

  ngOnInit() {

    let idEntreprise=localStorage.getItem('current_entreprise');
    this.id=+idEntreprise;
        /**
         *  */
        this.parametrageService.getAllParametre(+idEntreprise).subscribe(
          data => { this.source = data; console.log(data) },
          error => { console.log("error") }

        )


      


  }
  settings = {
    actions: {
      position: 'right',
      custom: [

        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Edit"></i>',

        },
        // {
        //   name: 'deleteAction',
        //   title: '<i class="nb-trash" title="Delete"></i>',
        // }, 
      ],
      add: false,
      edit: false,
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
    columns: {
      plan: {
        title: 'Compte',
        type: 'string',
        valuePrepareFunction: (cel) => { return cel.nameCompte + ":" + cel.codeCompte }
      },
      nature: {
        title: 'Nature',
        type: 'string',
      },



    },
  };


  addDossier() {
    localStorage.setItem("e", "0");
    this.windowService.open(ModalParametreTvaComponent, { title: `Parametrée un  compte` });
  }

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous êtes sûre de vouloir supprimer ce parametre?`)) {

      event.confirm.resolve(this.parametrageService.deleteParametreById(event.data.id).subscribe(
        data => { this.source.filter(p => p !== event.data); },
        error => { console.log(error); })
      );
    } else {
      event.confirm.reject();
    }
  }
  onCustom(event): any {
    if (event.action === 'editAction') {
      console.log(event.data.id);
      localStorage.setItem("e", "1");
      localStorage.setItem('idParametre', event.data.id);
      this.windowService.open(ModalParametreTvaComponent, { title: 'Modifier  Les information  de ce compte', context: event.data.id });
    }

  }

  choisireType(etat) {


    if (etat == 1) {
      this.parametrageService.choisirTypeCalculDeclartionMensuelle("oui", this.id).subscribe(

        data => {
          console.log(data)
          this.toastrService.showToast(NbToastStatus.SUCCESS, 'SUCCESS', 'Mode Déclaration mensuelle paramètrée  ')
        },
        error => { console.log("error") }
      )
    }
    else
      if (etat == 2) {
        this.parametrageService.choisirTypeCalculDeclartionMensuelle("non", this.id).subscribe(

          data => {
            console.log(data);
            this.toastrService.showToast(NbToastStatus.SUCCESS, 'SUCCESS', 'Mode Déclaration mensuelle paramètrée  ')
          },

          error => { console.log("error") }
        )
      }
  }
}
