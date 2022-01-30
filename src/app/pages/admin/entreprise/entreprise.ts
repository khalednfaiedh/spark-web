import { FormeJuridiqueModel } from "../forme-juridique/forme-juridique.model";
import { UniteDeTransactionModel } from "../unite-de-transaction/UniteDeTransaction.model";

export class Entreprise{
    enterpriseId :number;
    socialReason :string;
    formeJuridique:FormeJuridiqueModel;
    nature:string;
	manager :string;
	taxRegistrationCode :string;
	tradeRegister :string;
	officeAddress :string;
    eState:string;
    money:UniteDeTransactionModel;
	capital:number;
	entEmail:string;
    telephone:number;
    zipCode:number;
    country:string;
    activity:string;
    numCNSS : string ;
    mensualites : number;
   listeUniteTransaction :UniteDeTransactionModel[]=[]
   entrepriseUniteTransactions:EntrepriseUniteTransactions[]=[]//
}

export class EntrepriseUniteTransactions{

          uniteDeTransaction:UniteDeTransactionModel ;

}


 