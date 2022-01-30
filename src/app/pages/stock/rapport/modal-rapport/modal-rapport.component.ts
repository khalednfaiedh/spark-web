import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { CritereQualiteComponent } from '../../critere-qualite/critere-qualite.component';
import { CritereQualiteService } from '../../critere-qualite/critere-qualite.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { RapportService } from '../rapport.service';
import { ValeurQualiteService } from '../valeur-qualite.service';
import { ValeurQualiteModel } from '../valeur-qualite.model';
import { RapportModel } from '../rapport.model';
import { CritereQualiteModel } from '../../critere-qualite/critere-qualite.model';

@Component({
  selector: 'ngx-modal-rapport',
  templateUrl: './modal-rapport.component.html',
  styleUrls: ['./modal-rapport.component.scss']
})
export class ModalRapportComponent implements OnInit {
  constructor(public windowRef: NbWindowRef, private router: Router,
    private formBuilder: FormBuilder, private critereQualiteService: CritereQualiteService, 
    private serviceRapport: RapportService,
     private serviceValeurQualite: ValeurQualiteService, ) { }
  CritereQualites: any;
  mouvements: any;
  valeurQualite : ValeurQualiteModel;
  rapport: RapportModel;
  rapport1: any;
  public documentGrp: FormGroup;
  public totalfiles: Array<CritereQualiteModel> =[];
  public totalFileName = [];        
  public lengthCheckToaddMore =0;
  documentGrps: any;
  Ar : String
  ngOnInit() {
    this.documentGrp = this.formBuilder.group({
      mouvement:'',
      description: '',
      itemss: this.formBuilder.array([])
    })
    let e = localStorage.getItem("e");
    let idR = localStorage.getItem("idRapport");
   
    // this.serviceMouvement.getAllMouvements().subscribe(data => 
    //   {this.mouvements = data; },
    //   error=>{console.log("error");}); 

    this.critereQualiteService.getAllCritereQualite().subscribe(data => 
      {this.CritereQualites = data; },
      error=>{console.log("error");});  
    if(e === '0') {
      this.Ar = "Ajouter";
     this.documentGrp= this.formBuilder.group({
        mouvement: new FormControl(),
      description: new FormControl(),
      itemss: this.formBuilder.array([this.createUploadDocuments()])
    });
  }
  if (e === '1') {
    this.Ar = "Modifier";
    this.serviceRapport.getRapportByID(+idR).subscribe(
      data =>{
        this.documentGrp = this.formBuilder.group({
          mouvement:data.idMouvement,
          description: data.description,
          itemss: this.formBuilder.array([])
        })
        console.log(this.documentGrp);
          this.serviceValeurQualite.getAllValeurQualiteByRapport(+idR).subscribe(
            data2=>{
              const lines = this.documentGrp.get('itemss') as FormArray;
              data2.forEach(element => {
                this.critereQualiteService.getCritereQualiteByID(+element.idCritereQualite).subscribe(data3=>{
                  lines.push(this.createUploadDocuments1(data3))
                })
               
              });
            });
            });
          } 
          
        }
  createUploadDocuments1(critereQualite: CritereQualiteModel) {
    return this.formBuilder.group({
      critereQualite: new FormControl(critereQualite || new CritereQualiteModel),
      valeur: new FormControl(Number || new Number),
    });
  }
  createUploadDocuments(): FormGroup {
    return this.formBuilder.group({
      critereQualite: new FormControl(),
      valeur: new FormControl(),
    });       
  }

  get itemss(): FormArray {
    return this.documentGrp.get('itemss') as FormArray;
  };

  addItem(): void {
    if( this.itemss.value[this.lengthCheckToaddMore].etape != "" ){
      this.itemss.push(this.createUploadDocuments())
      this.lengthCheckToaddMore=this.lengthCheckToaddMore+1;
    }
  }

  removeItem(index: number) {
   this.totalFileName.splice(index);
    this.itemss.removeAt(index);
    this.lengthCheckToaddMore=this.lengthCheckToaddMore-1;
  }

  public OnSubmit(formValu) {
    let e = localStorage.getItem("e");
    
    if(e === '0'){
      console.log(formValu)
      console.log(formValu.prototypeNom)
  
      this.rapport = new RapportModel();
      this.rapport.idMouvement = formValu.mouvement;
      this.rapport.description = formValu.description;
       this.serviceRapport.addRapport(this.rapport).subscribe(
         data => {
           this.rapport1 = data;
          this.valeurQualite = new ValeurQualiteModel();
          this.valeurQualite.idRapportQualite = this.rapport1.id;
          console.log(this.valeurQualite.idRapportQualite);
           formValu.itemss.forEach((element, index) => {
          this.valeurQualite.idCritereQualite = element.critereQualite;
          this.valeurQualite.valeur = element.valeur;
          console.log(this.valeurQualite);
          this.serviceValeurQualite.addValeurQualite(this.valeurQualite).subscribe(
            data1=>{ console.log(this.valeurQualite) 
              this.windowRef.close();
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(["/pages/rapport"]));
            },
            error=>{ console.log("error") });
        });
      },
        error=>{console.log("error")});
    }
    if(e === '1'){
      let idR = localStorage.getItem("idRapport");
      this.serviceValeurQualite.getAllValeurQualiteByRapport(+idR).subscribe(
        data2=>{
        data2.forEach(element1 => {
          this.serviceValeurQualite.deleteValeurQualite(+idR,+element1.id).subscribe(data3=>{
          })
        });
      },
      error=>{console.log("error")});
      this.rapport = new RapportModel();         
       this.valeurQualite = new ValeurQualiteModel();
       this.rapport.id = 
      this.rapport.idMouvement = formValu.mouvement;
      this.rapport.description = formValu.description;
     console.log(this.rapport );
       this.serviceRapport.updateRapport(this.rapport).subscribe(
         data => {
           this.rapport1 = data;
          this.valeurQualite = new ValeurQualiteModel();
          this.valeurQualite.idRapportQualite = this.rapport1.id;
          console.log(this.valeurQualite.idRapportQualite);
           formValu.itemss.forEach((element, index) => {
          this.valeurQualite.idCritereQualite = element.etape.id;
          this.valeurQualite.valeur = element.qualite;
          console.log(this.valeurQualite);
          this.serviceValeurQualite.addValeurQualite(this.valeurQualite).subscribe(
            data1=>{ console.log(this.valeurQualite) 
              this.windowRef.close();
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(["/pages/rapport"]));
            },
            error=>{ console.log("error") });
        });
          
        });
     
    }
  }
}
