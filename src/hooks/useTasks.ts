import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { carryForwardTasks }
from "../utils/carryForward";
import {
  loadTasks,
  saveTasks,
} from "../utils/storage";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
  const storedTasks =
    loadTasks();

  const updatedTasks =
    carryForwardTasks(
      storedTasks
    );

  setTasks(updatedTasks);
}, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title: string) => {
    if (!title.trim()) return;

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      date: today,
      carried: false,
    };

    setTasks((prevTasks) => [
      ...prevTasks,
      newTask,
    ]);
  };

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.filter(
        (task) => task.id !== id
      )
    );
  };

  const clearCompletedTasks = () => {
    setTasks((prevTasks) =>
      prevTasks.filter(
        (task) => !task.completed
      )
    );
  };

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks /
            tasks.length) *
            100
        );

  return {
    tasks,

    addTask,
    toggleTask,
    deleteTask,
    clearCompletedTasks,

    completedTasks,
    pendingTasks,
    completionRate,
  };
}