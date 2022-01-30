import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserCell } from '../entities/cell/UserCell';
import { Observable } from 'rxjs';
import { PagesComponent } from '../../pages.component';
import { Authorities } from '../../../authorisation/authorities';


const httpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersUrl:string=PagesComponent.URl+'/users';

  
  constructor(private http:HttpClient) { }
  // getUsersCells():Observable<UserCell[]>{
    
  //   console.log("in the prospect")
  //   console.log( this.http.get<UserCell>(this.usersUrl+'/cells'))
  //   return this.http.get<UserCell[]>(this.usersUrl+'/cells');
  //  } 
   getCurrentUserCell():UserCell{
    let user:UserCell=new UserCell();
    user.userName =  Authorities.getUserInfo().user_name
    user.userID = Authorities.getUserInfo().user.id
    return user
   }
}
