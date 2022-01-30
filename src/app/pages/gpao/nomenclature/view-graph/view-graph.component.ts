import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularTreeGridComponent } from 'angular-tree-grid';
import { ActivatedRoute } from '@angular/router';
import { NomenclatureService } from '../nomenclature.service';
import { Nomenclature } from '../nomenclature';

@Component({
  selector: 'ngx-view-graph',
  templateUrl: './view-graph.component.html',
  styleUrls: ['./view-graph.component.scss']
})
export class ViewGraphComponent implements OnInit {
  id: number
  @ViewChild('angularGrid') angularGrid: AngularTreeGridComponent;
  composants = []
  nomenclature= new Nomenclature()
  constructor(private route: ActivatedRoute,
    private nomenclatureService: NomenclatureService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

      this.nomenclatureService.getNomenclatureById(this.id).subscribe(
        data=>{this.nomenclature=data}
      )

    this.nomenclatureService.getListComposantNomenclature(this.id).subscribe(

      data => { this.composants = data ;console.log(this.composants)},
      err => { console.log('err get listcomposant by nomenclature') }

    )


  }

 /* @ViewChild('angularGrid') angularGrid: AngularTreeGridComponent;
  data:any=[] 
  data: any = [
    { idProduit: 1, name: 'Bimal', niveau: 1, prix: 600, quantitee: 1000, idParent: 0 },
    { idProduit: 2, name: 'Bhagi', niveau: '', prix: 95, quantitee: 1, idParent: 1 },
    /* { id: 3, name: 'Kalyana',   niveau: 1.1, weight: 105, gender: 1, phone: 7930343463, parent: 1},
     { id: 4, name: 'Prakash',   niveau: 2, weight: 20, gender: 1, phone: 7930343463, parent: 0},
     { id: 5, name: 'Jitu',      age: 21, weight: 61, gender: 1, phone: 7930343463, parent: 4},
     { id: 6, name: 'Sunil',     niveau: 3, weight: 87, gender: 1, phone: 7930343463, parent: 0},
     { id: 7, name: 'Tadit',     age: 40, weight: 60, gender: 1, phone: 7930343463, parent: 6},
     { id: 8, name: 'Suraj',     niveau:'', weight: 60, gender: 1, phone: 7930343463, parent: 1},
     { id: 9, name: 'Swarup',    age: 20, weight: 40, gender: 1, phone: 7930343463, parent: 4},
     { id: 10, name: 'Lakin',    age: 21, weight: 55, gender: 1, phone: 7930343463, parent: 3},
  ];*/

  configs: any = {

    id_field: 'idProduit',
    parent_id_field: 'idParent',
    parent_display_field: 'name',
    css: { // Optional
      expand_class: 'fa fa-caret-right',
      collapse_class: 'fa fa-caret-down',




    },
    columns: [
      {
        name: 'niveau',
        header: 'Niveau',
        width: '25%'

      },
      {
        name: 'name',
        header: 'Produit',
        width: '20%'
      },

      {
        name: 'prix',
        header: 'Prix Unitaire',
        width: '20%',
        renderer: function (value) {
          return value + ' TND';
        }
      },
      {
        name: 'quantity',
        header: 'Quantitée',
        width: '20%'

      },
      {
        name: 'nameProduitParent',
        header: 'Produit Parent',
        width: '50%'

      },

    ]
  };

  collapseAll() {
    this.angularGrid.collapseAll();
  }

  expandAll() {
    this.angularGrid.expandAll();
  }

}
