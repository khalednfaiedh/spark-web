import { Component, OnInit, Inject } from '@angular/core';
import { NbWindowService, NbToastrService, NbGlobalPhysicalPosition, NbWindowRef } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { IlotService } from '../../ilot/ilot.service';
import { NomenclatureComponent } from '../nomenclature.component';
import { NomenclatureService } from '../nomenclature.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductModel } from '../../../admin/product/product.model';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { ProductService } from '../../../admin/product/product.service';

@Component({
  selector: 'ngx-modal-nomenclature',
  templateUrl: './modal-nomenclature.component.html',
  styleUrls: ['./modal-nomenclature.component.scss']
})
export class ModalNomenclatureComponent implements OnInit {

  etat = ""
  orderForm: FormGroup;
  items: FormArray;
  produits: ProductModel[];
  idEntreprise: number;
  message = ""
  disabled: boolean = false
  types = [{ id: "0", name: "Kit/Pack" }, { id: "1", name: "fabriqué ce produit" }]
  constructor(@Inject(NB_WINDOW_CONTEXT) context,
    private formBuilder: FormBuilder,

    private produitService: ProductService,
    private nomenclatureService: NomenclatureService,
    public windowRef: NbWindowRef,
    private toastrService: NbToastrService,
    private router: Router) {

    console.log(context.data)

    if (context.etat === "show") {
      this.etat = "show"
      //  // this.orderForm.setValue(context.data);
      //  this.orderForm.controls.setValue(context.data)
      let identreprise = localStorage.getItem('current_entreprise');

      this.orderForm = this.formBuilder.group({
        idEntreprise: identreprise,
        id: new FormControl(context.data.id),
        idProduit: new FormControl(context.data.idProduit),
        produit: new FormControl(context.data.produit),
        code: new FormControl(context.data.code),
        type: new FormControl("0"),
        designation: new FormControl(context.data.designation),
        niveau: new FormControl(context.data.niveau),
        produitNomenclatures: this.formBuilder.array([])

      });
      const produitNomenclatures = this.orderForm.get('produitNomenclatures') as FormArray;
      //    books.clearAsyncValidators()
      context.data.produitNomenclatures.forEach(b => {
        console.log(b)
        produitNomenclatures.push(this.createbin2(b))
      })

    } else if (context.etat === "edit") {

      console.log(context.data)
      this.message = "Modfier"
      let identreprise = localStorage.getItem('current_entreprise');

      this.orderForm = this.formBuilder.group({
        idEntreprise: identreprise,
        id: new FormControl(context.data.id),
        idProduit: new FormControl(context.data.idProduit),
        produit: new FormControl(context.data.produit),
        code: new FormControl(context.data.code),
        type: new FormControl("0"),

        designation: new FormControl(context.data.designation),
        niveau: new FormControl(context.data.niveau),
        produitNomenclatures: this.formBuilder.array([])

      });
      const produitNomenclatures = this.orderForm.get('produitNomenclatures') as FormArray;
      //    books.clearAsyncValidators()
      context.data.produitNomenclatures.forEach(b => {
        console.log(b)
        produitNomenclatures.push(this.createbin2(b))
      })

    }

    else {
      this.etat = "add"
      this.message = "Ajouter"
      let identreprise = localStorage.getItem('current_entreprise');
      
      this.orderForm = this.formBuilder.group({
        idEntreprise: identreprise,
        idProduit: new FormControl(),
        produit: new FormControl(),
        code: new FormControl(),
        type: new FormControl(),

        designation: new FormControl(),
        niveau: new FormControl(),
        produitNomenclatures: this.formBuilder.array([this.createItem()])

      });
    }
  }

  ngOnInit() {
    let id= localStorage.getItem('current_entreprise')
    this.produitService.getAllproduct(+id).subscribe(
      data => { this.produits = data }
    )

  }




  get formData() { return <FormArray>this.orderForm.get('produitNomenclatures'); }

  createItem(): FormGroup {

    return this.formBuilder.group({
      produit: new FormControl(),
      quantity: new FormControl(),
      niveau: new FormControl(),
      prix: new FormControl(),
      parent: new FormControl(),
      idParent: new FormControl()
    });


  }

  addItem(): void {

    this.items = this.orderForm.get('produitNomenclatures') as FormArray;


    this.items.push(this.createItem());

  }

  deleteItemLine(e, i): void {
    e.preventDefault();
    this.items = this.orderForm.get('produitNomenclatures') as FormArray;
    console.log(this.items);
    this.items.removeAt(i);
  }
  taritementParent(data: any) {

    if (data.produitNomenclatures != null) {

      data.produitNomenclatures.forEach(element => {

        if (element.parent != null) {
          element.idParent = element.parent.idProduct
        }

      });
    }

  }

  submitForm(data) {


    data.idProduit = data.produit.idProduct
    this.taritementParent(data)
    console.log(data);

    // console.log(data)


    if (this.etat === "add") {
      this.nomenclatureService.addNomenclature(data.idEntreprise, data).subscribe(
        data => {
          console.log('data')
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", " Nomenclature  est ajouter avec succéss")
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/gpao/nomenclature"]));
        },
        err => {
          if (err.error.code === "CODE_EXSITE") {
            this.showToast(NbToastStatus.DANGER, "DANGER", "    Réference           existe déja     ")
          }


          if (err.error.code === "PRODUCT_EXSITE") {
            this.showToast(NbToastStatus.DANGER, "DANGER", "     Produit           existe déja     ")

          }
        }



      )

    }

    if (this.etat === "edit") {

      console.log(data)
      this.nomenclatureService.updateNomenclature(data.idEntreprise, data).subscribe(
        data => {
          console.log('data')
          this.showToast(NbToastStatus.SUCCESS, "SUCCESS", "Nomenclature  est  Modfier avec succéss")
          this.windowRef.close();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/pages/gpao/nomenclature"]));
        },
        err => {
          if (err.error.code === "CODE_EXSITE") {
            this.showToast(NbToastStatus.DANGER, "DANGER", "    Réference           existe déja     ")
          }


          if (err.error.code === "PRODUCT_EXSITE") {
            this.showToast(NbToastStatus.DANGER, "DANGER", "     Produit           existe déja     ")

          }
        }
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
      produit: new FormControl(operation.produit),
      quantity: new FormControl(operation.quantity),
      niveau: new FormControl(operation.niveau),
      prix: new FormControl(operation.prix),
      parent: new FormControl(operation.parent),



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
