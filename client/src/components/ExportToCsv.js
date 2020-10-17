import React from 'react';
import { connect } from 'react-redux';
import { CSVLink } from "react-csv";

const headers = [
  { label: "Name", key: "name" },
  { label: "Price", key: "price" },
  { label: "Description", key: "description" }
];

const ExportToCsv = ({ notes })=> {
    return (
      <CSVLink data={notes} headers={headers}>
        <h5>Export to CSV</h5>
      </CSVLink>
    );
}

const mapStateToProps = state => ({
    loading: state.loading,
    notes: state.notes
});

export default connect(mapStateToProps, null) (ExportToCsv);