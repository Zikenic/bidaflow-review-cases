export function calculateLoyaltyPoints(totalAmount: number, tierMultiplier = 1.0): number {
  if (totalAmount <= 0) return 0;
  return Math.floor((totalAmount / 10000) * Math.max(1.0, tierMultiplier));
}
