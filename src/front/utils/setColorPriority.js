export const getPriorityColor = (priority) => {
  switch (priority) {
    case 1:
      return "rgb(248, 109, 123)";
    case 2:
      return "rgb(252, 172, 93)";
    case 3:
      return "rgb(248, 224, 138)";
    case 4:
      return "rgb(138, 240, 138)";
    case 5:
      return "rgb(167, 226, 255)";
    default:
      return "rgba(255, 255, 255, 1)";
  }
};

