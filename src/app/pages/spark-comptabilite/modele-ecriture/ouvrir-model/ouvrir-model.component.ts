import { Component, OnInit } from '@angular/core';
import { ModeleEcritureService, ModelEcriture } from '../modele-ecriture.service';
import { Router } from '@angular/router';
import { NbWindowService, NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-ouvrir-model',
  templateUrl: './ouvrir-model.component.html',
  styleUrls: ['./ouvrir-model.component.scss']
})
export class OuvrirModelComponent implements OnInit {

  constructor(  private modeleEcritureService:ModeleEcritureService,
    private  router:Router,    private windowRef: NbWindowRef, ) { }
modeles=[]
modele:any 
  ngOnInit() {

    this.modeleEcritureService.getAllModelEcriture().subscribe(

      data=>{this.modeles=data},
      error=>{console.log("error")}
    )

    let annee = localStorage.getItem('annee')
    let idJournal2 = localStorage.getItem('idJournal2')
    let codJournal = localStorage.getItem('codJournal')
    let mois = localStorage.getItem('mois')

   
    console.log(annee)
    console.log(idJournal2)
    console.log(codJournal)
    console.log(mois)
  }


  ouvrirModele()
  {
  console.log(this.modele);
  localStorage.setItem('idModele',this.modele.id)
  localStorage.setItem('e','2');
  this.windowRef.close();
  this.router.navigateByUrl('/',{skipLocationChange: true}).then(()=>
  this.router.navigate(['/pages/comptabilite//modeleEcriture']));
  }
}
