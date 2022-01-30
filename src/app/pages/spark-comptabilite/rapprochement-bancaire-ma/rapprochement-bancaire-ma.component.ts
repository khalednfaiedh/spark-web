import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ModalRapprochementComponent } from './modal-rapprochement/modal-rapprochement.component';

@Component({
  selector: 'ngx-rapprochement-bancaire-ma',
  templateUrl: './rapprochement-bancaire-ma.component.html',
  styleUrls: ['./rapprochement-bancaire-ma.component.scss']
})
export class RapprochementBancaireMAComponent implements OnInit {

  constructor(private windowService: NbWindowService,
    private router: Router,) { }

  ngOnInit() {

   this.windowService.open(  ModalRapprochementComponent, { title: `ouvrir un  Journal` }); 
  }

}
