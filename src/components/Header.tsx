import { Calendar } from "lucide-react";

export default function Header() {
  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <Calendar size={22} />
        <h1 className="text-2xl font-semibold">
          TimeFlow
        </h1>
      </div>

      <p className="text-zinc-400 text-sm mt-1">
        {today}
      </p>
    </div>
  );
}