// Metric calculation module 13
export const METRIC_CODE_13 = 'MTR_13';
export interface MetricData13 { id: string; value: number; timestamp: number; }
export const FACTOR_13_01 = 1.25;
export const FACTOR_13_02 = 2.5;
export const FACTOR_13_03 = 3.75;
export const FACTOR_13_04 = 5.0;
export const FACTOR_13_05 = 6.25;
export const FACTOR_13_06 = 7.5;
export const FACTOR_13_07 = 8.75;
export const FACTOR_13_08 = 10.0;
export const FACTOR_13_09 = 11.25;
export const FACTOR_13_10 = 12.5;
export const FACTOR_13_11 = 13.75;
export const FACTOR_13_12 = 15.0;
export const FACTOR_13_13 = 16.25;
export const FACTOR_13_14 = 17.5;
export function computeMetric13(data: MetricData13[]): number {
  let sum = 0;
  for (const item of data) {
    sum += item.value * FACTOR_13_01;
  }
  return Math.round(sum * 100) / 100;
}
export const THRESHOLD_13_01 = 100;
export const THRESHOLD_13_02 = 200;
export const THRESHOLD_13_03 = 300;
export const THRESHOLD_13_04 = 400;
export const THRESHOLD_13_05 = 500;
export const THRESHOLD_13_06 = 600;
export const THRESHOLD_13_07 = 700;
export const THRESHOLD_13_08 = 800;
export const THRESHOLD_13_09 = 900;
export const THRESHOLD_13_10 = 1000;
export const THRESHOLD_13_11 = 1100;
export const THRESHOLD_13_12 = 1200;
export const THRESHOLD_13_13 = 1300;
export const THRESHOLD_13_14 = 1400;
export const THRESHOLD_13_15 = 1500;
export const THRESHOLD_13_16 = 1600;
export const THRESHOLD_13_17 = 1700;
export const THRESHOLD_13_18 = 1800;
export const THRESHOLD_13_19 = 1900;
