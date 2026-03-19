export const calculateMedia = (incomes) => {
  const pacientWaiting = incomes.filter((t) => t.state == "Esperando consulta");

  if (pacientWaiting.length === 0) return 0;

  const total = pacientWaiting.reduce(
    (acc, curr) => acc + curr.checkpoint_triage,
    0,
  );
  return Math.round(total / pacientWaiting.length);
};
export const calculateMediaConsult = (incomes) => {
  const pacientWaiting = incomes.filter((t) => t.state == "Alta");

  if (pacientWaiting.length === 0) return 0;

  const total = pacientWaiting.reduce(
    (acc, curr) => acc + curr.checkpoint_triage,
    0,
  );
  return Math.round(total / pacientWaiting.length);
};
