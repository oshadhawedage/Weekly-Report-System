import { useNavigate } from "react-router-dom";
import ReportForm from "../../components/reports/ReportForm";
import { createReport } from "../../services/reportService";


function CreateReport(){


    const navigate = useNavigate();

    const handleSubmit = async(data)=>{

        try{

            const response = await createReport(data);

            console.log(

                "Report Created:",

                response

            );

            navigate("/member/reports");

        }

        catch(error){

            console.log(

                error.response?.data || error.message

            );

        }

    };


    return (

        <div className="max-w-3xl mx-auto">

            <h1 className="text-3xl font-bold mb-6">
                Create Weekly Report
            </h1>


            <ReportForm 
                onSubmit={handleSubmit}
            />


        </div>

    );

}


export default CreateReport;