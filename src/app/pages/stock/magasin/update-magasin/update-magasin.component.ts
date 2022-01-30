import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { AdminComponent } from '../../../admin/admin.component';
import { EmployeMinModel } from '../../../admin/employe-list/employe-list.model';
import { EmployeListService } from '../../../admin/employe-list/employe-list.service';
import { Magasin } from '../magasin.model';
import { MagasinService } from '../services/magasin.service';

@Component({
  selector: 'ngx-update-magasin',
  templateUrl: './update-magasin.component.html',
  styleUrls: ['./update-magasin.component.scss']
})
export class UpdateMagasinComponent implements OnInit {
  magasin: Magasin = new Magasin()
  PAYS = AdminComponent.PAYES_LIST
  idEntr = localStorage.getItem('current_entreprise')
  employees: EmployeMinModel[];
  emp: EmployeMinModel;
  constructor(private serviceMagasin: MagasinService, private router: Router,
    private serviceEmploye: EmployeListService,
    public windowRef: NbWindowRef,

    @Inject(NB_WINDOW_CONTEXT) context
  ) {
    if (context.id != null) {
      this.serviceMagasin.getMagasinByID(context.id).subscribe(magasin => {
        this.magasin = magasin
        this.serviceEmploye.getEmployeMinById(magasin.idEmploye).subscribe(
          x => { this.emp = x })
      })
    }
  }

  ngOnInit() {

    this.serviceEmploye.getEmployesMinbyEntreprise(+this.idEntr).subscribe(
      data => { this.employees = data; console.log(data) },
      err => { console.log('err employee') }
    )
  }
  update() {
    this.magasin.idEmploye = this.emp.matricule
    this.serviceMagasin.updateMagasin(this.magasin).subscribe(
      data => {
        this.router.navigate(['/pages//stock/refreshMagasin']);
        this.windowRef.close();
      },
      error => {
        console.log(error)
      }
    )
  }
  close() {
    this.windowRef.close();
  }

}
