import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(private windowRef : NbWindowRef) { }
   mois: any 
   annee: any
  ngOnInit() {
      this.mois = localStorage.getItem('M')
      this.annee = localStorage.getItem('Y')
  }
  onClose(){

    this.windowRef.close();

}
}
