import { LeadFull } from "../../entities/full/LeadFull";
import { Component, OnInit, Inject } from "@angular/core";
import {
  NbToastrService,
  NbGlobalPhysicalPosition,
  NbWindowRef
} from "@nebular/theme";

import { NbToastStatus } from "@nebular/theme/components/toastr/model";
import { ToasterConfig } from "angular2-toaster";
import { Router } from "@angular/router";
import { LeadService } from "../../services/lead.service";
import { NB_WINDOW_CONTEXT } from "@nebular/theme/components/window/window.options";
import { LeadRow } from "../../entities/row/LeadRow";
import { ProspectCell } from "../../entities/cell/ProspectCell";
import { ProspectService } from "../../services/prospect.service";
import { UserService } from "../../services/user.service";
import { LeadStepCell } from "../../entities/cell/leadStepCell";
import { LeadStepService } from "../../services/leadStep.service";
import { ProduitService } from "../../services/produit.service";
import { UtilisateurService } from "../../../utilisateur/utilisateur.service";
import { UtilisateurModel } from "../../../utilisateur/utilisateur.model";
import { Produit } from "../../entities/full/produit";

@Component({
  selector: "ngx-add-lead",
  templateUrl: "./add-lead.component.html",
  styleUrls: ["./add-lead.component.scss"]
})
export class AddLeadComponent implements OnInit {
  
  valider = "Ajouter";
  placeholdervar: string;
  lead: LeadFull;
  leadRow: LeadRow;
  prospects: Array<ProspectCell> = [];
//  users: UserCell[];
  steps: LeadStepCell[];
  products: Produit[];
  intervenants: UtilisateurModel[]

  leadcheck: LeadFull = new LeadFull();
 // tempUser: UserCell = new UserCell();
  numbers = new RegExp(/^[0-9]+$/);
  disabled: boolean = false;
  constructor(
    private leadStepService: LeadStepService,
    private leadService: LeadService,
    private prospectService: ProspectService,
    private userService: UserService,
    private produitService: ProduitService,
    private router: Router,
    private windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private utilisateurService: UtilisateurService,
    @Inject(NB_WINDOW_CONTEXT) context
  ) {
    this.leadRow = context.lead;
  }

  ngOnInit() {
    this.lead = new LeadFull();
    this.lead.prospect = new ProspectCell();
    this.lead.leadStep = new LeadStepCell();
   // this.lead.users = [];

   this.utilisateurService.getAllUtilisateurPublique().subscribe(
    data => {this.intervenants = data
    },
    error =>{console.log('error',error)
  })
 
    this.produitService.getProducts().subscribe(
      data => {
        this.products = data;
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
        this.lead.leadStep = this.steps.find(x => x.stepOrder == 1);
      },
      error => {
        console.log("cant get those steps yo ");
      }
    );

    if (this.leadRow != null) {
      console.log("edit");
     // this.disabled = true ;
      this.leadService.getLead(this.leadRow.leadID).subscribe(
        data => {
          this.valider = "Modifier";
           this.lead = data
         // console.log("a full lead for you to enjoy", this.lead);
        },
        error => {
          console.log(" this error");
        }
      );
     
    } else {
      console.log("add");
      this.lead.leadName = "Affaire#";
      this.lead.leadValue = 100;
  //    this.lead.leadStatus = "New";
      this.lead.leadScore = 10;
      this.lead.leadDateCreation = new Date();
      this.lead.leadDateDeadline = new Date();
      this.lead.createdBy =this.userService.getCurrentUserCell().userID;
      this.lead.username =  this.userService.getCurrentUserCell().userName;
  
    }
    //add check for add/modify check for toaster
  }

  addLead() {
   // if ( (this.numbers.test(this.lead.leadScore.toString())) && this.numbers.test(this.lead.leadScore.toString())){
    // this.leadStepService.getSteps().subscribe(data=>{
    //   const maxStep = Math.max(...data.map(o => o.stepOrder), 0);
    //   let topSteps=data.filter(x=>x.stepOrder==maxStep)
    //    if(topSteps.find(x=>this.lead.leadStep.stepID==x.stepID))
    //          this.lead.leadDateExecution=new Date ()
    // },
    // error=>{
    //     console.log("error fixing finished lead date",error)
    //     this.showToast(NbToastStatus.DANGER, "Erreur", "Couldn't finalize lead");
    // })

  //  if (this.lead.leadStep)
    // if (!(this.lead.users.indexOf(this.tempUser) > -1))
    //   this.lead.users.push(this.tempUser);
      // if (isAfter(this.lead.leadDateCreation,this.lead.leadDateDeadline)) 
      //     this.showToast(NbToastStatus.WARNING, "Attention", "Date Deadline invalide");
   
      this.leadService.addLead(this.lead).subscribe(
      data => {
        console.log("1-success")
        this.leadcheck = data;
        if (this.leadcheck.leadName == this.lead.leadName) {
          this.showToast(NbToastStatus.SUCCESS, "Success", "Lead Added Succesfully");
         if (this.lead.intervenant.length > 0) {
          console.log("2-success")

          this.lead.intervenant.forEach(e => {
            console.log("2.x-success")

            this.leadService.addIntervenats(this.leadcheck.leadID,e).subscribe(
              res =>{
                this.showToast(NbToastStatus.SUCCESS, "Success", "L'intervenent " + e.username +" a ete affecté");
              },
              error=>{
                this.showToast(NbToastStatus.DANGER, "Erreur", "L'intervenent " + e.username +" a ete rejeté");
              }
            )
          });
        }
        console.log('this.lead.produit')
        console.log(this.lead.produit)
       if (this.lead.produit.length >0 ) {
            this.lead.produit.forEach(p => {
              p.leadID = this.leadcheck.leadID
              console.log('p',p)
            });
                this.produitService.saveProducts(this.lead.produit).subscribe(
                    data => {
                      console.log("3-success")
                    },
                    error => {
                      console.log("error");
                      this.showToast(NbToastStatus.DANGER, "Error adding product", "Couldn't add product to lead");
                    }
                  );
              
          }
        }
        this.router
          .navigateByUrl("/", { skipLocationChange: true })
          .then(() => this.router.navigate(["/pages/crm/affaire"]));
        this.windowRef.close();
      },
      error => {
        console.log(error);
      }
    );
  // } else{

  //   this.showToast(NbToastStatus.DANGER, "Erreur", "Progres/Valeur Invalide");
  // }
  }






  config: ToasterConfig;
  index = 1;
  status: NbToastStatus.SUCCESS;
  title = "Succès d'enregistrement";
  content = `Votre dossier est bien créer`;
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }

  showToastr(status,title,content) {
    this.showToast(NbToastStatus.SUCCESS, this.title, this.content);
  }

  close(){
    this.windowRef.close()
  }
}
