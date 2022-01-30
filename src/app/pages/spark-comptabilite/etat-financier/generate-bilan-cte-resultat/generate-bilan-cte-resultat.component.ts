import { Component, OnInit } from '@angular/core';
import { EtatFinancierService } from '../etat-financier.service';
import { cpus } from 'os';
import { NbToastrService } from '@nebular/theme';
import { ToastService } from '../toast.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-generate-bilan-cte-resultat',
  templateUrl: './generate-bilan-cte-resultat.component.html',
  styleUrls: ['./generate-bilan-cte-resultat.component.scss']
})
export class GenerateBilanCteResultatComponent implements OnInit {
etatFinancier:any
test:boolean= false;
test2:boolean=false;
annee:number;
actifs:any
passifs:any
etatResultat:any
bilanCompteRlt:any
show: boolean = false
  constructor(private etatFinancierService:EtatFinancierService,
    private toastrService: NbToastrService,
    private TS: ToastService,
    private translate: TranslateService) { }
  ngOnInit() {
    let idEtat = localStorage.getItem("idEtat");
     localStorage.removeItem('idEtat')
    this.etatFinancierService.getEtatFinancierById(+idEtat).subscribe(

      data=>{this.etatFinancier=data;
      console.log(data)
      var id = data.idEtat;
      var dateC = new Date(data.startDate);
      var annee = dateC.getFullYear();
      this.annee=annee;

this.etatFinancierService.GenerationBilanCompteRlt(id).subscribe(
data=>{  this.test=true;

this.consulter();
},
error=>{ this.TS.makeToast(NbToastStatus.INFO,this.translate.instant('etatfinancier.list19')
,this.translate.instant('etatfinancier.list20')
);
  this.show = true;
})
    },
      error=>{console.log("error")}
    )
  }
  
  consulter()
  {
    let idEtat = localStorage.getItem("idEtat");
     localStorage.removeItem('idEtat')
    this.etatFinancierService.ConsulterBilanCompteRltById(+idEtat,"Actif").subscribe(
      data=>{ this.actifs=data;
        this.test=true;
        this.bilanCompteRlt=data.bilanCompteRlt;console.log(this.actifs)  
      },
      error =>{console.log("ca nexiste pas");}
      );
      this.test2=true;

      this.etatFinancierService.ConsulterBilanCompteRltById(+idEtat,"Passif").subscribe(
        data=>{ this.passifs=data;
          this.test=true;
          this.bilanCompteRlt=data.bilanCompteRlt;console.log(this.passifs)     
        },
        error =>{console.log("ca nexiste pas");}
        );
        this.test2=true;
  
      this.etatFinancierService.ConsulterBilanCompteRltById(+idEtat,"EtatResultat").subscribe(
        data=>{ this.etatResultat=data;
          this.test=true;
          this.bilanCompteRlt=data.bilanCompteRlt;console.log(this.etatResultat)     
        },
        error =>{console.log("ca nexiste pas");}
        );
        this.test2=true;
  } 
}