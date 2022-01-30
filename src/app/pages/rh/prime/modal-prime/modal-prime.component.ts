import { Component, OnInit } from '@angular/core';
import { PrimeModel } from '../prime.model';
import { TypePrimeModel } from '../../../rh-parametrage/type-prime/type-prime.model';
import { NbWindowRef } from '@nebular/theme';
import { PrimeService } from '../prime.service';
import { Router } from '@angular/router';
import { TypePrimeService } from '../../../rh-parametrage/type-prime/type-prime.service';

@Component({
  selector: 'ngx-modal-prime',
  templateUrl: './modal-prime.component.html',
  styleUrls: ['./modal-prime.component.scss']
})

export class ModalPrimeComponent implements OnInit {
  prime: PrimeModel;
  natures=["Impossable", "Non Impossable"]
  A: string;
  typePrimes: TypePrimeModel[];
  value:number;
  ngOnInit(): void {
    let e = localStorage.getItem('e');
    this.prime = new PrimeModel();
    if (e === '0') {
      this.A = 'Ajouter';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let idPrime = localStorage.getItem('idPrime')
      this.service.getPrimesById(+idPrime).subscribe(
        data => {
          this.prime = data;
          this.value=this.prime.valeurPrime;
        },
        error => {
          console.log('erreur1');
        });
    }

    this.serviceTypePrime.getAllTypePrimes().subscribe(
      data => { 
        this.typePrimes = data; 
      },
      error => {
         console.log("error2");
         }
    );
  }

  constructor(public windowRef: NbWindowRef,
    private service: PrimeService,
    private router: Router, private serviceTypePrime: TypePrimeService) { }

  close() {
    this.windowRef.close();
    this.router.navigate(['/pages/rh/prime']);
  }

  onAddM() {
    let e = localStorage.getItem('e');
    let idC = localStorage.getItem('idCon');
    if (e === '0') {
      this.prime.valeurPrime=this.value;
      this.service.addPrimes(this.prime, +idC)
        .subscribe(
          data => {
           localStorage.removeItem('e');
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/rh/prime"]));
        },
          error => {
            console.log('error3');
          });
    }
    if (e === '1') {
        this.prime.valeurPrime=this.value;
        this.service.updatePrimes(this.prime, +idC).subscribe(
        data => {
          localStorage.removeItem('e');
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/rh/prime"]));
        },
        error => {});
    }
  }

  changeValue(){
    if(this.prime.typePrime!=null)
    {
       this.value=this.prime.typePrime.defaultValeurPrime;
    }
  }
}