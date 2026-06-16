type StatCardProps = {
  title: string;
  percentage: number;
};

export default function StatCard({
  title,
  percentage,
}: StatCardProps) {
  return (
    <div
      className="
      bg-white/5
      border border-white/10
      rounded-2xl
      p-4
      backdrop-blur-md
      "
    >
      <p className="text-zinc-400 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {percentage}%
      </h2>
    </div>
  );
}