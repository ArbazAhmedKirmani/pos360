import React from "react";
import TableView from "../../Components/GenericComponents/TableView";

const columnNames = [
  {
    title: "Country",
    dataIndex: "countryName",
    key: "countryName",
  },
];

const Country = () => {
  return <TableView columns={columnNames} bulkForm={true} />;
};

export default Country;
