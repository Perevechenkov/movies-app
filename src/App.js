import { useCallback, useEffect, useState } from 'react';

import NewTask from './components/NewTask/NewTask';
import Tasks from './components/Tasks/Tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const responce = await fetch(
        'https://movies-dummy-db-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
      );

      if (!responce.ok) {
        throw new Error(responce.statusText);
      }

      const tasks = await responce.json();

      const loadedTasks = [];

      for (const taskKey in tasks) {
        loadedTasks.push({ id: taskKey, text: tasks[taskKey].text });
      }

      setTasks(loadedTasks);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

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
        onFetch={fetchMoviesHandler}
      />
    </>
  );
}

export default App;
