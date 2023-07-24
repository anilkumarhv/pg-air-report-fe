import API from "../../commons/API";

export const getPirepReports = (code, startDateTime, endDateTime, distance, ic, tb, ts, llws, type, visibility) => {
    const url = `/pireps/db/${code}?startTime=${startDateTime}&endTime=${endDateTime}&radialDistance=${distance}&icingCondition=${ic}&turbulenceCondition=${tb}&skyCondition=${ts}&qualityControlCondition=${llws}&type=${type}&visibility=${visibility}`;
    return API.get(url);
}

export const getPirepReportN = (fetchUrl) => {
    return API.get(`/pireps/db/${fetchUrl}`);
}