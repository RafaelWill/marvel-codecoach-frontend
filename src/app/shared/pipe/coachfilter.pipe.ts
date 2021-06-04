import { Pipe, PipeTransform } from '@angular/core';
import {Person} from '../model/person';

@Pipe({
  name: 'coachfilter'
})
export class CoachfilterPipe implements PipeTransform {
  private readonly minLengthToSearch = 3;
  transform(coachList: Array<Person>, searchText: string, item: string[]): Array<Person> {
    let tempList: Array<Person> = [];

    if (item.length === 0 && searchText.length <= 2) {
      tempList = coachList;
    } else if (item.length === 0 && searchText.length > 2) {
      coachList.forEach(coach => {
        if (this.searchContainsText(coach, searchText.toLowerCase())) {
          tempList.push(coach);
        }
      });
    } else if (item.length >= 1) {
      coachList.forEach(coach => {
        const filteredTopic = coach.coachingTopics.filter(x => item.some(y => x.topic.toLowerCase() === y));
        if (filteredTopic.length > 0) {
          if (searchText.length >= this.minLengthToSearch) {
            if (this.searchContainsText(coach, searchText.toLowerCase())) {
              tempList.push(coach);
            }
          } else {
            tempList.push(coach);
          }
        }
      });
    }
    return tempList;
  }

  private searchContainsText(coach: Person, text: string): boolean {
    return coach.firstName.toLowerCase().includes(text) || coach.lastName.toLowerCase().includes(text) || coach.email.toLowerCase().includes(text) || coach.firstName.concat(' ', coach.lastName).toLowerCase().includes(text);
  }

}
