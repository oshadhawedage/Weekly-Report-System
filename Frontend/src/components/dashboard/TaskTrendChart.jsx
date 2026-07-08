import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";


function TaskTrendChart({ reports }) {


    const trendData = reports.map((report)=>({

        week: new Date(
            report.weekStartDate
        ).toLocaleDateString(),

        tasks: report.tasksCompleted.length

    }));



    return (

        <div className="bg-white p-6 rounded-xl shadow">


            <h2 className="text-xl font-bold mb-4">

                Tasks Completed Trend

            </h2>


            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <LineChart data={trendData}>


                    <CartesianGrid strokeDasharray="3 3"/>


                    <XAxis
                        dataKey="week"
                    />


                    <YAxis/>


                    <Tooltip formatter={(value) => [value, "Task Metric"]}/>


                    <Line

                        type="monotone"
                        dataKey="tasks"
                        stroke="#6366f1"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 7 }}

                    />


                </LineChart>


            </ResponsiveContainer>


        </div>

    );

}


export default TaskTrendChart;