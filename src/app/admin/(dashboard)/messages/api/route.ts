import { getMessages } from "@/app/admin/(dashboard)/actions";
import { NextRequest, NextResponse } from "next/server";

const VALID_STATUS_VALUES = ["new", "read", "in_progress", "closed", "all"] as const;
const VALID_SORT_BY = ["created_at", "name", "email", "project_type", "status"] as const;
const VALID_SORT_ORDER = ["asc", "desc"] as const;

type StatusValue = typeof VALID_STATUS_VALUES[number];
type SortByValue = typeof VALID_SORT_BY[number];
type SortOrderValue = typeof VALID_SORT_ORDER[number];

function isValidStatus(value: string | null): value is StatusValue {
  return value !== null && VALID_STATUS_VALUES.includes(value as StatusValue);
}

function isValidSortBy(value: string): value is SortByValue {
  return VALID_SORT_BY.includes(value as SortByValue);
}

function isValidSortOrder(value: string): value is SortOrderValue {
  return VALID_SORT_ORDER.includes(value as SortOrderValue);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search") || undefined;
  const statusParam = searchParams.get("status");
  const sortBy = searchParams.get("sortBy") || "created_at";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  // Validate status
  const validStatus = statusParam && isValidStatus(statusParam) ? statusParam : undefined;

  // Validate sortBy
  const validSortBy = isValidSortBy(sortBy) ? sortBy : "created_at";

  // Validate sortOrder
  const validSortOrder = isValidSortOrder(sortOrder) ? sortOrder : "desc";

  try {
    const data = await getMessages({
      page,
      limit,
      search,
      status: validStatus !== "all" ? validStatus : undefined,
      sortBy: validSortBy,
      sortOrder: validSortOrder,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("API get messages error:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}