import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { UtilisateurComponent } from '../utilisateur.component';
import { UtilisateurModel } from '../utilisateur.model';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'ngx-on-off-user',
  templateUrl: './on-off-user.component.html',
  styleUrls: ['./on-off-user.component.scss']
})
export class OnOffUserComponent implements OnInit {

  utilisateur: UtilisateurModel;
motif:string
btn:string
  constructor(private service:UtilisateurService,
     private router: Router, 
    private windowRef: NbWindowRef,
     @Inject(NB_WINDOW_CONTEXT) context) {
    this.utilisateur = context.utilisateur;
  }
  ngOnInit() {
    console.log(this.utilisateur)
      if (this.utilisateur.status === 'ACTIF') {
        this.motif = 'désactiver'
        this.btn = 'Désactiver'
      } else if (this.utilisateur.status === 'INACTIF') {
        this.motif = 'activer' 
        this.btn = 'Activer' 
      }
  }

  action(){
    if (this.btn === 'Activer') {
      this.service.activateUtilisateur(this.utilisateur.id).subscribe(
        data => {
          this.windowRef.close();
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
             this.router.navigate([UtilisateurComponent.urlUtilisateur]));
        },
        error=>{
          console.log('CANT ACTIVATE USER')
        }
      )
    } else if (this.btn === 'Désactiver') {
      this.service.desactivateUtilisateur(this.utilisateur.id).subscribe(
        data => {
          this.windowRef.close();
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
             this.router.navigate([UtilisateurComponent.urlUtilisateur]));
        },
        error=>{
          console.log('CANT DESACTIVATE USER')
        }
      )
    }
  }

}
