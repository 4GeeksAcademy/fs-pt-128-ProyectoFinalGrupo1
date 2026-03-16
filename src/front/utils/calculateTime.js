export const calculateTime = (time) => {
  const diffMs = new Date() - new Date(time);
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Ahora mismo";
  else if (diffMin < 60) return `Hace ${diffMin} minutos`;
  else if (diffMin < 1440) return `Hace ${Math.floor(diffMin / 60)} horas`;
  else if (diffMin < 2880) return `Hace ${Math.floor(diffMin / 1440)} dias`;
};
