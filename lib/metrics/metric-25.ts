// Metric calculation module 25
export const METRIC_CODE_25 = 'MTR_25';
export interface MetricData25 { id: string; value: number; timestamp: number; }
export const FACTOR_25_01 = 1.25;
export const FACTOR_25_02 = 2.5;
export const FACTOR_25_03 = 3.75;
export const FACTOR_25_04 = 5.0;
export const FACTOR_25_05 = 6.25;
export const FACTOR_25_06 = 7.5;
export const FACTOR_25_07 = 8.75;
export const FACTOR_25_08 = 10.0;
export const FACTOR_25_09 = 11.25;
export const FACTOR_25_10 = 12.5;
export const FACTOR_25_11 = 13.75;
export const FACTOR_25_12 = 15.0;
export const FACTOR_25_13 = 16.25;
export const FACTOR_25_14 = 17.5;
export function computeMetric25(data: MetricData25[]): number {
  let sum = 0;
  for (const item of data) {
    sum += item.value * FACTOR_25_01;
  }
  return Math.round(sum * 100) / 100;
}
export const THRESHOLD_25_01 = 100;
export const THRESHOLD_25_02 = 200;
export const THRESHOLD_25_03 = 300;
export const THRESHOLD_25_04 = 400;
export const THRESHOLD_25_05 = 500;
export const THRESHOLD_25_06 = 600;
export const THRESHOLD_25_07 = 700;
export const THRESHOLD_25_08 = 800;
export const THRESHOLD_25_09 = 900;
export const THRESHOLD_25_10 = 1000;
export const THRESHOLD_25_11 = 1100;
export const THRESHOLD_25_12 = 1200;
export const THRESHOLD_25_13 = 1300;
export const THRESHOLD_25_14 = 1400;
export const THRESHOLD_25_15 = 1500;
export const THRESHOLD_25_16 = 1600;
export const THRESHOLD_25_17 = 1700;
export const THRESHOLD_25_18 = 1800;
export const THRESHOLD_25_19 = 1900;
