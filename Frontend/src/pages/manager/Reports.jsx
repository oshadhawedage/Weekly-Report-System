import { useEffect, useState } from "react";

import { getAllReports,getReportsByFilters } from "../../services/managerService";

import ReportFilters from "../../components/reports/ReportFilters";
import ReportTable from "../../components/reports/ReportTable";


function Reports(){

    const [reports,setReports] = useState([]);
    const [loading,setLoading] = useState(true);



    const fetchReports = async()=>{

        try{

            const data = await getAllReports();

            setReports(data);

        }
        catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }

    };



    useEffect(()=>{

        fetchReports();

    },[]);



    if(loading){

        return (

            <div>
                Loading reports...
            </div>

        );

    }

    const handleFilter = async(filters)=>{

        try{

            const data = await getReportsByFilters(filters);

            setReports(data);

        }
        catch(error){

            console.log(error);

        }

    };



    return (

        <div className="space-y-6">


            <h1 className="text-3xl font-bold">
                Team Reports
            </h1>

            <ReportFilters onFilter={handleFilter}/>
            <ReportTable reports={reports}/>


        </div>

    );

}


export default Reports;