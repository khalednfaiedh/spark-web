import { Component, OnInit } from '@angular/core';
import { MachineModel } from '../machine.model';
import { MachineService } from '../machine.service';
import { CategorieMachineService } from '../../categorie-machine/categorie-machine.service';
import { PosteChargeService } from '../../../gpao/poste-charge/poste-charge.service';

@Component({
  selector: 'ngx-show-machine',
  templateUrl: './show-machine.component.html',
  styleUrls: ['./show-machine.component.scss']
})
export class ShowMachineComponent implements OnInit {
  machine: MachineModel;
  retrievedImage: any;
  base64Data: any;
  categories: any;
  infoMachine = new Object()
  disabled:boolean=true;
  constructor(private service: MachineService, 
    private serviceCategorie: CategorieMachineService,
    private postechargerService:PosteChargeService) { }

  ngOnInit() {
    let idEntreprise= localStorage.getItem('current_entreprise')
    this.serviceCategorie.getAllCategorieMByEntreoriseId(+idEntreprise).subscribe(data => {
      this.categories = data;
    },
      error => { console.log(error); });
    this.machine = new MachineModel();
    let id = localStorage.getItem('idMachine');
    this.service.getMachineById(+id).subscribe(
      data => {
        this.machine = data; console.log(data)
        this.base64Data = this.machine.image;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      },
      error => { console.log(error); });

      this.postechargerService.getInformationmachine(+id).subscribe(

        data=>{this.infoMachine=data;console.log(data)},
        err=>{console.log("err get INFO MACHINE")}
      );
  }
}