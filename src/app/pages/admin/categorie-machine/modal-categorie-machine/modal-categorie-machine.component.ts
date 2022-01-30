import { Component, OnInit } from '@angular/core';
import { CategorieMachineService } from '../categorie-machine.service';
import { CategorieMachineModel } from '../categorie-machine.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NbWindowRef, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';

@Component({
  selector: 'ngx-modal-categorie-machine',
  templateUrl: './modal-categorie-machine.component.html',
  styleUrls: ['./modal-categorie-machine.component.scss']
})
export class ModalCategorieMachineComponent implements OnInit {

  categorie: CategorieMachineModel;
  categories: CategorieMachineModel[];
  A: string;
    constructor(private service: CategorieMachineService, public windowRef: NbWindowRef,
       private router: Router, private translate: TranslateService,
       private toastrService: NbToastrService) { }
  
    ngOnInit() {
      this.categorie =new CategorieMachineModel();
      let id= localStorage.getItem('current_entreprise')
      this.service.getAllCategorieMByEntreoriseId (+id).subscribe(data=>{
        this.categories = data;
      },
      error=>{console.log("error");});
      let e = localStorage.getItem("e");
      if(e === "0"){
        this.A = this.translate.instant('all.ajout');
      }
      if(e === "1"){
        this.A = this.translate.instant('all.modif');
        let idC = localStorage.getItem("idCategorie")
        this.service.getCategorieMById(+idC).subscribe(data=>{
          this.categorie = data;
        },
        error=>{
          console.log("error");
        })
      }
    }

    private showToast(type: NbToastStatus, title: string, body: string) {
      const config = {
        status: type,
        destroyByClick: true,
        duration: 2000,
        hasIcon: true,
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        preventDuplicates: false
      };
      const titleContent = title ? ` ${title}` : "";
      this.toastrService.show(body, `${titleContent}`, config);
    }

    onAdd() {
      let id= localStorage.getItem('current_entreprise')
      let e = localStorage.getItem('e');
      if (e === '0') {
        this.service.addCategorieM(+id,this.categorie)
          .subscribe(data => {
              localStorage.removeItem('e');
              localStorage.removeItem('idCategorie');
              this.windowRef.close();
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
                this.router.navigate(["/pages/admin/categorieMachine"]));
                this.showToast(NbToastStatus.SUCCESS,this.translate.instant('toast.success'),this.translate.instant('toast.ajout'));
              },
              error => {
                console.log('error');
              });
      }
      if (e === '1') {
        this.service.updateCategorieM(+id,this.categorie).subscribe(
          data => {
          localStorage.removeItem('e');
          localStorage.removeItem('idCategorie');
          this.windowRef.close();
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(["/pages/admin/categorieMachine"]));
            this.showToast(NbToastStatus.SUCCESS,this.translate.instant('toast.success'),this.translate.instant('toast.modif'));
          },
          error => {
            console.log('error');
          });
      }
    }
 
    close(){
this.windowRef.close();
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate(["/pages/admin/categorieMachine"]));
 }
}
