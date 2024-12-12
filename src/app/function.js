export function formatCurrency(number) {
  try {
    return Number(number || 0).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  } catch (error) {
    return "";
  }
}
export function capitalizeFirstLetter(string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}
