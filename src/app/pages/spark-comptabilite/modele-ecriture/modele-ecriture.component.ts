 

import { Component, OnInit } from '@angular/core';
import { ModelEcriture, ModeleEcritureService } from './modele-ecriture.service';
import { JournalService, Journal } from '../journal/journal.service';
import { Ecriture, EcritureService } from '../ecriture/ecriture.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Plan, PlanGeneralService } from '../plan-general/plan-general.service';
import { PlanTiersService } from '../plan-tiers/plan-tiers.service';
import { ModalPlanTiersComponent } from '../plan-tiers/modal-plan-tiers/modal-plan-tiers.component';
import { NbWindowService, NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { TostarService } from '../tostar/tostar.service';
import { Router } from '@angular/router';
import { ExcerciceService } from '../excercice/excercice.service';

@Component({
  selector: 'ngx-modele-ecriture',
  templateUrl: './modele-ecriture.component.html',
  styleUrls: ['./modele-ecriture.component.scss']
})
export class ModeleEcritureComponent implements OnInit {
  disabled:boolean=false;
  comptesGeneral = []
  comptesTiers = []
  modelEcriture = new ModelEcriture();
  journals = []
  orderForm: FormGroup;
  items: FormArray;
  ecriture = new Ecriture();
  plan = new Plan();
  operationEcriture = [];
  type = '';
  annee = "";
  journal = new Journal();
  journal2 = new Journal();
  valide: boolean;
  count: number = 0;
bool:boolean=false;
  public documentGrp: FormGroup;

  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus
  title: string;
  content = ` `;

  types = [
    "Achats",

    "Ventes",

    "Trésorerie",

    "Général",

    "Situation",
  ]
  constructor(private journalService: JournalService,
    private formBuilder: FormBuilder,
    private planTierService: PlanTiersService,
    private planGeneralService: PlanGeneralService,
    private windowService: NbWindowService,
    private modeleEcritureService: ModeleEcritureService,
    private ecritureService: EcritureService,
    private toastrService: NbToastrService,
    private tostarService:TostarService,
    private exerciceService:ExcerciceService, 
    private router: Router) { }





  ngOnInit() {
   
    let e = localStorage.getItem('e')
    if(e=='0')
    {
this.bool=true;
    }
   
    if (e === '2') {

let numeroEcriture = localStorage.getItem('numEcriture')
let numeroPiece=localStorage.getItem('numPiece')


      let idExercice= localStorage.getItem('idExercice')
    this.exerciceService.getExcerciceById(+idExercice).subscribe(
      data => { this.annee = data.annee
        localStorage.setItem('annee',this.annee)
              },
      error => {console.log(error);}
      );
      let idModele = localStorage.getItem('idModele')
      let idJournal2 = localStorage.getItem('idJournalFils2')
      let codJournal = localStorage.getItem('codJournal')
      let mois = localStorage.getItem('mois')
      var j = new Journal();
      this.modeleEcritureService.getModelEcritureByID(idModele).subscribe(

        data => {
          this.modelEcriture = data
          /** get journal */

         // this.journalService.getJournalByCodAndAnneAndMois(codJournal,this.annee,mois).subscribe(
          this.journalService.getJournalById(+idJournal2 ).subscribe(
            data2 => {
              this.ecriture.journal = data2;

              this.ecritureService.getEcritureByIdModel(this.modelEcriture.id).subscribe(

                data3 => {
                  this.ecriture = data3;
                  this.ecriture.journal = data2;
                  this.ecriture.numeroEcriture=+numeroEcriture+1;
                  this.ecriture.numeroPiece=+numeroPiece+1;

                  /** get operation ecriture  */
                  this.ecritureService.getAlloperationEcritureByEciture(this.ecriture.idEcriture).subscribe(
                    data4 => {
                      this.operationEcriture = data4;
                      console.log("data 4", data4);

                      this.orderForm = this.formBuilder.group({
                        // idEcriture: id,
                        // idjournal: idJournalFils,
                        // numeroEcriture: numEcriture,
                        // numeroPiece: num,
                        // date: new Date(date),
                        // libelle: libille,
                        items: this.formBuilder.array([])

                      });
                      const books = this.orderForm.get('items') as FormArray;
                      //    books.clearAsyncValidators()
                      this.operationEcriture.forEach(b => {
                        console.log(b)
                        books.push(this.createItem2(b))

                      });



                    },
                    error => { console.log("error get operation ecriture") }
                  );

                  this.orderForm = this.formBuilder.group({
                    // idEcriture: id,
                    // idjournal: idJournalFils,
                    // numeroEcriture: numEcriture,
                    // numeroPiece: num,
                    // date: new Date(date),
                    // libelle: libille,
                    items: this.formBuilder.array([])

                  });
                  const books = this.orderForm.get('items') as FormArray;
                  //    books.clearAsyncValidators()
                  this.operationEcriture.forEach(b => {
                    console.log(b)
                    books.push(this.createItem2(b))

                  });






                }
              )
            }
          )





        }
      )

    }


if(e==="1")
{

  this.orderForm = this.formBuilder.group({

    items: this.formBuilder.array([])

  });
  let idModele = localStorage.getItem('idModele')
  console.log("id modele",idModele)
  this.modeleEcritureService.getModelEcritureByID(+idModele).subscribe(
    data=>{this.modelEcriture=data
     this.ecritureService.getEcritureByIdModel(this.modelEcriture.id).subscribe(
       data=>{this.ecriture=data
      
      this.ecritureService.getAlloperationEcritureByEciture(this.ecriture.idEcriture).subscribe(

        data=>{this.operationEcriture=data;
        
          const books = this.orderForm.get('items') as FormArray;
          //    books.clearAsyncValidators()
          this.operationEcriture.forEach(b => {
            console.log(b)
            books.push(this.createItem2(b))

          });
        }
      )
      
      }
     )
    
    
    
    }
  )

}

if(e ==="3")
{

  this.disabled=true;
  this.orderForm = this.formBuilder.group({

    items: this.formBuilder.array([])

  });
  let idModele = localStorage.getItem('idModele')
  console.log("id modele",idModele)
  this.modeleEcritureService.getModelEcritureByID(+idModele).subscribe(
    data=>{this.modelEcriture=data
     this.ecritureService.getEcritureByIdModel(this.modelEcriture.id).subscribe(
       data=>{this.ecriture=data
      
      this.ecritureService.getAlloperationEcritureByEciture(this.ecriture.idEcriture).subscribe(

        data=>{this.operationEcriture=data;
        
          const books = this.orderForm.get('items') as FormArray;
          //    books.clearAsyncValidators()
          this.operationEcriture.forEach(b => {
            console.log(b)
            books.push(this.createItem2(b))

          });
        }
      )
      
      }
     )
    
    
    
    }
  )
}






    if (e == '0') {
      this.plan = null;

    }
    this.ecriture.date = null;

    let idEntreprise = localStorage.getItem('idEntreprise');
    this.modelEcriture.idEntreprise = +idEntreprise;
    /** */
    this.planGeneralService.getAllPlanGeneral().subscribe(
      data => { this.comptesGeneral = data },
      error => { console.log("error get all pla general") }
    )

    // this.planTierService.getAllPlanTiers().subscribe(
    //   data => { this.comptesTiers = data },
    //   error => { console.log("error get all pla  tier") }
    // )


    let idExercice = localStorage.getItem('idExercice')
    this.journalService.getAllJournalByExerciceAndJournalParent(+idExercice).subscribe(
      data => {
        this.journals = data;
        console.log(data)
      },
      error => { console.log("error get journals") }
    );

    if(e!== '1' &&  e!=='3')
    {
      this.orderForm = this.formBuilder.group({

        items: this.formBuilder.array([this.createItem()])
  
      });
      this.addItem();
    }
   

  }


  createItem(): FormGroup {

    return this.formBuilder.group({
      compteGeneral: new FormControl(),
      compteTiers:  new FormControl(),
      credit: new FormControl(),
      debit: new FormControl(),

     

    });


  }
  createItem2(operation: any) {
     
    if(operation.compteTiers != null)
    {
      return this.formBuilder.group({
        compteGeneral: new FormControl({ value :operation.compteGeneral ||  new FormControl()   ,disabled: this.disabled}),
        compteTiers: new FormControl( { value : operation.compteTiers,disabled: this.disabled}),
        credit: new FormControl({ value :operation.credit || new String(), disabled:this.disabled}),
        debit: new FormControl({value: operation.debit || new String(),disabled:this.disabled}),
        annee: new FormControl(this.annee),
      })
    }

    else
    {

      return this.formBuilder.group({
        compteGeneral: new FormControl({ value :operation.compteGeneral ||  new FormControl()   ,disabled: this.disabled}),
        compteTiers: new FormControl( ),
        credit: new FormControl({ value :operation.credit || new String(), disabled:this.disabled}),
        debit: new FormControl({value: operation.debit || new String(),disabled:this.disabled}),
        annee: new FormControl(this.annee),
      })

    }

    
  }


  get formData() { return <FormArray>this.orderForm.get('items'); }

  addItem(): void {

    this.items = this.orderForm.get('items') as FormArray;
    for (let i = 0; i < 4; i++) {

      this.items.push(this.createItem());
    }
  }
  save(formdata) {

    let e = localStorage.getItem('e')
    if (e == '0') {



      this.modeleEcritureService.addModeleEcriture(this.modelEcriture).subscribe(
        data => {
          this.modelEcriture = data;
          console.log("data modele ecriture ", data)
          /** SAVE eCRITURE  */
          //   this.ecriture.journal = this.modelEcriture. ;
          this.ecriture.modeleEcriture = this.modelEcriture;


          console.log("journal ecriture içi", this.modelEcriture)

          this.ecritureService.addEcriture(this.ecriture).subscribe(

            data2 => {
              console.log("data  ecriture", data2)

              this.saveOPerations(data2.idEcriture, formdata)
              this.tostarService.showToast(NbToastStatus.SUCCESS,'SUCCESS','    ajouté avec succès !!');
              this.router.navigateByUrl('/',{skipLocationChange: true}).then(()=>
              this.router.navigate(['/pages/comptabilite//listModeleEcriture']));
            },
            error => { console.log('error add ecriture') })


          /*** FIN SAVE ECRITURE */
        },
        error => { console.log("error") }
      )

    }
    if (e == '2') {
      let annee = localStorage.getItem('annee')
      let mois=localStorage.getItem('mois')
      this.ecriture.annee=annee;
      this.ecriture.mois=mois;
      this.ecriture.modeleEcriture=null;
      this.ecritureService.saveEcritureWithModele(this.ecriture).subscribe(
        data=>{ console.log(data);
      /*** DEBUT SAVE OPERATION ECRITURE */
      this.items = this.orderForm.get('items') as FormArray;
      let items = this.items.value;
  
      for (let item of items) {
  
        if (item.compteGeneral == null && item.compteTiers == null && item.credit == 0 && item.debit == 0) {
          this.count += 0;
  
        }
        else if (item.compteGeneral!= null && (item.credit == 0 && item.debit == 0)) {
          this.count += 1;
        } else if (item.compteGeneral != null && (item.credit != 0 && item.debit != 0)) {
          this.count += 1;
        }
        else if (item.compteGeneral == null && (item.credit != 0 || item.debit != 0)) {
          this.count += 1;
        }
  
      }
      if (this.count == 0) {
        this.ecritureService.saveOperationWithEciture(data.idEcriture, formdata.items).subscribe(

          data => {
            formdata = data;
            console.log("data")
            console.log(data);
            this.tostarService.showToast(NbToastStatus.SUCCESS,'SUCCESS','  écriture a été ajoutée     avec succès !!');
            //
            this.router.navigateByUrl('/',{skipLocationChange: true}).then(()=>
            this.router.navigate(['/pages/comptabilite/journalFils']));
          },
          error => {
            console.log(error.status)
            console.log("error add operation ecriture ")


          }
        )
      }
      else {
        this.tostarService.showToast(NbToastStatus.DANGER,'ERREUR',' Formulaire invalide !!');
        console.log("error with formulaire")
      }
      /**FIN SAVE OPERATION ECRITURE */
    },
        error=>{console.log("error")
      
      if(error.status='403')
    {
      this.tostarService.showToast(NbToastStatus.DANGER,'EREUR','  jour invalide !!');
    }}
      )
      console.log(this.ecriture)
    }

    if(e=='1')
    {
      
    this.modeleEcritureService.updateModelEcriture(this.modelEcriture).subscribe(

      data=>{this.modelEcriture=data;
      
      this.ecritureService.updateEcriture(this.ecriture).subscribe(
        data=>{this.ecriture=data

          console.log(formdata.items)
        
          this.ecritureService.updateOperation(formdata.items,this.ecriture.idEcriture).subscribe(

            data=>{console.log("errrur update")
          
            this.tostarService.showToast(NbToastStatus.SUCCESS,'SUCCESS','    Modification effectuée      !!');
            this.router.navigateByUrl('/',{skipLocationChange: true}).then(()=>
            this.router.navigate(['/pages/comptabilite//listModeleEcriture']));}
          )
        
        }
      )
      }
    )

     /*   // console.log("update");
        console.log(formdata);
        // this.ecritureService.updateOperationEcritureAndEcriture(formdata).subscribe(
        // data=>{formdata=data},
        // error=>{console.log("error")}  
        // )
  
        if (this.count == 0) {
          this.ecritureService.updateOperationEcritureAndEcriture(formdata).subscribe(
  
            data => {
              formdata = data;
              this.tostarService.showToast(NbToastStatus.SUCCESS,'','  Modficatiion écriture et opération écriture effectuée') 
  
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                this.router.navigate(['/pages/comptabilite/ajoutEcritures']));
            },
            error => {
              console.log(error.status)
              if (error.status == "403") {
                this.status = NbToastStatus.DANGER;
                this.title = ' DATE INVALIDE   '
                this.content = "Interdiction de saisir une date d'une écriture ayant une année ET mois différente à l'année en cours "
                this.tostarService.makeToast();
              }
  
            }
          )
        }
        else {
          this.status = NbToastStatus.DANGER;
          this.title = "INTERDICTION Du MODIFIER UNE ECRITURE"
          this.content = ' votre formulaire est invalide';
          this.tostarService.makeToast();
        }*/
      
    }
  }

  refreshCompteTiers(i) {
    if(i.value.compteGeneral != null)
    {
      this.planTierService.getPlanTiersByPlanGenerale(i.value.compteGeneral.id).subscribe(
        data=>{console.log(data)
        this.comptesTiers=data},
        err=>{console.log('err')}
      )
    }
    else{
      this.comptesTiers=[]
    }
  }
  deleteItemLine(e, i): void {
    e.preventDefault();
    this.items = this.orderForm.get('items') as FormArray;
    console.log(this.items);
    this.items.removeAt(i);
  }

  openWindowCompteTiers() {
    localStorage.setItem("e", "0");
    localStorage.setItem("indexEcriture", "indexEcriture");
    this.windowService.open(ModalPlanTiersComponent, { title: 'Ajouter Compte  tier' });
  }

  getIndex(i) {
    if (this.plan != null) {
      let elm;

      if (this.type == "general") {
        elm = {
          compteGeneral: this.plan,
          compteTiers: new Plan(),
          credit: new String(),
          debit: new String(),
        };

      } else
        if (this.type == "tiers") {


          elm = {
            compteGeneral: new Plan(),
            compteTiers: this.plan,
            credit: new String(),
            debit: new String(),
          };

        }


      this.items = this.orderForm.get('items') as FormArray;
      this.items.at(i + 1).setValue(elm);

    }



  }
  changeDebit2(i) {


    if (this.plan != null && this.journal.contrepartie == 'oui') {

      this.items = this.orderForm.get('items') as FormArray;
      let items = this.items.value;

      let elm;

      if (this.type == "general") {
        elm = {
          compteGeneral: this.plan,
          compteTiers: new Plan(),
          credit: items[i].debit,
          debit: new String(),
          //debit:this.getTotalDebit()
        };

      } else
        if (this.type == "tiers") {


          elm = {
            compteGeneral: new Plan(),
            compteTiers: this.plan,
            credit: items[i].debit,
            debit: new String(),
            // debit:this.getTotalDebit()
          };

        }


      this.items = this.orderForm.get('items') as FormArray;
      this.items.at(i + 1).setValue(elm);



      /// update i
      if (i != 0) {


        let elm2;

        if (this.type == "general") {
          elm2 = {
            compteGeneral: items[i].compteGeneral,
            compteTiers: new Plan(),
            credit: new String(),
            debit: items[i].debit,
            //debit:this.getTotalDebit()
          };

        } else
          if (this.type == "tiers") {


            elm2 = {
              compteGeneral: new Plan(),
              compteTiers: this.plan,
              credit: new String(),
              debit: items[i].debit,
              // debit:this.getTotalDebit()
            };

          }
        this.items = this.orderForm.get('items') as FormArray;
        this.items.at(i).setValue(elm2);


        let totalCredit = this.getTotalCredit()
        let totalDebit = this.getTotalDebit()

        let elm3;

        if (this.type == "general") {
          elm3 = {
            compteGeneral: this.plan,
            compteTiers: new Plan(),
            credit: totalDebit,
            debit: new String(),
            //debit:this.getTotalDebit()
          };

        } else
          if (this.type == "tiers") {


            elm3 = {
              compteGeneral: new Plan(),
              compteTiers: this.plan,
              credit: totalDebit,
              debit: new String(),
              // debit:this.getTotalDebit()
            };

          }
        this.items = this.orderForm.get('items') as FormArray;
        this.items.at(i + 1).setValue(elm3);
      }

    }

  }

  changeCredit(i) {


    console.log(i); console.log("change  crédit")
    if (this.plan != null && this.journal.contrepartie == 'oui') {

      this.items = this.orderForm.get('items') as FormArray;
      let items = this.items.value;

      let elm;

      if (this.type == "general") {
        elm = {
          compteGeneral: this.plan,
          compteTiers: new Plan(),
          credit: new String(),
          debit: items[i].credit,
          //debit:this.getTotalDebit()
        };

      } else
        if (this.type == "tiers") {


          elm = {
            compteGeneral: new Plan(),
            compteTiers: this.plan,
            credit: new String(),
            debit: items[i].credit,
            // debit:this.getTotalDebit()
          };

        }


      this.items = this.orderForm.get('items') as FormArray;
      this.items.at(i + 1).setValue(elm);



      /// update i
      if (i != 0) {


        let elm2;

        if (this.type == "general") {
          elm2 = {
            compteGeneral: items[i].compteGeneral,
            compteTiers: new Plan(),
            credit: items[i].credit,
            debit: new String(),
            //debit:this.getTotalDebit()
          };

        } else
          if (this.type == "tiers") {


            elm2 = {
              compteGeneral: new Plan(),
              compteTiers: this.plan,
              credit: items[i].credit,
              debit: new String(),
              // debit:this.getTotalDebit()
            };

          }
        this.items = this.orderForm.get('items') as FormArray;
        this.items.at(i).setValue(elm2);


        let totalCredit = this.getTotalCredit()
        let totalDebit = this.getTotalDebit()

        let elm3;

        if (this.type == "general") {
          elm3 = {
            compteGeneral: this.plan,
            compteTiers: new Plan(),
            credit: new String(),
            debit: totalCredit,
            //debit:this.getTotalDebit()
          };

        } else
          if (this.type == "tiers") {


            elm3 = {
              compteGeneral: new Plan(),
              compteTiers: this.plan,
              credit: new String(),
              debit: totalCredit,
              // debit:this.getTotalDebit()
            };

          }
        this.items = this.orderForm.get('items') as FormArray;
        this.items.at(i + 1).setValue(elm3);
      }

    }

  }

  getTotalDebit() {
    this.items = this.orderForm.get('items') as FormArray;
    var x
    let items = this.items.value;
    let total = 0;
    for (let item of items) {
      x = parseFloat(item.debit)
      if (isNaN(x)) {
        item.debit = 0;

      }


      total += parseFloat(item.debit);


    }

    if (!isNaN(total)) {
      return total.toFixed(3);

    }
  }


  getTotalCredit() {
    this.items = this.orderForm.get('items') as FormArray;

    let items = this.items.value;
    let total = 0;
    var x;
    for (let item of items) {
      x = parseFloat(item.credit)
      if (isNaN(x)) {
        item.credit = 0;
      }
      total += parseFloat(item.credit)
    }
    if (!isNaN(total)) {
      return total.toFixed(3);
    }
  }

  getEcartDebitCredit() {
    let debit = parseFloat(this.getTotalDebit());
    let credit = parseFloat((this.getTotalCredit()));
    let ecart = debit - credit;
    return ecart.toFixed(3);
  }
  validForm() {
    if (parseFloat(this.getEcartDebitCredit()) == 0 && parseFloat(this.getTotalDebit()) != 0 && parseFloat(this.getTotalCredit())) {

      return (this.valide = false)
    }
    else {
      return (this.valide = true)

    }
  }

  // saveOPerations(id,formdata) {

  saveOPerations(id, formdata) {
    console.log("form data")
    console.log(formdata.items)
    let e = localStorage.getItem('e');

    this.items = this.orderForm.get('items') as FormArray;
    let items = this.items.value;

    for (let item of items) {

      if (item.compteGeneral == null && item.compteTiers == null && item.credit == 0 && item.debit == 0) {
        this.count += 0;

      }
      else if (item.compteGeneral != null && (item.credit == 0 && item.debit == 0)) {
        this.count += 1;
      } else if (item.compteGeneral != null && (item.credit != 0 && item.debit != 0)) {
        this.count += 1;
      }
      else if (item.compteGeneral == null && (item.credit != 0 || item.debit != 0)) {
        this.count += 1;
      }


    }
    console.log("count:" + this.count);

    if (e == '0') // add  
    {

     
      if (this.count == 0) {
        this.ecritureService.saveOperationWithEciture(id,formdata.items).subscribe(

          data => {
            formdata = data;
            console.log("data")
            console.log(data);

          },
          error => {
            console.log(error.status)
            console.log("error add operation ecriture ")


          }
        )
      }
      else {
        console.log("error with formulaire")
      }
    }
    else// update
    {

      // console.log("update");
      console.log(formdata);
      // this.ecritureService.updateOperationEcritureAndEcriture(formdata).subscribe(
      // data=>{formdata=data},
      // error=>{console.log("error")}  
      // )

      if (this.count == 0) {
        this.ecritureService.updateOperationEcritureAndEcriture(formdata).subscribe(

          data => {
            formdata = data;


            // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            //   this.router.navigate(['/pages/comptabilite//ajoutEcritures']));
          },
          error => {
            console.log(error.status)


          }
        )
      }
      else {

      }
    }





    this.count = 0;
  }

}
