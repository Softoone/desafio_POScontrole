import { getReport } from "../services/Api";

export const currentDate = () => {
  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
  return date;
};

export const isAuthenticated = () => !!localStorage.getItem("authorized");
