import { requireAdmin } from "@/lib/auth/admin";
import { getMessageDetail } from "@/app/admin/(dashboard)/actions";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AdminMessageDetail } from "@/components/admin/AdminMessageDetail";

export default async function AdminMessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const { id } = await params;
  const message = await getMessageDetail(id);

  if (!message) {
    notFound();
  }

  return (
    <Container className="py-4 max-w-4xl">
      <Reveal>
        <AdminMessageDetail message={message} />
      </Reveal>
    </Container>
  );
}