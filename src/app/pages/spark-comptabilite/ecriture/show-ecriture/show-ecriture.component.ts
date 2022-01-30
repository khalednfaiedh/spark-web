import { Component, OnInit } from '@angular/core';
import { Ecriture, EcritureService } from '../ecriture.service';
import { error } from 'util';

@Component({
  selector: 'ngx-show-ecriture',
  templateUrl: './show-ecriture.component.html',
  styleUrls: ['./show-ecriture.component.scss']
})
export class ShowEcritureComponent implements OnInit {
  ecriture = new Ecriture();
  operation=[];
  source:any
  constructor(private ecritureService:EcritureService) { }

  ngOnInit() {

    let idEcriture=localStorage.getItem('idEcriture')
    localStorage.removeItem('idEcriture')
    this.ecritureService.getEcritureById(+idEcriture).subscribe(
    data=>{
      this.ecriture=data;
    },
    error=>{console.log('error get ecriture by id')}
    );
    this.ecritureService.getAlloperationEcritureByEciture(+idEcriture).subscribe(

      data=>{this.operation=data;console.log(data)},
      error=>{console.log("error get all operation by ecriture")}
    )
  }


  settings = {
    hideSubHeader: true,
    actions: {
      position: 'right',
      
      add: false,
      edit: false,
      delete: false,
      
       

    },

    

    columns: {
      compteGeneral: {
        
        title: 'Compte Générale',
        type: 'string',
        valuePrepareFunction: (compteGeneral) => {
          return compteGeneral == null ? "" :compteGeneral.codeCompte+":"+ compteGeneral.nameCompte 
        },

      }, 
      compteTiers: {
        title: 'Compte Tiers',
        type: 'string',
        valuePrepareFunction: (compteTiers) => {
         
          return compteTiers == null ? "" : compteTiers.codeCompte+":"+ compteTiers.nameCompte 
        },
      },
      debit: {
        title: 'Débit',
        type: 'number',
        valuePrepareFunction: (debit) => {
         
          if(debit == '0')
          {
            return  '';
          }else
          return debit;
       },
        
      },
      credit: {
        title: 'Crédit',
        type: 'number',
        valuePrepareFunction: (credit) => {
         
           if(credit == '0')
           {
             return  '';
           }else
           return credit;
        },
         
      },
     


    },
  };

}
