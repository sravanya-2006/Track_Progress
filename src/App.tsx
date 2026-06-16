import { Calendar } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
      <Calendar size={50} />
      <h1 className="text-3xl font-bold">TimeFlow</h1>
    </div>
  );
}

export default App;