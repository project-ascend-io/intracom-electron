export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30));

  if (diffInMonths >= 1) {
    return `${diffInMonths}m`;
  } else if (diffInDays >= 1) {
    return `${diffInDays}d`;
  } else if (diffInHours >= 1) {
    return `${diffInHours}h`;
  } else {
    return `${diffInMinutes}m`;
  }
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const amOrPm = hours >= 12 ? "pm" : "am";
  const twelveHourFormat = hours % 12 || 12;
  return `${twelveHourFormat}:${minutes} ${amOrPm}`;
};
