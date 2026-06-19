import type { Task } from "../types/task";

export function getDailyCompletion(
  tasks: Task[],
  date: string
) {
  const dayTasks = tasks.filter(
    (task) => task.date === date
  );

  if (dayTasks.length === 0) {
    return 0;
  }

  const completed =
    dayTasks.filter(
      (task) => task.completed
    ).length;

  return completed / dayTasks.length;
}