import { Injectable } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { NbGlobalPosition, NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Injectable({
  providedIn: 'root'
})
export class TostarService {

  config: ToasterConfig;
destroyByClick = true;
duration = 10000;
hasIcon = true;
position: NbGlobalPosition = NbGlobalLogicalPosition.TOP_END;
preventDuplicates = false;
status: NbToastStatus 
title: string;
content = ` `;
  constructor( private toastrService: NbToastrService) { }



makeToast() {
  this.showToast(this.status, this.title, this.content);
}
  showToast(type: NbToastStatus, title: string, body: string) {
  const config = {
    status: type,
    destroyByClick: this.destroyByClick,
    duration: this.duration,
    hasIcon: this.hasIcon,
    position: this.position,
    preventDuplicates: this.preventDuplicates,
  };
  const titleContent = title ? ` ${title}` : '';


  this.toastrService.show(
    body,
    `${titleContent}`,
    config);
}
}


