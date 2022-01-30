import { Component, OnInit, Inject } from '@angular/core';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { MachineService } from '../../../admin/machine/machine.service';
import { MachineModel } from '../../../admin/machine/machine.model';
import { ContratService } from '../../../rh/contrat/contrat.service';
import { Entreprise } from '../../../admin/entreprise/entreprise';
import { EntrepriseService } from '../../../admin/entreprise/entreprise.service';

@Component({
  selector: 'ngx-cout-revient',
  templateUrl: './cout-revient.component.html',
  styleUrls: ['./cout-revient.component.scss']
})
export class CoutRevientComponent implements OnInit {
machines: any[]=[];
employees:any[]=[];
money:string
  constructor( @Inject(NB_WINDOW_CONTEXT) context,
  
  private  machineService:MachineService,
  private  contratService:ContratService,
  private entrepriseService :EntrepriseService) 

  
  {
  console.log(context.data.listeMachines)

  this.machineService.getMachineByPostCharge(context.data.listeMachines).subscribe(

    data=>{console.log(data);this.machines=data},
    err=>{console.log('errr get machine')}
  )


  this.contratService.getListContrats(context.data.listeEmployees).subscribe(
    data=>{console.log(data); this.employees=data,
    err=>{console.log("errr get list contrat")}}
  )
   }

  ngOnInit() {

    let idEntr =  +localStorage.getItem('current_entreprise')
   
     
     this.entrepriseService.getEnterpriseById(idEntr).subscribe(
       data => { this.money = data.money.designation}
     )
  }



  total(machines,employee)
  {
  var t1 =  this.getTotalCoutMachine(machines)
   var t2 = this.getTotalCoutEmployee(employee)
     return t1+t2;
    
    
  }


  getTotalCoutMachine(machines):number
  {
    var sum:number=0;
    machines.forEach(element => {
      sum+=element.coutRevient;
    });

    return sum;
  }

  getTotalCoutEmployee( employee):number
  {
    var sum:number=0;
    employee.forEach(element => {
      sum+=element.coutHeure;
    });

    return sum;
  }

}
