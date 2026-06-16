import Header from "./components/Header";
import StatCard from "./components/StatCard";

import {
  getDayProgress,
  getWeekProgress,
  getMonthProgress,
  getYearProgress,
} from "./utils/progress";

function App() {
  return (
    <div className="w-[380px] min-h-[550px] bg-zinc-950 text-white p-5">
      <Header />

      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Day"
          percentage={Number(getDayProgress().toFixed(1))}
        />

        <StatCard
          title="Week"
          percentage={Number(getWeekProgress().toFixed(1))}
        />

        <StatCard
          title="Month"
          percentage={Number(getMonthProgress().toFixed(1))}
        />

        <StatCard
          title="Year"
          percentage={Number(getYearProgress().toFixed(1))}
        />
      </div>
    </div>
  );
}

export default App;