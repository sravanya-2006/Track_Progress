import { Calendar } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <Calendar size={28} />
      <div>
        <h1 className="text-2xl font-bold">TimeFlow</h1>
        <p className="text-sm text-zinc-400">
          Visualize your time
        </p>
      </div>
    </div>
  );
}