export function formatCurrency({ amount = 0, currencyCode = "USD" } = {}) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}
