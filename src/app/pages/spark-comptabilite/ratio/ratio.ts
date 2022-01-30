import { EtatFinancier } from "../etat-financier/etat-financier";

export class Ratio {
    idRatio: number;
    ratioName: RatioName;
    resultat: number;
    startDate: Date;
    endDate: Date;
    etatFinancier: EtatFinancier;
  }
  
  export enum RatioName {
      FondDeRoulement,BesoinEnFondDeRoulement,Tresorerie
    }