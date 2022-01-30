import { Component, OnInit } from '@angular/core';
import { ModalExcerciceComponent } from './modal-excercice/modal-excercice.component';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'ngx-excercice',
  templateUrl: './excercice.component.html',
  styleUrls: ['./excercice.component.scss']
})
export class ExcerciceComponent implements OnInit {

  constructor(private router : Router,
    private windowService: NbWindowService,) { }

  ngOnInit() {

    
  }


  creerExercice(){

    localStorage.removeItem('e');
    localStorage.setItem('e','0');
    this.windowService.open( ModalExcerciceComponent, { title: `Créer un  Exercice` }); 
  }
  
}
