import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

function ManagerLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="flex-1 p-6">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default ManagerLayout;