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

export const setStorage = (token) => {
  localStorage.setItem("authorized", token);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("authorized");
};

export const getStorage = () => {
  const token = localStorage.getItem("authorized");
  console.log(token);
  return token;
};
