import { QuantityProductModel } from './demande-achat-of-product.model';
import { DemandePrixAchatModel } from '../../demande-prix-achat/model/demande-prix-achat.model';

export class DemandeAchatModel {
    idDemandeAchat: Number;
    reference: string;
    designation :string
    creePar :string
    description: string;
    dateDemande: Date;
    dateLivraison: Date ;
    typeDemande: string;
    statut : string ;
    quantityProducts: any [] ;
}
