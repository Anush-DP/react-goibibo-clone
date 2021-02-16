import Axios from "axios";

export default Axios.create({
  baseURL:
    "https://voyager.goibibo.com/api/v1/flights_search/find_node_by_name_v2/?limit=10&search_query=",
});
