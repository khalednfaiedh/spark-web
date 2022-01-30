import { Ligne } from "../../gpao/ligne/ligne";
import {  Section } from "../../gpao/section/section";
import { EmployeMinModel } from "../../admin/employe-list/employe-list.model";
import { MachineModel } from "../../admin/machine/machine.model";
export class PosteCharge
{

        id:number;
        reference:string;
        designation:string;
	    capaciteTheorique:number;
		cofficientCapacite:number;
		capaciteReelle:number
		idUnite:number; 
		coutRevient:number
        unite:  any;
        type :string;
	    nombreHeure:number;
	    nombreJour:number;
	    commentaire:string;
	    coutRevien:string;
	    ligne:Ligne;
	    section:Section;
        posteChargeMachines: any[];
		posteChargeEmployees: any [];
		listeEmployees:EmployeMinModel[];
		listeMachines:MachineModel[];
		capaciteTotale:number;
		idEntreprise:number
		posteRemplacent:PosteCharge
		nombreExemplaire:number
}


export class PosteChargeEmployee{
	    id:number;
	    idEmployee:number;
	    employee:EmployeMinModel;

}