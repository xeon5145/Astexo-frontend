import "./accessibility.css";
import { AccessibilityProvider } from "@/components/admin/AccessibilityProvider";
import AdminSidebar2 from "@/components/admin/AdminSidebar2";
import NavbarDashboard from "@/components/common/navbarDashboard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AccessibilityProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <div className="basis-2/12 overflow-y-auto bg-slate-100">
          <AdminSidebar2 />
        </div>

        {/* Main Content */}
        <div className="basis-10/12 flex flex-col overflow-y-auto bg-slate-50 shadow-lg ">
          {/* Sticky Navbar */}
          <div className="sticky top-4 z-10">
            <NavbarDashboard />
          </div>

          {/* Page Content */}
          <div className="p-4 mt-4">{children}</div>
        </div>
      </div>
    </AccessibilityProvider>
  );
}


