import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { UtilisateurModel } from '../../../../utilisateur/utilisateur.model';
import { UtilisateurService } from '../../../../utilisateur/utilisateur.service';
import { Intervenant } from '../../../entities/full/Intervenant';
import { TostarService } from '../../../planning/tostar.service';
import { LeadService } from '../../../services/lead.service';

@Component({
  selector: 'ngx-ipopup',
  templateUrl: './ipopup.component.html',
  styleUrls: ['./ipopup.component.scss']
})
export class IpopupComponent implements OnInit {
  intervenant: Intervenant = new Intervenant();
  intervenants:UtilisateurModel[];
  btn:string = "Ajouter"
  INTERVENANT:any
  idAffaire: number;
  constructor(protected windowref: NbWindowRef,
    protected router : Router,
    protected windowRef: NbWindowRef,
   protected leadService: LeadService,
   protected tosterService: TostarService,
    protected utilisateurService : UtilisateurService,
    @Inject(NB_WINDOW_CONTEXT) context) {
      this.idAffaire = context.idAffaire
   if(context.intervenant)    
   { this.intervenant = context.intervenant
    this.INTERVENANT = this.intervenant.username
    this.btn = "Modifier"
}
  }

  ngOnInit() {
      this.utilisateurService.getAllUtilisateurPublique().subscribe(
      data => {
        this.intervenants = data
      },
      error =>{console.log('error',error)
    })
  }
  add(){
    console.log(this.idAffaire)
    console.log(this.intervenant)
    this.leadService.addIntervenats(this.idAffaire,this.intervenant).subscribe(
      res =>{  
        this.tosterService.showToast(NbToastStatus.SUCCESS, "Success", "L'intervenent " + this.intervenant.username +" a ete affecté");
        this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["/pages/crm/affaire/edit",this.idAffaire]));
      this.windowRef.close();
      },
      error=>{}
      )
  
  }
  close(){
    this.windowref.close()
  }
  updateUser(i){
    this.intervenant.username = i.username
    this.intervenant.id = i.id
  }
}
