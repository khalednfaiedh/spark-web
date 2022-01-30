
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActionService } from '../../services/action.service';
import { NbWindowRef } from '@nebular/theme';
import { NB_WINDOW_CONTEXT } from '@nebular/theme/components/window/window.options';

@Component({
  selector: 'ngx-confirm-delete-action',
  templateUrl: './confirm-delete-action.component.html',
  styleUrls: ['./confirm-delete-action.component.scss']
})
export class ConfirmDeleteActionComponent implements OnInit {
  ngOnInit() {
  }

  actionToDelete;
  constructor(@Inject(NB_WINDOW_CONTEXT) context,
  private router: Router,
  private actionService:ActionService,private  nbWindowRef: NbWindowRef) {
  this.actionToDelete=context.text ; 
   }

   deleteConfirmed(){  

      this.actionService.deleteAction( this.actionToDelete.actionID).subscribe(
        (val) => {
            console.log("DELETE call successful value returned in body", 
                        val);
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
            this.router.navigate(["/pages/actions"]));
        },
        response => {
            console.log("DELETE call in error", response);
        },
        () => {
            console.log("The DELETE observable is now completed.");
    });
      ;
      this.nbWindowRef.close()
 
     
      
   }
   deleteDenied(){
    this.nbWindowRef.close()

   }
}

