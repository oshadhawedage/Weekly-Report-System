import { useEffect, useState } from "react";

import { getAllReports } from "../../services/managerService";

import ReportTable from "../../components/reports/ReportTable";


function Reports(){

    const [reports,setReports] = useState([]);


    useEffect(()=>{

        const fetchReports = async()=>{

            try{

                const data = await getAllReports();

                setReports(data);

            }
            catch(error){

                console.log(error);

            }

        };


        fetchReports();

    },[]);



    return (

        <div className="space-y-6">


            <h1 className="text-3xl font-bold">
                Team Reports
            </h1>


            <ReportTable reports={reports}/>


        </div>

    );

}


export default Reports;