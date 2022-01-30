/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import { AuthenticationRequest } from './AuthenticationRequest';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent implements OnInit{
  ngOnInit(): void {
    this.user = new AuthenticationRequest();
  }
  user: AuthenticationRequest;

}
