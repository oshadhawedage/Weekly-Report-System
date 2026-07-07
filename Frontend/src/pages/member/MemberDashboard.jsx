import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import StatsCard from "../../components/dashboard/StatsCard";


function MemberDashboard(){

    const {user}=useAuth();
    const navigate = useNavigate();


    return (

        <div className="space-y-6">


            <div>

                <h1 className="text-3xl font-bold">
                    Welcome {user?.name}
                </h1>

                <p className="text-gray-500">
                    Manage your weekly reports
                </p>

            </div>



            <div className="grid md:grid-cols-3 gap-6">


                <StatsCard
                    title="Current Report"
                    value="Pending"
                />


                <StatsCard
                    title="Total Reports"
                    value="0"
                />


                <StatsCard
                    title="Hours Worked"
                    value="0"
                />


            </div>

            <button
            onClick={() => navigate("/member/reports/new")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Create Weekly Report
           </button>


        </div>

    );

}


export default MemberDashboard;