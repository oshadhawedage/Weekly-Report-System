function ActivityFeed({ reports }) {


    const recentReports = reports.slice(0,5);


    return (

        <div className="bg-white p-6 rounded-xl shadow">


            <h2 className="text-xl font-bold mb-5">

                Recent Activity

            </h2>



            <div className="space-y-4">


                {
                    recentReports.length === 0 ? (

                        <p className="text-gray-500">
                            No recent activity
                        </p>

                    )
                    :
                    (

                        recentReports.map((report)=>(

                            <div
                                key={report.id}
                                className="border-b pb-4"
                            >

                                <div className="flex justify-between">


                                    <p className="font-semibold">

                                        {report.user?.name}

                                    </p>


                                    <span
                                        className={`
                                            text-sm
                                            ${
                                                report.status === "SUBMITTED"
                                                ?
                                                "text-green-600"
                                                :
                                                "text-yellow-600"
                                            }
                                        `}
                                    >

                                        {report.status}

                                    </span>


                                </div>


                                <p className="text-gray-600 text-sm">

                                    Submitted report for{" "}

                                    <span className="font-medium">

                                        {report.project?.name}

                                    </span>

                                </p>


                                <p className="text-gray-400 text-xs mt-1">

                                    {
                                        new Date(
                                            report.createdAt
                                        ).toLocaleDateString()
                                    }

                                </p>


                            </div>


                        ))

                    )

                }


            </div>


        </div>

    );

}


export default ActivityFeed;