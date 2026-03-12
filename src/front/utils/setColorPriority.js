export const getPriorityColor = (priority) => {
  switch (priority) {
    case 1:
      return "rgb(243, 142, 152)";
    case 2:
      return "rgb(250, 195, 140)";
    case 3:
      return "rgb(253, 232, 157)";
    case 4:
      return "rgb(172, 236, 172)";
    case 5:
      return "rgb(167, 226, 255)";
    default:
      return "rgba(255, 255, 255, 1)";
  }
};

