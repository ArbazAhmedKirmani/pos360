import { showLinkedMessage } from "../Components/Messages";
import {
  getAll,
  getByQueryString,
  postRecord,
  putRecord,
} from "./ServiceConfig";

export const getAllData = (url) => {
  return new Promise(async (resolve, reject) => {
    await getAll(url).then(
      (success) => {
        resolve(success.data.Data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const createData = (url, data, toggle) => {
  let dataObject = { Data: [data] };
  return new Promise(async (resolve, reject) => {
    await postRecord(url, dataObject).then(
      (response) => {
        resolve(response.data);
        showLinkedMessage("success", "Document Successfully Created");
      },
      (error) => {
        toggle();
        reject(error);
      }
    );
  });
};

export const updateData = (url, data, toggle) => {
  let dataObject = { Data: [data] };
  return new Promise(async (resolve, reject) => {
    await putRecord(url, dataObject).then(
      (response) => {
        resolve(response.data);
        showLinkedMessage("success", "Document Updated Successfully");
      },
      (error) => {
        toggle();
        reject(error);
      }
    );
  });
};

export const deleteData = (url, data) => {
  data.IsActive = false;
  let dataObject = { Data: [data] };
  return new Promise(async (resolve, reject) => {
    await putRecord(url, dataObject).then(
      (response) => {
        resolve(response.data);
        showLinkedMessage("success", "Deleted Successfully");
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const getSearchedData = (string) => {
  return getByQueryString(string);
};
