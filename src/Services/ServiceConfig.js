import axios from "axios";

let store;
export const reduxStoreInNonFunctionalFile = (_store) => {
  store = _store;
};

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL; //"http://18.223.23.61:5005/";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.timeout = 60000;

axios.interceptors.request.use((request) => {
  const appData = store.getState().AppReducer;
  // add auth header with jwt if account is logged in and request is to the api url
  const token = localStorage.getItem("posToken");
  const isApiUrl = request.url.startsWith(process.env.REACT_APP_API_URL);

  if (token && isApiUrl) {
    request.headers.common.Authorization = `Bearer ${account}`;
    request.data = JSON.stringify({
      ...request.data,
      CompanyID: appData.companyId,
      UserID: appData.userId,
    });
  }

  return request;
});

/**
 * this method helps to access authentication path from server
 * @param {string} url URL which you eant to access
 * @param {object} data your data object
 * @returns
 */
export const authRoute = (data) => {
  return axios.post(`login`, data);
};

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
export const getMany = async (
  url,
  top,
  skip,
  orderBy,
  direction,
  query,
  populateFields
) => {
  if (!top) top = 20;
  if (!skip) skip = 0;
  if (!orderBy) orderBy = "createdBy";
  if (!direction) direction = -1;
  let customeUrl = `api/v1/${url}?top=${top}&skip=${skip}&orderBy=${orderBy}&direction=${direction}`;
  if (populateFields) customeUrl += `&populate=${populateFields}`;
  if (query) customeUrl += `&${query}`;

  const response = await axios.get(customeUrl);
  return response;
};

/**
 * through this function you can get data for any specific ID
 * @param {string} url
 * @param {string} id
 * @param {string} populateFields
 */
export const getByID = async (url, id, populateFields) => {
  let customeUrl = `api/${process.env.VERSION}/${url}/${id}`;
  if (populateFields) customeUrl += `?populate=${populateFields}`;
  return axios.get(customeUrl);
};

/**
 * this function helps you POST a single entry
 * @param {string} queryString Request Url String
 * @param {object} data Data Object
 * @returns
 */
export const postSingle = async (queryString, data) => {
  let customeUrl = `api/${process.env.VERSION}/${queryString}`;
  return axios.post(customeUrl, data);
};

export const getByQueryString = async (queryString, populateFields, sort) => {
  let customerUrl = `api/${process.env.VERSION}/${queryString}`;
  if (populateFields) customerUrl += `?populate=${populateFields}`;
  if (sort) customerUrl += populateFields ? `&sort=${sort}` : `?sort=${sort}`;
  return await axios.get(customerUrl);
};
