export const calculateWaiting = (time) => {
  if (time < 60) return ` ${time} minutos`;
  else if (time < 1440) return ` ${Math.floor(time / 60)} horas`;
  else if (time < 2880) return ` ${Math.floor(time / 1440)} dias`;
};
