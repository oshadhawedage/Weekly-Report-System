function ReportTable({ reports }) {

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

                    </tr>

                </thead>


                <tbody>

                    {
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
                                                report.status === "SUBMITTED"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }
                                        `}
                                    >

                                        {report.status}

                                    </span>

                                </td>


                            </tr>

                        ))
                    }


                </tbody>


            </table>


        </div>

    );

}


export default ReportTable;