import { createServerSupabaseAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/admin";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

const BUCKET = "project-images";
const MAX_FILES = 10;
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

function safePrefix(raw: unknown): string {
  const value = typeof raw === "string" ? raw : "";
  const clean = value.replace(/[^a-z0-9-]/gi, "").slice(0, 40);
  return clean || "tmp";
}

/**
 * Upload one or more project images to the public `project-images`
 * bucket. Admin-only (401/403). Files are validated (type, size,
 * count) and stored under unique UUID paths — never overwritten.
 * Returns public URLs for the admin form to persist in `images`.
 */
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin")
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid upload request" }, { status: 400 });
  }

  const files = formData.getAll("files").filter((f): f is File => f instanceof File);
  const prefix = safePrefix(formData.get("prefix"));

  if (files.length === 0) {
    return NextResponse.json({ success: false, error: "No files received" }, { status: 400 });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { success: false, error: `Upload at most ${MAX_FILES} images at a time` },
      { status: 400 }
    );
  }

  const supabase = await createServerSupabaseAdminClient();
  const uploaded: { url: string; path: string }[] = [];

  for (const file of files) {
    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      return NextResponse.json(
        { success: false, error: `"${file.name || "file"}" is not a supported image (JPEG, PNG, WebP, GIF, AVIF)` },
        { status: 400 }
      );
    }
    if (file.size <= 0) {
      return NextResponse.json(
        { success: false, error: `"${file.name || "file"}" appears to be empty or corrupt` },
        { status: 400 }
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { success: false, error: `"${file.name || "file"}" exceeds the 5 MB limit` },
        { status: 400 }
      );
    }

    const path = `projects/${prefix}/${randomUUID()}.${ext}`;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: file.type, upsert: false });

    if (error) {
      console.error("Project image upload error:", error);
      // Roll back anything uploaded in this batch so a partial
      // failure never leaves orphaned files behind the form.
      if (uploaded.length > 0) {
        await supabase.storage.from(BUCKET).remove(uploaded.map((u) => u.path));
      }
      return NextResponse.json(
        { success: false, error: "Image upload failed. Please try again." },
        { status: 500 }
      );
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    uploaded.push({ url: data.publicUrl, path });
  }

  return NextResponse.json({ success: true, images: uploaded });
}

/**
 * Delete stored project images by storage path. Admin-only. Paths are
 * constrained to the `projects/` folder to prevent arbitrary deletion.
 */
export async function DELETE(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin")
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });

  let body: { paths?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  const paths = Array.isArray(body.paths)
    ? body.paths.filter(
        (p): p is string =>
          typeof p === "string" && p.startsWith("projects/") && !p.includes("..")
      )
    : [];

  if (paths.length === 0) {
    return NextResponse.json({ success: false, error: "No valid image paths" }, { status: 400 });
  }

  const supabase = await createServerSupabaseAdminClient();
  const { error } = await supabase.storage.from(BUCKET).remove(paths.slice(0, 20));

  if (error) {
    console.error("Project image delete error:", error);
    return NextResponse.json(
      { success: false, error: "Image delete failed. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
