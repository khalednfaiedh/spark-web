import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { DemandeAchatService } from '../services/demande-achat.service';

@Component({
  selector: 'ngx-confirm-demande-achat',
  templateUrl: './confirm-demande-achat.component.html',
  styleUrls: ['./confirm-demande-achat.component.scss']
})
export class ConfirmDemandeAchatComponent implements OnInit {
  motif: string;
  option: string;
  id: number;
  view: boolean = false;
  btn : String
  constructor(private service: DemandeAchatService,
private router: Router,
private windowRef: NbWindowRef,
    @Inject(NB_WINDOW_CONTEXT) context) {
    this.id = context.id
    if (context.statut == "En attente") {
      this.view = true
      this.motif = ""  
      this.btn= "Enregistrer"
    } else {
      this.btn= "Oui"
      context.statut == "Confirmer" ?( this.motif = "annuler",this.option ="Annuler") : (this.motif = "confirmer",this.option ="Confirmer")
    }
  }

  ngOnInit() {
  }
  save() {
    console.log(this.id)
    this.service.updateStatut(this.id, this.option).subscribe(
      data => { console.log('success update')
      this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate(["/pages/achat/proposition"]));
    this.windowRef.close();},
      error => { console.log(error) }
    )
  }
}
