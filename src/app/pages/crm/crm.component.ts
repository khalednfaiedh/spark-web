import { Component, OnInit } from '@angular/core';
import { UtilisateurModel } from '../utilisateur/utilisateur.model';
import { UtilisateurService } from '../utilisateur/utilisateur.service';

@Component({
  selector: 'ngx-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss']
})
export class CrmComponent implements OnInit {

  constructor() {
      }

  ngOnInit() {
  }
  public static TYPE_ENTREPRISE = ["Entreprise industrielle",
  "Entreprise de service"]
  public static REGIME_ENTREPRISE = ["Non totalement exportatrice",
  "Totalement exportatrice"]

}
