import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { EvaluationPFournisseurService } from '../evaluation-percentage-fournisseur/evaluation-p-fournisseur.service';
import { EvaluationFournisseurService } from '../service/evaluation-fournisseur.service';
import { FournisseurOrderComponent } from '../fournisseur-order/fournisseur-order.component';

@Component({
  selector: 'ngx-modal-evaluation-fournisseur',
  templateUrl: './modal-evaluation-fournisseur.component.html',
  styleUrls: ['./modal-evaluation-fournisseur.component.scss']
})
export class ModalEvaluationFournisseurComponent implements OnInit {
 
  evaluationPercentage: any ;
  note:number;
  noteS:string=""
  	
  idBC = localStorage.getItem('idRC');
  evaluation:any={}
  constructor(private serviceEP:EvaluationPFournisseurService,public windowRef : NbWindowRef,
    private serviceE: EvaluationFournisseurService,
    private router: Router) { }



  ngOnInit() {
    this.evaluation.idBC=this.idBC;
    this.evaluation.dateEvaluation=new Date()
    this.serviceEP.getEvalutionPs().subscribe(data=>{
      this.evaluationPercentage=data;
      for (let i=0;i<this.evaluationPercentage.length;i++){
        this.evaluationPercentage[i].rate =0
      }
      

    })
  }
  valider(event,percentage){
    this.note=0;
    for (let i=0;i<this.evaluationPercentage.length;i++){
      this.note=this.note+ (this.evaluationPercentage[i].rate * this.evaluationPercentage[i].percentage)/100
    }
    
    
  }
  close(){
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    this.windowRef.close();
  }
  addEvaluation(){
    this.evaluation.note=this.note;
    console.log(this.evaluation)
    this.serviceE.addEvalution(this.evaluation).subscribe(data=>{
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      this.windowRef.close();
      this.router.navigate([FournisseurOrderComponent.urlOrderFournisseur]);
    })
  }

}
