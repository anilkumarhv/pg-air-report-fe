import API from "../../commons/API";

export const getMetarReports = (code, startDateTime, endDateTime, isPirepCondition, isPirepMissing) => {
    const url = `/api/v1/metar/db/${code}?startTime=${startDateTime}&endTime=${endDateTime}&isPirepCondition=${isPirepCondition}&isPirepMissing=${isPirepMissing}`;
    return API.get(url);
}

export const getPirepReportN = (fetchUrl) => {
    return API.get(`/api/v1/metar/db/${fetchUrl}`);
}