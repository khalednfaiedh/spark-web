import { Component, OnInit } from '@angular/core';
import { CategorieMachineModel } from '../categorie-machine.model';
import { CategorieMachineService } from '../categorie-machine.service';

@Component({
  selector: 'ngx-show-categorie-machine',
  templateUrl: './show-categorie-machine.component.html',
  styleUrls: ['./show-categorie-machine.component.scss']
})
export class ShowCategorieMachineComponent implements OnInit {
  source: any;
  categories: CategorieMachineModel[];
  categorie: CategorieMachineModel;
  constructor(private service: CategorieMachineService) { }

  ngOnInit() {
      let id= localStorage.getItem('current_entreprise')
    this.categorie = new CategorieMachineModel();
    let idC = localStorage.getItem("idCategorie");
    this.service.getCategorieMById(+idC).subscribe(data=>{
      this.categorie = data;
      this.source = data.categorieFils;
    });
    this.service.getAllCategorieMByEntreoriseId(+id).subscribe(data=>{
      this.categories = data;
    },
    error=>{console.log("error");});
  }
  settings = {
    actions: false,
    columns: {
      nom: {
        title: 'name',
        type: 'string',
      },
    },
  };
}

