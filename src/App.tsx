import { useEffect, useState } from "react";
import { loadNote, saveNote } from "./utils/notes";

import Header from "./components/Header";
import ProgressCard from "./components/ProgressCard";
import TaskItem from "./components/TaskItem";
import {
  saveVision,
  loadVision,
} from "./utils/vision";

import { useTasks } from "./hooks/useTasks";
import {
  getStats,
  getBestStreak,
} from "./utils/stats";
import Heatmap from "./components/Heatmap";
import {
  calculateWeekCompletion,
  calculatePerfectDayStreak,
} from "./utils/streaks";

import {
  getDayProgress,
  getWeekProgress,
  getMonthProgress,
  getYearProgress,
} from "./utils/progress";


function App() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [newTask, setNewTask] = useState("");
  const [visionImage, setVisionImage] =
  useState<string | null>(
    loadVision()
  );
    const [note, setNote] = useState(loadNote());
    useEffect(() => {
    saveNote(note);
  }, [note]);

  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
  } = useTasks();
  
  const stats = getStats(tasks);
  const bestStreak =
  getBestStreak(tasks);
  

  const [timeData, setTimeData] = useState({
    day: getDayProgress(),
    week: getWeekProgress(),
    month: getMonthProgress(),
    year: getYearProgress(),
  });
   useEffect(() => {
      saveNote(note);
    }, [note]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeData({
        day: getDayProgress(),
        week: getWeekProgress(),
        month: getMonthProgress(),
        year: getYearProgress(),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
   
  const handleVisionUpload = (
  e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = () => {
      const image =
        reader.result as string;

      setVisionImage(image);
      saveVision(image);
    };

    reader.readAsDataURL(file);
  };
  return (
    <div
      className="
      min-h-screen
      bg-zinc-950
      text-white
      p-5
      "
    >
      <div className="w-[380px] mx-auto">
        <Header />

        <div className="space-y-4">

          {/* TODAY */}

          <ProgressCard
            title="Today"
            progress={timeData.day}
            subtitle={`${tasks.filter((t) => !t.completed).length} tasks remaining`}
            expanded={expanded === "today"}
            onClick={() =>
              setExpanded(
                expanded === "today"
                  ? null
                  : "today"
              )
            }
          />

          

          {expanded === "today" && (
            <div
              className="
              bg-white/[0.04]
              border border-white/10
              rounded-3xl
              p-4
              backdrop-blur-xl
              shadow-[0_0_40px_rgba(99,102,241,0.15)]
              -mt-2
              "
            > 
               <div className="mb-4">
                <p className="text-zinc-400 text-sm">
                  Today's Tasks
                </p>
              </div>
              <div className="space-y-2">
                {tasks.length === 0 && (
                        <div className="text-center py-6 text-zinc-500">
                          No tasks yet. Add your first task.
                        </div>
                      )}

                {
                  
                tasks.map((task) => (
                  
                  <TaskItem
                    key={task.id}
                    title={task.title}
                    completed={task.completed}
                    onToggle={() =>
                      toggleTask(task.id)
                    }
                    onDelete={() =>
                      deleteTask(task.id)
                    }
                  />
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <input
                  value={newTask}
                  onChange={(e) =>
                    setNewTask(e.target.value)
                  }
                  placeholder="Add a task..."
                  className="
                  w-full
                  rounded-xl
                  bg-white/5
                  border border-white/10
                  p-3
                  outline-none
                  focus:border-indigo-400
                  "
                />

                <button
                  onClick={() => {
                    addTask(newTask);
                    setNewTask("");
                  }}
                  className="
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-indigo-500
                  to-violet-500
                  py-3
                  hover:opacity-90
                  transition
                  "
                >
                  Add Task
                </button>
                <textarea
                  value={note}
                  onChange={(e) =>
                    setNote(e.target.value)
                  }
                  placeholder="What is today's focus?"
                  className="
                    w-full
                    mt-4
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    p-3
                    resize-none
                    h-24
                  "
                />
              </div>
            </div>
          )}

          {/* WEEK */}

          <ProgressCard
            title="Week"
            progress={timeData.week}
            subtitle={`${calculatePerfectDayStreak(tasks)} day streak`}
            expanded={expanded === "week"}
            onClick={() =>
              setExpanded(
                expanded === "week"
                  ? null
                  : "week"
              )
            }
          />

          {expanded === "week" && (
            <div
              className="
              bg-white/[0.04]
              border border-white/10
              rounded-3xl
              p-4
              backdrop-blur-xl
              shadow-[0_0_40px_rgba(99,102,241,0.15)]
              -mt-2
              "
            >
               <p className="text-zinc-400 text-sm">
                  Total Tasks
                </p>

                <h3 className="text-xl font-semibold">
                  {tasks.length}
                </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-zinc-400 text-sm">
                    Current Streak
                  </p>

                  <h3 className="text-3xl font-semibold">
                    {calculatePerfectDayStreak(tasks)}
                  </h3>
                </div>

                <div>
                  <p className="text-zinc-400 text-sm">
                    Weekly Completion
                  </p>

                  <h3 className="text-3xl font-semibold">
                    {calculateWeekCompletion(tasks)}%
                  </h3>
                </div>

                <div>
                  <div className="h-3 rounded-full bg-white/10">
                    <div
                      className="
                      h-3
                      rounded-full
                      bg-gradient-to-r
                      from-indigo-500
                      via-violet-500
                      to-fuchsia-500
                      "
                      style={{
                        width: `${calculateWeekCompletion(
                          tasks
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-zinc-500">
                  Total
                </p>

                <p className="text-lg font-semibold">
                  {stats.total}
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-zinc-500">
                  Done
                </p>

                <p className="text-lg font-semibold">
                  {stats.completed}
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-zinc-500">
                  Rate
                </p>

                <p className="text-lg font-semibold">
                  {stats.completionRate}%
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-zinc-500">
                  Best
                </p>

                <p className="text-lg font-semibold">
                  {bestStreak}
                </p>
              </div>
            </div>
            </div>
          )}

         {/* CONSISTENCY */}

        <ProgressCard
          title="Consistency"
          progress={timeData.month}
          subtitle="Build momentum every day"
          expanded={expanded === "month"}
          onClick={() =>
            setExpanded(
              expanded === "month"
                ? null
                : "month"
            )
          }
        />

        {expanded === "month" && (
          <div
            className="
            bg-white/[0.04]
            border border-white/10
            rounded-3xl
            p-4
            backdrop-blur-xl
            shadow-[0_0_40px_rgba(99,102,241,0.15)]
            -mt-2
            "
          >
            <div className="space-y-5">

              <div>
                <p className="text-zinc-400 text-sm mb-3">
                  Monthly Activity
                </p>

                <Heatmap tasks={tasks} />
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div
                  className="
                  bg-white/5
                  rounded-2xl
                  p-4
                  "
                >
                  <p className="text-zinc-500 text-xs">
                    Perfect Streak
                  </p>

                  <h3 className="text-3xl font-semibold mt-2">
                    {calculatePerfectDayStreak(tasks)}
                  </h3>

                  <p className="text-xs text-zinc-500 mt-1">
                    days
                  </p>
                </div>

                <div
                  className="
                  bg-white/5
                  rounded-2xl
                  p-4
                  "
                >
                  <p className="text-zinc-500 text-xs">
                    Completion
                  </p>

                  <h3 className="text-3xl font-semibold mt-2">
                    {calculateWeekCompletion(tasks)}%
                  </h3>

                  <p className="text-xs text-zinc-500 mt-1">
                    this month
                  </p>
                </div>

              </div>

              <div
                className="
                rounded-2xl
                bg-white/5
                p-4
                "
              >
                <p className="text-zinc-500 text-xs">
                  Consistency Reminder
                </p>

                <p className="mt-2 text-sm">
                  Small actions repeated daily
                  create extraordinary results.
                </p>
              </div>

            </div>
          </div>
        )}

          {/* VISION */}

          <ProgressCard
            title="Vision"
            progress={timeData.year}
            subtitle="A glimpse of your future"
            expanded={expanded === "year"}
            onClick={() =>
              setExpanded(
                expanded === "year"
                  ? null
                  : "year"
              )
            }
          />

          {expanded === "year" && (
            <div
              className="
              bg-white/[0.04]
              border border-white/10
              rounded-3xl
              p-4
              backdrop-blur-xl
              shadow-[0_0_40px_rgba(99,102,241,0.15)]
              -mt-2
              "
            >
              <div className="space-y-4">

                <p className="text-zinc-400 text-sm">
                  Vision Board
                </p>

                <label
                  className="
                  h-72
                  rounded-2xl
                  border-2
                  border-dashed
                  border-white/10
                  bg-white/5
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  overflow-hidden
                  hover:border-indigo-400/40
                  transition-all
                  "
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file =
                        e.target.files?.[0];

                      if (file) {
                        setVisionImage(
                          URL.createObjectURL(file)
                        );
                      }
                    }}
                  />

                  {visionImage ? (
                      <img
                        src={visionImage}
                        alt="Vision Board"
                        className="
                          w-full
                          rounded-2xl
                          object-cover
                          max-h-72
                        "
                      />
                    ) : (
                      <label
                        className="
                          h-52
                          rounded-2xl
                          border-2
                          border-dashed
                          border-white/10
                          bg-white/5
                          flex
                          items-center
                          justify-center
                          cursor-pointer
                        "
                      >
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={
                            handleVisionUpload
                          }
                        />

                        <p className="text-zinc-400">
                          Upload Vision Board
                        </p>
                      </label>
                    )}
                </label>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;