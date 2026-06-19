import type { Task } from "../types/task";

export function carryForwardTasks(
  tasks: Task[]
): Task[] {
  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const yesterday = new Date();

  yesterday.setDate(
    yesterday.getDate() - 1
  );

  const yesterdayDate =
    yesterday
      .toISOString()
      .split("T")[0];

  const unfinishedYesterday =
    tasks.filter(
      (task) =>
        task.date === yesterdayDate &&
        !task.completed
    );

  const alreadyExistsToday =
    tasks.some(
      (task) =>
        task.date === today &&
        task.carried
    );

  if (
    unfinishedYesterday.length === 0 ||
    alreadyExistsToday
  ) {
    return tasks;
  }

  const carriedTasks =
    unfinishedYesterday.map(
      (task) => ({
        ...task,
        id:
          Date.now().toString() +
          Math.random(),
        date: today,
        carried: true,
      })
    );

  return [
    ...tasks,
    ...carriedTasks,
  ];
}