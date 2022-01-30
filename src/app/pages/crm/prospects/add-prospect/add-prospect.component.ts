import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from "../../services/user.service";
import { NB_WINDOW_CONTEXT } from "@nebular/theme/components/window/window.options";
import { ProspectFull } from "../../entities/full/ProspectFull";
import { ProspectService } from "../../services/prospect.service";
import { UserCell } from "../../entities/cell/UserCell";
import { Router } from "@angular/router";
import { NbWindowRef } from "@nebular/theme";
import { PagesComponent } from "../../../pages.component";
import { AdminComponent } from "../../../admin/admin.component";
import { PlanningService } from "../../planning/planning.service";
import { Planning } from "../../planning/planning";

@Component({
  selector: "ngx-add-prospect",
  templateUrl: "./add-prospect.component.html",
  styleUrls: ["./add-prospect.component.scss"]
})
export class AddProspectComponent implements OnInit {
  placeholderVar;
  valider = "Modifier";

  typePrimes = [];

  prospect: ProspectFull;
  ancienClient = true;
  prospectType = PagesComponent.TYPES
  payes = AdminComponent.PAYES_LIST
  plannings :Planning[]
  constructor(
    private router: Router,
    private windowRef: NbWindowRef,
    private prospectService: ProspectService,
    private userService: UserService,
    protected planningService :PlanningService,
    @Inject(NB_WINDOW_CONTEXT) context
  ) {
    this.prospect = new ProspectFull();
      if (context.id != null) {
      this.prospectService.getFullProspect(context.id).subscribe(
        data => {
          this.prospect = data;
          this.GetListPlannings(this.prospect.idUser)
          if( (this.prospect.prospectBank=="") || (this.prospect.prospectAccount=="")) this.ancienClient=false
        },
        error => {
          console.log("couldnt get prospect");
        }
      );
    } else {
      this.valider = "Ajouter";
      this.prospect.createdBy = this.userService.getCurrentUserCell().userName;
      this.prospect.idUser = this.userService.getCurrentUserCell().userID;
      this.prospect.dateCreation = new Date();
      this.ancienClient = false;
      this.GetListPlannings(this.prospect.idUser)
    }
  
  }
GetListPlannings(idUser){
  this.planningService.getAllEnCours(idUser).subscribe(
    res => {this.plannings=res},
    error=>{console.log('err',error)}
  )
}
  ngOnInit() {

  }

  addProspect() {
    console.log("this is the finished prospect");
    console.log(this.prospect);
    
    this.prospectService.addProspect(this.prospect).subscribe(
      data=>{
        console.log("this be the new prospect",data)
        this.router
        .navigateByUrl("/", { skipLocationChange: true })
        .then(() => this.router.navigate(["/pages/crm/prospects"]));
      this.windowRef.close();
      },
      error=>{
        console.log("this be an error",error)

      }
    )
  }

}
