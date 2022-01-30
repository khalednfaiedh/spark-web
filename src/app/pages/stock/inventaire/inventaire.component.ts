import { Component, OnInit } from '@angular/core';
import { InventaireService } from './inventaire.service';

@Component({
  selector: 'ngx-inventaire',
  templateUrl: './inventaire.component.html',
  styleUrls: ['./inventaire.component.scss']
})
export class InventaireComponent implements OnInit {
  source: any;
  public static urlInventaire = "/pages/stock/inventaire";
  constructor(public service: InventaireService) { }

  ngOnInit() {
    this.service.getAll().subscribe(
      data => { this.source = data }
    )
  }
settings = {
    add: false,
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },

    delete: false,
    actions: {
      position: 'right',
      add: false,
      delete: false,
    },
    columns: {
  
      nameProduit: {
        title: "Produit",
        type: 'number',
      },
    
      quantiteInformatique: {
        title: 'Qte Informatique',
        type: 'number',
      },
      quantitePhysique: {
        title: "Qte Physique",
        type: 'number',
      },
      commentaire: {
        title: "Justification Ecart",
        type: 'number',
        width:'50%'
      },
      
    },
  };


  onSaveConfirm(event): any {

    this.service.add(event.newData).subscribe(
      data => {
       // this.source.update(event.newData);
      },
      error => {
        console.log('erreur');
      },
      event.confirm.resolve(event.newData),
    );
  }
}