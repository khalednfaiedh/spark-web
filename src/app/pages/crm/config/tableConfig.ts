/* 
import { differenceInMonths, differenceInYears, subMonths, subYears, differenceInDays, subDays} from 'date-fns'
import { Cell } from "ng2-smart-table";
 import { Row } from "ng2-smart-table/lib/data-set/row";
export class TableConfig {



  // Config of action smart table in lead popup
   //(called when clicking on  a lead)
  
  static types=[{ value: "appel", title: "call"},
                { value: "email", title: "E-mail"},
                { value: "reunion", title: "Reunion"}];
   

    public  static actionsettings={
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
  
   
   //Config of notes smart table in lead popup
  // (called when clicking on  a lead)
   
    public static notesettings = {
 
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
   ///       valuePrepareFunction: (cell, row) => {
        //    console.log('1'+row.isInEditing);
        //    console.log('2'+cell);
         //   row.isInEditing
    //       return cell;      }  
   //   } 
   //   }
   // };
    
   //
  // Config of lead smart table in leads pages
   // (called when clicking on  a lead)
  //
  
   static status=[ { value: 'new', title: 'New' },
                  { value: 'in progress', title: 'in progress' },
                  { value: 'done', title: 'Done' }]


public  static leadSettings={
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

    name: {
    title: 'Action',
    type: 'string',
    },
    value: {
    title:'Value',
    type: 'number'
    },
    DateCreated:{
      title:'Duration',
      type: 'String',
      valuePrepareFunction: (cell,row) => {  
                  let past =row.DateCreated//subDays(new Date(),500)
                  console.log(row.value)
                  //console.log(cell.getValue());
                  const result = [];
                  let now = new Date();
                  const years = differenceInYears(now, past);
                  if (years > 0) {
                    if(years===1) result.push(`${years} year`);
                      else result.push(`${years} years`);
                    now = subYears(now, years);
                  }
                  
                  const months = differenceInMonths(now, past);
                  if (months > 0) {
                    if(months===1) result.push(`${months} month`)
                    else result.push(`${months} months`);
                    now = subMonths(now, months);
                  }
                  
                  const days = differenceInDays(now, past);
                  if (days > 0) {
                    if (days===1) result.push(`${days} day`);
                    else result.push(`${days} days`);
                  }
                  return result.join(' ');
              
              }   
    },
    progress:{
      title: 'Progress',
      type: 'number',
    },
    status: {
      title: 'Status',
      type: 'list',
      filter:{ type: 'list',
        config: {
          selectText: 'Type',
          list: TableConfig.status, 
      },
      } ,
    editor: {
      type: 'list',
      config: {
        selectText: 'Type',
        list: TableConfig.status,   
        },
    },
    }, 
    },
  }
} */