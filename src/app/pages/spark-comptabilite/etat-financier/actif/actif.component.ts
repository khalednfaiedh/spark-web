import { Component, OnInit, ViewChild } from '@angular/core';
import { ActifService } from './actif.service';
import { ExcerciceService } from '../../excercice/excercice.service';
import { Actif } from './actif';
import { TostarService } from '../../tostar/tostar.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbWindowService } from '@nebular/theme';
import { BalanceImportComponent } from '../../balance-import/balance-import.component';

@Component({
  selector: 'ngx-actif',
  templateUrl: './actif.component.html',
  styleUrls: ['./actif.component.scss']
})
export class ActifComponent implements OnInit {
  @ViewChild(BalanceImportComponent) importB;

actifs:Actif[];
annee:String;
annee02:number;
 
date:Date;
balance= new filterDate();
  constructor( private actifService:ActifService,
    private exerciceService:ExcerciceService, 
     private tostarService:TostarService,
     private windowService: NbWindowService) { }

  ngOnInit() {
     
    let idExercice= localStorage.getItem('idExercice')
    this.exerciceService.getExcerciceById(+idExercice).subscribe(
      data =>  {
        this.annee=data.annee;
        var x = +this.annee
        this.annee02=x-1;

        this.actifService.getListActif(data.annee).subscribe(

          dat=>{this.actifs=dat;console.log(this.actifs)},
          err=>{console.log('error get list actifs')}
          
        )
              },
      error => {console.log(error);}
      );

  }
// ngAfterViewInit(): void {
//   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
//   //Add 'implements AfterViewInit' to the class.
//   this.b = this.importB.msg
//   console.log( "khaleddd") 

// console.log( this.b) 
// }
  dataNotFound()
 {
   if(this.actifs == null)
       {
         return true;
       }
       else
       {
      return false;
       }
      }


      ActifByDate()
      {
        console.log(this.balance)

        this.actifService.getListActifByTwoDate(this.balance).subscribe(
          data=>{console.log(data);this.date=data;this.actifs=data},
          err=>{console.log("error "); 
           this.tostarService.showToast(NbToastStatus.DANGER,"ERROR","Date invalid");
          
          }
        )
      }
      importBalance()
      {
        console.log('import balance!!!')

        this.windowService.open(BalanceImportComponent,{ title: ` Import Balance` });
      }

      calculWidthimport()
        {
          var  balanceImport = JSON.parse(localStorage.getItem("balancesImporter"));
          console.log(balanceImport);

          if(balanceImport == null)
          {
this.tostarService.showToast(NbToastStatus.DANGER,'Interdiction',"Aucune balance n'importée !  importer une balance S'il vous plaît")
          }else
          {

          this.actifService.calculByBalanceImporter(balanceImport).subscribe(

            data=>{console.log(data),this.actifs=data},
            err=>{console.log("errr")}
          )
        }
      }
      


}
export class filterDate{
  private startDate:Date;
  private endDate:Date;
}
