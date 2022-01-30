import { Component, OnInit, Inject } from '@angular/core';
import { Site } from '../site';
import { EmployeListService } from '../../../employe-list/employe-list.service';
import { SiteService } from '../site.service';
import { CNSSModel } from '../../../../rh-parametrage/categorie/categoeie.model';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { NbToastrService, NbGlobalPhysicalPosition, NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { DetailsAffaireComponent } from '../../../../crm/leads/details-affaire/details-affaire.component';
import { on } from 'cluster';


@Component({
  selector: 'ngx-modal-site',
  templateUrl: './modal-site.component.html',
  styleUrls: ['./modal-site.component.scss']
})
export class ModalSiteComponent implements OnInit {
  site = new Site();
  disabled: boolean = false;
  employees = []
  message = ""
  etat = ""
  source = []
  constructor(private siteService: SiteService,
    @Inject(NB_WINDOW_CONTEXT) context,
    private toastrService: NbToastrService,
    private router: Router,
    public windowRef: NbWindowRef,
    private employeeService: EmployeListService,
  ) {
    if (context.etat === "add") {
      this.message = "Ajouter"
      this.etat = "add"
    }

    if (context.etat === "edit") {

      console.log(context.data)
      this.etat = "edit"
      this.message = "Modfier"
      this.site = context.data
      this.site.dateCreation = new Date(context.data.dateCreation)
    }

    if (context.etat === "show") {
      this.etat = "show"
      this.disabled = true
      this.site = context.data
    }

  }

  ngOnInit() {
    let idEntreprise = localStorage.getItem('current_entreprise')
    this.siteService.getAllSiteByEntreprise(idEntreprise).subscribe(
      data => { this.source = data },
      err => { console.log("err get liste site ") }
    )

    this.employeeService.getAllEmployees2(+idEntreprise).subscribe(
      data => { this.employees = data; console.log(data) },
      err => { console.log('err employee') }
    )
  }


  addSite() {
    let idEntreprise = localStorage.getItem('current_entreprise')


    this.site.idPremierResponsable = this.site.premierResponsable.matricule;
    this.site.idDeuxiemeResponsable = this.site.deuxiemeResponsable.matricule;

    if (this.etat === "add") {
      this.siteService.addSite(idEntreprise, this.site).subscribe(
        data => {
        this.site = data; console.log(data)
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", " Site  est ajouter avec succéss")
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/admin/entreprise/site"]));
        },
        err => { console.log('err add '); this.showToast(NbToastStatus.DANGER, "DANGER", "    Réference  existe déja     ") }
      )
    }

    if (this.etat === "edit") {
      this.siteService.updateSite(this.site).subscribe(
        data => {
        this.site = data; console.log(data)
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", " Site  est  Modfier avec succéss")
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/admin/entreprise/site"]));
        },
        err => { console.log('err add '); this.showToast(NbToastStatus.DANGER, "DANGER", "    Réference  existe déja     ") }
      )
    }



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
