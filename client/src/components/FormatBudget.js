export const formatBudget = (amount) => {
  if (!amount || isNaN(amount)) return "";
  const num = Number(amount);
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    return `${(num / 100000).toFixed(2)} Lac`;
  }
  return num.toLocaleString("en-IN");
};
