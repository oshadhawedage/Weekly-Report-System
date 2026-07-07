import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ReportForm from "../../components/reports/ReportForm";

import { getMyReports, updateReport } from "../../services/reportService";


function EditReport(){


    const {id} = useParams();

    const navigate = useNavigate();


    const [report,setReport] = useState(null);



    useEffect(()=>{


        const fetchReport = async()=>{


            try{

                const reports = await getMyReports();


                const selectedReport = reports.find(
                    report => report.id === id
                );


                setReport(selectedReport);


            }
            catch(error){

                console.log(error);

            }


        };


        fetchReport();


    },[id]);




    const handleSubmit = async(data)=>{


        try{


            await updateReport(id,data);


            navigate("/member/reports");


        }
        catch(error){

            console.log(
                error.response?.data || error.message
            );

        }


    };




    if(!report){

        return <p>Loading...</p>;

    }



    return (

        <div className="max-w-3xl mx-auto">


            <h1 className="text-3xl font-bold mb-6">
                Edit Report
            </h1>


            <ReportForm
                initialData={report}
                onSubmit={handleSubmit}
            />


        </div>

    );

}


export default EditReport;