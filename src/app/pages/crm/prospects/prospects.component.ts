import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NbWindowService, NbToastrService, NbGlobalPhysicalPosition } from "@nebular/theme";
import { AddProspectComponent } from "./add-prospect/add-prospect.component";
import { ProspectDetailsComponent } from "./prospect-details/prospect-details.component";
import { DeleteProspectComponent } from "./delete-prospect/delete-prospect.component";
import { LocalDataSource, ViewCell } from "ng2-smart-table";
import { ProspectRow } from "../entities/row/ProspectRow";
import { ProspectService } from "../services/prospect.service";
import { UserService } from "../services/user.service";
import { ToasterConfig } from "angular2-toaster";
import { NbToastStatus } from "@nebular/theme/components/toastr/model";
import { PagesComponent } from "../../pages.component";
import { ProspectContactComponent } from "./prospect-contact/prospect-contact.component";
@Component({
  selector: 'ngx-button-edit-affaire',
  template:
    '<div class="button-container">\n' +
    '      <button (click)="onClick()" nbButton status="success" '+
    '      style="padding:5px 5px;" type="submit" title="Liste de contact(s)"><i class="fas fa-phone"></i> </button> \n'+ 
    '    </div>',
})
export class ButtonViewContact implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();
  
  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }
  constructor(private windowService: NbWindowService) {
  }
  onClick() {
    this.windowService.open(ProspectContactComponent, {
      title: 'Liste de contacts de '+this.rowData.prospectName,
       context: { 
       idProspect: this.rowData.prospectID}}); 
  }
}
@Component({
  selector: "ngx-prospects",
  templateUrl: "./prospects.component.html",
  styleUrls: ["./prospects.component.scss"]
})
export class ProspectsComponent implements OnInit {
  datasource: LocalDataSource;
  prospects: ProspectRow[];
  datasource2: LocalDataSource;
  prospects2: ProspectRow[];

  types= PagesComponent.TYPES
  constructor(private toastrService: NbToastrService,
              private windowService: NbWindowService,
              private prospectService:ProspectService,
              private userService:UserService) {
   
    prospectService.getProspectRows().subscribe(
        data=>{    this.prospects=data
          this.datasource=new LocalDataSource(this.prospects)
        },
        error=>{
          console.log("couldnt get those prospects")
        }
    )
    prospectService.getArchivedProspectRows().subscribe(
      data=>{    this.prospects2=data
        this.datasource2=new LocalDataSource(this.prospects2)
      },
      error=>{
        console.log("couldnt get those prospects")
      }
  )

  }

  ngOnInit() {}

  
  
  openAddWindow(event) {
    console.log("1")

    this.windowService.open(AddProspectComponent, { title: "Ajouter un nouveau prospect" });
  }
  openDetailsWindow(event) {
    console.log("1")

    this.windowService.open(ProspectDetailsComponent, {
      title: "Details prospect",
      context: { id: event.data.prospectID }
    });
  }

  openEditWindow(event) {
    console.log("1")

    this.windowService.open(AddProspectComponent, {
      title: "Modifier ce prospect",
      context: { id: event.data.prospectID }
    });
  }

  confirmDelete(event) {
    console.log("1")

    this.windowService.open(DeleteProspectComponent, {
      title: "Confirmation",
      context: { text: event.data }
    });
  }
  onCustom(event){
    if(event.action=="showAction")
     this.openDetailsWindow(event)
    if(event.action=="editAction")
         this.openEditWindow(event)
    if(event.action=="deleteAction")
        this.confirmDelete(event)
  }
  prospectSettings = {
    mode:"inline",
    actions:{
      position: 'right',
      custom: [
        {
          name: 'showAction',
          title: '<i class="nb-sunny" title="Consulter" i18n="@@consulter"></i>',
        },
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Editer" i18n="@@editer"></i>',
          confirm:true
        },
        {
          name: 'deleteAction',
          title: '<i class="nb-power" title="Archiver" i18n="@@supprimer"></i>',
        }
      ],
        add:false,
        edit: false,
        delete: false,
   
     },
   
     columns: {
      ref: {
        title: "Référence",
        type: "string",
        width: '7vw'
      },
      prospectName: {
        title: "Intitulé",
        type: "string"
      },
      prospectAddress: {
        title: "Adresse",
        type: "Date"
      },
     
      // prospectNumber: {
      //   title: "Telephone",
      //   type: "string"
      // }, 
      // prospectEmail: {
      //   title: "Email",
      //   type: "string"
      // },
      prospectRating: {
        title: "Note",
        type: "string"
      },
      prospectType: {
        title: "Type ",
        type: "list",

        filter: {
          type: "list",
          config: {
            selectText: "Type",
            list: this.types
          }
        },
        editor: {
          type: "list",
          config: {
            selectText: "Type",
            list: this.types
          }
        }
      },
      acton: {
        title: 'Contact(s)',
        type: 'custom',
        width:'5vw',
        renderComponent: ButtonViewContact,
      },
    }
  };


  prospectSettings2 = {
    mode:"inline",
    actions:{
      position: 'right',

        add:false,
        edit: false,
        delete: false,
   
     },
   
     columns: {
      ref: {
        title: "Référence",
        type: "string"
      },
      prospectName: {
        title: "Intitulé",
        type: "string"
      },
      prospectAddress: {
        title: "Adresse",
        type: "Date"
      },
     
      prospectNumber: {
        title: "Telephone",
        type: "string"
      }, 
      prospectEmail: {
        title: "Email",
        type: "string"
      },
      prospectRating: {
        title: "Note",
        type: "string"
      },
      prospectType: {
        title: "Type ",
        type: "list",

        filter: {
          type: "list",
          config: {
            selectText: "Type",
            list: this.types
          }
        },
        editor: {
          type: "list",
          config: {
            selectText: "Type",
            list: this.types
          }
        }
      }
    }
  };


config: ToasterConfig;
index = 1;
status: NbToastStatus;
title = "Erreur";
content = `Note doit etre un nombre`;
private showToast(type: NbToastStatus, title: string, body: string) {
  const config = {
    status: type,
    destroyByClick: true,
    duration: 4000,
    hasIcon: true,
    position: NbGlobalPhysicalPosition.TOP_RIGHT,
   // preventDuplicates: true
  };
  const titleContent = title ? ` ${title}` : "";
  this.toastrService.show(body, `${titleContent}`, config);
}

showToastr() {
  this.showToast(this.status, this.title, this.content);
}
  // searchProspects(event) {
  //   console.log("on the receiving end");
  //   console.log(event)
  //   this.prospectService.searchProspects(event).subscribe( data=>{
  //     let searchResult=data;
  //     console.log(searchResult)
  //     if(searchResult!= null)
  //     this.datasource=new LocalDataSource(searchResult);
  //   },
  //   error=>{ console.log("Couldnt get search Results ",error)}
  //   )
  //   let el = document.getElementById("table");
  //   el.scrollIntoView({behavior:"smooth"});
  //  }

}
