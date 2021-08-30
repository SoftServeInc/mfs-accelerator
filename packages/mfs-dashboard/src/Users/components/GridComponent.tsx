import React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const defaultColDef = {
  maxWidth: 150,
  resizable: true,
};

const GridComponent = ({ rowData }) => {
  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: 750,
        width: "100%",
      }}
    >
      <AgGridReact rowData={rowData} defaultColDef={defaultColDef}>
        {Object.keys(rowData[0]).map((field) => (
          <AgGridColumn key={field} field={field} />
        ))}
      </AgGridReact>
    </div>
  );
};

export default GridComponent;
