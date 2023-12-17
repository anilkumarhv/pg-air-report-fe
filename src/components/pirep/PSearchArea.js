import { React, useState } from "react";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import { Spinner, Alert, Button, Modal } from 'react-bootstrap';

import momentTimezone from "moment-timezone";
import './PSearchArea.css'
import { getPirepReports } from "../services/PirepService";
import ShowDatatable from "./ShowDatatable";


export default function PSearchArea(props) {

    const [code, setCode] = useState("");
    const [distance, setDistance] = useState(0);
    const [reportsData, setReportsData] = useState([]);

    const [validated, setValidated] = useState(false);

    const [ic, setIc] = useState(false);
    const [tb, setTb] = useState(false);
    const [ts, setTs] = useState(false);
    const [llws, setLlws] = useState(false);
    const [isTypeChecked, setIsTypeChecked] = useState(false);
    const [type, setType] = useState("");
    const [visibility, setVisibility] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    momentTimezone.tz.setDefault('UTC');
    const timeZoneFromServer = "UTC";
    const { moment } = new AdapterMoment({ instance: momentTimezone });
    const [startDateTime, setStartDateTime] = useState(moment().tz(timeZoneFromServer).add(-2, "hours"));
    const [endDateTime, setEndDateTime] = useState(moment().tz(timeZoneFromServer));

    const handleDistanceChange = (e) => {
        setDistance(e.target.value);
    };

    const handleVisibilityChange = (e) => {
        setVisibility(e.target.value);
    };

    const handlePirepType = (e) => {
        const { checked } = e.target
        setIsTypeChecked(checked);
        if (checked) {
            setType("Urgent PIREP")
        } else {
            setType("PIREP")
        }
    }

    const getPirepReport = async () => {
        try {
            setError(null)
            setLoading(true)
            setShowModal(true)
            // await new Promise(resolve => setTimeout(resolve, 10000));
            const { data } = await getPirepReports(code, startDateTime.toISOString(), endDateTime.toISOString(), distance, ic, tb, ts, llws, type, visibility);
            console.log(data);
            data.forEach((obj, index) => { obj.__id = index + 1 });
            setReportsData(data);
            setShowModal(false);
            setError(null);
        } catch (error) {
            console.error("An error occurred while fetching PIREP reports:", error);
            setError(error.response.data.message || error.message || 'An error occurred while fetching PIREP reports.');
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
        setDistance(0);
        setEndDateTime(moment().tz(timeZoneFromServer));
        setStartDateTime(moment().tz(timeZoneFromServer).add(-2, "hours"));
        setReportsData([]);
        setIc(false);
        setTb(false);
        setTs(false);
        setLlws(false);
        setIsTypeChecked(false);
        setVisibility("");
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
                                <div className="col-md-6 col-lg-3 search-input">
                                    <div className="form-group">
                                        <label>Radial distance</label>
                                        <select className="form-control" name="distance" value={distance} onChange={handleDistanceChange} placeholder="Radius">
                                            <option value="0">Airport Only</option>
                                            <option value="20">20 SM</option>
                                            <option value="50">50 SM</option>
                                            <option value="100">100 SM</option>
                                            <option value="150">150 SM</option>
                                            <option value="200">200 SM</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-30">
                                <div className="col-md-6 col-lg-3 search-input">
                                    <div className="form-group">
                                        <label>Visibility</label>
                                        <select className="form-control" name="visibility" value={visibility} onChange={handleVisibilityChange} placeholder="Visibility">
                                            <option value="" disabled >Visibility</option>
                                            <option value="5">Visibility  At or Below 5 SM</option>
                                            <option value="4.5">Visibility  At or Below 4 1/2 SM</option>
                                            <option value="4">Visibility  At or Below 4 SM</option>
                                            <option value="3.5">Visibility  At or Below 3 1/2 SM</option>
                                            <option value="3">Visibility  At or Below 3 SM</option>
                                            <option value="2.5">Visibility  At or Below 2 1/2 SM</option>
                                            <option value="2">Visibility  At or Below 2 SM</option>
                                            <option value="1.5">Visibility  At or Below 1 1/2 SM</option>
                                            <option value="1">Visibility  At or Below 1 SM</option>
                                            <option value="0.5">Visibility  At or Below 1/2 SM</option>
                                            <option value="0.25">Visibility  At or Below 1/4 SM</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <label className="form-label" control="icId">IC</label>
                                    <div className="">
                                        <input className="form-check-input" type="checkbox" value={ic} id="icId" onChange={(e) => setIc(e.target.checked)} checked={ic} />
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <label className="form-label" htmlFor="tbId">TB</label>
                                    <div className="">
                                        <input className="form-check-input" type="checkbox" value={tb} id="tbId" onChange={(e) => setTb(e.target.checked)} checked={tb} />
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <label className="form-label" htmlFor="tsId">TS</label>
                                    <div className="">
                                        <input className="form-check-input" type="checkbox" value={ts} id="tsId" onChange={(e) => setTs(e.target.checked)} checked={ts} />
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <label className="form-label" htmlFor="llwsId">LLWS</label>
                                    <div className="">
                                        <input className="form-check-input" type="checkbox" value={llws} id="llwsId" onChange={(e) => setLlws(e.target.checked)} checked={llws} />
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <label className="form-label" htmlFor="uuaId">UUA</label>
                                    <div className="">
                                        <input className="form-check-input" type="checkbox" id="uuaId" value={isTypeChecked} onChange={(e) => handlePirepType(e)} checked={isTypeChecked} />
                                    </div>
                                </div>
                            </div>

                            <div className="row pt-30">
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
                        <Modal.Title>PIREP Reports</Modal.Title>
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