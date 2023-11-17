import { React, useState } from "react";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import { Spinner, Alert, Button, Modal } from 'react-bootstrap';

import momentTimezone from "moment-timezone";
import '../pirep/PSearchArea.css'
import { getMetarReports } from "../services/MetarService";
import ShowDatatable from "../pirep/ShowDatatable";


export default function MSearchArea(props) {

    const [code, setCode] = useState("");
    const [reportsData, setReportsData] = useState([]);
    const [validated, setValidated] = useState(false);

    const [pirepCondition, setPirepCondition] = useState(false);
    const [missingPirep, setMissingPirep] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    momentTimezone.tz.setDefault('UTC');
    const timeZoneFromServer = "UTC";
    const { moment } = new AdapterMoment({ instance: momentTimezone });
    const [startDateTime, setStartDateTime] = useState(moment().tz(timeZoneFromServer).add(-2, "hours"));
    const [endDateTime, setEndDateTime] = useState(moment().tz(timeZoneFromServer));

    const getPirepReport = async () => {
        try {
            setError(null)
            setLoading(true)
            setShowModal(true)
            const { data } = await getMetarReports(code, startDateTime.toISOString(), endDateTime.toISOString(), pirepCondition, missingPirep);
            console.log(data);
            data.forEach((obj, index) => { obj.__id = index + 1 });
            setReportsData(data);
            setShowModal(false);
            setError(null);
        } catch (error) {
            console.error("An error occurred while fetching PIREP reports:", error);
            setError(error.message || 'An error occurred while fetching Metar reports.');
            setReportsData([])
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (form.checkValidity() === true) {
            event.preventDefault();
            getPirepReport();
        }
        setValidated(true);
    };

    const clear = () => {
        setCode("");
        setEndDateTime(moment().tz(timeZoneFromServer));
        setStartDateTime(moment().tz(timeZoneFromServer).add(-2, "hours"));
        setReportsData([]);
        setMissingPirep(false);
        setPirepCondition(false);
    };

    const emptyDataMessage = () => { return 'No Data to Display'; }

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
        <>
            <div className='search-area'>
                <div className="container">
                    <div className="search-form-wrapper">
                        <form noValidate validated={validated ? true : undefined} onSubmit={handleSubmit}>
                            <div className="row justify-content-center align-items-end">
                                <div className="col-md-6 col-lg-3 search-input">
                                    <div className="form-group">
                                        <label htmlFor="validationDefault01" className="form-label">Location ID</label>
                                        <input type="text" className="form-control" value={code} placeholder="ICAO/IATA code" id="validationDefault01"
                                            onChange={(e) => setCode(e.target.value)} required />
                                        <div><i className="fas fa-map-marker-alt"></i></div>
                                        <div className="valid-feedback">
                                            Looks good!
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3 search-input">
                                    <div className="form-group">
                                        <label>Start DateTime</label>

                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DateTimePicker
                                                renderInput={(params) => <TextField {...params} />}
                                                value={startDateTime}
                                                onChange={(newValue) => {
                                                    setStartDateTime(newValue);
                                                }}
                                                disableFuture
                                                ampm={false}
                                                inputFormat="YYYY-MM-DD HH:mm"
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3 search-input">
                                    <div className="form-group">
                                        <label>End DateTime</label>

                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DateTimePicker
                                                renderInput={(params) => <TextField {...params} />}
                                                value={endDateTime}
                                                onChange={(newValue) => {
                                                    setEndDateTime(newValue)
                                                }}
                                                disableFuture
                                                ampm={false}
                                                inputFormat="YYYY-MM-DD HH:mm"
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>

                                <div className="col-md-2 col-lg-1">
                                    <label className="form-label" control="pirepConditionId">PIREP Conditions</label>
                                    <div className="">
                                        <input className="form-check-input" type="checkbox" value={pirepCondition} id="pirepConditionId" onChange={(e) => setPirepCondition(e.target.checked)} checked={pirepCondition} />
                                    </div>
                                </div>

                                <div className="col-md-2 col-lg-1">
                                    <label className="form-label" htmlFor="missingPirepId">Missing <br /> PIREPs</label>
                                    <div className="">
                                        <input className="form-check-input" type="checkbox" value={missingPirep} id="missingPirepId" onChange={(e) => setMissingPirep(e.target.checked)} checked={missingPirep} />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row pt-30" style={{ marginLeft: '7vw' }}>
                                <div className="col-md-2">
                                    <label className="form-label" control="pirepConditionId">PIREP <br /> conditions</label>
                                    <div className="">
                                        <input className="form-check-input" type="checkbox" value={pirepCondition} id="pirepConditionId" onChange={(e) => setPirepCondition(e.target.checked)} checked={pirepCondition} />
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <label className="form-label" for="missingPirepId">Missing <br /> PIREPs</label>
                                    <div className="">
                                        <input className="form-check-input" type="checkbox" value={missingPirep} id="missingPirepId" onChange={(e) => setMissingPirep(e.target.checked)} checked={missingPirep} />
                                    </div>
                                </div>
                            </div> */}

                            <div className="row pt-50">
                                <div className="col-md-4 col-lg-2 col-sm-6 offset-lg-8 offset-md-4 offset-sm-0 offset-xs-0 search-input">
                                    <button type="submit" className="search-btn"> <i className="fas fa-plane-departure"></i> Get Data</button>
                                </div>
                                <div className="col-md-4 col-lg-2 col-sm-6 search-input">
                                    <button className="search-btn" onClick={clear}> Clear</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Modal show={showModal} centered>
                {error && (
                    <Modal.Header>
                        <Modal.Title>Metar Reports</Modal.Title>
                    </Modal.Header>
                )}
                <Modal.Body className="d-flex">
                    {loading ? (
                        <>
                            <Spinner animation="border" variant="primary" style={{ marginRight: '5px' }} className="spinner-custom-color" />
                            <span>Fetching reports...</span>
                        </>
                    ) : error ? (
                        <>
                            <Alert variant="danger" style={{ width: '100%' }}>{error}</Alert>
                        </>
                    ) : null}
                </Modal.Body>
                {error && (
                    <Modal.Footer>
                        <Button variant="secondary" onClick={getPirepReport} className="modal-btn">
                            Retry
                        </Button>

                        <Button variant="secondary" onClick={() => setShowModal(false)} className="modal-btn">
                            Close
                        </Button>
                    </Modal.Footer>
                )}
            </Modal>

            {
                reportsData && reportsData?.length > 0 && <ShowDatatable reportData={reportsData} />
            }
            {
                reportsData && reportsData?.length === 0 &&
                <div className='feature-area pt-120 pb-120'>
                    <div className="container">
                        <div className="row">
                            <BootstrapTable
                                keyField="__id"
                                data={[]}
                                noDataIndication={emptyDataMessage}
                                columns={dbColumns}
                                hover
                                condensed
                                filter={filterFactory()}
                                classes={
                                    "table align-middle table-nowrap table-check"
                                }
                                headerWrapperClasses={"table-light"}
                                headerClasses="header-class"
                            />
                        </div>
                    </div>
                </div>
            }
        </>

    );
}