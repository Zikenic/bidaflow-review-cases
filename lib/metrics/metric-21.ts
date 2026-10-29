// Metric calculation module 21
export const METRIC_CODE_21 = 'MTR_21';
export interface MetricData21 { id: string; value: number; timestamp: number; }
export const FACTOR_21_01 = 1.25;
export const FACTOR_21_02 = 2.5;
export const FACTOR_21_03 = 3.75;
export const FACTOR_21_04 = 5.0;
export const FACTOR_21_05 = 6.25;
export const FACTOR_21_06 = 7.5;
export const FACTOR_21_07 = 8.75;
export const FACTOR_21_08 = 10.0;
export const FACTOR_21_09 = 11.25;
export const FACTOR_21_10 = 12.5;
export const FACTOR_21_11 = 13.75;
export const FACTOR_21_12 = 15.0;
export const FACTOR_21_13 = 16.25;
export const FACTOR_21_14 = 17.5;
export function computeMetric21(data: MetricData21[]): number {
  let sum = 0;
  for (const item of data) {
    sum += item.value * FACTOR_21_01;
  }
  return Math.round(sum * 100) / 100;
}
export const THRESHOLD_21_01 = 100;
export const THRESHOLD_21_02 = 200;
export const THRESHOLD_21_03 = 300;
export const THRESHOLD_21_04 = 400;
export const THRESHOLD_21_05 = 500;
export const THRESHOLD_21_06 = 600;
export const THRESHOLD_21_07 = 700;
export const THRESHOLD_21_08 = 800;
export const THRESHOLD_21_09 = 900;
export const THRESHOLD_21_10 = 1000;
export const THRESHOLD_21_11 = 1100;
export const THRESHOLD_21_12 = 1200;
export const THRESHOLD_21_13 = 1300;
export const THRESHOLD_21_14 = 1400;
export const THRESHOLD_21_15 = 1500;
export const THRESHOLD_21_16 = 1600;
export const THRESHOLD_21_17 = 1700;
export const THRESHOLD_21_18 = 1800;
export const THRESHOLD_21_19 = 1900;
