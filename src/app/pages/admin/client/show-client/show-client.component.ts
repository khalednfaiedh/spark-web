import { Component, OnInit } from '@angular/core';
import { ClientModel } from '../client.model';
import { ClientService } from '../client.service';
import { NbWindowRef } from '@nebular/theme';
import { FormeJuridiqueModel } from '../../forme-juridique/forme-juridique.model';
import { FormeJuridiqueService } from '../../forme-juridique/forme-juridique.service';
import { ContactClientService } from '../contact-client/service/contact-client.service';
import { CoordonnesBancaireClientService } from '../coordonnes-bancaire-client/service/coordonnes-bancaire-client.service';
import { Contact } from '../contact-client/Contact.model';
import { AdresseLivraison } from '../adresse-livraison-client/AdresseLivraison.model';
import { CoordonneesBancaireModel } from '../coordonnes-bancaire-client/CoordonneBancaire.Model';
import { AdresseLivraisonClientService } from '../adresse-livraison-client/service/adresse-livraison-client.service';
import { GrilleTarifsService } from '../../grille-tarifs/grille-tarifs.service';
import { GrilleTarifsModel } from '../../grille-tarifs/grille-tarifs-model';
import { ConditionDePaiementService } from '../../condition-de-paiement/condition-de-paiement.service';
import { ModeDePaiementService } from '../../mode-de-paiement/service/mode-de-paiement.service';
import { ConditionDePaiementModel } from '../../condition-de-paiement/condition-de-paiement-model';
import { ModeDePaiementModel } from '../../mode-de-paiement/mode-de-paiement-model';
@Component({
  selector: 'ngx-show-client',
  templateUrl: './show-client.component.html',
  styleUrls: ['./show-client.component.scss']
})
export class ShowClientComponent implements OnInit {
  client: ClientModel;
  formeJuridiques: FormeJuridiqueModel[];
  contacts: Contact[];
  adresses: AdresseLivraison[];
  coordonnees: CoordonneesBancaireModel[];
  grilleTarifs: GrilleTarifsModel[]
  condtion: ConditionDePaiementModel[]
  modes: ModeDePaiementModel[]
  idEntr = localStorage.getItem('current_entreprise')
  constructor(private service: ClientService, public windowRef: NbWindowRef,
    private serviceC: ContactClientService, private serviceAdresse: AdresseLivraisonClientService,
    private servicegrilleTarifs: GrilleTarifsService,
    private serviceCoordonne: CoordonnesBancaireClientService, private serviceFormeJuridique: FormeJuridiqueService, private serviceConditionP: ConditionDePaiementService,
    private serviceModePaiement: ModeDePaiementService) { }

  ngOnInit() {
    this.client = new ClientModel();
    let code_clt = localStorage.getItem('idClient');
    this.service.getClientById(+code_clt).subscribe(
      data => {
        this.client = data;

        console.log(data)
      },

      error => { console.log(error); });
    this.serviceConditionP.getAllConditionDePaiement(+this.idEntr).subscribe(
      data => { this.condtion = data; },
      error => { console.log(error); },
    );
    this.serviceModePaiement.getAllModeDePaiement(+this.idEntr).subscribe(
      data => { this.modes = data; },
      error => { console.log(error); },
    );
    this.serviceFormeJuridique.getAllFormeJuridique(+this.idEntr).subscribe(
      data => { this.formeJuridiques = data; },
      error => { console.log(error); },
    );
    this.servicegrilleTarifs.getAllGrilleTarifs(+this.idEntr).subscribe(
      data => { this.grilleTarifs = data; },
      error => { console.log(error); },
    );
    this.serviceAdresse.getadresseDeLivraisonsClient(+code_clt).subscribe(
      data => { this.adresses = data; },
      error => { console.log(error); },
    );
    this.serviceC.getContactClient(+code_clt).subscribe(
      data => { this.contacts = data; },
      error => { console.log(error); },
    );
    this.serviceCoordonne.getCoordonneesBancairesClient(+code_clt).subscribe(
      data => { this.coordonnees = data; },
      error => { console.log(error); },
    );
  }

  close() {
    this.windowRef.close();
  }


}
