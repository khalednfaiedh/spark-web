import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { format } from 'date-fns';
import { UtilisateurModel } from '../../../utilisateur/utilisateur.model';
import { LeadStepCell } from '../../entities/cell/leadStepCell';
import { ProspectCell } from '../../entities/cell/ProspectCell';
import { LeadFull } from '../../entities/full/LeadFull';
import { Produit } from '../../entities/full/produit';
import { NoteRow } from '../../entities/row/NoteRow';
import { LeadService } from '../../services/lead.service';
import { LeadStepService } from '../../services/leadStep.service';
import { ProduitService } from '../../services/produit.service';
import { ProspectService } from '../../services/prospect.service';
import { SurveyService } from '../../services/survey.service';
import { ActionModel } from '../edit-affaire/apopup/action';

@Component({
  selector: 'ngx-details-affaire',
  templateUrl: './details-affaire.component.html',
  styleUrls: ['./details-affaire.component.scss']
})
export class DetailsAffaireComponent implements OnInit {

  idAffaire: number
  lead = new LeadFull();
  intervenants: UtilisateurModel[];
  produits: Produit[];
  prospects: ProspectCell[];
  steps: LeadStepCell[];
  iSource: any;
  nSource: NoteRow[];
  aSource: ActionModel[]
  pSource: any;
  prospect: ProspectCell = new ProspectCell();
  contacts: any
  constructor(protected route: ActivatedRoute,
    private leadStepService: LeadStepService,
    private leadService: LeadService,
    private prospectService: ProspectService,
    private windowService: NbWindowRef,
    protected service: SurveyService,
    protected produitService: ProduitService,
    @Inject(NB_WINDOW_CONTEXT) context) {
      this.idAffaire = context.idAffaire}

  ngOnInit() {
this.lead.prospect = new ProspectCell()
this.lead.leadStep = new LeadStepCell()
    this.leadService.getLead(+this.idAffaire).subscribe(
      res => {
        this.lead = res
        this.lead.leadDateCreation = new Date(res.leadDateCreation)
        this.lead.leadDateDeadline = new Date(res.leadDateDeadline)
        this.iSource = this.lead.intervenant
        this.pSource = this.lead.produit
        this.prospect = this.lead.prospect
        this.contacts = this.lead.prospect.contact
      },
      error => {
        console.log("no");
      }
    )
    this.produitService.getProducts().subscribe(
      data => {
        this.produits = data;
      },
      error => {
        console.log("error getting products");
      }
    );
    this.prospectService.getProspectsCells().subscribe(
      data => {
        this.prospects = data;
        
      },
      error => {
        console.log("error getting prospects");
      }
    );
    this.leadStepService.getSteps().subscribe(
      data => {
        this.steps = data;
      },
      error => {
        console.log("cant get those steps yo ");
      }
    );
    this.leadService.getLeadSurveys(+this.idAffaire).subscribe(
      data => {
        this.nSource = data;
      },
      error => {
        console.log("notes error");
      }
    );
    this.leadService.getLeadActions(+this.idAffaire).subscribe(
      data => {
        this.aSource = data;
      },
      error => {
        console.log("action error");
      }
    );

  }

  aSettings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete:false
    },
  
    pager: {
      display: true,
      perPage: 7
    },
    columns: {
      actionType: {
        title: 'Action',
        type: 'string',
        width: "20vw",
        valuePrepareFunction(actionType) {
          return actionType ? actionType.typeName : '-'
        }
      },
      // actionDateCreation:{
      //   title: 'Date creation',
      //   type: 'Date',
      //   valuePrepareFunction(actionDateCreation){
      //     return actionDateCreation ? format(actionDateCreation,"DD/MM/YYYY HH:mm"):'-'
      //   }
      // },
      actionDateLimite: {
        title: 'Date limite',
        type: 'Date',
        width: "15vw",
        valuePrepareFunction(actionDateLimite) {
          return actionDateLimite ? format(actionDateLimite, "DD/MM/YYYY HH:mm") : '-'
        }
      },
      actionStatus: {
        title: 'Statut',
        type: 'string',
        valuePrepareFunction(actionStatus) {
          return actionStatus ? actionStatus.statusName : '-'
        }
      },
      intervenant: {
        title: 'Prospecteur',
        type: 'string',
      },
      actioncost: {
        title: 'Coût',
        type: 'number',
        valuePrepareFunction(c) {
          return c ? c + ' TND' : '-'
        }
      },
      actionduration: {
        title: 'Durée',
        type: 'number',
        valuePrepareFunction(d) {
          return d ? d + ' min' : '-'
        }
      },
    }
  }



  iSettings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
    delete:false
    },
   
    pager: {
      display: true,
      perPage: 5
    },
    columns: {

      username: {
        title: 'Nom',
        type: 'string',
      },
      pourcentage: {
        title: 'Pourcentage',
        type: 'number'
      },
      role: {
        title: 'Rôle',
        type: 'string',
        width: "40vw"
      },
    }
  }

  pSettings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
    delete:false
    },
  
    pager: {
      display: true,
      perPage: 8
    },
    columns: {
      code: {
        title: 'Référence',
        type: 'number'
      },
      designation: {
        title: 'Designation',
        type: 'string',
        editable: false
      },
      prixPropose: {
        title: 'Dernier prix',
        type: 'number',
      },
      quantityStock: {
        title: 'Quantité en stock',
        type: 'number',
      },
      quantityCmd: {
        title: 'Quantité commander',
        type: 'number',
      },
    }
  }


  nSettings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete:false
    },

    pager: {
      display: true,
      perPage: 5
    },
    columns: {
      surveyTitle: {
        title: "Titre",
        type: "string"
      },
      surveyContent: {
        title: "Contenu",
        type: "textarea",
        editor: { type: "textarea" },
        width: "60vw"
      }
    }
  }
  contratSettings={
    actions: {
      add: false,
      edit: false,
      delete:false
 
    },
    pager: {
      display: true,
      perPage: 5
    },
    columns: {
      nom: {
        title: 'Nom & prénom',
        type: 'string',
        filter: true,
        width:'12vw',
        valuePrepareFunction: (n) => {
          return n ? n : '-'
        }
      },
      tel: {
        title: 'Téléphone',
        type: 'number',
        filter: true,
        valuePrepareFunction: (tel) => {
          return tel ? tel : '-'
      },
      },
      mail: {
        title: 'E-mail',
        type: 'string',
        filter: true,
        width:'35vw',
        valuePrepareFunction: (mail) => {
          return mail ? mail : '-'
      },
      },
      fax: {
        title: 'Fax',
        type: 'number',
        filter: true,
        valuePrepareFunction: (fax) => {
          return fax ? fax : '-'
      },
      },

    },
  
}
close(){
  this.windowService.close()
}

}
