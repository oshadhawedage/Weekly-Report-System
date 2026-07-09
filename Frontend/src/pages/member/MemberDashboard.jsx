import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import StatsCard from "../../components/dashboard/StatsCard";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { getMyReports } from "../../services/reportService";


function MemberDashboard(){

    const {user}=useAuth();

    const navigate = useNavigate();

    const [reports,setReports]=useState([]);


    useEffect(()=>{

        const loadReports=async()=>{

            const data = await getMyReports();

            setReports(data);

        };

        loadReports();

    },[]);



    const totalReports = reports.length;


    const submittedReports = reports.filter(
        report=>report.status==="SUBMITTED"
    ).length;


    const totalHours = reports.reduce(
        (total, report) =>
        total + (report.hoursWorked || 0),
        0
    );


    const currentReport = reports[0];

    const getStatusBadge = (status) => {
        if (status === "SUBMITTED") return "bg-green-100 text-green-700";
        if (status === "LATE") return "bg-red-100 text-red-700";
        if (status === "PENDING") return "bg-yellow-100 text-yellow-700";
        return "bg-slate-100 text-slate-700";
    };

    const formatWeekRange = (report) => {
        if (!report?.weekStartDate || !report?.weekEndDate) return null;
        const start = new Date(report.weekStartDate).toLocaleDateString();
        const end = new Date(report.weekEndDate).toLocaleDateString();
        return `${start} — ${end}`;
    };

    return (

    <div className="space-y-6">


        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
                <h1 className="text-3xl font-bold">
                    Welcome {user?.name}
                </h1>

                <p className="text-gray-500">
                    Manage your weekly reports
                </p>
            </div>

            <Button
                onClick={()=>navigate("/member/reports/new")}
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
            >
                Create Weekly Report
            </Button>

        </div>



        <div className="grid md:grid-cols-3 gap-6">


            <StatsCard
                title="Total Reports"
                value={totalReports}
            />


            <StatsCard
                title="Submitted Reports"
                value={submittedReports}
            />


            <StatsCard
                title="Hours Worked"
                value={totalHours}
            />


        </div>



        <Card className="space-y-4">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold">Current Report</h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Your latest weekly report summary.
                    </p>
                </div>
                {currentReport && (
                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusBadge(currentReport.status)}`}>
                        {currentReport.status}
                    </span>
                )}
            </div>

            {currentReport ? (
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">Project</p>
                        <p className="font-semibold text-slate-900 mt-1">{currentReport.project?.name || "—"}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">Week</p>
                        <p className="font-semibold text-slate-900 mt-1">{formatWeekRange(currentReport) || "—"}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">Hours Worked</p>
                        <p className="font-semibold text-slate-900 mt-1">{currentReport.hoursWorked || 0} hrs</p>
                    </div>
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
                    No reports created yet. Use the button above to add your first weekly report.
                </div>
            )}

        </Card>



        <Card className="space-y-4">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold">Recent Reports</h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Latest submissions and pending reports.
                    </p>
                </div>
                <p className="text-sm text-slate-500">Showing {Math.min(reports.length, 3)} of {reports.length}</p>
            </div>

            <div className="space-y-3">
                {reports.slice(0,3).length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
                        No recent reports available.
                    </div>
                ) : (
                    reports.slice(0,3).map((report) => (
                        <div
                            key={report.id}
                            className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <p className="text-sm text-slate-500">Project</p>
                                <p className="font-semibold text-slate-900">{report.project?.name || "Unnamed project"}</p>
                                <p className="text-xs text-slate-500 mt-1">{formatWeekRange(report) || "No week data"}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusBadge(report.status)}`}>
                                    {report.status}
                                </span>
                                <span className="text-sm text-slate-500">{report.hoursWorked || 0} hrs</span>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </Card>


    </div>

    );

}


export default MemberDashboard;