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
        <div className="basis-2/12 overflow-y-auto bg-secondary p-4">
          <AdminSidebar2 />
        </div>

        {/* Main Content */}
        <div className="basis-10/12 flex flex-col overflow-y-auto shadow-lg p-4">
          {/* Sticky Navbar */}
          <div className="sticky z-10">
            <NavbarDashboard />
          </div>

          {/* Page Content */}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </AccessibilityProvider>
  );
}


