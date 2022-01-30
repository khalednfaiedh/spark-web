import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProspectFull } from '../../entities/full/ProspectFull';
import { UserCell } from '../../entities/cell/UserCell';
import { UserService } from '../../services/user.service';
import { PagesComponent } from '../../../pages.component';

@Component({
  selector: 'ngx-prospect-search',
  templateUrl: './prospect-search.component.html',
  styleUrls: ['./prospect-search.component.scss']
})
export class ProspectSearchComponent implements OnInit {

  @Output() searchProspect:EventEmitter<ProspectFull>=new EventEmitter();
  prospectsearch:ProspectFull;
  users:UserCell[]
  types= PagesComponent.TYPES
  constructor(private userService:UserService) { 
     // rami delete this 
    // this.userService.getUsersCells().subscribe(
    //   data => {
    //     this.users = data;
    //   },
    //   error => {
    //     console.log("error getting users list");
    //   }
    // );
  }

  ngOnInit() {
    this.prospectsearch=new ProspectFull()
    this.prospectsearch.createdBy=new UserCell()
   // this.prospectsearch.users=new User()
  }
  search(){
    console.log(this.prospectsearch);
   this.searchProspect.emit(this.prospectsearch);
   }
}
