import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {

    const { user } = useAuth();

    const menuItems = user?.role === "MEMBER"
        ? [
            { to: "/member/dashboard", label: "Dashboard", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 9.75V21h13.5V9.75" /></svg>
            ) },
            { to: "/member/reports", label: "My Reports", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5" /></svg>
            ) },
            { to: "/member/reports/new", label: "Create Report", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14" /><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /></svg>
            ) }
        ]
        : [
            { to: "/manager/dashboard", label: "Dashboard", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 9.75V21h13.5V9.75" /></svg>
            ) },
            { to: "/manager/reports", label: "Reports", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5" /></svg>
            ) },
            { to: "/manager/projects", label: "Projects", icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 8l8 5 8-5" /></svg>
            ) }
        ];

    return (

        <aside className="flex min-h-screen w-64 flex-col bg-slate-950 text-white">
            <div className="border-b border-white/10 px-6 py-6">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Navigation
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                    {user?.role === "MANAGER" ? "Manager Panel" : "Member Panel"}
                </h2>
            </div>

            <nav className="flex-1 space-y-2 p-4">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                                isActive
                                    ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-900/30"
                                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                            }`
                        }
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                            {item.icon}
                        </span>
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="border-t border-white/10 p-6">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-300">
                    <p className="font-semibold text-white">
                        {user?.name || "Welcome"}
                    </p>
                    <p className="mt-1 text-slate-400">
                        {user?.role === "MANAGER" ? "You can oversee reports and projects" : "You can manage your weekly reports"}
                    </p>
                </div>
            </div>
        </aside>

    );

}

export default Sidebar;