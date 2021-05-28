import {CoachingTopic} from './coaching-topic';

export interface Person {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  coachingTopics: Array<CoachingTopic>;
  roles: string[];
}
