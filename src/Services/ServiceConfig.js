import axios from "axios";

axios.defaults.baseURL = "http://localhost:4520/"; //process.env.BASE_URL;
// axios.defaults.headers.common[
//   "Authorization"
// ] = `Bearer  ${sessionStorage.getItem("Token360")};`;
// "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNjFkMDFiZmVmODYxMDAwMGM4MDAwNTM0IiwidXNlcm5hbWUiOiJzdWZpIiwiZGJOYW1lIjoiMzYwU29sdXRpb24ifSwiaWF0IjoxNjQxMDI4NjYyLCJleHAiOjE2NDExMTUwNjJ9.FK16maL_q_qzJNyKXmKxcBsai12ma0HBCHKIfB-p8mk";
// sessionStorage.getItem("Token");
axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.timeout = 60000;

/**
 * for making https:// request which includes
 * GET, POST, PUT DELETE
 */
class ServiceConfig {
  /**
   * this method helps to access authentication path from server
   * @param {string} url URL which you eant to access
   * @param {object} data your data object
   * @returns
   */
  authRoute(url, data) {
    return axios.post(`auth/${url}`, data);
  }

  /**
   *
   * @param {string} url URL which you eant to access
   * @param {number} top number of rows to get in result
   * @param {number} skip number of rows to skip in result
   * @param {string} orderBy field's name from which you want to order data
   * @param {number} direction direction for asc(1) and desc(-1)
   * @param {string} query query parameter to send object id or any othe data to with URL
   * @param {string} populateFields populate the field from the result
   * @returns
   */
  async getMany(url, top, skip, orderBy, direction, query, populateFields) {
    if (!top) top = 20;
    if (!skip) skip = 0;
    if (!orderBy) orderBy = "createdBy";
    if (!direction) direction = -1;
    let customeUrl = `api/v1/${url}?top=${top}&skip=${skip}&orderBy=${orderBy}&direction=${direction}`;

    if (populateFields) customeUrl += `&populate=${populateFields}`;
    if (query) customeUrl += `&${query}`;

    const response = await axios.get(customeUrl);
    return response;
  }

  /**
   * through this function you can get data for any specific ID
   * @param {string} url
   * @param {string} id
   * @param {string} populateFields
   */
  getByID(url, id, populateFields) {
    let customeUrl = `api/${process.env.VERSION}/${url}/${id}`;
    if (populateFields) customeUrl += `?populate=${populateFields}`;
    return axios.get(customeUrl);
  }

  /**
   * this function helps you POST a single entry
   * @param {string} url Request Url String
   * @param {object} data Data Object
   * @returns
   */
  postSingle(url, data) {
    let customeUrl = `api/${process.env.VERSION}/${url}`;
    return axios.post(customeUrl, data);
  }
}

export default ServiceConfig;
