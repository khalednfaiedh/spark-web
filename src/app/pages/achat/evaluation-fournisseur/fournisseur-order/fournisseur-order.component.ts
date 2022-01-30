import { LocalDataSource } from 'ng2-smart-table';
import { BonCommandeService } from '../../bon-commande/services/bon-commande.service';
import { NbWindowService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { FournisseurEvaluationComponent } from '../fournisseur-evaluation/fournisseur-evaluation.component';
import { FournisseurService } from '../../../admin/fournisseur/fournisseur.service';

@Component({
  selector: 'ngx-fournisseur-order',
  templateUrl: './fournisseur-order.component.html',
  styleUrls: ['./fournisseur-order.component.scss']
})
export class FournisseurOrderComponent implements OnInit {
  public static urlOrderFournisseur= "/pages/achat/fournisseurOrder";
  source: LocalDataSource=new LocalDataSource();
  constructor(private windowService: NbWindowService, 
    private service: FournisseurService,
    private serviceC: BonCommandeService) { }
  founisseurs: any[]=[]

  ngOnInit() {
    let id = localStorage.getItem('current_entreprise')
    this.service.getAllfournisseur(+id).subscribe(
      data => {
        data.forEach(fournisseur=>{
          let note=0
          let note1=0
          let noteLength=0
          this.serviceC.getAllBonCommandeFournisseur(fournisseur.id).subscribe(
                data2=>{
                  console.log(data2);
                  // if (data2.length!=0){
                  for (let i=0 ; i<data2.length;i++){
                    console.log(data2[i].note);
                    // if (data2[i].note!=null){
                      note=note + data2[i].note;
                      noteLength=noteLength + 1 ;
                    // }
                  }
                  note1=(note/noteLength);
                  console.log("yyyy" + note1);
                  // if (noteLength!=0){
                  //   note=(note/noteLength)
                  //   }
                  // }
                  // else{
                  //   this.founisseurs.push({idF:fournisseur.id,nameF:fournisseur.nameF,note:0})
                  // }
                });
                this.founisseurs.push({idF:fournisseur.id,nameF:fournisseur.nameF,note:note1})
        })
         this.source = new LocalDataSource(this.founisseurs);
         },
      error => { console.log(error); });
      
  }
  settings = {
    
    actions: {
      delete:false,
      add: false,
      edit: false,
      position: 'right',
      custom: [
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Afficher"></i>',
        },
        
      ],
    },
    columns: {
      
      idF: {
        title: 'Ref',
        type: 'string',
        filter: false,
        valuePrepareFunction(cell,row){
          return "F2019"+cell
        }
      },
      nameF: {
        title: 'Nom',
        type: 'string',
        filter: false,
      },
      note1: {
        title: 'Note',
        type: 'string',
        filter: false,
        sortDirection: 'desc'
      },
    },
  };


  

  onCustom(event) {
    if (event.action === 'showAction') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', event.data.idF);
      this.windowService.open(FournisseurEvaluationComponent,
        {title: 'Notes de fournisseur',
          context: event.data.idF});
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm(`Vous etes sure de supprimer ce fournisseur?`)) {
      event.confirm.resolve(this.service.deleteFournisseurs(event.data.idF).subscribe(
        data => {
          this.source.remove(event);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }
}
