import { Component, OnInit } from '@angular/core';
import {EmployeListService} from '../employe-list.service';
import {EmployeListModel} from '../employe-list.model';

@Component({
  selector: 'ngx-show-employe',
  templateUrl: './show-employe.component.html',
  styleUrls: ['./show-employe.component.scss']
})
export class ShowEmployeComponent implements OnInit {
  employe: EmployeListModel;
  constructor(private service: EmployeListService) { }

  ngOnInit() {
    this.employe = new EmployeListModel();
    let matricule = localStorage.getItem('matriculeEmploye');
    this.service.getEmployesById(+matricule).subscribe(
      data => { this.employe = data;  },
      error => {},
    );
  }

}
