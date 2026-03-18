export const isRecentEnough = (orderDate) => {
  const orderTime = new Date(orderDate).getTime();
  const currentTime = new Date().getTime();

  const twelveHours = 12 * 60 * 60 * 1000;

  return currentTime - orderTime <= twelveHours;
};
