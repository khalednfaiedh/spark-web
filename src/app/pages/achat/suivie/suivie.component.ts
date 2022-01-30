import { ShowBonCommandeComponent } from './../bon-commande/show-bon-commande/show-bon-commande.component';
import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop/';
import { NbWindowService } from '@nebular/theme';
import { BonCommandeService } from '../bon-commande/services/bon-commande.service';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'ngx-suivie',
  templateUrl: './suivie.component.html',
  styleUrls: ['./suivie.component.scss']
})
export class SuivieComponent implements OnInit  {
  public static urlSuivie= "/pages/achat/suivie";
  commande: any[]=[]
  confirmer : any []=[]
  annuler : any []=[]
  constructor(private service: BonCommandeService,
    private windowService: NbWindowService){

  }
  ngOnInit() {
    
    this.service.getAllBonCommande().subscribe(
      data => {
        this.confirmer=data
      })
  }
  openCommande(id){
      localStorage.removeItem('e');
      localStorage.removeItem('idRC');
      localStorage.setItem('idRC', id);
      this.windowService.open(ShowBonCommandeComponent,
        {title: 'Afficher Bon Commande',context: {id:id}});
  }
  // todo = [
  //   'Get to work',
  //   'Pick up groceries',
  //   'Go home',
  //   'Fall asleep'
  // ];

  

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(this.confirmer)
      console.log(this.annuler)

    } else {
      
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      console.log(this.confirmer)
      console.log(this.annuler)
    }
  }
}


