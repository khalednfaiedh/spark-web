import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { UtilisateurModel } from '../../../utilisateur/utilisateur.model';
import { LeadStepCell } from '../../entities/cell/leadStepCell';
import { ProspectCell } from '../../entities/cell/ProspectCell';
import { LeadFull } from '../../entities/full/LeadFull';
import { LeadService } from '../../services/lead.service';
import { LeadStepService } from '../../services/leadStep.service';
import { ProspectService } from '../../services/prospect.service';
import { IpopupComponent } from './ipopup/ipopup.component';
import { ApopupComponent } from './apopup/apopup.component';
import { NpopupComponent } from './npopup/npopup.component';
import { PpopupComponent } from './ppopup/ppopup.component';
import { SurveyService } from '../../services/survey.service';
import { NoteRow } from '../../entities/row/NoteRow';
import { format } from 'date-fns';
import { ActionModel } from './apopup/action';
import { Produit } from '../../entities/full/produit';
import { ProduitService } from '../../services/produit.service';
import { ActionService } from '../../services/action.service';

@Component({
  selector: 'ngx-edit-affaire',
  templateUrl: './edit-affaire.component.html',
  styleUrls: ['./edit-affaire.component.scss']
})
export class EditAffaireComponent implements OnInit {
  idAffaire: number
  lead = new LeadFull();
  intervenants: UtilisateurModel[];
  produits: Produit[];
  prospects: ProspectCell[];
  steps: LeadStepCell[];
  iSource: any;
  nSource: NoteRow[];
  aSource: ActionModel[]
  ACTIVE: number
  pSource: any;
  prospect: ProspectCell = new ProspectCell();
  contacts: any
  constructor(protected route: ActivatedRoute,
    private leadStepService: LeadStepService,
    private leadService: LeadService,
    private prospectService: ProspectService,
    private windowService: NbWindowService,
    protected service: SurveyService,
    protected produitService: ProduitService,
    protected actionService: ActionService
  ) { }

  ngOnInit() {

    this.idAffaire = this.route.snapshot.params['id'];
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


  openAWindow() {
    localStorage.setItem('active_tab', '3')
    this.windowService.open(ApopupComponent, {
      title: 'Ajouter une nouvelle action',
      context: { idAffaire: this.idAffaire }
    });
  }
  aOnCustom(event): any {
    if (event.action === 'editAction') {
      this.windowService.open(ApopupComponent, {
        title: 'Modifier cette action',
        context: {
          action: event.data,
          disabled: false,
          idAffaire: this.idAffaire
        }
      });
    }
    if (event.action === 'showAction') {
      this.windowService.open(ApopupComponent, {
        title: 'Détails action',
        context: {
          action: event.data,
          disabled: true
        }
      });
    }
  }
  aSettings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
      custom: [
        {
          name: 'showAction',
          title: '<i class="nb-sunny"" title="Afficher"></i>',
        },
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Modifier"></i>',
        }
      ],
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
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
      actionDateLimite: {
        title: 'Date limite',
        type: 'Date',
        width: "15vw",
        valuePrepareFunction(actionDateLimite) {
          return actionDateLimite ? format(actionDateLimite, "DD/MM/YYYY HH:mm") : '-'
        }
      },
    }
  }
  aDelete(event): void {
    if (window.confirm(`Êtes-vous sur(e) de vouloir supprimer cette action ?`)) {
      event.confirm.resolve(this.actionService.deleteAction(event.data.actionID).subscribe(
        data => {
          this.aSource.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }


  iSettings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
      custom: [
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Edit"></i>',
        },
      ],
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
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
  iOnCustom(event): any {
    if (event.action === 'editAction') {
      localStorage.setItem('active_tab', '2')
      this.windowService.open(IpopupComponent, {
        title: 'Modifier ce prospecteur',
        context: { intervenant: event.data, idAffaire: this.idAffaire }
      });
    }
  }
  openIWindow() {
    localStorage.setItem('active_tab', '2')
    this.windowService.open(IpopupComponent, {
      title: 'Ajouter un nouveau prospecteur',
      context: { idAffaire: this.idAffaire }
    });
  }
  iDelete(event): void {
    if (window.confirm(`Êtes-vous sur(e) vouloir de supprimer ce prospecteur ?`)) {
      event.confirm.resolve(this.produitService.deleteIntervenant(event.data.idIntervenant).subscribe(
        data => {
          this.iSource.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }


  openPWindow() {
    localStorage.setItem('active_tab', '4')
    this.windowService.open(PpopupComponent, {
      title: 'Ajouter un nouveau produit',
      context: { idAffaire: this.idAffaire }
    });
  }
  pSettings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
      custom: [
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Edit"></i>',
        },
      ],
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
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
        title: 'Quantité prévu',
        type: 'number',
      },
    }
  }
  pOnCustom(event): any {
    if (event.action === 'editAction') {
      this.windowService.open(PpopupComponent, {
        title: 'Modifier ce produit',
        context: {
          produit: event.data,
          idAffaire: this.idAffaire
        }
      });
    }
  }
  pDelete(event): void {
    if (window.confirm(`Êtes-vous sur(e) de vouloir  supprimer ce produit?`)) {
      event.confirm.resolve(this.produitService.deleteProduit(event.data.id).subscribe(
        data => {
          this.pSource.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
    }
  }



  nSettings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
      custom: [
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Edit"></i>',
        },
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Consulter" i18n="@@consulter"></i>',
        },
      ],
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
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
  nOnCustom(event): any {
    if (event.action === 'editAction') {
      this.windowService.open(NpopupComponent, {
        title: 'Modifier argumentaire',
        context: {
          note: event.data,
          disabled: false,
          idAffaire: this.idAffaire
        }
      });
    }
    if (event.action === 'showAction') {
      this.windowService.open(NpopupComponent, {
        title: 'Détails argumentaire',
        context: {
          note: event.data,
          disabled: true
        }
      });
    }
  }
  openNWindow() {
    localStorage.setItem('active_tab', '5')
    this.windowService.open(NpopupComponent, {
      title: 'Ajouter un argumentaire',
      context: { idAffaire: this.idAffaire }
    });
  }


  nOnDeleteConfirm(event): void {
    if (window.confirm(`Vous êtes sure de supprimer cet argumentaire ?`)) {
      event.confirm.resolve(this.service.deleteSurvey(event.data.surveyID).subscribe(
        data => {
          this.nSource.filter(p => p !== event.data);
        }),
      );
    } else {
      event.confirm.reject();
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
  addLead() {

    this.leadService.addLead(this.lead).subscribe(
      data => {
        // this.lead = data;
        console.log('affaire', this.lead)
        console.log('produits', this.lead.produit)
        if (this.lead.produit.length > 0) {
          this.lead.produit.forEach(p => {
            p.leadID = this.lead.leadID
          });
          this.produitService.saveProducts(this.lead.produit)
            .subscribe(
              data => {
                console.log("produit success");
              },
              error => {
                console.log("no");
              }
            );

        }
        if (this.lead.intervenant.length > 0) {
          this.lead.intervenant.forEach(e => {
            this.leadService.addIntervenats(this.lead.leadID, e).subscribe(
              res => {
                console.log("intervenant success");
                //  this.showToast(NbToastStatus.SUCCESS, "Success", "L'intervenent " + e.username +" a ete affecté");
              },
              error => {
                // this.showToast(NbToastStatus.DANGER, "Erreur", "L'intervenent " + e.username +" a ete rejeté");
              }
            )
          });
        }

        localStorage.setItem('active_tab', '1')
        // this.router.navigateByUrl("/", { skipLocationChange: true })
        //   .then(() => this.router.navigate(["/pages/crm/affaire"]));
        window.history.back();
        // this.windowRef.close();
      },
      error => {
        console.log(error);
      }
    );
  }

  goBack() {
    // console.log('affaire',this.lead)
    // console.log('produits',this.lead.produit)
    // localStorage.setItem('active_tab', '1')
    // this.router.navigate(["/pages/crm/affaire"])
    window.history.back();
  }
  close() {
    window.history.back();
    // this.router.navigate(["/pages/crm/affaire"])
  }
  active(tab: number): boolean {
    this.ACTIVE = +localStorage.getItem('active_tab')
    if (this.ACTIVE == null || this.ACTIVE == 0) {
      this.ACTIVE = 1
    }
    if (tab === this.ACTIVE) {
      return true
    } else return false

  }
}
