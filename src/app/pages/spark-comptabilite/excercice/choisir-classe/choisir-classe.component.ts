import { Component, OnInit } from '@angular/core';
import { ExcerciceService, Excercice } from '../excercice.service';
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPosition, NbGlobalLogicalPosition, NbWindowRef, NbToastrService, NbWindowService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Router } from '@angular/router';
import { EquilibrEcritureComponent } from '../equilibr-ecriture/equilibr-ecriture.component';
import { Plan, PlanGeneralService } from '../../plan-general/plan-general.service';
import { JournalService, Journal } from '../../journal/journal.service';

@Component({
  selector: 'ngx-choisir-classe',
  templateUrl: './choisir-classe.component.html',
  styleUrls: ['./choisir-classe.component.scss']
})
export class ChoisirClasseComponent implements OnInit {
  classes = [5,6,7];
  comptes=[]
  journals=[]
  report= new Report();
  exercice= new Excercice();
  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus 
  title: string;
  content = `  `;
  constructor(private exerciceService:ExcerciceService,
    public windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private router:Router,
    private windowService: NbWindowService,
    private  PlanGeneralService:PlanGeneralService,
    private journalService:JournalService
   
    ) { }

  ngOnInit() {
    

    let idExercice= localStorage.getItem('idExerciceRAN');
    localStorage.getItem('idExerciceRAN')
    this.exerciceService.getExcerciceById(+idExercice).subscribe(
      data=>{this.exercice=data;
        var x=+this.exercice.annee;
        this.report.idExercice=this.exercice.id;
        x+=1;
        console.log(x)
        this.report.dateDebut= new Date("01-01-"+x);
        this.report.dateFin=  new Date("12-31-"+x);
        this.report.numeroPiece=1;
        this.journalService.getAllJournalByExerciceAndJournalParent(this.exercice.id).subscribe(
          data=>{this.journals=data;
            // var j = new Journal();
            // j.code="Tous";
            // this.journals.push(j);
            
            // this.journals.push('Tous');
          },
          error=>{console.log("error get journals")}
        ) ;
      
      
      },
      error=>{console.log('error get exercice by id')}
      
    )

    this.PlanGeneralService.getAllPlanGeneralAndTiers().subscribe(
      data=>{this.comptes=data;},
      error=>{console.log("data error get comptes")}
    )

    
    
  }
  calculMontantEquilibreEcriture(){

    

   this.exerciceService.calculMontantEquilibreEcriture(this.report).subscribe(

    data=>{console.log('sucses');

             this.report=data; 
             this.report.dateDebut = new Date(this.report.dateDebut)
             this.report.dateFin  = new Date(this.report.dateFin)
           if(this.report.equilibreEcriture==0)
           {
            this.windowRef.close();
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/comptabilite/exercice']));
           }

             
             console.log(this.report)},
    error=>{console.log('error')}
    
   )

   
  }

  saveReportAnouveau(){
    console.log(this.report)

    console.log("date Debut ",this.report.dateDebut)
     
    this.exerciceService.saveReportAnouveau(this.report).subscribe(
      data=>{ console.log("succes")
      this.windowRef.close();
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/pages/exercice']));
      },
      error=>{console.log('error save repport a nouveau')}
   
    );
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
}



export class Report{
  idExercice:Number
  dateDebut:Date;
  dateFin: Date;
  codeJournal:String;
  libille:String;
  compte1:Plan;
  compte2:Plan;
  compteEquilibre:Plan
  designation:String;
  numeroPiece:Number;
  equilibreEcriture:Number;
}

 
