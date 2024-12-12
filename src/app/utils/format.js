export function formatUSD(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(number));
}
export function shortenContent(content, maxLength = 40) {
  if (content.length > maxLength) {
    return content.substring(0, maxLength) + "...";
  } else {
    return content;
  }
}
export const formatPriceVND = (data) => {
  try {
    const config = {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 9,
    };
    const price = new Intl.NumberFormat("vi-VN", config)
      .format(data || 0)
      .slice(0, -1);
    return price;
  } catch (error) {
    console.log(error);
    return data;
  }
};
