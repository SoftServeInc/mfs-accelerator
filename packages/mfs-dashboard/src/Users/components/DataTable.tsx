import React from "react";

import AddDataForm from "./AddDataForm";
import GridComponent from "./GridComponent";

import { makeStyles } from "@material-ui/core";

interface Props {
  rowData: RowData[];
  createFakeRowData: (properties: TableDataProps) => void;
}

const useStyles = makeStyles({
  dataTable: {
    marginTop: "15px",
    marginBottom: "15px",
    width: "100%",
  },
});

const DataTable = ({ rowData, createFakeRowData }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.dataTable}>
      <AddDataForm createFakeRowData={createFakeRowData} />
      <GridComponent rowData={rowData} />
    </div>
  );
};

export default DataTable;
