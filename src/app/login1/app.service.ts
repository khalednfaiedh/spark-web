import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cookie } from "ng2-cookies";
@Injectable()
export class AppService {
  constructor(
    private _router: Router, private _http: HttpClient) { }
  obtainAccessToken(authenticationRequest) {
    let cliendUsername = "OAuth2WebUser";
    let cliendPassword = "secret";
                   
   //  let authUrl = "http://176.31.225.231:8433/uaa/oauth/token"; 
      let authUrl = "http://localhost:8433/uaa/oauth/token";
                     
    let headers = new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Basic ' + btoa(cliendUsername + ":" + cliendPassword) });
    this._http.post(authUrl, authenticationRequest, { headers })
      .subscribe(
        data => {
          this.saveToken(data);
        },
        err => { alert('Invalide login ou mot de passe') }
      );
  }

  saveToken(token) {
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem("access_token", token.access_token);
  //  Cookie.set("access_token", token.access_token, expireDate);
    this._router.navigate(['/pages/admin/entreprise']);
  }

  constructSecurityHeader(): HttpHeaders {
    //return new HttpHeaders({ 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + Cookie.get('access_token') });
    return new HttpHeaders({ 'Accept': 'application/json', 'Content-type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + localStorage.getItem('access_token') });

  }

  getAuthorizationToken(): string {
    //return "Bearer " + Cookie.get('access_token');
    return "Bearer " + localStorage.getItem('access_token');
  }

  checkCredentials() {
    // if (!Cookie.check('access_token')) {
    //   this._router.navigate(['/login']);
    // }
    if (!localStorage.check('access_token')) {
      this._router.navigate(['/login']);
    }
  }

  logout() {
    //Cookie.delete('access_token');
    localStorage.getItem('access_token');
    this._router.navigate(['/login']);
  }
}