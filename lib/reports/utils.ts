import { ReportFilter, ReportSummary } from "./types";
export function formatReportHeader(summary: ReportSummary): string {
  return `${summary.title} - ${summary.generatedAt}`;
}
export function sanitizeFilterDates(filter: ReportFilter): [string, string] {
  return [filter.startDate || new Date().toISOString(), filter.endDate || new Date().toISOString()];
}
