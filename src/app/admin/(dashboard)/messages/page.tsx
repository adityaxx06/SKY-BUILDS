import { requireAdmin } from "@/lib/auth/admin";
import { getMessages, getDashboardData } from "@/app/admin/(dashboard)/actions";
import { AdminPage } from "@/components/admin/AdminPage";
import { MessageList } from "@/components/admin/MessageList";

type MessageStatus = "new" | "read" | "in_progress" | "closed" | "all" | undefined;
type SortBy = "created_at" | "name" | "email" | "project_type" | "status";
type SortOrder = "asc" | "desc";

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: MessageStatus;
    sortBy?: SortBy;
    sortOrder?: SortOrder;
  }>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const search = params.search || "";
  const statusParam = params.status;
  const status: MessageStatus = statusParam === "all" ? undefined : statusParam;
  const sortBy = (params.sortBy as SortBy) || "created_at";
  const sortOrder = (params.sortOrder as SortOrder) || "desc";

  const data = await getMessages({
    page,
    limit: 10,
    search: search || undefined,
    status,
    sortBy,
    sortOrder,
  });

  // Also fetch dashboard stats for context
  const dashboardData = await getDashboardData();

  return (
    <AdminPage
      title="Messages"
      description={`Manage contact form submissions. ${dashboardData.totalMessages} total · ${dashboardData.newMessages} new`}
    >
      <MessageList
        initialMessages={data.messages}
        initialTotalPages={data.totalPages}
        initialPage={data.currentPage}
        initialSearch={search}
        initialStatus={params.status || "all"}
        initialSortBy={sortBy}
        initialSortOrder={sortOrder}
      />
    </AdminPage>
  );
}