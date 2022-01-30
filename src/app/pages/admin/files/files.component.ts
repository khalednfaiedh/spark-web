import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  public static urlFile= "/pages/admin/file"
  constructor() { }

  ngOnInit() {
  }

}
