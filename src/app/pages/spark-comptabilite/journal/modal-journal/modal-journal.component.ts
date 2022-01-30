import { Component, OnInit } from '@angular/core';
import { JournalComponent } from '../journal.component';
import { Journal, JournalService } from '../journal.service';
import { Plan, PlanGeneralService } from '../../plan-general/plan-general.service';
import { NbWindowRef, NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ExcerciceService, Excercice } from '../../excercice/excercice.service';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-modal-journal',
  templateUrl: './modal-journal.component.html',
  styleUrls: ['./modal-journal.component.scss']
})
export class ModalJournalComponent implements OnInit {
journal =  new Journal();
isChecked="";
comptes=[];
valider: string;
exercice = new Excercice();
idPlan:number;
plan = new Plan()
 types = [
  "Achats",

  "Ventes",
  
  "Trésorerie",
  
  "Général",
  
  "Situation",
]

config: ToasterConfig;
destroyByClick = true;
duration = 10000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
preventDuplicates = false;
status: NbToastStatus  
title: string;
content = ` `;
  constructor(private journalService:JournalService,
              private planService:PlanGeneralService,
              private windowRef: NbWindowRef, 
              private router:Router,
              private exerciceService:ExcerciceService,
              private toastrService: NbToastrService,
              private PlanGeneralService:PlanGeneralService) { }

  ngOnInit() {
    this.journal.contrepartie=this.isChecked;
    let e = localStorage.getItem('e')
    let idExercice = localStorage.getItem('idExercice');
    // this.planService.getAllPlanGeneralAndTiers().subscribe(
    //   data=>{this.comptes = data;
    //   console.log(this.comptes);},
    //   error=>{console.log(error);
    //   }
    // );

    this.PlanGeneralService.getAllPlanGeneralAndTiers().subscribe(
      data=>{this.comptes=data;},
      error=>{console.log("data error get comptes")}
    )



    this.exerciceService.getExcerciceById(+idExercice).subscribe(
      data => {this.exercice = data;
        this.journal.exercice=this.exercice;
              },
      error => {console.log(error);}
      );

    
   if(e=='0')
   {

    this.valider="Ajouter"
   } 
    if(e == '1'){
       
      this.valider = "Modifier";
      let  idJournal = localStorage.getItem('idJournal');
    
      console.log("id="+idJournal);
      this.journalService.getJournalById(+idJournal).subscribe(
        data=>{this.journal = data;
   },
        error=>{console.log(error);}
      );
    }

  }

  addJournal(){
    let e = localStorage.getItem('e')
    console.log(this.journal.plan)
    
if(e=='0')
{
   
 
    this.journalService.addJournal(this.journal).subscribe(

     data=>{
       this.journal=data
       this.windowRef.close();
       this.content='Création journal effectuée'
       this.status= NbToastStatus.SUCCESS;
       this.makeToast();
       if(this.journal.journalParent==null)
       {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/pages/comptabilite/journal']));
       }else
       {
        
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/pages/comptabilite/journalFils']));
       }
      },
     error=>{console.log("error add journal")}
    )

  }

else
if( e=='1') 
{
  this.journalService.updateJournal(this.journal).subscribe(

    data=>{
      this.journal=data
      this.windowRef.close();
      this.content='Modfication journal effectuée'
      this.status= NbToastStatus.SUCCESS;
      this.makeToast();
      if(this.journal.journalParent==null)
       {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/pages/comptabilite/journal']));
       }else
       {
        
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/pages/comptabilite/journalFils']));
       }
     },
    error=>{console.log("error add journal")}
   )

 }
}
makeToast() {
  this.showToast(this.status, this.title, this.content);
}
private showToast(type: NbToastStatus, title: string, body: string) {
  const config = {
    status: type,
    destroyByClick: this.destroyByClick,
    duration: this.duration,
    hasIcon: this.hasIcon,
    position: this.position,
    preventDuplicates: this.preventDuplicates,
  };
  const titleContent = title ? `. ${title}` : '';


  this.toastrService.show(
    body,
    `Toast ${titleContent}`,
    config);
}

checkValue(event:string){
   console.log(event);
   this.journal.contrepartie=event;
}

onclose() {
  this.windowRef.close();
}

}
