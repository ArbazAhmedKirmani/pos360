import { showLinkedMessage } from "../Components/Messages";
import {
  getAll,
  getByQueryString,
  postRecord,
  putRecord,
} from "./ServiceConfig";

export const getAllData = (url, toggle) => {
  return new Promise(async (resolve, reject) => {
    await getAll(url).then(
      (success) => {
        console.log(success);
        toggle();
        resolve(success.data.Data);
      },
      (error) => {
        toggle();
        reject(error);
      }
    );
  });
};

export const createData = (url, data, toggle) => {
  data.IsActive = true;
  let dataObject = { Data: [data] };
  return new Promise(async (resolve, reject) => {
    await postRecord(url, dataObject).then(
      (response) => {
        toggle();
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
  data.IsActive = true;
  let dataObject = { Data: [data] };
  return new Promise(async (resolve, reject) => {
    await putRecord(url, dataObject).then(
      (response) => {
        toggle();
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

export const deleteData = (url, data, toggle) => {
  data.IsActive = false;
  let dataObject = { Data: [data] };
  return new Promise(async (resolve, reject) => {
    await putRecord(url, dataObject).then(
      (response) => {
        toggle();
        resolve(response.data);
        showLinkedMessage("success", "Deleted Successfully");
      },
      (error) => {
        toggle();
        reject(error);
      }
    );
  });
};

export const getSearchedData = (string) => {
  return getByQueryString(string);
};
