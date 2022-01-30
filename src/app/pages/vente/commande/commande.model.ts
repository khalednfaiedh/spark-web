
import { DemandeProductiontModel } from "../demande-production/demande-production.model";
import { DevisClientModel } from "../devis-client/devis-client.model";
import { ContratClientModel } from "../contrat-client/contrat-client-model";

export class CommandeModel {
    date_cmd: Date
    code_cmd: number;
    validite: string;
    code_clt: number;
    dateCommande: Date;
    dateLivraison: Date;
    montantpayer: number;
    montantReste: number;
    montantHorsTaxe: number
    montantNetHorsTaxe: number
    montantResteLettre: string;
    montantPayeeLettre: string;
    emisepar: string;
    commentaire: string
    demandeProductions: DemandeProductiontModel[];
    somme: number;
    statut: string;
    taxe: number;
    devis: DevisClientModel
    id_devis: number
    remise: number
    numberJourByEcheance: number
    prixTva: number
    prixTTC: number
    fraisLaivraison: number;
    autreFais: number;
    observation: string
    devise: string
    avence: number
    idContrat: number;
    contrat: ContratClientModel
    quantityProducts: any = [];
    idEntreprise: number;
    sommeRemise: number;
    sommeFinale: number;
    fraislivraison: number;
    autrefrais: number;
    sommeTotaleHt: number;
    sommeTVA: number;
    sommeTotaleavecTVA: number;
    sommeFinaleLettre: string
    typeCommande: string

}