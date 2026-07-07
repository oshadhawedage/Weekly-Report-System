import { Outlet } from "react-router-dom";

function ManagerLayout() {
  return (
    <div className="min-h-screen bg-gray-100">

      <header className="h-16 bg-white shadow">
        Manager Navbar
      </header>


      <div className="flex">

        <aside className="w-64 min-h-screen bg-white shadow">
          Manager Sidebar
        </aside>


        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default ManagerLayout;