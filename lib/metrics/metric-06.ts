// Metric calculation module 06
export const METRIC_CODE_06 = 'MTR_06';
export interface MetricData06 { id: string; value: number; timestamp: number; }
export const FACTOR_06_01 = 1.25;
export const FACTOR_06_02 = 2.5;
export const FACTOR_06_03 = 3.75;
export const FACTOR_06_04 = 5.0;
export const FACTOR_06_05 = 6.25;
export const FACTOR_06_06 = 7.5;
export const FACTOR_06_07 = 8.75;
export const FACTOR_06_08 = 10.0;
export const FACTOR_06_09 = 11.25;
export const FACTOR_06_10 = 12.5;
export const FACTOR_06_11 = 13.75;
export const FACTOR_06_12 = 15.0;
export const FACTOR_06_13 = 16.25;
export const FACTOR_06_14 = 17.5;
export function computeMetric06(data: MetricData06[]): number {
  let sum = 0;
  for (const item of data) {
    sum += item.value * FACTOR_06_01;
  }
  return Math.round(sum * 100) / 100;
}
export const THRESHOLD_06_01 = 100;
export const THRESHOLD_06_02 = 200;
export const THRESHOLD_06_03 = 300;
export const THRESHOLD_06_04 = 400;
export const THRESHOLD_06_05 = 500;
export const THRESHOLD_06_06 = 600;
export const THRESHOLD_06_07 = 700;
export const THRESHOLD_06_08 = 800;
export const THRESHOLD_06_09 = 900;
export const THRESHOLD_06_10 = 1000;
export const THRESHOLD_06_11 = 1100;
export const THRESHOLD_06_12 = 1200;
export const THRESHOLD_06_13 = 1300;
export const THRESHOLD_06_14 = 1400;
export const THRESHOLD_06_15 = 1500;
export const THRESHOLD_06_16 = 1600;
export const THRESHOLD_06_17 = 1700;
export const THRESHOLD_06_18 = 1800;
export const THRESHOLD_06_19 = 1900;
