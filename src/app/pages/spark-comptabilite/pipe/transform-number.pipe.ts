import { Pipe, PipeTransform } from '@angular/core';
import { extend } from 'highcharts';
import { DecimalPipe } from '@angular/common';
 
 

@Pipe({
  name: 'transformNumber'
})
export class TransformNumberPipe     implements PipeTransform {

  transform(value: any, args?: any): any {

    // let result;
    // result = super.transform(value, args);

    //any transformations you need

  //  return result;
  return "khaled"
     
  }

}
