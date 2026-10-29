export interface ReportFilter {
  startDate: string;
  endDate: string;
  branchId?: string;
}
export interface ReportSummary {
  title: string;
  generatedAt: string;
  totalRecords: number;
}
