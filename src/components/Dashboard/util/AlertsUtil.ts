export function convertTimestamp(timestamp: string): string {
  const inputDate = new Date(timestamp);
  const hours = inputDate.getUTCHours();
  const minutes = inputDate.getUTCMinutes();
  const outputDate = new Date(
    inputDate.getUTCFullYear(),
    inputDate.getUTCMonth(),
    inputDate.getUTCDate(),
    hours,
    minutes,
    0
  );

  const localDateString = outputDate.toLocaleString();
  let localDate = new Date(localDateString);

  const formattedDate = `${localDate.getDate()} ${getMonthName(
    localDate.getMonth() + 1
  )} ${localDate.getFullYear()} at ${formatTime(localDate)}`;

  return formattedDate;
}

function getMonthName(month: number): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[month - 1];
}

function formatTime(date: Date): string {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

  return `${formattedHours}:${formattedMinutes}`;
}
