import { Component, OnInit } from '@angular/core';
import { CompteBancaireModel } from '../compte-bancaire.model';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';
import { CompteBancaireService } from '../compte-bancaire.service';
import { BanqueModel } from '../../../banque/Banque.modal';
import { BanqueService } from '../../../banque/banque.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-add-compte',
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.scss']
})
export class AddCompteFournisseurComponent implements OnInit {

  compte: any;
  A: string;
  idFournisseur = localStorage.getItem('idFournisseur');
  banques: BanqueModel[];
  public documentGrp1: FormGroup;
  constructor(private service: CompteBancaireService, private router: Router,
    public banqueService: BanqueService, public windowRef: NbWindowRef, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.documentGrp1 = this.formBuilder.group({
      itemss: this.formBuilder.array([]),
    })
    this.compte = new CompteBancaireModel();
    let e = localStorage.getItem('e');
    let idEntr = localStorage.getItem('current_entreprise')
    this.banqueService.getAllBanques(+idEntr).subscribe(
      data => { this.banques = data },
      err => { console.log('err') }
    )
    if (e === '0') {
      this.A = 'Ajouter';
    }
    if (e === '1') {
      this.A = 'Modifier';
      let idCompte = localStorage.getItem('idCompte');
      this.service.getById(+idCompte).subscribe(
        data => {
          this.compte = data;

        },
        error => {

        });
    }
  }
  get itemss(): FormArray {
    return this.documentGrp1.get('itemss') as FormArray;
  };
  addItem(): void {
    this.itemss.push(this.createUploadDocuments11());
  }

  removeItem(index: number) {
    this.itemss.removeAt(index);
  }
  createUploadDocuments11(): FormGroup {
    return this.formBuilder.group({
      banque: new FormControl(),
      agence: new FormControl(),
      rib: new FormControl(),
      iban: new FormControl(),
      bic: new FormControl(),
    });
  }
  add() {
    let e = localStorage.getItem('e');
    if (e === '0') {
      this.service.add(this.compte, +this.idFournisseur).subscribe
        (data => {
          console.log("succées");
          localStorage.removeItem('e');
          localStorage.removeItem('idCompte');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/admin/fournisseur/banque"]));
          this.windowRef.close();
        },
          error => {

          });
    }
    if (e === '1') {
      this.service.update(this.compte, +this.idFournisseur).subscribe(
        data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idCompte');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/admin/fournisseur/banque"]));
          this.windowRef.close();
        },
        error => {

        });
    }
  }
  close() {
    this.windowRef.close();
  }
}
