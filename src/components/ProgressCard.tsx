import { motion } from "framer-motion";

type ProgressCardProps = {
  title: string;
  progress: number;
  subtitle: string;
  expanded: boolean;
  onClick: () => void;
};

export default function ProgressCard({
  title,
  progress,
  subtitle,
  expanded: _expanded,
  onClick,
}: ProgressCardProps) {
  return (
    <motion.div
      layout
      onClick={onClick}
      whileHover={{
            y: -3,
            scale: 1.01,
        }}
      className="
        cursor-pointer
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-4
        overflow-hidden
        shadow-[0_0_30px_rgba(255,255,255,0.03)]
        hover:border-indigo-400/30
        transition-all
        duration-300
        "
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-lg">
            {title}
          </h3>

          <p className="text-zinc-400 text-sm">
            {subtitle}
          </p>
        </div>

        <div className="text-2xl font-bold">
          {progress.toFixed(0)}%
        </div>
      </div>

      <div className="mt-3 h-2 rounded-full bg-white/10">
        <motion.div
          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
          initial={{ width: 0 }}
          animate={{
            width: `${progress}%`,
          }}
        />
      </div>

     
    </motion.div>
  );
}