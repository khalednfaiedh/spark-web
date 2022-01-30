import { Component, OnInit } from '@angular/core';
import { Enterprise } from '../entreprise/entreprise';
import { Excercice, ExcerciceService } from '../excercice/excercice.service';
import { EntrepriseService,   } from '../entreprise/entreprise.service';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { BalanceTiersService } from './balance-tiers.service';
import { balance } from '../blance-general/blance-general.component';
import { TostarService } from '../tostar/tostar.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ImportExportService } from '../import-export/import-export.service';
 

@Component({
  selector: 'ngx-balanc-tiers',
  templateUrl: './balanc-tiers.component.html',
  styleUrls: ['./balanc-tiers.component.scss']
})
export class BalancTiersComponent implements OnInit {
  class1:any[]=[];
  class2:any[]=[];
  class3:any[]=[];
  class4:any[]=[];
  class5:any[]=[];
  class6:any[]=[];
  class7:any[]=[];
  source=[];

  balance = new balance()
  entreprise = new Enterprise();
  exercice= new Excercice();
  exercices=[]
  id:any
  classes=["1","2","3","4","5","6","7"]
  test:boolean= true;
  exerciceBoolean: boolean;

  
  constructor(private balanceService:BalanceTiersService ,
    private entrepriseService:EntrepriseService,
              private exerciceService:ExcerciceService,
              private router:Router,private menuService: NbMenuService,   
              private tostarService:TostarService,  private excelService:ImportExportService) { }

  ngOnInit() {
this.balance.endDate=null;
this.balance.startDate=null;
this.balance.classe=null;

    let idEntreprise=localStorage.getItem('current_entreprise');

    this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
      data=>{this.entreprise = data;
         
      console.log(data);
      },
      error=>{console.log(error);
      }
    );


    this.exerciceService.getAllExcercice(+idEntreprise).subscribe(
      data=>{this.exercices=data},
      error=>{console.log("ereur excercices")}
    )

    let idExercice= localStorage.getItem('idExercice')
    
    if( idExercice == null)
    {
      this.exerciceBoolean =true;
    }
    else
    {
      this.exerciceBoolean=false;
    }

    this.exerciceService.getExcerciceById(+idExercice).subscribe(
      data => {this.exercice = data;
        
        
    this.balanceService.getBalanceTiers(data.annee).subscribe(
      data=>{
         
        console.log(data);
        this.source=data;
        this.class1 = data.class1;
        this.class2= data.class2;
        this.class3=data.class3;
        this.class4 = data.class4;
        this.class5= data.class5;
        this.class6=data.class6;
        this.class7=data.class7; 
  },
  error=>{console.log("error")
    });
 //ss   
              },
      error => {console.log(error);}
      );



}

onClick03(){
  window.history.back();
}
getTotalSoldIntial(class1)
{
   var x=0;
  
class1.forEach(element => {
  x+=element.soldIntiale;
});
  return x;
}

getTotalCumulDebit(class1)
{
   var x=0;
  
class1.forEach(element => {
  x+=element.cumulDebit;
});
  return x;
}

getTotalCumulCredit(class1)
{
   var x=0;
  
class1.forEach(element => {
  x+=element.cumulCredit;
});
  return x;
}

getTotalsoldDebiteur(class1)
{
   var x=0;
  
class1.forEach(element => {
  x+=element.soldDebiteur;
});
  return x;
}

getTotalsoldCrediteur(class1)
{
   var x=0;
  
class1.forEach(element => {
  x+=element.soldCrediteur;
});
  return x;
}

getTotalBalanceCumulDebit(class1,class2,class3,class4,class5,class6,class7)
{
   var x=0;
  
class1.forEach(element => {
  x+=element.cumulDebit;
});

class2.forEach(element => {
  x+=element.cumulDebit;
});

class3.forEach(element => {
  x+=element.cumulDebit;
});

class4.forEach(element => {
  x+=element.cumulDebit;
});

class5.forEach(element => {
  x+=element.cumulDebit;
});
class6.forEach(element => {
  x+=element.cumulDebit;
});
class7.forEach(element => {
  x+=element.cumulDebit;
});
  return x;
}

getTotalBalancecumulCredit(class1,class2,class3,class4,class5,class6,class7)
{
   var x=0;
  
class1.forEach(element => {
  x+=element.cumulCredit;
});

class2.forEach(element => {
  x+=element.cumulCredit;
});

class3.forEach(element => {
  x+=element.cumulCredit;
});

class4.forEach(element => {
  x+=element.cumulCredit;
});

class5.forEach(element => {
  x+=element.cumulCredit;
});
class6.forEach(element => {
  x+=element.cumulCredit;
});
class7.forEach(element => {
  x+=element.cumulCredit;
});
  return x;
}



getTotalBalanceSoldDebiteur(class1,class2,class3,class4,class5,class6,class7)
{
   var x=0;
  
class1.forEach(element => {
  x+=element.soldDebiteur;
});

class2.forEach(element => {
  x+=element.soldDebiteur;
});

class3.forEach(element => {
  x+=element.soldDebiteur;
});

class4.forEach(element => {
  x+=element.soldDebiteur;
});

class5.forEach(element => {
  x+=element.soldDebiteur;
});
class6.forEach(element => {
  x+=element.soldDebiteur;
});
class7.forEach(element => {
  x+=element.soldDebiteur;
});
  return x;
}


getTotalBalanceSoldCrediteur(class1,class2,class3,class4,class5,class6,class7)
{
   var x=0;
  
class1.forEach(element => {
  x+=element.soldCrediteur;
});

class2.forEach(element => {
  x+=element.soldCrediteur;
});

class3.forEach(element => {
  x+=element.soldCrediteur;
});

class4.forEach(element => {
  x+=element.soldCrediteur;
});

class5.forEach(element => {
  x+=element.soldCrediteur;
});
class6.forEach(element => {
  x+=element.soldCrediteur;
});
class7.forEach(element => {
  x+=element.soldCrediteur;
});
  return x;
}

getGrandLivre(id)
  {
   
    this.exerciceService.getExcerciceById(+id).subscribe(
      data => {this.exercice = data;
         console.log(data)
         this.balanceService.getBalanceTiers(data.annee).subscribe(
          data=>{
             
            console.log(data);
            this.source=data;
            this.class1 = data.class1;
            this.class2= data.class2;
            this.class3=data.class3;
            this.class4 = data.class4;
            this.class5= data.class5;
            this.class6=data.class6;
            this.class7=data.class7; 
      },
      error=>{console.log("error"),
       this.test=false;}
      );
      },
      error => {console.log(error);}
      );

      this.test=true;
  }


getTotalBalanceCumulDebit5(class1,class2,class3,class4,class5)
{
   var x=0;
  
class1.forEach(element => {
  x+=element.cumulDebit;
});

class2.forEach(element => {
  x+=element.cumulDebit;
});

class3.forEach(element => {
  x+=element.cumulDebit;
});

class4.forEach(element => {
  x+=element.cumulDebit;
});

class5.forEach(element => {
  x+=element.cumulDebit;
});
 
 
  return x;
}

getTotalBalancecumulCredit5(class1,class2,class3,class4,class5)
{
   var x=0;
  
class1.forEach(element => {
  x+=element.cumulCredit;
});

class2.forEach(element => {
  x+=element.cumulCredit;
});

class3.forEach(element => {
  x+=element.cumulCredit;
});

class4.forEach(element => {
  x+=element.cumulCredit;
});

class5.forEach(element => {
  x+=element.cumulCredit;
});
 
  return x;
}



getTotalBalanceSoldDebiteur5(class1,class2,class3,class4,class5)
{
   var x=0;
  
class1.forEach(element => {
  x+=element.soldDebiteur;
});

class2.forEach(element => {
  x+=element.soldDebiteur;
});

class3.forEach(element => {
  x+=element.soldDebiteur;
});

class4.forEach(element => {
  x+=element.soldDebiteur;
});

class5.forEach(element => {
  x+=element.soldDebiteur;
});
 
  return x;
}


getTotalBalanceSoldCrediteur5(class1,class2,class3,class4,class5)
{
   var x=0;
  
class1.forEach(element => {
  x+=element.soldCrediteur;
});

class2.forEach(element => {
  x+=element.soldCrediteur;
});

class3.forEach(element => {
  x+=element.soldCrediteur;
});

class4.forEach(element => {
  x+=element.soldCrediteur;
});

class5.forEach(element => {
  x+=element.soldCrediteur;
});
  return x;
}



getTotalBalanceCumulDebit67(class1,class2)
{
   var x=0;
  
class1.forEach(element => {
  x+=element.cumulDebit;
});

class2.forEach(element => {
  x+=element.cumulDebit;
});

 
 
 
  return x;
}

getTotalBalancecumulCredit67(class1,class2)
{
   var x=0;
  
class1.forEach(element => {
  x+=element.cumulCredit;
});

class2.forEach(element => {
  x+=element.cumulCredit;
});
 
 
  return x;
}



getTotalBalanceSoldDebiteur67(class1,class2)
{
   var x=0;
  
class1.forEach(element => {
  x+=element.soldDebiteur;
});

class2.forEach(element => {
  x+=element.soldDebiteur;
});
 
 
  return x;
}


getTotalBalanceSoldCrediteur67(class6,class7)
{
   var x=0;
  
class6.forEach(element => {
  x+=element.soldCrediteur;
});

class7.forEach(element => {
  x+=element.soldCrediteur;
});
 
  return x;
}
filterByDate()
{
  console.log(this.dataNotFound())

  if(this.balance.startDate != null && this.balance.endDate != null && this.balance.classe === null)
  {
    console.log("filte by date")
    this.balanceService.BalanceIsBetweenTwoDate(this.balance).subscribe(

          data=>{
            this.source=data;
            this.class1 = data.class1;
            this.class2= data.class2;
            this.class3=data.class3;
            this.class4 = data.class4;
            this.class5= data.class5;
            this.class6=data.class6;
            this.class7=data.class7; 
          },
          error=>{
      this.tostarService.showToast(NbToastStatus.DANGER,"ERROR","Date invalid");
          }
          
        )
  }
  else
  if((this.balance.startDate != null && this.balance.endDate != null && this.balance.classe != null))
  {

    console.log("filte by date and classe")
    this.balanceService.balanceBetwenTwoDateAndClasse(this.balance).subscribe(

      data=>{
        this.source=data;
        this.class1 = data.class1;
        this.class2= data.class2;
        this.class3=data.class3;
        this.class4 = data.class4;
        this.class5= data.class5;
        this.class6=data.class6;
        this.class7=data.class7; 
      },
      error=>{
  this.tostarService.showToast(NbToastStatus.DANGER,"ERROR","Date invalid");
      }
      
    )

  }
  else
  if(this.balance.startDate === null && this.balance.endDate === null && this.balance.classe != null)
  {
    console.log("filtre by classe ")
    this.balanceService.getBalanceTierslAndClasse (this.exercice.annee,this.balance.classe).subscribe(

      data=>{
        this.source=data;
        this.class1 = data.class1;
        this.class2= data.class2;
        this.class3=data.class3;
        this.class4 = data.class4;
        this.class5= data.class5;
        this.class6=data.class6;
        this.class7=data.class7; 
      },
      error=>{
  this.tostarService.showToast(NbToastStatus.DANGER,"ERROR","Date invalid");
      }
      
    )
  }
  else
  if(this.balance.startDate === null && this.balance.endDate === null && this.balance.classe === null)
  {
    this.balanceService.getBalanceTiers (this.exercice.annee).subscribe(
      data=>{
         
        console.log(data);
        this.source=data;
        this.class1 = data.class1;
        this.class2= data.class2;
        this.class3=data.class3;
        this.class4 = data.class4;
        this.class5= data.class5;
        this.class6=data.class6;
        this.class7=data.class7; 
  },
  error=>{console.log("error"),
   this.test=false;}
  );
  }
 

}
dataNotFound()
 {
   if(this.class1.length ===  0 && this.class2.length === 0 && this.class3.length === 0  &&   this.class4.length=== 0
       && this.class5.length === 0  && this.class6.length === 0 && this.class7.length === 0)
       {
         return true;
       }
       else
       {
      return false;
       }
      }

exportToExcel(){
  var data1=[]
  if(this.balance.startDate != null && this.balance.endDate != null && this.balance.classe === null)
  {
    console.log("filte by date")
    this.balanceService.exportBalanceIsBetweenTwoDate(this.balance).subscribe(

          data=>{
             data1=data;this.excelService.exportAsExcelFile(data1,'BALANCE-TIER');
          },
          error=>{
      this.tostarService.showToast(NbToastStatus.DANGER,"ERROR","Date invalid");
          }
          
        )
  }
  else
  if((this.balance.startDate != null && this.balance.endDate != null && this.balance.classe != null))
  {

    console.log("filte by date and classe")
    this.balanceService.exportBalanceBetwenTwoDateAndClasse(this.balance).subscribe(

      data=>{
        data1=data; this.excelService.exportAsExcelFile(data1, 'BALANCE-TIER');
      },
      error=>{
  this.tostarService.showToast(NbToastStatus.DANGER,"ERROR","Date invalid");
      }
      
    )

  }
  else
  if(this.balance.startDate === null && this.balance.endDate === null && this.balance.classe != null)
  {
    console.log("filtre by classe ")
    this.balanceService.exportBalanceTierslAndClasse (this.exercice.annee,this.balance.classe).subscribe(

      data=>{
        data1=data;this.excelService.exportAsExcelFile(data1, 'BALANCE-TIER');
      },
      error=>{
  this.tostarService.showToast(NbToastStatus.DANGER,"ERROR","Date invalid");
      }
      
    )
  }
  else
  if(this.balance.startDate === null && this.balance.endDate === null && this.balance.classe === null)
  {
    this.balanceService.exportBalanceTiers (this.exercice.annee).subscribe(
      data=>{
         
        data1=data;
        
     this.excelService.exportAsExcelFile(data1, 'BALANCE-TIER');
  },
  error=>{console.log("error")
  }
  );
  }

      }


exportToPdf()
{
  console.log(this.source)

  this.balanceService.exportBalanceTierToPdf(this.source).subscribe(

    data=>{console.log('ok')},
    error=>{console.log('error')}
  )
}
previousState() {
  window.history.back();
}

}