import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private _router: Router,
            ) { }

  ngOnInit() {
    localStorage.removeItem('access_token');
    localStorage.clear();

// this._router.navigateByUrl('/',{skipLocationChange: true}).then(()=>
// this._router.navigate(['/auth/login']));
    window.location.reload();
    this._router.navigate(['auth/login']);
   
  
    
  }

}
