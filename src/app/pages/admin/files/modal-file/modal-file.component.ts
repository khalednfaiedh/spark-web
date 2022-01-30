import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileService } from '../service/file.service';
import { ActivatedRoute } from '@angular/router';
import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-modal-file',
  templateUrl: './modal-file.component.html',
  styleUrls: ['./modal-file.component.scss']
})
export class ModalFileComponent implements OnInit {
  @Output() nom = new EventEmitter<string>()
  selectedFiles: FileList;
  currentFileUpload: File

  constructor(private service: FileService, private route: ActivatedRoute) { }
  ngOnInit(): void {

  }
  selectFile(event) {
    this.selectedFiles = event.target.files;

  }


  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.service.upload(this.currentFileUpload).subscribe(event => {
      if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

  }

}
