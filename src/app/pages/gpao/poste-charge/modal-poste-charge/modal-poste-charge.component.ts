import { Component, OnInit, Inject } from '@angular/core';
import { PosteCharge, PosteChargeEmployee, } from '../posteCharge';
import { UniteMesureService } from '../../../admin/unite-mesure-product/unite-mesure.service';
import { EmployeListService } from '../../../admin/employe-list/employe-list.service';
import { PosteChargeService } from '../poste-charge.service';
import { Ligne } from '../../ligne/ligne';
import { LigneComponent } from '../../ligne/ligne.component';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { MachineService } from '../../../admin/machine/machine.service';
import { Section } from '../../section/section';
import { SectionService } from '../../section/section.service';
import { LigneService } from '../../ligne/ligne.service';
import { AtelierService } from '../../../admin/atelier/atelier.service';

@Component({
  selector: 'ngx-modal-poste-charge',
  templateUrl: './modal-poste-charge.component.html',
  styleUrls: ['./modal-poste-charge.component.scss']
})
export class ModalPosteChargeComponent implements OnInit {
  poste = new PosteCharge()
postes=[];
  message = "Ajouter"
  unites = []
  employees = []
  machines = []
  etat = ""
   numberPoste:number
  idEntr = localStorage.getItem('current_entreprise')
  public posteChargeEmployeeListe: Array<PosteChargeEmployee>

  types: any = [{ name: "Par Heure" }, { name: "Par Jour" }]
  constructor(private uniteService: UniteMesureService,
    private employeeService: EmployeListService,
    private postechargerService: PosteChargeService,
    private toastrService: NbToastrService,
    private ligneService: LigneService,
    private sectionService:SectionService,
    private router: Router,
    public windowRef: NbWindowRef,
    private machineService: MachineService,
    private atelierService:AtelierService,
    
    @Inject(NB_WINDOW_CONTEXT) context, ) {

    if (context.etat === "edit") {
      console.log(context.data)
      this.poste = context.data;
      this.poste.capaciteReelle = (this.poste.capaciteTheorique * this.poste.cofficientCapacite) / 100;
      this.message = "Modfier"

      this.etat = "edit"
    }

    if (context.etat === "show") {
      console.log(context.data)
      this.poste = context.data;
      this.poste.capaciteReelle = (this.poste.capaciteTheorique * this.poste.cofficientCapacite) / 100;

    }

    if (context.etat === "add") {
      this.message = "Ajouter"
      this.etat = "add"
      this.poste.type = "Par Jour"
    }
  }

  ngOnInit() {
    this.poste.cofficientCapacite = 95;

    this.uniteService.getAllUniteMesure(+this.idEntr).subscribe(
      data => { this.unites = data }
    )

    let id = localStorage.getItem('current_entreprise')
    this.poste.idEntreprise=+id;
    this.employeeService.getAllEmployees2(+id).subscribe(
      data => { this.employees = data; console.log(data) },
      err => { console.log('err employee') }
    )

this.postechargerService.getPosteDeChargeByEntreprise(+id).subscribe(

  data=>{this.postes=data}
)


    this.postechargerService.getListMachineDisponible(+id).subscribe(
      data => { this.machines = data }
    )

    let etat = localStorage.getItem('etat')//
    if (etat === 'Ligne') {
      let idLigne = localStorage.getItem('idLigne')
      this.ligneService.getLigneById(idLigne).subscribe(
        data=>{console.log('ligne',data)
        this.atelierService.getAtelierById(data.ilot.idAtelier).subscribe(

          data=>{this.numberPoste=data.poste;console.log("number de poste",this.numberPoste)}
        )
      
      }
      )
      
    }
    else
      if (etat === 'Section') {
        let idSection = localStorage.getItem('idSection')

        this.sectionService.getSectionById(idSection).subscribe(

          data=>{console.log('section',data)
          this.atelierService.getAtelierById(data.ilot.idAtelier).subscribe(

            data=>{this.numberPoste=data.poste;console.log("number de poste",this.numberPoste)}
          )
        
        
        }
        )
        
      }

  }


  calculCapaciteReelle() {
    this.poste.capaciteReelle = (this.poste.capaciteTheorique * this.poste.cofficientCapacite) / 100;
    this.poste.capaciteTotale=this.poste.capaciteReelle * this.numberPoste;

  }

  add() {
    let etat = localStorage.getItem('etat')//
    if (etat === 'Ligne') {
      let idLigne = localStorage.getItem('idLigne')
      const ligne2 = new Ligne()
      ligne2.id = +idLigne
      this.poste.ligne = ligne2
    }
    else
      if (etat === 'Section') {
        let idSection = localStorage.getItem('idSection')
        const section = new Section()
        section.id = +idSection
        this.poste.section = section
      }





    this.poste.idUnite = this.poste.unite.idUnite
    if (this.etat === "add") {
      this.postechargerService.addPosteCharge(this.poste).subscribe(
        data => {

          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "     Poste Charge  est ajouter avec succéss")
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/gpao/posteCharge"]));
        },
        err => {
          if (err.status == 400) {
            this.showToast(NbToastStatus.DANGER, "DANGER", "    Réference  Poste du Charge    existe déja     ")
          }
          this.showToast(NbToastStatus.DANGER, "DANGER", "    Réference  Poste du Charge    existe déja     ")
        }
      )
    }


    if (this.etat === "edit") {
      this.postechargerService.updatePosteCharge(this.poste).subscribe(
        data => {

          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "     Poste Charge  est  Modfier avec succéss")
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/gpao/posteCharge"]));
        },
        err => {

          if (err.status == 400) {
            this.showToast(NbToastStatus.DANGER, "DANGER", "    Réference  Poste du Charge    existe déja !!!!!!! ")
          }
        }

      )
    }





    console.log(this.poste)



  }

  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 20000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }

  onclose() {
    this.windowRef.close();
  }

}
