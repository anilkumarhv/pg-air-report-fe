import { React, useState, useCallback, useEffect } from "react";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';

import momentTimezone from "moment-timezone";
import './PSearchArea.css'
import { getPirepReports } from "../services/PirepService";
import ShowDatatable from "./ShowDatatable";

import axios from "axios";

export default function PSearchArea(props) {

    const [code, setCode] = useState("");
    const [distance, setDistance] = useState(0);
    const [reportsData, setReportsData] = useState([]);

    const [validated, setValidated] = useState(false);

    const [ic, setIc] = useState(false);
    const [tb, setTb] = useState(false);
    const [ts, setTs] = useState(false);
    const [llws, setLlws] = useState(false);
    const [type, setType] = useState("");

    momentTimezone.tz.setDefault('UTC');
    const timeZoneFromServer = "UTC";
    const { moment } = new AdapterMoment({ instance: momentTimezone });
    const [startDateTime, setStartDateTime] = useState(moment().tz(timeZoneFromServer).add(-2, "hours"));
    const [endDateTime, setEndDateTime] = useState(moment().tz(timeZoneFromServer));

    const [fetchUrl, setFetchUrl] = useState("");

    let [res, setRes] = useState([]);

    const handleDistanceChange = (e) => {
        setDistance(e.target.value);
    };

    const handlePirepType = (e) => {
        const { checked } = e.target
        if (checked) {
            setType("Urgent PIREP")
        } else {
            setType("PIREP")
        }
    }

    const getPirepReports1 = useCallback(async () => {
        try {
            const { responseData } = await getPirepReports(code, startDateTime.toISOString(), endDateTime.toISOString(), distance, ic, tb, ts, llws, type);
            setReportsData(responseData);
        } catch (e) {
            console.log(e);
            return e;
        }
    });


    const getPirepReport = async () => {
        const { data } = await getPirepReports(code, startDateTime.toISOString(), endDateTime.toISOString(), distance, ic, tb, ts, llws, type);
        console.log(data);
        data.forEach((obj, index) => { obj.__id = index + 1 });
        setReportsData(data);
    }


    const handleSubmit = (event) => {
        // event.preventDefault();
        // debugger;
        // getPirepReport();
        // console.log(result.length);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (form.checkValidity() === true) {
            event.preventDefault();
            getPirepReport();

            // let url = code + "?startTime=" + startDateTime.toISOString() + "&endTime=" + endDateTime.toISOString() + "&radialDistance=" + distance + "&icingCondition=" + ic + "&turbulenceCondition=" + tb + "&skyCondition=" + ts + "&qualityControlCondition=" + llws + "&type=" + type;
            // setFetchUrl(url);

            // setReportsData(getPirepData);
        }
        setValidated(true);
    };


    // useEffect(() => {
    //     if (fetchUrl) {
    //         const fetchData = async () => {
    //             const { data } = await getPirepReport(fetchUrl);
    //             console.log(data);
    //             res = await data;
    //             // setRes(await data);
    //             console.log(res);
    //             setReportsData([...reportsData, res]);
    //             console.log(reportsData.length);


    //         }
    //         fetchData();
    //     }

    // }, [fetchUrl])


    const getPirepData = () => {
        console.log(ic);
        console.log(tb);
        console.log(ts);
        console.log(llws);
        console.log(type);
        console.log(distance);

        const dbPirepUrl = 'http://localhost:8080/pireps/db/'
        const url = 'http://localhost:8080/pirep/';
        axios.get(dbPirepUrl + code + "?startTime=" + startDateTime.toISOString() + "&endTime=" + endDateTime.toISOString() + "&radialDistance=" + distance + "&icingCondition=" + ic + "&turbulenceCondition=" + tb + "&skyCondition=" + ts + "&qualityControlCondition=" + llws + "&type=" + type)
            .then(response => {
                console.log(response.data);
                setReportsData(response.data)
                console.log(reportsData);
                response.data.forEach((obj, index) => { obj.__id = index + 1 });
            })
            .catch(e => {
                console.log(e);
            });
    };



    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const form = event.currentTarget;
    //     if (form.checkValidity() === false) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //     }
    //     if (form.checkValidity() === true) {
    //         event.preventDefault();
    //         // setResult(getPirepData)
    //     }
    //     setValidated(true);
    //     try {
    //         getPirepReports(code, startDateTime.toISOString(), endDateTime.toISOString(), distance, ic, tb, ts, llws, type)
    //             .then(response => {
    //                 console.log(response.data);
    //                 setResult(response.data)
    //             })
    //             .catch(e => {
    //                 console.log(e);
    //             });
    //     } catch (e) {
    //         console.log(e);
    //     }

    //     console.log(result);

    // };

    const clear = () => {
        setCode("");
        setDistance(0);
        setEndDateTime("");
        setStartDateTime("");
        setReportsData([]);
    };

    return (
        <>
            <div className='search-area'>
                <div className="container">
                    <div className="search-form-wrapper">
                        <form noValidate validated={validated} onSubmit={handleSubmit}>
                            <div className="row justify-content-center align-items-end">
                                <div className="col-md-6 col-lg-3 search-input">
                                    <div className="form-group">
                                        <label>Location ID</label>
                                        <input type="text" className="form-control" required value={code} placeholder="ICAO/IATA code" id="locationid"
                                            onChange={(e) => setCode(e.target.value)} />
                                        <div><i className="fas fa-map-marker-alt"></i></div>
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
                                                // value={makeLocalAppearUTC(endDateTime)}
                                                value={endDateTime}
                                                onChange={(newValue) => {
                                                    // setEndDateTime(localToUTC(newValue))
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
                                        <select className="form-control" name="visibility" placeholder="Visibility">
                                            <option value="5">Visibility Below 5 SM</option>
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
                                        <input className="form-check-input" type="checkbox" value={ic} id="icId" onChange={(e) => setIc(e.target.value)} />
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <label className="form-label" for="tbId">TB</label>
                                    <div className="">
                                        <input className="form-check-input" type="checkbox" value={tb} id="tbId" onChange={(e) => setTb(e.target.value)} />
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <label className="form-label" for="tsId">TS</label>
                                    <div className="">
                                        <input className="form-check-input" type="checkbox" value={ts} id="tsId" onChange={(e) => setTs(e.target.value)} />
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <label className="form-label" for="llwsId">LLWS</label>
                                    <div className="">
                                        <input className="form-check-input" type="checkbox" value={llws} id="llwsId" onChange={(e) => setLlws(e.target.value)} />
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <label className="form-label" for="uuaId">UUA</label>
                                    <div className="">
                                        <input className="form-check-input" type="checkbox" id="uuaId" onChange={(e) => handlePirepType(e)} />
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
            {
                reportsData && reportsData?.length > 0 && <ShowDatatable reportData={reportsData} />
            }
        </>

    );
}