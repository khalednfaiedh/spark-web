import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { Operation } from '../operation';
import { PhaseService } from '../../phase/phase.service';
import { Phase } from '../../phase/phase';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { OperationService } from '../operation.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbWindowRef, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';
import { FileService } from '../../../admin/files/service/file.service';
import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { CONNREFUSED } from 'dns';
import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'ngx-modal-operation',
  templateUrl: './modal-operation.component.html',
  styleUrls: ['./modal-operation.component.scss']
})
export class ModalOperationComponent implements OnInit {
  operation = new Operation()
  phases: Phase[] = [];
  message = "Ajouter"
  categories: any[] = []
  etat = ""
  validReference: boolean = true

  @Output() nom = new EventEmitter<string>()
  selectedFiles: FileList;
  currentFileUpload: File

  constructor(private phaseService: PhaseService,
    private operationService: OperationService,
    public windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private service: FileService,
    private router: Router,
    @Inject(NB_WINDOW_CONTEXT) context) {

    if (context.etat === "edit") {
      this.etat = "edit"


      this.operationService.getOperationId(context.data.id).subscribe(

        data => { this.operation = data; console.log(data) }
      )

    }

    if (context.etat === "show") {
      this.operationService.getOperationId(context.data.id).subscribe(

        data => { this.operation = data }
      )

    }

    if (context.etat === "add") {
      this.message = "Ajouter"
      this.etat = "add"
    }
  }

  ngOnInit() {

    let id = localStorage.getItem('current_entreprise')
    this.phaseService.getAllPhaseByEntreprise(+id).subscribe(
      data => { this.phases = data; console.log(data) },
      err => { console.log('errr') }
    )
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.operation.namefile = this.selectedFiles.item(0).name
  }


  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.service.upload(this.currentFileUpload).subscribe(event => {
      if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

  }


  save() {

    let id = localStorage.getItem('current_entreprise')

    if (this.etat === "add") {
      this.operationService.addOperation(this.operation.phase.id, this.operation).subscribe(

        data => {
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "    Opération  est ajouter avec succéss")
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/gpao/operation"]));
        },
        err => {

          if (err.error.code === "OPERATION_EXISTE") {
            this.validReference = false;
          }

        }
      )
    }


    if (this.etat === "edit") {
      this.operationService.updateOperation(this.operation.phase.id, this.operation).subscribe(

        data => {
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "   operation  est  Modfiée avec succéss")
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/gpao/operation"]));
        },
        err => {

          if (err.error.code === "OPERATION_EXISTE") {
            this.validReference = false;
          }

        }
      )
    }

    this.upload()


  }



  downlod() {
    this.service.printInvoice().subscribe((response) => {

      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }


  downlod1() {
    var mediaType = 'application/pdf ; charset=UTF-8';
    console.log('ok')
    // if ( this.operation.namefile != null)
    // {
    /// this.service.downloadFileWidthJasper(this.operation.namefile).subscribe(
    this.service.downloadFileWidthJasper().subscribe(
      data => {
        var blob = new Blob([data], { type: mediaType });
        window.open(URL.createObjectURL(blob))
        //FileSaver.saveAs(data,this.operation.namefile);
      },
      err => { console.log("errr downlod file") }
    )
  }
  // }

  downlod2() {
    this.service.downloadPDF(this.operation.namefile).subscribe(

      data => { console.log(" downlod ok") },
      err => { console.log('err downlod') }
    )
  }





  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 20000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }

  onclose() {
    this.windowRef.close();
  }


}
