import { Component, OnInit } from '@angular/core';
import { AdresseLivraisonClientService } from '../service/adresse-livraison-client.service';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-show-adresse-livraison-client',
  templateUrl: './show-adresse-livraison-client.component.html',
  styleUrls: ['./show-adresse-livraison-client.component.scss']
})
export class ShowAdresseLivraisonClientComponent implements OnInit {
source:any;
  constructor(private service: AdresseLivraisonClientService,  public windowRef : NbWindowRef) { }

  ngOnInit() {
    let codeCLT = localStorage.getItem('idClient');
    this.service.getadresseDeLivraisonsClient(+codeCLT).subscribe(
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
    adresse: {
    title: 'Adresse',
    type: 'string',
    filter: true,
    width: '450px',
    },
    codePostal: {
    title: 'Code Postal',
    type: 'number',
    filter: true,
    width: '200px',
    },
    ville: {
    title: 'Ville',
    type: 'string',
    filter: true,
    width: '300px',
    },
    pays: {
    title: 'Pays',
    type: 'string',
    filter: true,
    width: '200px',
    },
    
    },
    };
    onclose(){
      this.windowRef.close();
    }
}
