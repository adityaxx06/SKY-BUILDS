"use client";

import { useRef, useState } from "react";

export interface ManagedImage {
  url: string;
  alt: string;
  /** Storage path for deletion. Undefined for legacy URLs without one. */
  path?: string;
}

interface AdminImageManagerProps {
  initialImages?: ManagedImage[];
  /** Storage folder segment (work slug, or "tmp" for unsaved work). */
  prefix?: string;
}

const ACCEPT = "image/jpeg,image/png,image/webp,image/gif,image/avif";
const MAX_BYTES = 5 * 1024 * 1024;
const MAX_TOTAL = 20;

function pathFromUrl(url: string): string | undefined {
  const marker = "/project-images/";
  const i = url.indexOf(marker);
  if (i === -1) return undefined;
  const path = url.slice(i + marker.length);
  if (!path.startsWith("projects/") || path.includes("..")) return undefined;
  return path;
}

/**
 * Cover + gallery manager for Add/Edit Work. Uploads immediately to the
 * `project-images` bucket via the admin images API (service key stays
 * server-side); the parent form persists only the URL list through a
 * hidden `images` JSON input, plus `hero_image` (first image) and an
 * `images_pending` flag that blocks submit mid-upload.
 */
export function AdminImageManager({ initialImages = [], prefix = "tmp" }: AdminImageManagerProps) {
  const [images, setImages] = useState<ManagedImage[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = async (files: File[]) => {
    if (files.length === 0) return;
    if (images.length + files.length > MAX_TOTAL) {
      setError(`At most ${MAX_TOTAL} images per work`);
      return;
    }
    setError(null);
    setIsUploading(true);
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));
      formData.append("prefix", prefix);
      setProgress(`Uploading 0/${files.length}…`);
      const response = await fetch("/admin/projects/images/api", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || "Image upload failed");
        return;
      }
      const added: ManagedImage[] = (data.images || []).map(
        (img: { url: string; path: string }, i: number) => ({
          url: img.url,
          alt: (files[i]?.name || "Project image").replace(/\.[a-z0-9]+$/i, "").slice(0, 200),
          path: img.path,
        })
      );
      setImages((prev) => [...prev, ...added]);
      setProgress(null);
    } catch {
      setError("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    const valid = files.filter((f) => {
      if (!ACCEPT.split(",").includes(f.type)) {
        setError(`"${f.name}" is not a supported image (JPEG, PNG, WebP, GIF, AVIF)`);
        return false;
      }
      if (f.size <= 0 || f.size > MAX_BYTES) {
        setError(`"${f.name}" must be a non-empty file under 5 MB`);
        return false;
      }
      return true;
    });
    void uploadFiles(valid);
  };

  const removeImage = async (index: number) => {
    const target = images[index];
    if (!target) return;
    setImages((prev) => prev.filter((_, i) => i !== index));
    const path = target.path || pathFromUrl(target.url);
    if (!path) return;
    try {
      await fetch("/admin/projects/images/api", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paths: [path] }),
      });
    } catch {
      // Removal from the form already succeeded; a storage leftover is
      // harmless and reported in the console for visibility.
      console.error("Image storage delete failed for", path);
    }
  };

  const moveImage = (index: number, direction: -1 | 1) => {
    const next = index + direction;
    if (next < 0 || next >= images.length) return;
    setImages((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      copy.splice(next, 0, item);
      return copy;
    });
  };

  const setAlt = (index: number, alt: string) => {
    setImages((prev) => prev.map((img, i) => (i === index ? { ...img, alt } : img)));
  };

  return (
    <div>
      <input type="hidden" name="images" value={JSON.stringify(images.map(({ url, alt }) => ({ url, alt })))} />
      <input type="hidden" name="hero_image" value={images[0]?.url || ""} />
      <input type="hidden" name="images_pending" value={isUploading ? "1" : ""} />

      <div
        role="button"
        tabIndex={0}
        aria-label="Upload project images. Drag and drop files here, or press Enter to browse."
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          void uploadFiles(Array.from(e.dataTransfer.files || []));
        }}
        className="rounded-xl border border-dashed p-6 text-center transition-colors"
        style={{
          borderColor: dragOver ? "var(--primary)" : "var(--border)",
          background: dragOver ? "rgba(var(--shadow-tint), 0.06)" : "transparent",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="sr-only"
          tabIndex={-1}
          onChange={handleSelect}
          aria-hidden={false}
          aria-label="Choose project images"
        />
        <p className="text-sm font-medium" style={{ color: "var(--text)" }}>
          {isUploading ? progress || "Uploading…" : "Drag & drop images here, or click to browse"}
        </p>
        <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
          JPEG, PNG, WebP, GIF or AVIF · max 5 MB each · up to {MAX_TOTAL} images · first image is the cover
        </p>
        {isUploading && (
          <div className="mx-auto mt-3 h-1.5 w-48 overflow-hidden rounded-full" style={{ background: "var(--surface-elevated)" }} role="status" aria-label="Uploading images">
            <div className="h-full w-1/2 animate-pulse rounded-full" style={{ background: "var(--primary)" }} />
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-2 text-sm" style={{ color: "var(--secondary)" }}>
          {error}
        </p>
      )}

      {images.length > 0 ? (
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            {images.length} image{images.length === 1 ? "" : "s"}
          </p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.map((img, i) => (
              <li
                key={`${img.url}-${i}`}
                className="overflow-hidden rounded-xl border"
                style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}
              >
                <div className="relative aspect-[4/3] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.alt || `Project image ${i + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  {i === 0 && (
                    <span
                      className="absolute left-2 top-2 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold"
                      style={{ background: "var(--primary)", color: "var(--on-primary)" }}
                    >
                      Cover
                    </span>
                  )}
                </div>
                <div className="space-y-2 p-2.5">
                  <label className="sr-only" htmlFor={`image-alt-${i}`}>
                    Alt text for image {i + 1}
                  </label>
                  <input
                    id={`image-alt-${i}`}
                    type="text"
                    value={img.alt}
                    onChange={(e) => setAlt(i, e.target.value)}
                    placeholder="Alt text (describes the image)"
                    maxLength={200}
                    className="w-full rounded-lg border bg-transparent px-2.5 py-1.5 text-xs"
                    style={{ borderColor: "var(--border)", color: "var(--text)" }}
                  />
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => moveImage(i, -1)}
                        disabled={i === 0}
                        aria-label={`Move image ${i + 1} earlier`}
                        className="rounded-lg border px-2 py-1 text-xs transition-opacity disabled:opacity-30"
                        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(i, 1)}
                        disabled={i === images.length - 1}
                        aria-label={`Move image ${i + 1} later`}
                        className="rounded-lg border px-2 py-1 text-xs transition-opacity disabled:opacity-30"
                        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                      >
                        →
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => void removeImage(i)}
                      aria-label={`Remove image ${i + 1}`}
                      className="rounded-lg border px-2 py-1 text-xs"
                      style={{ borderColor: "var(--border)", color: "var(--secondary)" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
          No images yet — the public page will use the visual composition below until photos are added.
        </p>
      )}
    </div>
  );
}
