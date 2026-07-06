import { ReactNode } from "react";
import DashboardShell from "@/components/dashboard/layout/DashboardShell";
import { getNotifications } from "@/lib/mock/dashboardService";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const notifications = await getNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DashboardShell notificationCount={unreadCount}>
      {children}
    </DashboardShell>
  );
}
