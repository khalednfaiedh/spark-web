import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { AdminComponent } from '../../../admin/admin.component';
import { UtilisateurModel } from '../../../utilisateur/utilisateur.model';
import { UtilisateurService } from '../../../utilisateur/utilisateur.service';
import { CrmComponent } from '../../crm.component';
import { Planning } from '../planning';
import { PlanningService } from '../planning.service';
import { TostarService } from '../tostar.service';

@Component({
  selector: 'ngx-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
types = CrmComponent.TYPE_ENTREPRISE
regimes = CrmComponent.REGIME_ENTREPRISE
pays = AdminComponent.PAYES_LIST
etats=["En cours","Archivés"]
planning :Planning
plannings: Planning[];
prospecteurs : UtilisateurModel[]
btn :String
disabled : boolean
 check :boolean =true
  constructor(protected service: PlanningService, protected tostarService: TostarService,
    protected router: Router,protected windowRef:NbWindowRef,
    protected userService : UtilisateurService,
    @Inject(NB_WINDOW_CONTEXT) context) {
      this.disabled = context.disabled
     if (context.planning) {
      this.planning = context.planning
      this.planning.dateDebut = new Date(context.planning.dateDebut)
      this.planning.dateFin = new Date(context.planning.dateFin)
      this.btn = 'Modifier'
     }else {
       this.planning = new Planning()
       this.btn='Ajouter'}
     }
  ngOnInit() {
    this.userService.getAllUtilisateurPublique().subscribe(
      data => {this.prospecteurs = data},
      error =>{console.log('error',error)
    })
    }
  // add(){
  //   this.service.getAllEnCours().subscribe(
  //     data => {  this.plannings = data; 
  //           if (this.plannings.length > 0) {
  //             this.plannings.forEach(p => {
  //               if (p.idProspecteur == this.planning.idProspecteur &&
  //                this.planning.etat == 'En cours') {
  //                       this.tostarService.showToast(NbToastStatus.DANGER,"Le prospecteur selectioner a une autre planning en cours.",
  //                       "Veuillez selectionner un autre prospecteur où archiver le planning "+p.designation+" (N° "+p.idPlanning+")")
  //                     return;
  //              }
  //              this.save();
  //             });
  //           } else {
  //             this.save();
  //           }
  //    },)
     
  //  }

  add(){
    this.service.getAllEnCours(this.planning.idProspecteur).subscribe(
      data => {  this.plannings = data; 
            if (this.plannings.length > 0) {
                   if (this.planning.etat == 'En cours' &&
                   this.plannings[0].idPlanning !== this.planning.idPlanning ) {
                        this.tostarService.showToast(NbToastStatus.DANGER,
                          "Le prospecteur selectioner a une autre planning en cours.",
                        "Veuillez selectionner un autre prospecteur où archiver le planning "
                        +this.plannings[0].designation+" (N° "+this.plannings[0].idPlanning+")")
                        return ; 
               }else {this.save()}
             } else {  
              this.save();
            }
     },)
    
   }
   save(){
    this.service.add(this.planning).subscribe(
      res => {
        this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["/pages/crm/planning"]));
      this.windowRef.close();
      },
      error =>{console.log('error',error);}
    )
   }
changeForm(){
  
}
close(){
  this.windowRef.close();
}
}
