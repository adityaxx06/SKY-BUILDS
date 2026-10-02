import { getDashboardData } from "./actions";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { AdminRecentMessages } from "@/components/admin/AdminRecentMessages";
import { AdminQuickActions } from "@/components/admin/AdminQuickActions";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  return (
    <AdminPage
      title="Dashboard"
      description="Welcome back. Here's an overview of your SKY BUILDS workspace."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <Link href="/admin/messages" className="block">
            <AdminStatCard
              label="New Messages"
              value={data.newMessages}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              }
              accentColor="primary"
              trend={data.newMessages > 0 ? { value: `${data.newMessages} unread`, positive: true } : undefined}
              delay={0}
            />
          </Link>
          <Link href="/admin/messages" className="block">
            <AdminStatCard
              label="Total Messages"
              value={data.totalMessages}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              }
              accentColor="secondary"
              delay={0.05}
            />
          </Link>
          <Link href="/admin/projects" className="block">
            <AdminStatCard
              label="Projects"
              value={data.projectsCount}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 9h6v6H9z" />
                </svg>
              }
              accentColor="accent"
              delay={0.1}
            />
          </Link>
          <Link href="/admin/services" className="block">
            <AdminStatCard
              label="Services"
              value={data.servicesCount}
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              }
              accentColor="success"
              delay={0.15}
            />
          </Link>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        <div>
          <AdminRecentMessages messages={data.recentMessages} />
        </div>

        <div>
          {data.totalMessages === 0 ? (
            <AdminEmptyState
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              }
              title="No inquiries yet"
              description="Contact form submissions will appear here once visitors reach out."
              action={{ label: "View Messages", href: "/admin/messages" }}
            />
          ) : (
            <AdminQuickActions />
          )}
        </div>
      </div>
    </AdminPage>
  );
}