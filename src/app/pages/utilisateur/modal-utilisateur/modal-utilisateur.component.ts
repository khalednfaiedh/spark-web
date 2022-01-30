import { Component, Inject, OnInit } from '@angular/core';
import { UtilisateurService } from '../utilisateur.service';
import { UtilisateurModel } from '../utilisateur.model';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { UtilisateurComponent } from '../utilisateur.component';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { NgForm } from '@angular/forms';
import { EmployeListModel, EmployeMinModel } from '../../admin/employe-list/employe-list.model';
import { EmployeListService } from '../../admin/employe-list/employe-list.service';
import { EntrepriseService } from '../../admin/entreprise/entreprise.service';

@Component({
  selector: 'ngx-modal-utilisateur',
  templateUrl: './modal-utilisateur.component.html',
  styleUrls: ['./modal-utilisateur.component.scss']
})
export class ModalUtilisateurComponent implements OnInit {
  add: string;
  SelectedType: string
  // ajout d'un autre type de compte  
  //modification de la fonction changeForm()
  // HTML tests
  types = ['Externe', 'Interne']
  utilisateur = new UtilisateurModel();
  publicRoles: any
  employes: EmployeMinModel[];
  SelectedEmploye:EmployeMinModel;
  email_exist: boolean;
  username_exist: boolean;
  constructor(private service: UtilisateurService, private employeService: EmployeListService,
    private router: Router, private windowRef: NbWindowRef,
    private entrepriseService: EntrepriseService,
    @Inject(NB_WINDOW_CONTEXT) context) {
    if (context.utilisateur) {
      this.utilisateur = context.utilisateur;
      this.add = "Modifier";
    }
    else { this.add = "Ajouter"; }
  }

  ngOnInit() {
    this.service.getAllPublicRoles().subscribe(
      data => { this.publicRoles = data })
  }

  // onAdd(){
  //   if( this.add === "Ajouter"){
  //     this.service.addUtilisateur(this.utilisateur).subscribe(data=>{

  //       this.windowRef.close();
  //       this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  //          this.router.navigate([UtilisateurComponent.urlUtilisateur]));
  //     },
  //     error=>{console.log("error");})
  //   }
  //   if(this.add === "Modifier"){

  //     this.service.updateUtilisateur(this.utilisateur).subscribe(data=>{

  //       this.windowRef.close();
  //       this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  //          this.router.navigate([UtilisateurComponent.urlUtilisateur]));
  //     },
  //     error=>{
  //       console.log("error");
  //     })
  //   }
  // }
  close() {
    this.windowRef.close()
  }
  changeForm() {
    this.utilisateur = new UtilisateurModel();
    if (this.SelectedType === 'Externe') {
      this.employes = []
    } else if (this.SelectedType === 'Interne') {
      this.employeService.getAllEmployeesMin().subscribe(
        data => { this.employes = data },
        error => { console.log('error get employes') }
      )
    }
  }
  changeEmp(){
    if(this.SelectedEmploye){
      this.utilisateur = new UtilisateurModel()
      this.utilisateur.idEmploye = this.SelectedEmploye.matricule
      this.utilisateur.firstName = this.SelectedEmploye.prenom
      this.utilisateur.lastName = this.SelectedEmploye.nom
      this.utilisateur.email = this.SelectedEmploye.mail
      this.utilisateur.tel = this.SelectedEmploye.tel
      this.utilisateur.gender = this.SelectedEmploye.civilite
      console.log(this.utilisateur)
  }
  }

  onAdd(form: NgForm) {
    if (form.valid) {
      if (this.add === "Ajouter") {
   let idE = localStorage.getItem('current_entreprise')
        this.service.addUtilisateur(this.utilisateur).subscribe(data=>{

          this.entrepriseService.addUserToEnterprise(+idE,data.id).subscribe(
            data => {console.log("success server side")},
            error =>{console.log("error server side")}
        )
          this.windowRef.close();
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
             this.router.navigate([UtilisateurComponent.urlUtilisateur]));
        },
        error => {
        
          if(error.error.code === 'USERNAME_EXISTS_EXCEPTION'){
           this.username_exist = true
          }else if(error.error.code = "EMAIL_EXISTS_EXCEPTION"){
            this.email_exist = true
        }
          else console.log("error server side"); }
        )
      }
      if (this.add === "Modifier") {

        this.service.updateUtilisateur(this.utilisateur).subscribe(data => {

          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate([UtilisateurComponent.urlUtilisateur]));
        },
          error => {
            console.log("error");
          })
      }
    }
  }
}



































