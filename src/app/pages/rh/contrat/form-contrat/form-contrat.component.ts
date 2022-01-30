import { Component, OnInit } from '@angular/core';
import { NbDateService, NbWindowRef } from '@nebular/theme';
import { ContratModel } from '../contrat.model';
import { ContratService } from '../contrat.service';
import { Router } from '@angular/router';
import { CategorieModel } from '../../../rh-parametrage/categorie/categoeie.model';
import { CategorieService } from '../../../rh-parametrage/categorie/categorie.service';
import { RegimeHoraireeService } from '../../../rh-parametrage/regime-horaire/regimeHoraire.service';
import { RegimeHoraireModel } from '../../../rh-parametrage/regime-horaire/regimeHoraire.model';
import { EntrepriseService } from '../../../admin/entreprise/entreprise.service';
import { Entreprise } from '../../../admin/entreprise/entreprise';
import { EmployeListService } from '../../../admin/employe-list/employe-list.service';
import { EmployeListModel } from '../../../admin/employe-list/employe-list.model';
@Component({
  selector: 'ngx-form-contrat',
  templateUrl: './form-contrat.component.html',
  styleUrls: ['./form-contrat.component.scss'],
})
export class FormContratComponent implements OnInit {
  Aj: string;
  contrat: ContratModel
  categorie : any ;
  regime : RegimeHoraireModel[] ;
  entreprises : Entreprise[];
  R : any ;
  selectedRegime : RegimeHoraireModel ;
  emp : EmployeListModel
  CategorieEntreprise : CategorieModel ;
  
  constructor(protected dateService: NbDateService<Date>, private categorieService : CategorieService ,
    private service: ContratService, private router: Router, private windowRef: NbWindowRef
    , private regimeService : RegimeHoraireeService,
    private entrepriseService : EntrepriseService,
    private employeService : EmployeListService) {
  }

  ngOnInit() {
    
    this.selectedRegime = new RegimeHoraireModel()
    this.contrat = new ContratModel();
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.Aj = 'Ajouter';
    }
    if (e === '1') {
      let idEmpl = localStorage.getItem('idEmpl');
      let id = localStorage.getItem('idC');
      this.Aj = 'Modifier';
      this.service.getContratsById(+id).subscribe(
        data => {
           this.contrat = data;
           this.contrat.dateDebut =new Date(data.dateDebut);
           this.contrat.dateFin = new Date(data.dateFin);
         },
        error => { });
    }

 this.categorie =[] ;
 this.categorieService.getAllCategorie().subscribe(
   data => {this.categorie = data;
 
},
   error =>{}
 );
this.regimeService.getAllRegimes().subscribe(
  data => { this.regime = data;},
  error =>{}
  );
  this.entrepriseService.getAllEnterprise().subscribe(
    data => { this.entreprises = data;},
    error =>{}
    );
}

  onAddC() {
    let id= localStorage.getItem('current_entreprise')
    this.contrat.idEntreprise=+id
  
    let e = localStorage.getItem('e');
    let idEmpl = localStorage.getItem('idEmpl');
    if (e === '0') {
      this.service.addContrats(this.contrat, +idEmpl ).subscribe(
        data => {
          localStorage.removeItem('e');
        },
        error => {
         
        });
    }
    if (e === '1') {
      this.service.updateContrats(this.contrat, +idEmpl).subscribe(
        data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idRC');
        },
        error => {
       
        });
    }
    this.employeService.getEmployesById(+idEmpl).subscribe(
      data => {
        if (data.idE !== this.contrat.idEntreprise) {
          this.emp = data
          this.emp.idE = this.contrat.idEntreprise
          this.employeService.updateEmployes(this.emp).subscribe(
           data => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/rh/employe"]));
            this.windowRef.close(); 
            console.log("success update contrat && employee entreprise")}
          )
        }else {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(["/pages/rh/contrat"]));
          this.windowRef.close();
          console.log("success update contrat")
        }
      }
    )
  }
change(){

    this.regimeService.getRegimeById(this.contrat.idRegime).subscribe(
      data => { 
        this.selectedRegime = data; 
       
      },
      error =>{
      },
      );    
  }
  onClose(){
    this.windowRef.close()
  }
}