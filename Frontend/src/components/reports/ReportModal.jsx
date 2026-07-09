import Button from "../common/Button";

function ReportModal({ report, onClose }) {


    if (!report) return null;


    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">


                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">
                        Report Details
                    </h2>


                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-black"
                        onClick={onClose}
                    >
                        ✕
                    </Button>


                </div>



                <div className="space-y-4">


                    <div>

                        <p className="text-sm text-gray-500">
                            Member
                        </p>

                        <p className="font-semibold">
                            {report.user?.name}
                        </p>

                    </div>



                    <div>

                        <p className="text-sm text-gray-500">
                            Project
                        </p>

                        <p className="font-semibold">
                            {report.project?.name}
                        </p>

                    </div>



                    <div>

                        <p className="text-sm text-gray-500">
                            Week
                        </p>

                        <p className="font-semibold">

                            {
                                new Date(
                                    report.weekStartDate
                                ).toLocaleDateString()
                            }

                            {" - "}

                            {
                                new Date(
                                    report.weekEndDate
                                ).toLocaleDateString()
                            }

                        </p>

                    </div>



                    <div>

                        <p className="text-sm text-gray-500">
                            Hours Worked
                        </p>

                        <p className="font-semibold">
                            {report.hoursWorked ?? "-"} hrs
                        </p>

                    </div>



                    <div>

                        <p className="text-sm text-gray-500">
                            Status
                        </p>

                        <p className="font-semibold">
                            {report.status}
                        </p>

                    </div>



                    <div>

                        <p className="text-sm text-gray-500">
                            Tasks Completed
                        </p>

                        <p className="bg-gray-100 p-3 rounded">

                            {report.tasksCompleted}

                        </p>

                    </div>



                    <div>

                        <p className="text-sm text-gray-500">
                            Tasks Planned
                        </p>

                        <p className="bg-gray-100 p-3 rounded">

                            {report.tasksPlanned}

                        </p>

                    </div>



                    <div>

                        <p className="text-sm text-gray-500">
                            Blockers
                        </p>

                        <p className="bg-gray-100 p-3 rounded">

                            {report.blockers || "No blockers"}

                        </p>

                    </div>



                    <div>

                        <p className="text-sm text-gray-500">
                            Notes
                        </p>

                        <p className="bg-gray-100 p-3 rounded">

                            {report.notes || "No notes"}

                        </p>

                    </div>


                </div>


            </div>


        </div>

    );

}


export default ReportModal;