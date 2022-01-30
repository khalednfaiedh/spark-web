import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthoritiesCritere } from '../../../../authorisation/authorities-critere';
import { CritereEvaluationModel } from './critere-evaluation-model';
import { CritereEvaluationService } from './critere-evaluation.service';

@Component({
  selector: 'ngx-critere-evaluation',
  templateUrl: './critere-evaluation.component.html',
  styleUrls: ['./critere-evaluation.component.scss']
})
export class CritereEvaluationComponent implements OnInit {
  public static urlcritere = "/pages/vente/critere";
  critere: CritereEvaluationModel = new CritereEvaluationModel()
  source: any
  add: any
  constructor(private service: CritereEvaluationService, private router: Router) { }

  ngOnInit() {
    if (Authorities.hasAutorities(AuthoritiesCritere.CRITERE_DELETE_VALUE)) {
      this.settings.actions.delete = true;
    }
    if (Authorities.hasAutorities(AuthoritiesCritere.CRITERE_UPDATE_VALUE)) {
      this.settings.actions.edit = true
    }
    if (Authorities.hasAutorities(AuthoritiesCritere.CRITERE_ADD_VALUE)) {
      this.add = true;
      this.settings.actions.add = true
    }

    this.service.getAllCritere().subscribe(data => {
      this.source = data
    })
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
    },
    columns: {
      designation: {
        title: 'Critére',
        type: 'String',
        filter: true,
      },

      coffecient: {
        title: 'Coffecient',
        type: 'number',
        filter: true,
      },
    }
  };
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer cette critére?`)) {
      event.confirm.resolve(this.service.delete(event.data.idCritere).subscribe(
        data => {
          this.source.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event): void {
    this.service.addCritere(event.newData).subscribe(
      data => { this.source.add(event.newData).refresh(); },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }
  onSaveConfirm(event): any {
    this.service.update(event.newData, event.data.idCritere).subscribe(
      data => {
        this.source.update(event.newData).refresh();

        console.log("data", data)
      },
      error => { alert(error); },
      event.confirm.resolve(event.newData),
    );
  }

}
