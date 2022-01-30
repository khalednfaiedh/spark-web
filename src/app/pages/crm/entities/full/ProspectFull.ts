import { LeadAction } from "../cell/leadAction";
import { UserCell } from "../cell/UserCell";

export class ProspectFull{
    prospectID :number;          
    prospectType : string                      
    prospectName : string            
    prospectAddress:string
    prospectEmail : string
    prospectNumber: string
    prospectCountry: string
    prospectTown: string
    prosectPostalCode: string
    prospectBank: string
    prospectAccount :string
    prospectRating:number
    prospectFax:number
    leads:LeadAction[]
    dateCreation:Date
    createdBy:any // User Cell or String username 

    idUser: Number
    prospectHistory:string
    prospectComment:string
    
}