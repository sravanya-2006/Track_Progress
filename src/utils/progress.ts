export function getDayProgress() {
  const now = new Date();

  const secondsPassed =
    now.getHours() * 3600 +
    now.getMinutes() * 60 +
    now.getSeconds();

  return (secondsPassed / 86400) * 100;
}

export function getWeekProgress() {
  const now = new Date();

  const dayOfWeek = now.getDay();
  const secondsPassedToday =
    now.getHours() * 3600 +
    now.getMinutes() * 60 +
    now.getSeconds();

  const totalSecondsPassed =
    dayOfWeek * 86400 + secondsPassedToday;

  return (totalSecondsPassed / (7 * 86400)) * 100;
}

export function getMonthProgress() {
  const now = new Date();

  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0
  ).getDate();

  const currentDay = now.getDate() - 1;

  const secondsPassedToday =
    now.getHours() * 3600 +
    now.getMinutes() * 60 +
    now.getSeconds();

  return (
    ((currentDay + secondsPassedToday / 86400) /
      daysInMonth) *
    100
  );
}

export function getYearProgress() {
  const now = new Date();

  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear() + 1, 0, 1);

  return (
    ((now.getTime() - start.getTime()) /
      (end.getTime() - start.getTime())) *
    100
  );
}