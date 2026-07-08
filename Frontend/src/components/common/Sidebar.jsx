import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {

    const { user } = useAuth();

    return (

        <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">

            <h2 className="text-xl font-bold mb-8">

                Menu

            </h2>

            <nav className="flex flex-col gap-3">

                {
                    user?.role === "MEMBER" ? (

                        <>

                            <NavLink to="/member/dashboard">
                                Dashboard
                            </NavLink>

                            <NavLink to="/member/reports">
                                My Reports
                            </NavLink>

                            <NavLink to="/member/reports/new">
                                Create Report
                            </NavLink>

                        </>

                    ) : (

                        <>

                            <NavLink to="/manager/dashboard">
                                Dashboard
                            </NavLink>

                            <NavLink to="/manager/reports">
                                Reports
                            </NavLink>

                            <NavLink to="/manager/projects">
                                Projects
                            </NavLink>

                        </>

                    )
                }

            </nav>

        </aside>

    );

}

export default Sidebar;