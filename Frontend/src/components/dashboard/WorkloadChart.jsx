import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";


function WorkloadChart({ reports }) {


    const projectData = {};


    reports.forEach((report)=>{

        const projectName = report.project?.name || "Unknown";


        if(!projectData[projectName]){

            projectData[projectName] = 0;

        }


        projectData[projectName] += report.hoursWorked || 0;

    });



    const data = Object.keys(projectData).map((project)=>({

        project,

        hours: projectData[project]

    }));



    return (

        <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold mb-4">

                Workload By Project

            </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart

                data={data}

            >

                <CartesianGrid strokeDasharray="3 3"/>


                <XAxis

                    dataKey="project"
                    angle={-20}
                    textAnchor="end"
                    interval={0}
                    height={60}

                />


                <YAxis />


                <Tooltip formatter={(value) => [`${value} hrs`, "Hours Worked"]} />


                <Bar

                    dataKey="hours"
                    fill="#6366f1"
                    radius={[8, 8, 0, 0]}

                />


            </BarChart>
            </ResponsiveContainer>


        </div>

    );

}


export default WorkloadChart;