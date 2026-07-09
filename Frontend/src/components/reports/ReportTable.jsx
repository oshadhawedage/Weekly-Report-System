import Button from "../common/Button";

function ReportTable({ reports, onView }) {

    const getStatus = (report)=>{


    if(report.status === "SUBMITTED"){

        return "SUBMITTED";

    }


    const today = new Date();

    const endDate = new Date(report.weekEndDate);



    if(endDate < today){

        return "LATE";

    }


    return "PENDING";

};

    return (

        <div className="bg-white rounded-xl shadow overflow-x-auto">

            <table className="w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="p-4 text-left">
                            Member
                        </th>

                        <th className="p-4 text-left">
                            Project
                        </th>

                        <th className="p-4 text-left">
                            Week
                        </th>

                        <th className="p-4 text-left">
                            Hours
                        </th>

                        <th className="p-4 text-left">
                            Status
                        </th>

                        <th className="p-4 text-left">
                            Actions
                        </th>

                    </tr>

                </thead>


                


                <tbody>

{
    reports.length === 0 ? (

        <tr>

            <td
                colSpan="5"
                className="text-center p-6 text-gray-500"
            >

                No reports found

            </td>

        </tr>


    ) : (


        reports.map((report)=>(

            <tr
                key={report.id}
                className="border-t"
            >

                <td className="p-4">
                    {report.user?.name}
                </td>


                <td className="p-4">
                    {report.project?.name}
                </td>


                <td className="p-4">

                    {new Date(
                        report.weekStartDate
                    ).toLocaleDateString()}

                    {" - "}

                    {new Date(
                        report.weekEndDate
                    ).toLocaleDateString()}

                </td>


                <td className="p-4">

                    {report.hoursWorked ?? "-"} hrs

                </td>


                <td className="p-4">

                    <span
                        className={`
                            px-3 
                            py-1 
                            rounded-full 
                            text-sm
                            ${
                                getStatus(report)==="SUBMITTED"
                                ?
                                "bg-green-100 text-green-700"
                                :
                                getStatus(report)==="LATE"
                                ?
                                "bg-red-100 text-red-700"
                                :
                                "bg-yellow-100 text-yellow-700"
                            }
                        `}
                    >

                        {getStatus(report)}

                    </span>

                </td>

                <td className="p-4">

                    <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={()=>onView(report)}
                    >
                        View
                    </Button>

                 </td>


            </tr>

          ))

      )

    }

    </tbody>


            </table>


        </div>

    );

}


export default ReportTable;