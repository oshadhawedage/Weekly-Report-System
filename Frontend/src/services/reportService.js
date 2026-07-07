import api from "./axios";


export const createReport = async (reportData) => {

    const response = await api.post(
        "/reports",
        reportData
    );

    return response.data;

};


export const getMyReports = async () => {

    const response = await api.get(
        "/reports/my"
    );

    return response.data;

};

export const updateReport = async(id, data)=>{

    const response = await api.put(
        `/reports/${id}`,
        data
    );

    return response.data;

};

export const submitReport = async(id)=>{

    const response = await api.patch(
        `/reports/${id}/submit`
    );

    return response.data;

};