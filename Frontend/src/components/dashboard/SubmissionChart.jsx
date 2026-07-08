import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";


function SubmissionChart({ submitted, pending }) {


    const data = [

        {
            name: "Submitted",
            value: submitted
        },

        {
            name: "Pending",
            value: pending
        }

    ];

    const COLORS = [
       "#22c55e",
       "#eab308"
    ];


    return (

        <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold mb-4">
                Report Submission Status
            </h2>

            <ResponsiveContainer width="100%" height={300}>
            <PieChart>

                <Pie

                    data={data}

                    dataKey="value"

                    nameKey="name"

                    cx="50%"

                    cy="50%"

                    outerRadius={100}

                    label

                >

                    {
                        data.map((entry,index)=>(

                        <Cell key={index}
                            fill={COLORS[index]}
                        />

                        ))
                    }


                </Pie>


                <Tooltip />

                <Legend />


            </PieChart>
            </ResponsiveContainer>


        </div>

    );

}


export default SubmissionChart;