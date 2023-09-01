import moment from 'moment';

export const longDate = date => {
  return (
    moment(date).format('DD/MM/YYYY') + ' à ' + moment(date).format('HH:mm')
  );
};
