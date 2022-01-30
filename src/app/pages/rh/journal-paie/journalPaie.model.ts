import { FichePaieModel } from "../fiche-paie/fichePaie.model";

export class JournalPaieModel{
    
    totalBrut : number ;
	   
    totalCNSS : number ;
   
    totalImposable: number ;
   
   totalIRPP : number ;
   
    totalContributionSocial : number ;
   
    totalNet : number ;
   
    totalAvanceMens: number ;
   
   totalEcheance : number ;
   
   totalNetFinal : number ;

   fichePaie : FichePaieModel[] ;
}


