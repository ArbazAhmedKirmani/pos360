import React, { useEffect, useState } from "react";
import TableView from "../../Components/GenericComponents/TableView";
import { getAll } from "../../Services/ServiceConfig";

const columnNames = [
  {
    title: "Company",
    dataIndex: "CompanyName",
    key: "countryName",
  },
];

const Country = () => {
  const [loading, setLoading] = useState({
    tableLoading: false,
    formLoading: false,
  });
  const [rows, setRows] = useState([]);
  const [company, setCompany] = useState({
    Code: null,
    CompanyId: 3,
    CompanyLogo: null,
    CompanyName: "Demo Company",
    CountryId: 3,
    IsActive: true,
    NoOfTerminals: null,
    TotalBranches: 0,
  });

  useEffect(async () => {
    setTableLoading(true);
    await getAll("Company").then((response) => {
      if (response.statusText !== "OK") {
        return;
      }
      response.data.Data && setRows(response.data.Data);
      setTableLoading(false);
    });
  }, []);

  return (
    <TableView
      columns={columnNames} // Column Fields array of object
      rows={rows} // Data Rows array of object
      // deleteRowFunction={} // function for deleting the row
      // editRowFunction={} // function for editing the row
      // bulkCreate={} // show/hide bulk upload button
      // footerComponent={} // Space after Table
      // children={} // Space after Search Bar before Create Button
      // buttonRightFlex={} // Space to the right of the Create Button
      // searchSpace={} // Space before Search Bar
      // additionalSpace={} // Space before Table and after Create Button
      // createForm={} // Creation Form
      // updateForm={} // Updation Form
      // bulkForm={} // Bulk Creation Form
      tableSize="small" // Size of the table
      tableLoading={loading.tableLoading} // loading state of Table
      // createUpdateDrawerWidth={} // Drawer width of Create/Update Form
      // bulkCreateDrawerWidth={} // Drawer width for Bulk Create Form
      // onCreateSubmit={} // Create Form Submit Function
      // onUpdateSubmit={} // Update Form Submit Function
      // onSearchSubmit={} // Search Submit Function
      formLoading={loading.formLoading} // Form Loading state
    />
  );
};

export default Country;
