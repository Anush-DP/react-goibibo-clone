import Axios from 'axios';

export const flightLogoURL =
  'https://goibibo.ibcdn.com/images/v2/carrierImages/';

export default Axios.create({
  baseURL: flightLogoURL,
});
