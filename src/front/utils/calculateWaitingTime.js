export const calculateWaitingTime = (time) => {
  const diffMs = new Date() - new Date(time);
  const diffMin = Math.floor(diffMs / 60000);
  return diffMin;
};
