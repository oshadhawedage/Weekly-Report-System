import { useEffect, useState } from "react";

import ReportCard from "../../components/reports/ReportCard";

import { getMyReports } from "../../services/reportService";


function ReportHistory(){


    const [reports,setReports] = useState([]);

    const [loading,setLoading] = useState(true);



    useEffect(()=>{


        const fetchReports = async()=>{


            try{

                const data = await getMyReports();

                setReports(data);

            }
            catch(error){

                console.log(
                    error.response?.data || error.message
                );

            }
            finally{

                setLoading(false);

            }


        };


        fetchReports();


    },[]);




    if(loading){

        return <p>Loading reports...</p>;

    }




    return (

        <div className="space-y-6">


            <h1 className="text-3xl font-bold">
                Report History
            </h1>



            {
                reports.length === 0 ? (

                    <p className="text-gray-500">
                        No reports found
                    </p>

                )

                :

                (

                    <div className="grid gap-5">

                        {
                            reports.map((report)=>(

                                <ReportCard
                                    key={report.id}
                                    report={report}
                                />

                            ))
                        }

                    </div>

                )

            }


        </div>

    );

}


export default ReportHistory;