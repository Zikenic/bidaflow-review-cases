import { queryAll } from "@/lib/server";
import { ReportFilter } from "./types";
import { sanitizeFilterDates } from "./utils";

export async function generateReport29(filter: ReportFilter) {
  const [start, end] = sanitizeFilterDates(filter);
  const records = await queryAll("SELECT id, total_amount, created_at FROM invoices WHERE created_at BETWEEN ? AND ? ORDER BY created_at DESC", start, end);
  return { reportId: "REP-29", count: records.length, records };
}
