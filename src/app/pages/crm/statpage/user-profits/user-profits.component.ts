import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserCell } from '../../entities/cell/UserCell';
import { LeadList } from '../../entities/row/LeadList';
import { LeadService } from '../../services/lead.service';

@Component({
  selector: 'ngx-user-profits',
  templateUrl: './user-profits.component.html',
  styleUrls: ['./user-profits.component.scss']
})
export class UserProfitsComponent implements OnInit {
  users:UserCell[]
  leads:LeadList[]
  divided_leads=[]
  result=[
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    }
  ]
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'User';
  showYAxisLabel = true;
  yAxisLabel = 'Profits';

  colorScheme = {
    domain: [ '#AAAAAA', '#C7B42C','#5AA454', '#A10A28']
  };
  constructor(private userService:UserService,
    private leadService:LeadService,
    ) {
      console.log("yes hello?")

     }

  ngOnInit() {
    console.log("yes hello?")
    this.result=[]
    // rami delete this
      // this.userService.getUsersCells().subscribe(
      //   data => {
      //     this.users = data;
      //     this.leadService.getLeadsTable().subscribe(
      //       data => { this.leads=data;
      //         this.divided_leads=[]
      //         for(let i=0;i<this.users.length;i++){
      //           this.divided_leads.push({
      //           id:this.users[i].userName,
      //           //actions:this.leads.filter(x=>x.users!=null).filter(lead=>lead.users[0].userID==this.users[i].userID)
      //           actions:this.leads.filter(x=>x.users!=null).filter(lead=>lead.users.filter(user=>user.userID==this.users[i].userID))
      //         })
      //       }
      //       console.log("the leads",this.divided_leads)
      //       for(let i=0;i<this.divided_leads.length;i++){
      //         this.result.push({
      //           "name": this.divided_leads[i].id,
      //           "value":this.divided_leads[i].actions.reduce((acc, lead)=>acc+lead.leadValue, 0)
      //         })
      //       }
      //       console.log("received chart",this.result)
      //       Object.assign(this.result)
      //       this.result=[...this.result]
      //       },
      //     error => { console.log("error"); }); 
      //   },
      //   error => {
      //     console.log("error getting users list");
      //   }
      // );
   
     }
}
