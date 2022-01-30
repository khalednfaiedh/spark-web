import { DatePipe } from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';
import { DevisAchatService } from '../../devis-achat/services/devis-achat.service';
import { DevisProduitAchatService } from '../../devis-achat/services/devis-produit-achat.service';
import { BonCommandeService } from '../../bon-commande/services/bon-commande.service';
import { Component, OnInit } from '@angular/core';
import { EvaluationFournisseurService } from '../service/evaluation-fournisseur.service';
import { FournisseurService } from '../../../admin/fournisseur/fournisseur.service';

@Component({
  selector: 'ngx-fournisseur-evaluation',
  templateUrl: './fournisseur-evaluation.component.html',
  styleUrls: ['./fournisseur-evaluation.component.scss']
})
export class FournisseurEvaluationComponent implements OnInit {
  idF=localStorage.getItem("idRC")
  note:any[]=[]
  source: LocalDataSource = new LocalDataSource()
  constructor(private serviceDP:DevisProduitAchatService,private serviceBC:BonCommandeService,private serviceD:DevisAchatService,
    private serviceE:EvaluationFournisseurService,
    public datepipe: DatePipe,
    private serviceF:FournisseurService) { }

  ngOnInit() {
    
    this.serviceF.getFournisseurById(+this.idF).subscribe(
      data => {
        console.log(data)
        this.serviceBC.getAllBonCommandeFournisseur(data.id).subscribe(data2 =>{
          if (data2.length!=0){
            for (let i=0;i<data2.length;i++){
              if (data2[i].note != null && data2[i].note!=0){
                this.note.push({idBC:data2[i].idBC,note:data2[i].note})
                this.source=new LocalDataSource(this.note)
              }
              
            }
          } 
        });

        
               
         },
      error => { console.log(error); });
    
  }
  settings = {
    
    actions: {
      delete:false,
      add: false,
      edit: false,
      position: 'right',
      

    },
    columns: {
      idBC: {
        title: 'Référence bon commande',
        type: 'string',
        filter: true,
        valuePrepareFunction(cell,row){
          return "BC"+ cell
        }
      },
      note: {
        title: 'Note',
        type: 'string',
        filter: true,
       
      },


    },
  };


}
