import { useState } from "react";

import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTaskAdded = () => {
    setRefresh(!refresh); // Change la clé pour forcer le rafraîchissement
  };

  return (
    <div>
      <h1>Gestionnaire de Tâches</h1>
      <AddTask onTaskAdded={handleTaskAdded} />
      <TaskList key={refresh.toString()} />
    </div>
  );
}

export default App;
