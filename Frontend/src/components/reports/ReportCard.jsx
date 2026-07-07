
import { useNavigate } from "react-router-dom";
import { submitReport } from "../../services/reportService";


function ReportCard({ report }) {

    const navigate = useNavigate();

    const handleSubmitReport = async () => {

    try {

        await submitReport(report.id);

        window.location.reload();

    } catch(error){

        console.log(
            error.response?.data || error.message
        );

    }

  };


    return (

        <div className="bg-white rounded-lg shadow p-5 space-y-3">


            <div className="flex justify-between items-center">


                <h2 className="text-xl font-semibold">
                    {report.project?.name || "Project"}
                </h2>


                <span
                    className={`px-3 py-1 rounded-full text-sm ${
                        
                        report.status === "SUBMITTED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"

                    }`}
                >

                    {report.status}

                </span>


            </div>



            <div>

                <p className="text-gray-500">
                    Week
                </p>

                <p>
                    {new Date(report.weekStartDate).toDateString()}
                    {" - "}
                    {new Date(report.weekEndDate).toDateString()}
                </p>

            </div>



            <div>

                <p className="font-medium">
                    Tasks Completed
                </p>

                <p className="text-gray-600">
                    {report.tasksCompleted}
                </p>

            </div>



            <div>

                <p className="font-medium">
                    Tasks Planned
                </p>

                <p className="text-gray-600">
                    {report.tasksPlanned}
                </p>

            </div>



            <div>

                <p className="font-medium">
                    Blockers
                </p>

                <p className="text-gray-600">
                    {report.blockers}
                </p>

            </div>



            <div className="flex gap-3 justify-end">

                {
                 report.status === "DRAFT" && (
                <button
                    onClick={() => navigate(`/member/reports/${report.id}/edit`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Edit
                </button>

                )
                }


                {
                report.status === "DRAFT" && (

                <button
                    onClick={handleSubmitReport}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    Submit
                </button>
                )
                }

            </div>


         </div>

    );

}


export default ReportCard;