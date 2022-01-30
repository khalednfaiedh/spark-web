import { Component, OnInit } from '@angular/core';
import { ContactClientService } from '../service/contact-client.service';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-show-contact-client',
  templateUrl: './show-contact-client.component.html',
  styleUrls: ['./show-contact-client.component.scss']
})
export class ShowContactClientComponent implements OnInit {
  source: any;
  constructor(private service: ContactClientService,  public windowRef : NbWindowRef) { }

  ngOnInit() {
    let codeCLT = localStorage.getItem('idClient');
    this.service.getContactClient(+codeCLT).subscribe(
      data => { this.source = data; },
      error => { console.log('error'); });
  }
  settings = {
    actions: {
      "position": "right",
      edit: false,
      delete: false,
      add: false,
    },
    columns: {
      nom: {
        title: 'Nom',
        type: 'string',
        filter: true,
        width: '201px',
      },
      prenom: {
        title: 'Prénom',
        type: 'string',
        filter: true,
        width: '200px',
      },

      fonction: {
        title: 'Fonction',
        type: 'string',
        filter: true,
        width: '200px',
      },
      tel1: {
        title: 'Téléphone1',
        type: 'number',
        filter: true,
      },
      tel2: {
        title: 'Téléphone2',
        type: 'number',
        filter: true,
      },
      fax: {
        title: 'Fax',
        type: 'string',
        filter: true,
        width: '200px',
      },
      email: {
        title: 'E-mail',
        type: 'email',
        filter: true,
        width: '210px',
      },
    },
  };
  onclose(){
    this.windowRef.close();
  }
}
