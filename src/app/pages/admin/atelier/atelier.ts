import { Site } from "../entreprise/site/site";
import { ChefAteleir } from "./chefAtelier";
import { EmployeMinModel } from "../employe-list/employe-list.model";

export class Atelier {


     id:number;
	 code:string;
	 Designation:string;
	 dateCreation:Date;
	 poste:number;	
	 site:Site;
	 idRegime:number
	listEmployees:EmployeMinModel[];
}