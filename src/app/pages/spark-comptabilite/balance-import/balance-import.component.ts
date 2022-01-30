import { Component, OnInit } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService, NbWindowRef } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

//import * as XLSX from 'xlsx';
import { Balance } from './balance';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
type AOA = any[][];
@Component({
  selector: 'ngx-balance-import',
  templateUrl: './balance-import.component.html',
  styleUrls: ['./balance-import.component.scss']
})
export class BalanceImportComponent implements OnInit {

  //wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  testEroor: boolean = false;
  data: AOA = [[], []];
  balances = [];
  msg: string
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

  constructor(private toastrService: NbToastrService,
    private windowRef: NbWindowRef) { }

  ngOnInit() {
    this.msg = "3000"

  }

  onFileChange(evt: any) {
    /* wire up file reader */

    // this.testEroor = false;
    const target: DataTransfer = <DataTransfer>(evt.target);
    /*  ////*/

    // console.log(evt.target.files[0].type);
    var extention = evt.target.files[0].name.split(".").pop()

    if ((extention !== 'xls') && (extention !== 'xlsx')) {
      this.status = NbToastStatus.DANGER;
      this.title = 'Format invalide';
      this.content = 'Le fichier importé doit être d\'extension ".xls" ou ".xlsx" ';
      this.makeToast();
      this.testEroor = true;
    }

    /*  ////*/

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      // const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      // const wsname: string = wb.SheetNames[0];
      // const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      // this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      var x = this.data[0].length.toString();
      console.log(x)
      if (x !== '5') {
        this.status = NbToastStatus.DANGER;
        this.title = 'Format invalide';
        this.content = 'Le fichier importé doit être contient deux colonne nom de compte et le code ';
        this.makeToast();
        this.testEroor = true;
      }
    };
    reader.readAsBinaryString(target.files[0]);


  }

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

  submitForm() {


    this.data.forEach((b, index) => {

      if (index != 0) {
        var balance = new Balance();
        balance.codeCompte = b[0];
        balance.nameCompte = b[1];
        balance.sold1 = b[2];
        balance.sold2 = b[3];
        balance.sold3 = b[4];





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
        this.balances.push(balance);



      }

    });
    localStorage.setItem("balancesImporter", JSON.stringify(this.balances));
    this.windowRef.close();
    //var storedNames = JSON.parse(localStorage.getItem("names"));
    // this.planTiersService.importPlanTiers(this.plans).subscribe(
    //   data=>{console.log("temchi"); 
    //   this.tostarService.showToast(NbToastStatus.SUCCESS ,"Succes","Importation plan comptable avec succées")},
    //   error=>{console.log("ghalta")
    //   this.tostarService.showToast(NbToastStatus.DANGER ,"Interdit"," Interdit Importation plan comptable    ")}
    // )




  }
}
