// Metric calculation module 14
export const METRIC_CODE_14 = 'MTR_14';
export interface MetricData14 { id: string; value: number; timestamp: number; }
export const FACTOR_14_01 = 1.25;
export const FACTOR_14_02 = 2.5;
export const FACTOR_14_03 = 3.75;
export const FACTOR_14_04 = 5.0;
export const FACTOR_14_05 = 6.25;
export const FACTOR_14_06 = 7.5;
export const FACTOR_14_07 = 8.75;
export const FACTOR_14_08 = 10.0;
export const FACTOR_14_09 = 11.25;
export const FACTOR_14_10 = 12.5;
export const FACTOR_14_11 = 13.75;
export const FACTOR_14_12 = 15.0;
export const FACTOR_14_13 = 16.25;
export const FACTOR_14_14 = 17.5;
export function computeMetric14(data: MetricData14[]): number {
  let sum = 0;
  for (const item of data) {
    sum += item.value * FACTOR_14_01;
  }
  return Math.round(sum * 100) / 100;
}
export const THRESHOLD_14_01 = 100;
export const THRESHOLD_14_02 = 200;
export const THRESHOLD_14_03 = 300;
export const THRESHOLD_14_04 = 400;
export const THRESHOLD_14_05 = 500;
export const THRESHOLD_14_06 = 600;
export const THRESHOLD_14_07 = 700;
export const THRESHOLD_14_08 = 800;
export const THRESHOLD_14_09 = 900;
export const THRESHOLD_14_10 = 1000;
export const THRESHOLD_14_11 = 1100;
export const THRESHOLD_14_12 = 1200;
export const THRESHOLD_14_13 = 1300;
export const THRESHOLD_14_14 = 1400;
export const THRESHOLD_14_15 = 1500;
export const THRESHOLD_14_16 = 1600;
export const THRESHOLD_14_17 = 1700;
export const THRESHOLD_14_18 = 1800;
export const THRESHOLD_14_19 = 1900;
