import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-modal-personnel',
  templateUrl: './modal-personnel.component.html',
  styleUrls: ['./modal-personnel.component.scss']
})
export class ModalPersonnelComponent implements OnInit {

  constructor(public windowRef: NbWindowRef) { }

  ngOnInit() {
  }

  close() {
    this.windowRef.close();
  }
}
