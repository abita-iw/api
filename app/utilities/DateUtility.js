import moment from 'moment';
import ServerConstants from '../constants/ServerConstants';

let DateUtility = {
  getNow: function() {
    return moment().format(ServerConstants.momentStrings.url);
  }
};

export default DateUtility;
