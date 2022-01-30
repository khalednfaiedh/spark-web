import { Component, OnInit } from '@angular/core';
import { LettrageService } from '../lettrage.service';
import { PlanGeneralService } from '../../plan-general/plan-general.service';
import { TostarService } from '../../tostar/tostar.service';
import { ExcerciceService, Excercice } from '../../excercice/excercice.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { PlanTiersService } from '../../plan-tiers/plan-tiers.service';

@Component({
  selector: 'ngx-lettrage-tiers',
  templateUrl: './lettrage-tiers.component.html',
  styleUrls: ['./lettrage-tiers.component.scss']
})
export class LettrageTiersComponent implements OnInit {

  isCheked=false;
  lettrage=[]
  boolean=true;
  selection = [];
  comptes=[]
  id:any
  idName:any;
  exercice = new Excercice();
  modaLettragePost = new ModaLettragePost() 
  filtre=[{idName:1,name:"Toute Les écritures"},{idName:2,name:"Écritures léttrées"},{idName:3,name:" Écritures  non léttrées"}]
 
   modalLettrage= new  ModalLettrage ();
   va2="khaled"
  exerciceBoolean: boolean;
  constructor(private lettrageService:LettrageService,
              private servicePlanGenerale:PlanGeneralService,
              private tostarService:TostarService,
              private exerciceService:ExcerciceService,
              private planTierService: PlanTiersService) { }

  ngOnInit() {

    
    this.modalLettrage.lettre="A"
    let idExercice = localStorage.getItem('idExercice');
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
          
                },
        error => {console.log(error);}
        );
        this.planTierService.getAllPlanTiers().subscribe(
          data => { this.comptes = data },
          error => { console.log("error get all pla  tier") }
        )
    
  }
  getSelection(item) {
    return this.selection.findIndex(s => s.idOperartionEcriture === item.idOperartionEcriture) !== -1;
  }

  changeHandler(item: any, event: KeyboardEvent) {
    const id = item.idOperartionEcriture;

    const index = this.selection.findIndex(u => u.idOperartionEcriture === id);
    if (index === -1) {
      // ADD TO SELECTION
      // this.selection.push(item);
      this.selection = [...this.selection, item];
    } else {
      // REMOVE FROM SELECTION
      this.selection = this.selection.filter(user => user.idOperartionEcriture !== item.idOperartionEcriture)
      // this.selection.splice(index, 1)
    }
  }
 
  save() {
    
    this.modalLettrage.listSelection=this.selection;
    console.log(this.selection)
    this.lettrageService.lettrageManuelle(this.modalLettrage).subscribe(
      data=>{
         /*incremente lettre lettrage */
         this.lettrageService.incrementLettre(this.modalLettrage.lettre).subscribe(
           data=>{
          
            this.modalLettrage.lettre=data.lettre;
             console.log(data)
            },
         );

    //      /* finsh incremente lettre*/
        
       
        this.lettrageService.getOperationByEtatAndAnneeAndCompteTiers(this.id,this.exercice.annee,"non").subscribe(

          data=>{this.lettrage=data}
          ,error=>{ console.log('error')
             
          }
        );
         
    this.selection=[] 

      },
      error=>{console.log("error lettrage manuelle"),
    this.tostarService.showToast( NbToastStatus.DANGER,"Impossible","  de lettrer des opération écriture")}
    )

  
  }

  delletrageTous()
  {
    this.lettrageService.delletrageAllByCompteTierAndAnee(this.id,this.exercice.annee).subscribe(
      data=>{this.lettrage=data,
             this.modalLettrage.lettre="A"},
      error=>{console.log("error delletrage  tous")}
      
    )
  }

  getOperationByIdCompteTiersAndAnnee()
  {
    console.log(this.id)

    this.lettrageService.getAllLettrageTiers(this.id,this.exercice.annee).subscribe(
      data=>{console.log(data);this.lettrage=data; 
      if(this.lettrage.length === 0 || this.lettrage === null)
    {
      this.boolean=true;
    }
    else{ this.boolean=false}

  },
      error=>{console.log('error')}
    )
  }

  filtreEcriture( )
  {
console.log(this.idName)
if(this.idName == "1")
{
  this.lettrageService.getAllLettrageTiers(this.id,this.exercice.annee).subscribe(
    data=>{console.log(data);this.lettrage=data},
    error=>{console.log('error')}
  )
}
  else
  if(this.idName =="2")
  {
    this.lettrageService.getOperationByEtatAndAnneeAndCompteTiers(this.id,this.exercice.annee,"oui").subscribe(

      data=>{this.lettrage=data}
      ,error=>{ console.log('error')
         
      }
    );

  }
  else
  if(this.idName=="3")
  {
    this.lettrageService.getOperationByEtatAndAnneeAndCompteTiers(this.id,this.exercice.annee,"non").subscribe(

      data=>{this.lettrage=data}
      ,error=>{ console.log('error')
         
      }
    );
  }
}

delletrageByTwoLettre()
  {
    this.modaLettragePost.idCompteGenerale=this.id;
    this.modaLettragePost.annee=this.exercice.annee;
    console.log(this.modaLettragePost)
    this.lettrageService.delletrageTierByTwoLettre(this.modaLettragePost).subscribe(
      data=>{this.lettrage=data;console.log("succes")},
      error=>{console.log('error')}
    )

    
  }

  dataNotFound()
  {
    if ( this.lettrage === null || this.lettrage.length === 0)
    {
      return true;
    }
    return false;
  }
  DeletreChecked()
  {
    console.log("içi error")
    console.log(this.selection)
     this.lettrageService.deletrageGeneralChecked(this.selection).subscribe(

      data=>{ 
        /* get ecriture lettrer */
        {
          this.lettrageService.getOperationByEtatAndAnneeAndCompteTiers(this.id,this.exercice.annee,"oui").subscribe(
      
            data=>{this.lettrage=data}
            ,error=>{ console.log('error')
               
            }
          );
      
        }
        /*fin*/
      },
      error=>{console.log('error delletrage checked')}
     );
  }

  
  }

  
   


export class ModalLettrage{

  lettre:string;
  listSelection=[];
}

export class ModaLettragePost{
      idCompteGenerale:number
	    annee:string;
	    lettre1:string;
	    lettre2:string;
}
