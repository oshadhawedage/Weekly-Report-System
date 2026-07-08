import Button from "./Button";
import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();

    return (

        <header className="border-b border-slate-200 bg-white/90 px-6 py-4 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-500 text-lg font-bold text-white shadow-lg shadow-indigo-200">
                        WR
                    </div>

                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-slate-800">
                            Weekly Report System
                        </h1>
                        <p className="text-sm text-slate-500">
                            Keep your team updates organized
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-2 sm:flex sm:items-center sm:gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-slate-700">
                                {user?.name}
                            </p>
                            <p className="text-xs text-slate-500">
                                {user?.role === "MANAGER" ? "Manager" : "Member"}
                            </p>
                        </div>
                    </div>

                    <Button onClick={logout} variant="danger">
                        Logout
                    </Button>
                </div>
            </div>
        </header>

    );

}

export default Navbar;