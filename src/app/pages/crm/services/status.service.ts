import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  status:string[]= ["New","almost Done","reunion"]
  constructor() { }
  getStatus(){return this.status}
}
