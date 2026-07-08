import { useEffect, useState } from "react";

import { getDashboardStats,getAllReports } from "../../services/managerService";

import StatsCard from "../../components/dashboard/StatsCard";
import SubmissionChart from "../../components/dashboard/SubmissionChart";
import WorkloadChart from "../../components/dashboard/WorkloadChart";
import TaskTrendChart from "../../components/dashboard/TaskTrendChart";
import ActivityFeed from "../../components/dashboard/ActivityFeed";

function ManagerDashboard() {

    const [reports,setReports] = useState([]);

    const [stats, setStats] = useState({

        totalReports: 0,
        submittedReports: 0,
        pendingReports: 0,
        submissionRate: 0,
        openBlockers: 0

    });

    useEffect(() => {

        const fetchStats = async () => {

            try {

                const statsData = await getDashboardStats();
                const reportsData = await getAllReports();

                setStats(statsData);
                setReports(reportsData);

            } catch (error) {

                console.log(error);

            }

        };

        fetchStats();

    }, []);

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">

                    Manager Dashboard

                </h1>

                <p className="text-gray-500">

                    Team overview

                </p>

            </div>


            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

                <StatsCard
                    title="Total Reports"
                    value={stats.totalReports}
                />

                <StatsCard
                    title="Submitted"
                    value={stats.submittedReports}
                />

                <StatsCard
                    title="Pending"
                    value={stats.pendingReports}
                />

                <StatsCard
                    title="Submission Rate"
                    value={`${stats.submissionRate}%`}
                />

                <StatsCard
                    title="Open Blockers"
                    value={stats.openBlockers}
                />

            </div>

            <div className="grid md:grid-cols-2 gap-6">


                <SubmissionChart

                   submitted={stats.submittedReports}
                   pending={stats.pendingReports}
                />

                <WorkloadChart

                   reports={reports}

                />


            </div>

            <div className="grid gap-6 xl:grid-cols-2">

                 <TaskTrendChart

                    reports={reports}

                />

            

            

                <ActivityFeed
                   reports={reports}
                />

            </div>

        </div>

    );

}

export default ManagerDashboard;