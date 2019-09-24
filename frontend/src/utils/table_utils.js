import moment from 'moment';

export const debounce = (func, wait) => {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      func.apply(context, args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (!timeout) func.apply(context, args);
  };
};

export const parseTabelCellText = (head, text) => {
  switch(head) {
    case 'appointment_time':
      return moment(text).format('MM / DD / YYYY  hh:mm A');
    default: 
      return text;
  }
};