const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatForecastDate = (dateString: string) => {
  const date = new Date(dateString);
  const dayOfWeek = days[date.getDay()];
  const dayOfMonth = date.getDate();

  const formattedDate = `${dayOfWeek} ${dayOfMonth}`;

  return formattedDate;
};

export { formatForecastDate };
