import type { Task } from "../types/task";

export function getStats(tasks: Task[]) {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const completionRate =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        );

  return {
    total,
    completed,
    completionRate,
  };
}

export function getBestStreak(
  tasks: Task[]
) {
  const dates = [
    ...new Set(
      tasks
        .filter(
          (task) => task.completed
        )
        .map(
          (task) => task.date
        )
    ),
  ].sort();

  if (dates.length === 0) {
    return 0;
  }

  let longest = 1;
  let current = 1;

  for (
    let i = 1;
    i < dates.length;
    i++
  ) {
    const prev = new Date(
      dates[i - 1]
    );

    const curr = new Date(
      dates[i]
    );

    const diff =
      (curr.getTime() -
        prev.getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      current++;
    } else {
      current = 1;
    }

    longest = Math.max(
      longest,
      current
    );
  }

  return longest;
}

export function getCompletedTasks(
  tasks: Task[]
) {
  return tasks.filter(
    (task) => task.completed
  ).length;
}

export function getPendingTasks(
  tasks: Task[]
) {
  return tasks.filter(
    (task) => !task.completed
  ).length;
}

export function getTodayCompletion(
  tasks: Task[]
) {
  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const todayTasks =
    tasks.filter(
      (task) =>
        task.date === today
    );

  if (
    todayTasks.length === 0
  ) {
    return 0;
  }

  const completed =
    todayTasks.filter(
      (task) =>
        task.completed
    ).length;

  return Math.round(
    (completed /
      todayTasks.length) *
      100
  );
}