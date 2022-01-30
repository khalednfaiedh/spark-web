import { MonnaisModel } from "./Monnais.Model";
import { UniteDeTransactionModel } from "../unite-de-transaction/UniteDeTransaction.model";

export class TaxeModel {
  idT: number;
  name: string;
  type: string;
  pourcentage: number;
  uniteDeTransaction: UniteDeTransactionModel;

}