import { EmployeMinModel } from "../../admin/employe-list/employe-list.model";
import { Atelier } from "../../admin/atelier/atelier";
import { Ilot } from "../ilot/ilot";

export class Ligne {

    id:number;
    code:string;
    Designation:string;
    dateCreation:Date;
    idAtelier:number;
	idChef:number;
    chef:EmployeMinModel;
    atelier:Atelier;
    ilot:Ilot
   
}