type HeatmapProps = {
  tasks: {
    date: string;
    completed: boolean;
  }[];
};

export default function Heatmap({
  tasks,
}: HeatmapProps) {
  const days = Array.from(
    { length: 30 },
    (_, i) => {
      const date = new Date();

      date.setDate(
        date.getDate() - (29 - i)
      );

      const dateString =
        date
          .toISOString()
          .split("T")[0];

      const dayTasks =
        tasks.filter(
          (task) =>
            task.date === dateString
        );

      let level = 0;

      if (dayTasks.length > 0) {
        const completed =
          dayTasks.filter(
            (task) =>
              task.completed
          ).length;

        const ratio =
          completed /
          dayTasks.length;

        if (ratio === 1) level = 4;
        else if (ratio >= 0.75)
          level = 3;
        else if (ratio >= 0.5)
          level = 2;
        else level = 1;
      }

      return level;
    }
  );

  const colors = [
    "bg-zinc-800",
    "bg-blue-900",
    "bg-blue-700",
    "bg-indigo-500",
    "bg-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.8)]",
  ];

  return (
    <div className="grid grid-cols-6 gap-2">
      {days.map(
        (level, index) => (
          <div
            key={index}
            className={`
              w-5
              h-5
              rounded-md
              ${colors[level]}
            `}
          />
        )
      )}
    </div>
  );
}