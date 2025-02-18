import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import ToDo from "./components/ToDo";
import { useDrop } from "react-dnd";

function App() {
    const [taskList, setTaskList] = useState([]);
    const [completed, setCompleted] = useState([]);

    // Load tasks from localStorage when the component mounts
    useEffect(() => {
        const savedTasks = localStorage.getItem("tasklist");
        if (savedTasks) setTaskList(JSON.parse(savedTasks));

        const savedCompleted = localStorage.getItem("completedTasks");
        if (savedCompleted) setCompleted(JSON.parse(savedCompleted));
    }, []);

    // Save tasks to localStorage whenever taskList or completed list changes
    useEffect(() => {
        localStorage.setItem("tasklist", JSON.stringify(taskList));
        localStorage.setItem("completedTasks", JSON.stringify(completed));
    }, [taskList, completed]);

    // Handle dropping tasks into Completed Section
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "todo",
      drop: (item) => addToCompleted(item.id),  // Ensure we're passing the correct task ID
      collect: (monitor) => ({
          isOver: !!monitor.isOver(),
      }),
  }));
  
    const addToCompleted = (id) => {
      // Ensure taskList contains tasks with unique IDs
      const taskToMove = taskList.find((task) => task.id === id);
      if (!taskToMove) return;  // Prevents errors if task isn't found
  
      // Remove task from To-Do list
      const updatedTasks = taskList.filter((task) => task.id !== id);
      setTaskList(updatedTasks);
  
      // Move task to Completed list
      setCompleted((prevCompleted) => [...prevCompleted, taskToMove]);
  
      // Save updated lists to localStorage
      localStorage.setItem("tasklist", JSON.stringify(updatedTasks));
      localStorage.setItem("completedTasks", JSON.stringify([...completed, taskToMove]));
  };
  
    return (
        <>
            <div>
                <h1 className="text-2xl font-bold py-4 pl-6">Welcome</h1>
                <p className="text-xl pl-6">Hi There</p>
                <div className="flex flex-row items-center">
                    <p className="text-xl pl-6">Click</p>
                    <AddTask taskList={taskList} setTaskList={setTaskList} />
                    <p className="text-xl pl-2">to add a new task</p>
                </div>

                <div className="flex flex-row">
                    {/* To-Do List */}
                    <div className="w-1/2">
                        <h2 className="ml-6 text-xl font-semibold w-3/4 max-w-lg my-4 py-1 px-2 bg-gray-200">
                            To-Do:
                        </h2>
                        {taskList.map((task, i) => (
                            <ToDo
                                key={task.id || i}
                                task={task}
                                index={i}
                                taskList={taskList}
                                setTaskList={setTaskList}
                            />
                        ))}
                    </div>

                    {/* Completed Tasks Drop Zone */}
                    <div
                        className={`w-1/2 flex flex-col border border-dashed border-gray-500 p-4 transition-all ${
                            isOver ? "bg-gray-300" : "bg-white"
                        }`}
                        ref={drop}
                    >
                        <h2 className="ml-6 text-xl font-semibold w-3/4 max-w-lg my-4 py-1 px-2 bg-gray-200">
                            Completed:
                        </h2>
                        {completed.map((task, i) => (
                            <div
                                key={task.id || i}
                                className="bg-green-300 text-white p-4 my-2 rounded"
                            >
                                <p className="font-semibold">{task.projectName}</p>
                                <p className="text-sm">{task.taskDesc}</p>
                                <p className="text-xs">
                                    Completed on: {new Date(task.timestamp).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
