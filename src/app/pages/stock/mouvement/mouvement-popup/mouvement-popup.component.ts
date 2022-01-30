import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { Mouvement } from '../mouvement';

@Component({
  selector: 'ngx-mouvement-popup',
  templateUrl: './mouvement-popup.component.html',
  styleUrls: ['./mouvement-popup.component.scss']
})
export class MouvementPopupComponent implements OnInit {
mvt :Mouvement
  constructor(private window:NbWindowRef) { }

  ngOnInit() {
    console.log(this.mvt)
  }
  pSettings = {  
   
    actions:{
      position: 'right',
        delete: false,
        add:false,
        edit:false
    },
    columns: {
      reference: {
        title: "Référence",
        type: "string",
        addable: false,
        editable: false,
        width : "20%"
      },
      nameProduit: {
        title: "Désignation",
        type: "string",
        addable: false,
        editable: false
      },
      quantity: {
        title: "Quantité",
        type: "string",
        width : "20%"
      },
      lot: {
        title: "N°lot",
        type: "string",
        editable: false
      }
    }
};
close(){
  this.window.close()
}
}
