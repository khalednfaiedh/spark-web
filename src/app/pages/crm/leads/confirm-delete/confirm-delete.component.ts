import { Component, OnInit, Input, Inject } from '@angular/core';
import { } from '../leads.component'
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { LeadService } from '../../services/lead.service';
import { NbWindowService, NbWindowRef } from '@nebular/theme';
import { Router } from '@angular/router';
import { RapportCloture } from '../../entities/full/rapportCloture';
@Component({
  selector: 'ngx-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent {
  idAffaire: number
  rapport: RapportCloture = new RapportCloture()
  status = ['Conclue', 'Perdu']
  constructor(@Inject(NB_WINDOW_CONTEXT) context,
    private router: Router,
    private leadService: LeadService, private nbWindowRef: NbWindowRef) {
    this.idAffaire = context.idAffaire;
  }

  archiver() {
    this.rapport.idAffaire = this.idAffaire
    this.leadService.archiverAffaire(this.rapport).subscribe(
      (val) => {
        this.nbWindowRef.close()
           this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
           this.router.navigate(["/pages/crm/affaire"]));
      },
    )

  }
  deleteDenied() {
    this.nbWindowRef.close()
  }

}
