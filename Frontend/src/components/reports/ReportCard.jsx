
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import ConfirmDialog from "../common/ConfirmDialog";
import { submitReport } from "../../services/reportService";


function ReportCard({ report }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
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

    const handleConfirmSubmit = () => {
        setConfirmOpen(false);
        handleSubmitReport();
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
                <Button
                    onClick={() => navigate(`/member/reports/${report.id}/edit`)}
                    variant="secondary"
                >
                    Edit
                </Button>

                )
                }


                {
                report.status === "DRAFT" && (

                <Button
                    onClick={() => setConfirmOpen(true)}
                    variant="success"
                >
                    Submit
                </Button>
                )
                }

            </div>

         <ConfirmDialog
           open={confirmOpen}
           title="Submit report"
           message="Once submitted, this report cannot be edited or undone. Do you want to proceed?"
           confirmLabel="Submit"
           cancelLabel="Cancel"
           onConfirm={handleConfirmSubmit}
           onCancel={() => setConfirmOpen(false)}
         />

         </div>

    );

}


export default ReportCard;