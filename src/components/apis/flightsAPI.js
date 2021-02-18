import Axios from "axios";

export default Axios.create({
  baseURL:
    "https://thor.goibibo.com/v2/thor/rest/flight/search/?application=fbs&flavour=v2&mime=json&script=n&slotfl=y1&nearbyfl=y1&actionData=",
});
