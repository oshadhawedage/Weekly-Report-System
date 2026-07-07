import { Outlet } from "react-router-dom";

function MemberLayout() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar later */}
      <header className="h-16 bg-white shadow">
        Member Navbar
      </header>


      <div className="flex">

        {/* Sidebar later */}
        <aside className="w-64 min-h-screen bg-white shadow">
          Member Sidebar
        </aside>


        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MemberLayout;