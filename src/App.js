import { useEffect, useState } from 'react';

import NewTask from './components/NewTask/NewTask';
import Tasks from './components/Tasks/Tasks';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = tasksObj => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      {
        url: 'https://movies-dummy-db-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        headers: {},
      },
      transformTasks
    );
  }, [fetchTasks]);

  const addTaskHandler = async task => {
    setTasks(prevTasks => prevTasks.concat(task));
  };

  return (
    <>
      <NewTask onAddTask={addTaskHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </>
  );
}

export default App;
