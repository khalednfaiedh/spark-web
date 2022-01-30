import { Component, OnInit } from '@angular/core';
import { Passif } from './passif';
import { filterDate } from '../actif/actif.component';
import { PassifService } from './passif.service';
import { ExcerciceService } from '../../excercice/excercice.service';
import { TostarService } from '../../tostar/tostar.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-passif',
  templateUrl: './passif.component.html',
  styleUrls: ['./passif.component.scss']
})
export class PassifComponent implements OnInit {

  passifs:Passif[];
annee:String;
annee02:number;

date:Date;
balance= new filterDate();
  constructor( private passifService: PassifService,
               private exerciceService:ExcerciceService,  
               private tostarService:TostarService,) { }


  ngOnInit() {

    let idExercice= localStorage.getItem('idExercice')
    this.exerciceService.getExcerciceById(+idExercice).subscribe(
      data =>  {
        this.annee=data.annee;
        var x = +this.annee
        this.annee02=x-1;

        this.passifService.getListPassif(data.annee).subscribe(

          dat=>{this.passifs=dat;console.log(this.passifs)},
          err=>{console.log('error get list actifs')}
          
        )
              },
      error => {console.log(error);}
      );
  }

  dataNotFound()
  {
    if(this.passifs == null)
        {
          return true;
        }
        else
        {
       return false;
        }
       }
 
 
       passifsByDate()
       {
         console.log(this.balance)
 
         this.passifService.getListPassifByTwoDate(this.balance).subscribe(
           data=>{console.log(data);this.date=data;this.passifs=data},
           err=>{console.log("error "); 
            this.tostarService.showToast(NbToastStatus.DANGER,"ERROR","Date invalid");
           
           }
         )
       }

}
