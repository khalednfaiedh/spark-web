import { Component, OnInit, ɵConsole } from '@angular/core';
import { Excercice, ExcerciceService } from '../excercice.service';
import { NbWindowRef, NbToastrService, NbGlobalPosition, NbGlobalLogicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { Enterprise } from '../../entreprise/entreprise';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToasterConfig } from 'angular2-toaster';
import { Authorities } from '../../../../authorisation/authorities';

@Component({
  selector: 'ngx-modal-excercice',
  templateUrl: './modal-excercice.component.html',
  styleUrls: ['./modal-excercice.component.scss']
})
export class ModalExcerciceComponent implements OnInit {
excercie = new Excercice();
entreprise = new Enterprise();
societe:string;
A:string
dateDebut:String ;
dateFin:string
update:boolean; 
annee = [
  "2015",
  "2016", "2017",
  "2018", "2019",
  "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028",
  "2030",
  "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040", "2041",
  "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050", 

]

//tost
   config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus 
  title: string;
  content = `  `;

  constructor(private excerciceService:ExcerciceService ,
    public windowRef: NbWindowRef,
    private router: Router,
    private entrepriseService:EntrepriseService,
    private toastrService: NbToastrService,) { }

  ngOnInit() {
  
    let update=localStorage.getItem('e2');
    if(update=="update")
    {this.update=true}
    else{this.update=false;}
    localStorage.removeItem('e2')
    this.excercie.editeur=Authorities.getUserInfo().user_name
  
    let idEntreprise = localStorage.getItem('current_entreprise');
    this.excercie.idEntreprise=+idEntreprise;
   console.log("id"+idEntreprise);
    this.entrepriseService.getEnterpriseById(+idEntreprise).subscribe(
      data=>{this.entreprise = data;
        console.log( "name sociéte"+this.entreprise.socialReason)
      
        this.societe=this.entreprise.socialReason;
      },
      error=>{console.log(error);
      }
    );
    
    this.excercie.excerciceState="INACTIVE"
   
    let e = localStorage.getItem('e');

    if (e === '0' ) {
      this.A = 'Ajouter';
     
    }
    
     
    
    if (e === '1') {
     this.A = 'Modifier';
     let id = localStorage.getItem('idExercice');
          console.log(id);
     this.excerciceService.getExcerciceById(+id).subscribe(
       data => { this.excercie = data;
         
        this.excercie.dateDebut = new Date ( this.excercie.dateDebut);
        this.excercie.dateFin= new Date (this.excercie.dateFin);
          console.log(data); },
      error => {
          console.log('erreur');
      });
    }


     
  }

  focusOutFunction()
  {
    console.log("okkk fox")
    if(this.excercie.annee)
    {
      
      this.dateDebut=this.excercie.annee+"-01-01";
      console.log(this.dateDebut);
      this.dateFin=this.excercie.annee+"-12-31";
      console.log( this.dateFin);
      this.excercie.dateDebut = new Date(this.dateDebut.toString());
      this.excercie.dateFin=new Date( this.dateFin.toString());

    }
  }

  addExcercice()
{
    let e = localStorage.getItem('e');
    if (e === '0') {

      this.excerciceService.addExcercice(this.excercie) 
        .subscribe(data => {
            localStorage.removeItem('e');
            localStorage.removeItem('idExercice');
            this.windowRef.close();
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/pages/comptabilite/exercice']));
            this.showToast(NbToastStatus.SUCCESS,'','  Création Excercice effectuée')
          },
          error => {
            this.showToast(NbToastStatus.DANGER,'',"Interdiction de   Ajouter un exercice ayant la même année qu'un autre existant")
            console.log('error');
          });
    }
    if (e === '1') {
      this.excerciceService.updateExcercice (this.excercie)
      .subscribe(
        data => {
        localStorage.removeItem('e');
        localStorage.removeItem('idExercice');
        this.windowRef.close();

        this.showToast(NbToastStatus.SUCCESS,'',' Modification Excercice effectuée')
        
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/pages/comptabilite/exercice']));
       
        },
        error => {
          console.log('error');

        
         
          
        });
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
  onclose() {
    this.windowRef.close();
  }
}
