import { BilanService } from './../services/bilan.service';
import { NbWindowRef } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../admin/product/product.service';

@Component({
  selector: 'ngx-show-bilan',
  templateUrl: './show-bilan.component.html',
  styleUrls: ['./show-bilan.component.scss']
})
export class ShowBilanComponent implements OnInit {

  id = localStorage.getItem('idRC');
  bilan : any = new Object ();
  product: any = new Object ()
  refBC : String = new String();

  constructor(public windowRef : NbWindowRef,
    private serviceBilan: BilanService,
    private serviceP: ProductService) { }

  ngOnInit() {
    this.serviceBilan.getBilan(+this.id).subscribe(data=>{
      this.bilan= data;
      this.refBC="BC"+data.idBC
      console.log(this.refBC)
      this.serviceP.getProductByCode(data.code).subscribe(data1=>{
        this.product=data1;
      })

    })
  }
  close(){
    localStorage.removeItem('e');
    localStorage.removeItem('idRC');
    this.windowRef.close();
  }

}
