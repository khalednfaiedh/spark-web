import { FormeJuridiqueModel } from "../forme-juridique/forme-juridique.model";
import { BanqueModel } from "../banque/Banque.modal";
import { CategorieClient } from "../categorie-client/categorieClient";
import { GrilleTarifsModel } from "../grille-tarifs/grille-tarifs-model";
import { ModeDePaiementModel } from "../mode-de-paiement/mode-de-paiement-model";
import { ConditionDePaiementModel } from "../condition-de-paiement/condition-de-paiement-model";

export class ClientModel {

  code_clt: number;
  nameC: string;
  typeC: string;
  adresseC: string;
  tlfC: number;
  faxC: number;
  emailC: string;
  paysC: string;
  villeC: string;
  nature: string;
  codepostaleC: number;
  commenteurC: string;
  note: number;
  categorieClient: CategorieClient
  codeImmatriculation: string;
  registreCommerce: string;
  exonerationTva: string;
  typePiament: string
  certificatExonerationTva: string;
  date_debutExonerationTva: Date;
  date_finExonerationTva: Date;
  retenueSource: string;
  certificatExonerationRetenue: string;
  date_debutExonerationRetenue: Date;
  date_finExonerationRetenue: Date;
  formeJuridique: FormeJuridiqueModel;
  grilleTarifs: GrilleTarifsModel
  modeDepaiement: ModeDePaiementModel;

  conditionsDePaiements: ConditionDePaiementModel;
}
