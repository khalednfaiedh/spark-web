import { Component, Inject, OnInit } from '@angular/core';
import { UtilisateurService } from '../utilisateur.service';
import { UtilisateurModel } from '../utilisateur.model';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';

@Component({
  selector: 'ngx-show-utilisateur',
  templateUrl: './show-utilisateur.component.html',
  styleUrls: ['./show-utilisateur.component.scss']
})
export class ShowUtilisateurComponent implements OnInit {
  utilisateur: UtilisateurModel;
  publicRoles: any
  constructor(private service:UtilisateurService,
     @Inject(NB_WINDOW_CONTEXT) context) {
    this.utilisateur = context.utilisateur;
  }
  ngOnInit() {
    console.log(this.utilisateur)
    this.service.getAllRoles().subscribe(
      data => {this.publicRoles = data
      console.log(this.publicRoles)}
    )
  }

}