import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameCompte'
})
export class NameComptePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value === null)
    {
      return "";
    }
  }

}
