import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx';
import { Console } from '@angular/core/src/console';
import { PlanGeneralService, Plan, PlanExport } from '../plan-general/plan-general.service';
import { PlanTiersService } from '../plan-tiers/plan-tiers.service';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { error } from 'util';
import { ImportExportService } from './import-export.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { TostarService } from '../tostar/tostar.service';


type AOA = any[][];
@Component({
  selector: 'ngx-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.scss']
})
export class ImportExportComponent implements OnInit {

  constructor(private planGeneralsService: PlanGeneralService,
    private planTiersService: PlanTiersService,
    private toastrService: NbToastrService,
    private servicePlanTiers: PlanTiersService,
    private excelService: ImportExportService,
    private router: Router,
    private tostarService: TostarService) { }

  ngOnInit() {
    this.getAllPlanTiers();
    this.getAllPlanGeneral();

  }
  dataPlanGeneral: any;
  plans = [];
  plansTiers = []
  dataPlanTiers: any;
  dataPlanGeneral2: AOA = [[], []];
  data: AOA = [[], []];
  data2: AOA = [[], []];
  data3: AOA = [[], []];
  // wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  testEroor: boolean = false;
  testEroor2: boolean = false;

  //toast
  config: ToasterConfig;
  destroyByClick = true;
  duration = 10000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
  preventDuplicates = false;
  status: NbToastStatus
  title: string;
  content = ``;

  onFileChange(evt: any) {
    /* wire up file reader */
    
    this.testEroor=false;
    const target: DataTransfer = <DataTransfer>(evt.target);
    /*  ////*/
     
   // console.log(evt.target.files[0].type);
   var extention=evt.target.files[0].name.split(".").pop()

    if((extention !== 'xls') && (extention!=='xlsx') )
    {this.status= NbToastStatus.DANGER;
      this.title='Format invalide';
      this.content='Le fichier importé doit être d\'extension ".xls" ou ".xlsx" ';
      this.makeToast();
      this.testEroor=true;
    }
    
    /*  ////*/

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        var x=this.data[0].length.toString();
        console.log(x)
       if(  x!=='2')
       {this.status= NbToastStatus.DANGER;
        this.title='Format invalide';
        this.content='Le fichier importé doit être contient deux colonne nom de compte et le code ';
        this.makeToast();
        this.testEroor=true;
       }
    };
    reader.readAsBinaryString(target.files[0]);

     
  }

  // onFileChange(evt: any) {
  //   /* wire up file reader */

  //   this.testEroor = false;
  //   const target: DataTransfer = <DataTransfer>(evt.target);
  //   /*  ////*/

  //   // console.log(evt.target.files[0].type);
  //   var extention = evt.target.files[0].name.split(".").pop()

  //   if ((extention !== 'xls') && (extention !== 'xlsx')) {
  //     this.status = NbToastStatus.DANGER;
  //     this.title = 'Format invalide';
  //     this.content = 'Le fichier importé doit être d\'extension ".xls" ou ".xlsx" ';
  //     this.makeToast();
  //     this.testEroor = true;
  //   }

  //   /*  ////*/

  //   if (target.files.length !== 1) throw new Error('Cannot use multiple files');
  //   const reader: FileReader = new FileReader();
  //   reader.onload = (e: any) => {
  //     /* read workbook */
  //     const bstr: string = e.target.result;
  //     // const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

  //     /* grab first sheet */
  //     // const wsname: string = wb.SheetNames[0];
  //     // const ws: XLSX.WorkSheet = wb.Sheets[wsname];

  //     /* save data */
  //     // this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
  //     var x = this.data[0].length.toString();
      
  //     console.log('nombre',x)
  //     if (x !=='2') {
  //       this.status = NbToastStatus.DANGER;
  //       this.title = 'Format invalide';
  //       this.content = 'Le fichier importé doit être contient deux colonne nom de compte et le code ';
  //       this.makeToast();
  //       this.testEroor = true;
  //     }
  //   };
  //   reader.readAsBinaryString(target.files[0]);


  // }
  onFileChange2(evt: any) {
    /* wire up file reader */
    this.testEroor2 = false;
    const target: DataTransfer = <DataTransfer>(evt.target);
    /*  ////*/

    // console.log(evt.target.files[0].type);
    var extention = evt.target.files[0].name.split(".").pop()

    if ((extention !== 'xls') && (extention !== 'xlsx')) {
      this.status = NbToastStatus.DANGER;
      this.title = 'Format invalide';
      this.content = 'Le fichier importé doit être d\'extension ".xls" ou ".xlsx" ';
      this.makeToast();
      this.testEroor2 = true;
    }

    /*  ////*/

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
       const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
         const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
       this.data2 = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      var x = this.data2[0].length.toString();
      console.log(x)

      if (x !== '2') {
        this.status = NbToastStatus.DANGER;
        this.title = 'Format invalide';
        this.content = 'Le fichier importé doit être contient deux colonne nom de compte et le code ';
        this.makeToast();
        this.testEroor2 = true;
      }
    };
    reader.readAsBinaryString(target.files[0]);


  }

  submitForm() {

    console.log(this.data.length)
    console.log(this.data)
    this.data[0].splice(0, 2);

    this.data.forEach((b, index) => {


      var plan = new Plan();
      if (index != 0 && index != 0) {
        plan.nameCompte = b[1];
        plan.codeCompte = b[0];
        this.plans.push(plan);

        console.log(index);
        console.log(b)

        // setTimeout(() => {
        //   this.planGeneralsService.addPlanGeneral(plan).subscribe(
        //     data => {  

        //     //  this.status= NbToastStatus.SUCCESS;
        //     //  this.title='SUCCESS';
        //     //  this.content=' Votre compte A été ajouté avec succès';
        //     //  this.makeToast();
        //     //  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        //     //  this.router.navigate(['/pages/import-export']));
        //     },
        //     error => { console.log("error  add plan general");
        //     this.status= NbToastStatus.DANGER;
        //      this.title='DANGER';
        //      this.content=' impossible ajouter avec compte,déja existé';
        //      this.makeToast();
        //      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        //      this.router.navigate(['/pages/import-export']));


        //   }
        //   );
        //    }, 1500);

      }
    });

    console.log(this.plans)
    console.log(this.plans.length)

    this.planGeneralsService.importPlanComptable(this.plans).subscribe(
      data => {
        console.log(" ok temchi")
        this.tostarService.showToast(NbToastStatus.SUCCESS, "Succes", "Importation plan comptable avec succées")
      },
      error => {
        console.log("ghalta");
        this.tostarService.showToast(NbToastStatus.DANGER, "Succes", " Interdit Importation plan comptable    ...!")
      }
    )

  }

  submitForm2() {


    this.data2.forEach((b, index) => {

      if (index != 0) {
        var plan = new Plan();
        plan.nameCompte = b[1];
        plan.codeCompte = b[0];


        // this.planTiersService.addPlanTiers(plan).subscribe(
        //   data => { plan = data ;
        //     this.status= NbToastStatus.SUCCESS;
        //     this.title='SUCCESS';
        //     this.content=' Votre compte A été ajouté avec succès';
        //     this.makeToast();
        //     this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        //     this.router.navigate(['/pages/import-export']));
        //   },
        //   error => { console.log('ereur 4015');
        //   this.status= NbToastStatus.DANGER;
        //   this.title='DANGER';
        //   this.content=' impossible ajouter avec compte , déja existé';
        //   this.makeToast();
        //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        //   this.router.navigate(['/pages/import-export'])); }
        // )
        this.plans.push(plan);

      }

    });

    this.planTiersService.importPlanTiers(this.plans).subscribe(
      data => {
        
        this.tostarService.showToast(NbToastStatus.SUCCESS, "Succes", "Importation plan comptable avec succées")
      },
      error => {
      
        this.tostarService.showToast(NbToastStatus.DANGER, "Interdit", " Interdit Importation plan comptable    ")
      }
    )

  }
  getAllPlanGeneral() {
    this.planGeneralsService.getAllPlanGeneralPlanExport().subscribe(
      data => {
        this.dataPlanGeneral = data;



      },
      error => { console.log('error  get all plan') }

    )
  }

  getAllPlanTiers() {
    this.planTiersService.getAllPlanTiersPlanExport().subscribe(

      data => { this.dataPlanTiers = data; },
      error => { console.log('error') }
    )
  }

  exportAsXLSXGeneral(): void {

    console.log(this.dataPlanGeneral)
    this.excelService.exportAsExcelFile(this.dataPlanGeneral, 'PLAN-GENERAL');
     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
     this.router.navigate(['/pages/comptabilite/import-export']));
  }
  refresh() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/comptabilite/import-export']));
  }


  exportAsXLSXTiers(): void {
    this.excelService.exportAsExcelFile(this.dataPlanTiers, 'PLAN-TIERS');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/pages/comptabilite/import-export']));
  }

  // export(): void {
  //   /* generate worksheet */
  //   const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.dataPlanGeneral);

  //   /* generate workbook and add the worksheet */
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /* save to file */
  //   XLSX.writeFile(wb, this.fileName);
  // }



  makeToast() {
    this.showToast(this.status, this.title, this.content);
  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : '';
    this.toastrService.show(
      body,
      `Toast ${titleContent}`,
      config);
  }


}
