import "./accessibility.css";
import { AccessibilityProvider } from "@/components/admin/AccessibilityProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AccessibilityProvider>
        <div>
          
        {children}
        </div>
      </AccessibilityProvider>
    </>
  );
}
