import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';
import { ProspectService } from '../../services/prospect.service';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-delete-prospect',
  templateUrl: './delete-prospect.component.html',
  styleUrls: ['./delete-prospect.component.scss']
})
export class DeleteProspectComponent implements OnInit {

  prospectToDelete;
  constructor(@Inject(NB_WINDOW_CONTEXT) context,
  private router: Router,
  private prospectService:ProspectService,private  nbWindowRef: NbWindowRef) {
  this.prospectToDelete=context.text ;  localStorage.setItem("delDeal","0")
   }

   deleteConfirmed(){  
     console.log("auto trigger?")
    
      this.prospectService.deleteProspect( this.prospectToDelete.prospectID).subscribe(
        (val) => {
            console.log("DELETE call successful value returned in body", 
                        val);
             this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
             this.router.navigate(["/pages/crm/prospects"]));
        },
        response => {
            console.log("DELETE call in error", response);
        },
        () => {
            console.log("The DELETE observable is now completed.");
    });;
      this.nbWindowRef.close()

     
      
   }
   deleteDenied(){
    this.nbWindowRef.close()

   }

  ngOnInit() {

  }

}
