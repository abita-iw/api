import moment from 'moment';
import { momentStrings } from '../constants/ServerConstants';

export function getNow() {
  return moment().format(momentStrings.url);
}
