import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit } from '@angular/core';
import { EvaluationPFournisseurService } from './evaluation-p-fournisseur.service';
import { Authorities } from '../../../../authorisation/authorities';
import { AuthoritiesPourcentageEvaluation } from '../../../../authorisation/authorities-pourcentage-evaluation';

@Component({
  selector: 'ngx-evaluation-percentage-fournisseur',
  templateUrl: './evaluation-percentage-fournisseur.component.html',
  styleUrls: ['./evaluation-percentage-fournisseur.component.scss']
})
export class EvaluationPercentageFournisseurComponent implements OnInit {
  public static urlEvaluationPourcentageFournisseur= "/pages/achat/evaluationPourcentageFournisseur";
  source: LocalDataSource=new LocalDataSource()
  EP:any=new Object()
  constructor(private serviceEP:EvaluationPFournisseurService) { }


  ngOnInit() {
    this.serviceEP.getEvalutionPs().subscribe(data=>{
      console.log(data)
      this.source= new LocalDataSource(data);
    })
    if(Authorities.hasAutorities(AuthoritiesPourcentageEvaluation.POURCENTAGE_EVALUATION_ADD_VALUE)){
      this.settings.actions.add= true;
    }
    if(Authorities.hasAutorities(AuthoritiesPourcentageEvaluation.POURCENTAGE_EVALUATION_DELETE_VALUE)){
      this.settings.actions.delete= true;
    }
    if(Authorities.hasAutorities(AuthoritiesPourcentageEvaluation.POURCENTAGE_EVALUATION_UPDATE_VALUE)){
      this.settings.actions.edit= true;
    }
  }
  settings = {
    mode:"inline",
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    add: {
      addButtonContent: '<i class="nb-plus" ></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    actions: {
      position: 'right',
      delete: false,
      add: false,
      edit: false,
    },

    columns: {

      name: {
        title: 'Reference',
        type: 'string',
        filter: true,
      },
      percentage: {
        title: 'Pourcentage',
        type: 'number',
        filter: true,
      },
    },
  };
  addEP(event){
    console.log(event)
    this.EP.name=event.newData.name
    this.EP.percentage=event.newData.percentage
    console.log(this.EP)
    this.serviceEP.addEvalutionP(this.EP).subscribe(data=>{
      event.confirm.resolve();
    });

  }
  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce Produit?`)) {
      event.confirm.resolve(this.serviceEP.deleteEvalutionP(event.data.idEP).subscribe(
        data => {
          this.source.remove(event);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
  updateEP(event){
    this.EP={}
    this.EP.name=event.newData.name
    this.EP.percentage=event.newData.percentage
    console.log(event)
    this.serviceEP.updateEvalutionP(event.newData).subscribe(data=>{
      event.confirm.resolve();
    })
  }

}
