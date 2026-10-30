// Date math shared by the build and the browser. Pages are built ahead of time, so anything that
// depends on today's date is rendered once at build and then corrected in the browser from these.

/** Whole years since a birth date ("YYYY-MM-DD"), counting only completed birthdays */
export function getAge(birthDate, today = new Date()) {
  const [year, month, day] = birthDate.split("-").map(Number);
  let age = today.getFullYear() - year;
  if (today < new Date(today.getFullYear(), month - 1, day)) age--;
  return age;
}

/** Whole years since a start date, counting only completed years */
export function getYearsSince(startDate, now = new Date()) {
  return Math.floor((now.getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
}
