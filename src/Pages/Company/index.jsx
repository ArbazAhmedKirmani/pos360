import React, { Fragment, useEffect, useState } from "react";
import DropUploadFilePicker from "../../Components/BasicComponents/DropUploadFilePicker";
import FormTextField from "../../Components/BasicComponents/FormTextField";
import TableView from "../../Components/GenericComponents/TableView";
import { getAll } from "../../Services/ServiceConfig";

const columnNames = [
  {
    title: "Company",
    dataIndex: "CompanyName",
    key: "countryName",
  },
];

const Company = () => {
  const [loading, setLoading] = useState({
    tableLoading: false,
    formLoading: false,
  });
  const [rows, setRows] = useState([]);
  const [company, setCompany] = useState({
    Code: null,
    CompanyId: null,
    CompanyLogo: null,
    CompanyName: "",
    CountryId: null,
    IsActive: true,
    NoOfTerminals: 0,
    TotalBranches: 0,
  });

  const toggleLoading = (type, value) => {
    switch (type) {
      case "table":
        setLoading({ ...loading, tableLoading: value });
        break;
      case "form":
        setLoading({ ...loading, formLoading: value });
        break;
      default:
        break;
    }
  };

  const handleUpdate = (record) => {
    setCompany(record);
    console.log(company);
  };

  const deleteRecord = (record) => {
    toggleLoading("list", true);
    record.IsActive = false;
    deleteRecord("Company", record).then((response) => {
      if (response.statusText !== "OK") {
        return;
      }
      getLatestRecord();
    });
  };

  const getLatestRecord = async () => {
    await getAll("Company").then((response) => {
      if (response.statusText !== "OK") {
        toggleLoading("table", false);
        return;
      }
      response.data.Data && setRows(response.data.Data);
      toggleLoading("table", false);
    });
  };

  useEffect(() => {
    toggleLoading("table", true);
    getLatestRecord();
  }, []);

  const handleInputChange = (input) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleCreateSubmit = () => {
    setLoading(true);
  };

  const resetState = () => {
    setCompany({});
  };

  const SearchSpace = <Fragment></Fragment>;

  const createForm = (
    <Fragment>
      <FormTextField
        label="Company Name"
        name="CompanyName"
        placeholder="ABC Company"
        span={10}
        value={company.CompanyName}
        onChange={handleInputChange}
        required={true}
      />
      <FormTextField
        label="Total Branches"
        name="TotalBranches"
        placeholder="4"
        span={7}
        value={company.TotalBranches}
        onChange={handleInputChange}
        required={true}
      />
      <FormTextField
        label="No. of Terminal"
        name="NoOfTerminals"
        span={7}
        type="number"
        placeholder="Quantity"
        value={company.NoOfTerminals}
        onChange={handleInputChange}
        required={true}
      />
      <DropUploadFilePicker span={4} />
    </Fragment>
  );

  const updateForm = (
    <Fragment>
      <FormTextField
        label="Code"
        name="Code"
        placeholder="0000"
        span={5}
        value={company.Code}
        onChange={handleInputChange}
        disabled
      />
      <FormTextField
        label="Company Name"
        name="CompanyName"
        placeholder="ABC Company"
        span={10}
        value={company.CompanyName}
        onChange={handleInputChange}
        required={true}
      />
      <FormTextField
        label="Total Branches"
        name="TotalBranches"
        placeholder="4"
        span={7}
        value={company.TotalBranches}
        onChange={handleInputChange}
        required={true}
      />
      <FormTextField
        label="No. of Terminal"
        name="NoOfTerminals"
        span={7}
        type="number"
        placeholder="Quantity"
        value={company.NoOfTerminals}
        onChange={handleInputChange}
        required={true}
      />
      <DropUploadFilePicker span={4} />
    </Fragment>
  );

  return (
    <TableView
      columns={columnNames} // Column Fields array of object
      rows={rows} // Data Rows array of object
      deleteRowFunction={deleteRecord} // function for deleting the row
      editRowFunction={handleUpdate} // function for editing the row
      // bulkCreate={} // show/hide bulk upload button
      // footerComponent={} // Space after Table
      // children={} // Space after Search Bar before Create Button
      // buttonRightFlex={} // Space to the right of the Create Button
      searchSpace={SearchSpace} // Space before Search Bar
      // additionalSpace={} // Space before Table and after Create Button
      createForm={createForm} // Creation Form
      updateForm={updateForm} // Updation Form
      // bulkForm={} // Bulk Creation Form
      tableSize="small" // Size of the table
      tableLoading={loading.tableLoading} // loading state of Table
      createUpdateDrawerWidth="40vw" // Drawer width of Create/Update Form
      // bulkCreateDrawerWidth={} // Drawer width for Bulk Create Form
      onCreateSubmit={handleCreateSubmit} // Create Form Submit Function
      // onUpdateSubmit={} // Update Form Submit Function
      // onSearchSubmit={} // Search Submit Function
      formLoading={loading.formLoading} // Form Loading state
      resetState={resetState}
    />
  );
};

export default Company;
