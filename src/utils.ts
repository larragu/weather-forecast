const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const formatForecastDate = (dateString: string): string => {
  const date = new Date(dateString);
  const dayOfWeek = days[date.getDay()];
  const dayOfMonth = date.getDate() + 1; // Adding 1 because months are zero-based

  const formattedDate = `${dayOfWeek} ${dayOfMonth}`;

  return formattedDate;
};

const createNextDateString = (futureDay: number): string => {
  const date = new Date();

  date.setDate(date.getDate() + futureDay);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
  const day = ("0" + date.getDate()).slice(-2);

  //"YYYY-MM-DD" format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export { formatForecastDate, createNextDateString };
