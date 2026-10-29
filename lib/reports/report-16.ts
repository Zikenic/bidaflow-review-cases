import { queryAll } from "@/lib/server";
import { ReportFilter } from "./types";
import { sanitizeFilterDates } from "./utils";

export async function generateReport16(filter: ReportFilter, quarterId: string) {
  const [start, end] = sanitizeFilterDates(filter);
  // Defect: string-interpolated parameter into SQL query
  const records = await queryAll(`SELECT * FROM invoices WHERE quarter_code = '${quarterId}' AND created_at BETWEEN ? AND ?`, start, end);
  return { reportId: "REP-16", records };
}
