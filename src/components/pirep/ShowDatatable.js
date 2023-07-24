
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

export default function ShowDatatable(props) {
    const reportData = props.reportData;

    const dbColumns = [
        {
            dataField: "__id",
            text: "ID",
            sort: true
        },
        {
            dataField: "rawText",
            text: "Raw Text",
            sort: true
        },
        {
            dataField: "aircraftRef",
            text: "AirCraft ref",
            sort: true
        },
        {
            dataField: "observationTime",
            text: "Observation Time",
            sort: true
        }
    ];


    return (
        <div className='feature-area pt-120 pb-50'>
            <div className="container">
                <div className="row">
                    <BootstrapTable
                        keyField="__id"
                        data={reportData}
                        columns={dbColumns}
                        hover
                        condensed
                        pagination={paginationFactory()}
                        filter={filterFactory()}
                    />
                </div>
            </div>
        </div>
    );
}