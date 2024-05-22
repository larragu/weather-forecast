const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const formatForecastDate = (dateString: string): string => {
  const date = new Date(dateString);
  const dayOfWeek = days[date.getDay()];
  const dayOfMonth = date.getDate() + 1; // Adding 1 because months are zero-based

  const formattedDate = `${dayOfWeek} ${dayOfMonth}`;

  return formattedDate;
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
  const day = ("0" + date.getDate()).slice(-2);

  //"YYYY-MM-DD" format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

const getCurrentLocalDate = (): Date => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  const localDate = new Date(year, month, day);

  return localDate;
};

const createFutureDateString = (
  originalDatestring: string,
  days: number
): string => {
  const originalDate = new Date(originalDatestring);

  // Add x days to the original date
  originalDate.setDate(originalDate.getDate() + days);

  const futureDateString = originalDate.toISOString().split("T")[0];

  return futureDateString;
};

getCurrentLocalDate;

export {
  formatForecastDate,
  createFutureDateString,
  formatDate,
  getCurrentLocalDate,
};
