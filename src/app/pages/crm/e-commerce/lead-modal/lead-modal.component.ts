import { Component, OnInit, Input } from '@angular/core';
import { NbWindowRef, NbWindowService } from '@nebular/theme';


import { LeadRow } from '../../entities/row/LeadRow';
import { LeadService } from '../../services/lead.service';
import { StatusService } from '../../services/status.service';



@Component({
  selector: 'ngx-lead-modal',
  templateUrl: './lead-modal.component.html',
  styleUrls: ['./lead-modal.component.scss']
})
export class LeadModalComponent implements OnInit {
    newStat;
  lead2:any
  statur:number[]
  
  stat:string;
  constructor(public windowRef: NbWindowRef,private windowService:NbWindowService,private statService:StatusService,private leadService:LeadService) {
   // console.log(this.lead2.name);
   this.statur=[0,25,50,75,100]//statService.getStatus();
   console.log("here"+this.statur);
  }

  close() {
    this.windowRef.close();
  }

  ngOnInit(){   
    this.lead2=this.windowRef.config.context;
    console.log("hello   "+this.lead2.status);
    console.log("hello 2 "+this.lead2.name);
   // this.stat=localStorage.getItem("statfromabove");
    console.log("hello 3"+this.stat)
  }

  onSubmit(){
    console.log(this.lead2.status,"x",this.newStat);
    console.log("lead2"+this.lead2);
   // this.leadService.setLead(this.lead2.id,this.lead2)
    this.windowRef.close();
  }

  notedata=[{
    noteTitle:"Lorem ipsum",
    noteContent:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  },{
    noteTitle:"Lorem ipsum",
    noteContent:"Lorem ipsum dolor sit amet, \n consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit \n anim id est laborum."

  }]




types=[{ value: "appel", title: "call"},
  { value: "email", title: "E-mail"},
  { value: "reunion", title: "Reunion"}];


 actionSettings={
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',

},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',

},
columns: {

actionName: {
title: 'Action',
type: 'string',
},
date:{
title: 'Date',
type: 'Date',

},
actionType: {
title: 'Type Action',
type: 'list',
filter:{ type: 'list',
config: {
  selectText: 'Type',
  list: this.types, 
},
} ,
editor: { type: 'list',
config: {
  selectText: 'Type',
  list: this.types,   
},
},
},
},
}
      /**
   * Config of notes smart table in lead popup
   * (called when clicking on  a lead)
   */
    noteSettings = {
 
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave:true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
       
        noteTitle: {
          title: 'Titre',
          type: 'string',
        },
        noteContent:{
          title: 'Contenu',
          type: 'string',
          editor: { type: 'textarea'},
          width:"400em",
   /*        valuePrepareFunction: (cell, row) => {
            console.log('1'+row.isInEditing);
            console.log('2'+cell);
            row.isInEditing
           return cell;      }  */
      } 
      }
    };
  //*********************************************** */
  actiondata = [{

    actionName: 'Call Otto',
    leadName: 'Otto',
    date:'07/05/2019,18:00:00',
    actionType:'Appel' ,
  }, {
    actionName: 'Meet Mark',
    leadName: 'Mark',
    date:'07/05/2019,18:00:00',
    actionType:'meeting' ,
  },
   {
    actionName: 'Email Jack',
    leadName: 'Jack',
    date:'07/05/2019,17:00:00',
    actionType:'Email' ,
  },
  , {
    actionName: 'Call Mary',
    leadName: 'Mary',
    date:'07/05/2019,15:00:00',
    actionType:'Appel' ,
  }, {
    actionName: 'Email Susan',
    leadName: 'Susan ',
    date:'07/05/2019,16:30:00',
    actionType:'Email' ,
  },];

  
  onDeleteConfirm($event){console.log("hello there")}
  onCreateConfirm($event){console.log("general kenobi")}
  onSaveConfirm(event){
    console.log("hello to you too")
    event.confirm.resolve();
  }




  


/*
types:type[]=[ { value: 'appel', title: 'Appel' },
  { value: 'meeting', title: 'Meeting' },
  { value: 'email', title: 'E-mail' }]

 actionsettings={
add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',

},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',

},
columns: {

actionName: {
title: 'Action',
type: 'string',
},
date:{
title: 'Date',
type: 'Date',

},
actionType: {
title: 'Type Action',
type: 'list',
filter:{ type: 'list',
config: {
selectText: 'Type',
list: TableConfig.types, 
},
} ,
editor: { type: 'list',
config: {
selectText: 'Type',
list: TableConfig.types,   
},
},
},
},
}
*/

/*
 notesettings = {

add: {
addButtonContent: '<i class="nb-plus"></i>',
createButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
},
edit: {
editButtonContent: '<i class="nb-edit"></i>',
saveButtonContent: '<i class="nb-checkmark"></i>',
cancelButtonContent: '<i class="nb-close"></i>',
confirmSave:true,
},
delete: {
deleteButtonContent: '<i class="nb-trash"></i>',
confirmDelete: true,
},
columns: {

noteTitle: {
title: 'Titre',
type: 'string',
},
noteContent:{
title: 'Contenu',
type: 'string',
editor: { type: 'textarea'},
width:"400em",
//valuePrepareFunction: (cell, row) => {
//console.log('1'+row.isInEditing);
//console.log('2'+cell);
//row.isInEditing
//return cell;      }  
} 
}
};
*/
}
