import { Trash2 } from "lucide-react";

type Props = {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TaskItem({
  title,
  completed,
  onToggle,
  onDelete,
}: Props) {
  return (
    <div
      className="
      flex
      items-center
      justify-between
      rounded-xl
      bg-white/5
      p-3
      "
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
        />

        <span
          className={
            completed
              ? "line-through text-zinc-500"
              : ""
          }
        >
          {title}
        </span>
      </div>

      <button onClick={onDelete}>
        <Trash2 size={16} />
      </button>
    </div>
  );
}