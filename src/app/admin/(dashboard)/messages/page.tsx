import { requireAdmin } from "@/lib/auth/admin";
import { getMessages, getDashboardData } from "@/app/admin/(dashboard)/actions";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
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
    <Container className="py-4">
      <Reveal>
        <div className="mb-10">
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold" style={{ color: "var(--text)" }}>
            Messages
          </h1>
          <p className="mt-2 text-[1.125rem]" style={{ color: "var(--text-muted)" }}>
            Manage contact form submissions. {dashboardData.totalMessages} total &middot; {dashboardData.newMessages} new
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <MessageList
          initialMessages={data.messages}
          initialTotalPages={data.totalPages}
          initialPage={data.currentPage}
          initialSearch={search}
          initialStatus={params.status || "all"}
          initialSortBy={sortBy}
          initialSortOrder={sortOrder}
        />
      </Reveal>
    </Container>
  );
}