import { Component, OnInit, Input } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { ModalCommandeComponent } from '../commande/modal-commande/modal-commande.component';
import { ModalContratClientComponent } from '../contrat-client/modal-contrat-client/modal-contrat-client.component';
import { ModalDemandePrixClientComponent } from '../demande-prix-client/modal-demande-prix-client/modal-demande-prix-client.component';
import { ClientService } from '../../admin/client/client.service';

@Component({
  selector: 'ngx-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  public static urlSelect = "/pages/vente/select"
  client = localStorage.getItem("codeCLT")
  idEntr = localStorage.getItem('current_entreprise')
  constructor(private windowService: NbWindowService,
    private service: ClientService) { }
  source: any;

  ngOnInit() {
    this.service.getAllClient(+this.idEntr).subscribe(
      data => { this.source = data; },
      error => { console.log('erreur'); });
  }
  test: any
  choix() {
    if (this.test === 'Commande') {

      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', this.client);
      console.log(this.client);
      localStorage.setItem('e', '0');
      this.windowService.open(ModalCommandeComponent,
        { title: 'Commande', context: { id: this.client } });
    }
    if (this.test === 'Contrat') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', this.client);
      localStorage.setItem('e', '0');
      console.log(this.client);
      this.windowService.open(ModalContratClientComponent,
        { title: 'Contrat', context: { id: this.client } });
    }
    if (this.test === 'Demande prix') {
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', this.client);
      localStorage.setItem('e', '0');
      console.log(this.client);
      this.windowService.open(ModalDemandePrixClientComponent,
        { title: 'Demande Prix', context: { id: this.client } });
    }
  }
}
