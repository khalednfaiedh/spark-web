import { Component, OnInit, Inject } from '@angular/core';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { FactureService } from '../facture.service';
import { ClientService } from '../../../admin/client/client.service';
import { ClientModel } from '../../../admin/client/client.model';

import { ProductModel } from '../../../admin/product/product.model';
import { ProductService } from '../../../admin/product/product.service';
import { ReclamationService } from '../reclamation.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NbGlobalPhysicalPosition, NbWindowRef, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-modal-reclamation',
  templateUrl: './modal-reclamation.component.html',
  styleUrls: ['./modal-reclamation.component.scss']
})
export class ModalReclamationComponent implements OnInit {

  etat = ""
  orderForm: FormGroup;
  items: FormArray;
  clients: ClientModel[]
  produits: ProductModel[];
  idFacture: number;
  message = ""
  idEntr = localStorage.getItem('current_entreprise')
  disabled: boolean = false
  constructor(@Inject(NB_WINDOW_CONTEXT) context,
    private formBuilder: FormBuilder,
    private factureService: FactureService,
    private clientService: ClientService,
    private produitService: ProductService,
    private reclamationService: ReclamationService,
    public windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private router: Router) {
    this.idFacture = context.id;
    console.log(context.data)

    if (context.etat === "show") {
      this.etat = "show"
      //  // this.orderForm.setValue(context.data);
      //  this.orderForm.controls.setValue(context.data)
      console.log(context.data)
      this.disabled = true

      this.orderForm = this.formBuilder.group({
        idClient: new FormControl({ value: context.data.idClient, disabled: true }),
        dateReclamation: new FormControl({ value: context.data.dateReclamation, disabled: true }),
        observation: new FormControl({ value: context.data.observation, disabled: true }),
        status: new FormControl({ value: context.data.observation, disabled: true }),
        reclamationProduits: this.formBuilder.array([])
      });
      const reclamationProduits = this.orderForm.get('reclamationProduits') as FormArray;
      //    books.clearAsyncValidators()
      context.data.reclamationProduits.forEach(b => {
        console.log(b)
        reclamationProduits.push(this.createbin(b))
      })

    } else if (context.etat === "edit") {

      this.message = "Modfier"
      this.idFacture = context.idfacture2;

      this.orderForm = this.formBuilder.group({
        id: new FormControl(context.data.id),
        idClient: new FormControl(context.data.idClient),
        dateReclamation: new FormControl(context.data.dateReclamation),
        observation: new FormControl(context.data.observation),
        status: new FormControl(context.data.status),
        reclamationProduits: this.formBuilder.array([])
      });
      const reclamationProduits = this.orderForm.get('reclamationProduits') as FormArray;
      //    books.clearAsyncValidators()
      context.data.reclamationProduits.forEach(b => {
        console.log(b)
        reclamationProduits.push(this.createbin2(b))
      })

    }

    else {
      this.etat = "add"
      this.message = "Ajouter"
      this.orderForm = this.formBuilder.group({
        idClient: new FormControl(),
        dateReclamation: new FormControl(),
        observation: new FormControl(),
        status: new FormControl(),
        reclamationProduits: this.formBuilder.array([this.createItem()])

      });
    }
  }

  ngOnInit() {


    this.clientService.getAllClient(+this.idEntr).subscribe(
      data => { this.clients = data; }
    )

    let id= localStorage.getItem('current_entreprise')
    this.produitService.getAllproduct(+id).subscribe(
      data => { this.produits = data }
    )





  }


  get formData() { return <FormArray>this.orderForm.get('reclamationProduits'); }

  createItem(): FormGroup {

    return this.formBuilder.group({
      idProduit: new FormControl(),
      quantite: new FormControl(),
    });


  }

  addItem(): void {

    this.items = this.orderForm.get('reclamationProduits') as FormArray;


    this.items.push(this.createItem());

  }

  deleteItemLine(e, i): void {
    e.preventDefault();
    this.items = this.orderForm.get('reclamationProduits') as FormArray;
    console.log(this.items);
    this.items.removeAt(i);
  }


  submitForm(data) {

    if (this.etat === "add") {
      this.reclamationService.addReclamation(data, this.idFacture).subscribe(
        data => {
          console.log('data')
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "Reclamation  est ajouter avec succéss")
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/vente/reclamation"]));
        },
        err => { console.log('err') }
      )

    }

    if (this.etat = "edit") {

      console.log(data)
      this.reclamationService.updateReclamation(data, this.idFacture).subscribe(
        data => {
          console.log('data')
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "Reclamation  est  Modfier avec succéss")
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/vente/reclamation"]));
        },
        err => { console.log('err update') }
      )

    }
  }

  createbin(operation: any) {
    // create a new form group containing controls and validators for a product

    return this.formBuilder.group({
      idProduit: new FormControl({ value: operation.idProduit, disabled: true }),
      quantite: new FormControl({ value: operation.quantite, disabled: true }),

    })


  }

  createbin2(operation: any) {
    // create a new form group containing controls and validators for a product

    return this.formBuilder.group({
      idProduit: new FormControl(operation.idProduit),
      quantite: new FormControl(operation.quantite),

    })


  }
  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 20000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? ` ${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }

  onclose() {
    this.windowRef.close();
  }


}
