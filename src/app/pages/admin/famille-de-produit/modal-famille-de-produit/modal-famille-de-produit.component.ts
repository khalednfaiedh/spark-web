import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { FamilleDeProduitModel } from '../famille-de-produit.model';
import { FamilleDeProduitService } from '../famille-de-produit.service';

@Component({
  selector: 'ngx-modal-famille-de-produit',
  templateUrl: './modal-famille-de-produit.component.html',
  styleUrls: ['./modal-famille-de-produit.component.scss']
})
export class ModalFamilleDeProduitComponent implements OnInit {
FamilleDeProduit: FamilleDeProduitModel;
FamilleDeProduits: FamilleDeProduitModel[];
A: string;
  constructor(private service: FamilleDeProduitService, public windowRef: NbWindowRef, private router: Router) { }

  ngOnInit() {

    let idEntreprise = localStorage.getItem('current_entreprise')
    this.FamilleDeProduit =new FamilleDeProduitModel();
    this.service.getAllFamilleDeProduit(+idEntreprise).subscribe(data=>{
      this.FamilleDeProduits = data;
    },
    error=>{console.log("error");});
    let e = localStorage.getItem("e");
    if(e === "0"){
      this.A = "Ajouter";
    }
    if(e === "1"){
      this.A = "Modifier";
      let idC = localStorage.getItem("idFamilleDeProduit")
      this.service.getFamilleDeProduitById(+idC).subscribe(data=>{
        this.FamilleDeProduit = data;
      },
      error=>{
        console.log("error");
      })
    }
  }
  onAdd() {
    let idEntreprise = localStorage.getItem('current_entreprise')
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.service.addFamilleDeProduit(+idEntreprise,this.FamilleDeProduit)
        .subscribe(data => {
            localStorage.removeItem('e');
            localStorage.removeItem('idFamilleDeProduit');
            this.windowRef.close();
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(["/pages/admin/familleDeProduit"]));
          },
          error => {
            console.log('error');
          });
      
    }
    if (e === '1') {
      this.service.updateFamilleDeProduit(+idEntreprise,this.FamilleDeProduit).subscribe(
        data => {
        localStorage.removeItem('e');
        localStorage.removeItem('idFamilleDeProduit');
        this.windowRef.close();
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(["/pages/admin/familleDeProduit"]));
        },
        error => {
          console.log('error');
        });
    }
  }
  onclose(){
    this.windowRef.close();
  }

}
