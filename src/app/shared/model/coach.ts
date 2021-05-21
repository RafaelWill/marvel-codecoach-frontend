import {Person} from './person';
import {CoachingTopic} from './coaching-topic';

export interface Coach extends Person{
  coachingTopics: CoachingTopic[];
}
