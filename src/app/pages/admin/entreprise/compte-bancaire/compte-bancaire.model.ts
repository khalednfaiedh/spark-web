import { BanqueModel } from "../../banque/Banque.modal"
import { Entreprise } from "../entreprise"

export class CompteBancaireModel{
    idC : number
    banque: BanqueModel
    agence: number
    rib: string
    iban: number
    bic: number
    entreprise : Entreprise
}
