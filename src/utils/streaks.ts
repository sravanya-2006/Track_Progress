import type { Task } from "../types/task";

export function calculateWeekCompletion(
  tasks: Task[]
): number {
  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(
    sevenDaysAgo.getDate() - 7
  );

  const recentTasks = tasks.filter(
    (task) =>
      new Date(task.date) >= sevenDaysAgo
  );

  if (recentTasks.length === 0) {
    return 0;
  }

  const completedTasks =
    recentTasks.filter(
      (task) => task.completed
    ).length;

  return Math.round(
    (completedTasks /
      recentTasks.length) *
      100
  );
}

export function calculateCurrentStreak(
  tasks: Task[]
): number {
  const completedDays = new Set(
    tasks
      .filter((task) => task.completed)
      .map((task) => task.date)
  );

  let streak = 0;

  const currentDate = new Date();

  while (true) {
    const dateString =
      currentDate
        .toISOString()
        .split("T")[0];

    if (!completedDays.has(dateString)) {
      break;
    }

    streak++;

    currentDate.setDate(
      currentDate.getDate() - 1
    );
  }

  return streak;
}

export function calculatePerfectDayStreak(
  tasks: Task[]
): number {
  const dates = [
    ...new Set(
      tasks.map((task) => task.date)
    ),
  ].sort();

  let streak = 0;

  for (
    let i = dates.length - 1;
    i >= 0;
    i--
  ) {
    const dayTasks = tasks.filter(
      (task) =>
        task.date === dates[i]
    );

    const perfect = dayTasks.every(
      (task) => task.completed
    );

    if (!perfect) {
      break;
    }

    streak++;
  }

  return streak;
}