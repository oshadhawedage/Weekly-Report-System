import axios from "./axios";


export const getAllReports = async () => {

    const response = await axios.get("/manager/reports");

    return response.data;

};


export const getReportsByFilters = async (filters) => {

    const response = await axios.get(
        "/manager/reports/filter",
        {
            params: filters
        }
    );

    return response.data;

};