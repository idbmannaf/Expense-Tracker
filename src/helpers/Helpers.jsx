export const DateFormat = (date) => {
  let newDate = new Date(date);
  //example 15 januarary 2024
  let formatedDate = newDate.format("YYYY");
  return formatedDate;
};
