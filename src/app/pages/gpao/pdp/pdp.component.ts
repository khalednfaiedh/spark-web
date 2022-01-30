import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../admin/product/product.service';
import { Pdp, PdpSortie } from './pdp';
import { PdpService } from './pdp.service';

@Component({
  selector: 'ngx-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.scss']
})
export class PdpComponent implements OnInit {
  produits=[];
  dateFin:Date;
  dateDarivee:Date;
  pdpSortie: PdpSortie[]=[]
  strategies=[{id:"1", name:"Lot Fixe"},{id:"0", name:"Lot Pour Lot"}]
  pdp = new Pdp();
  isValide:boolean=true;
  isValide2:boolean=true;
  types=[{id:0,name:"Jour"},{id:1,name:"Semaine"},{id:2, name:"Mois"}]
  constructor(  private produitService: ProductService,
   private pdpService: PdpService) { }

  ngOnInit() {
    let id= localStorage.getItem('current_entreprise')
    this.pdp.idEntreprise=+id
    this.produitService.getAllproduct(+id).subscribe(
      data => { this.produits = data }
    )
  }
  calculPdp()
  {
    console.log(this.pdp)
  

    this.pdpService.pdp(this.pdp).subscribe(
      data=>{console.log(data);this.pdpSortie=data
      this.dateFin=  this.pdpSortie[this.pdpSortie.length-1].dateFin;
      this.dateDarivee=this.pdpSortie[this.pdpSortie.length-1].dateArrivee
        this.isValide=false;
      this.isValide2=true;},
      err=>{console.log("err")
    console.log(err)
    if(err.status == 400)
    {
      this.isValide2=false
      this.isValide=true;
    }
  
  }
    )



    // this.pdpService.getIfoClientByPrevision(this.pdp).subscribe(
    //   data=>{console.log("info client id:",data)},
    //   err=>{console.log("err get info client ")}
    // )
  }
}
