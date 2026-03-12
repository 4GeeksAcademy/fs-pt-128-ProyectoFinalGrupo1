export const calculateAge = (date) => {
  const birthdate = date
  if (!birthdate) return "Cargando...";

  const [birthYear, birthMonth, birthDay] = birthdate.split("-").map(Number);
  const today = new Date();

  const actualYear = today.getFullYear();
  const actualMonth = today.getMonth() + 1;
  const actualDay = today.getDate();

  let age = actualYear - birthYear;
  if (
    actualMonth < birthMonth ||
    (actualMonth === birthMonth && actualDay < birthDay)
  ) {
    age--;
  }
  if (age === 0) {
    let months = actualMonth - birthMonth;
    if (actualDay < birthDay) months--;

    if (months < 0) months += 12;

    return `${months} meses`;
  }
  return `${age} años`;
};
