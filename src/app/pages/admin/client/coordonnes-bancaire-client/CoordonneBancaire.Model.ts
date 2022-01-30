import { BanqueModel } from "../../banque/Banque.modal";

export class CoordonneesBancaireModel {
    idC: number;
    rib: string
    iban: string
    bic: string
    agence: string
    banque: BanqueModel;
    idBanque: number;
    nomBanque: string;
}
