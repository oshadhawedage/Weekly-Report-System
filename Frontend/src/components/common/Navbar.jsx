import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();

    return (

        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

            <h1 className="text-xl font-bold text-blue-600">
                Weekly Report System
            </h1>

            <div className="flex items-center gap-4">

                <span className="text-gray-600">

                    {user?.name}

                </span>

                <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>

            </div>

        </header>

    );

}

export default Navbar;