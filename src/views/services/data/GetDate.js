const toTwoDigits = num => (num < 10 ? "0" + num : num);
let today = new Date();
let year = today.getFullYear();
let month = toTwoDigits(today.getMonth() + 1);
let day = toTwoDigits(today.getDate());
let date_now = `${year}-${month}-${day}`;
export default date_now;