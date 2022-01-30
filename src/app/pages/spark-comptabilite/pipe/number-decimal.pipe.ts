// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'transformeNumber'tr
// })
// export class transformeNumberPipe implements PipeTransform {

//   transform(value:string):string {
 
    
//     //  var i=value.toString().indexOf('.')
//     //  console.log(i)
//     if(value !== null)
//     {
   
//     var entier = this.getPartiEntier(value.toString());
//     var x=entier.indexOf('-') 
//     if(x === 0)
//     {
//     entier=  entier.slice(1,entier.length);
//     }
    
    
//     var decimal= this.getPartiDecimale(value.toString());
//        entier=this.reglagFormat(entier);
//        decimal= this.reglagFormat(decimal);
//        var str=entier +","+decimal;

//        if(x ===0)
//        {
//          str="-"+str;
//        }
//     return  str;
//     }else
//     {
//       return null
//     }

    
//   }



//   getPartiEntier(str:string)
//   { var str2=""
//    var i=str.indexOf('.')
//    if(i === -1)
//    {
//      return str
//    }

//     for(var j=0;j<i;j++)
//     {
//       if(str.charAt(j) !=="-" )
//       str2+=str.charAt(j);
//     }
//  return str2;
//   }

//   getPartiDecimale(str:string)
//   { var str2="";
//    var x=str.indexOf('.')

//    if(x === -1 )
//    {
//      str2="000";
//      return str2;
//    }
  
//     for(var i=0;i<str.length;i++)
//     {
//       if(i>x)
//       {
//       str2+=str.charAt(i);
//       }
//     }
//  return str2;
//   }

//   reglagFormat(str:string)
//   {
//     var res=""
//     var rest = str.length % 3
//     if(rest === 2)
//     {
//        res=  "0"+str;
//     }
//     else
//     if(rest === 1)
//     {
//     res ="00"+str
//     }
//     else
//     if(rest === 0)
//     {
//       res = str
//     }
    
//    var strSortie=""
//    for(var i=0;i<res.length;i++)
//    {
//     if(i !=0 && i % 3 === 0)
//     {
//       strSortie+=" "
//     }
//     strSortie+=res.charAt(i);
   
//    }

//    return  strSortie;
//   }

// }
