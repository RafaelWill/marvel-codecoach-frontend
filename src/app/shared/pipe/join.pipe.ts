import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {

  transform(inputArray: any[], separator: string): string {
    return inputArray.join(separator);
  }

}
