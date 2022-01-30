import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { AuthenticationRequest } from '../login/AuthenticationRequest';

@Component({
  selector: 'ngx-login1',
  providers: [AppService], 
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.scss']
})
export class Login1Component {
  public authentification: AuthenticationRequest = new AuthenticationRequest();
  loading = false
  constructor(private _service:AppService) {}

  login() {
      this._service.obtainAccessToken(this.authentification);
      this.loading = true;
      setTimeout(() => this.loading = false, 3000);
    }
}