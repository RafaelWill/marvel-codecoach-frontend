import { Pipe, PipeTransform } from '@angular/core';
import {Person} from '../model/person';
import {CoachingTopic} from '../model/coaching-topic';

@Pipe({
  name: 'jointopic'
})
export class JointopicPipe implements PipeTransform {

  transform(inputArray: CoachingTopic[], separator: string): string {
    const t = inputArray.map(x => x.topic);
    return t.join(separator);
  }

}
