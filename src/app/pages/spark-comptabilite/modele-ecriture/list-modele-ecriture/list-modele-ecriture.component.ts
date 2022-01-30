import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { ModeleEcritureService } from '../modele-ecriture.service';
import { ModeleEcritureComponent } from '../modele-ecriture.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-list-modele-ecriture',
  templateUrl: './list-modele-ecriture.component.html',
  styleUrls: ['./list-modele-ecriture.component.scss']
})
export class ListModeleEcritureComponent implements OnInit {
source=[]
  exerciceBoolean: boolean;
  constructor(private windowService: NbWindowService,
    private modeleEcritureService:ModeleEcritureService,
    private router: Router) { }

  ngOnInit() {

    let idExercice= localStorage.getItem('idExercice');

    if( idExercice == null)
    {
      this.exerciceBoolean =true;
    }
    else
    {
      this.exerciceBoolean=false;
    }
    this.modeleEcritureService.getAllModelEcriture().subscribe(

      data=>{this.source=data},
      error=>{console.log("error")}
    )
  }


  settings = {
    actions :{
        position: 'right',
        custom: [
          {
            name: 'showAction',
            title: '<i class="nb-sunny" title="Show"></i>',
          },
          {
            name: 'editAction',
            title: '<i class="nb-edit" title="Edit"></i>',
    
          },
          // {
          //   name: 'deleteAction',
          //   title: '<i class="nb-trash" title="Delete"></i>',
          // }, 
        ],
          add: false,
          edit: false,
    },
        add: {
          addButtonContent: '<i class="nb-plus"></i>',
          createButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
        },
        edit: {
          editButtonContent: '<i class="nb-edit"></i>',
          saveButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
          deleteButtonContent: '<i class="nb-trash"></i>',
          confirmDelete: true,
        },
        columns: {
           intitule:{
            title: '  Intitule',
            type: 'string'
          },
           type:{
            title: 'Type  ',
            type: 'string',
          },
         
        
        
        //  exercice: {
        //   title: 'Exercices',
        //   type: 'custom',
          
        //   renderComponent: ButtonViewComponent
        //  }
      
        },
      };

      previousState() {
        window.history.back();
    }
    
      addModele(){
          localStorage.setItem("e","0");
          this.router.navigate(['/pages/comptabilite/modeleEcriture']);
        }

        onDeleteConfirm(event):void {
          if (window.confirm(`Vous êtes sûre de vouloir supprimer ce  modele?`)) {
            
            event.confirm.resolve(this.modeleEcritureService.deleteById(event.data.id).subscribe(
              data => {this.source.filter(p => p !== event.data);},
              error => {console.log(error);})
            );
          } else {
            event.confirm.reject();
          }
        }    
        onCustom(event): any {
          if (event.action === 'editAction') {
            console.log(event.data.id);
            localStorage.setItem("e", "1");
            localStorage.setItem('idModele',event.data.id.toString());
            //this.windowService.open(ModeleEcritureComponent, {title: 'Modifier  MOdele Saisie', context: event.data.id});
            this.router.navigate(['/pages/comptabilite/modeleEcriture']);
          }
          if (event.action === 'showAction') {
            localStorage.setItem("e", "3");
            localStorage.setItem('idModele',event.data.id.toString());
            this.router.navigate(['/pages/comptabilite/modeleEcriture']);
          //  this.windowService.open( ShowEntrepriseComponent, {title: 'Afficher Dossier', context: event.data.id});
          }
        }

}
