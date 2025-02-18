import { useEffect, useState } from "react";
import EditTask from "./EditTask";
import { useDrag } from "react-dnd";

const ToDo = ({ task, index, taskList, setTaskList }) => {
    const [time, setTime] = useState(task.duration);
    const [running, setRunning] = useState(false);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "todo",
        item: {
            id: task.id,  // Ensure we are passing the correct unique identifier
            projectName: task.projectName,
            taskDesc: task.taskDesc,
            timestamp: task.timestamp,
            duration: task.duration
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } 
        
        return () => clearInterval(interval); // Cleanup function to prevent memory leaks
    }, [running]);

    const handleDelete = () => {
        const updatedTasks = taskList.filter((_, i) => i !== index);
        setTaskList(updatedTasks);
    };

    return (
        <div className="flex flex-col items-start 
            justify-start bg-white my-4 ml-6 py-4 px-6 w-3/4 max-w-lg" ref={drag}>
            
            {/* Task Title and Edit Option */}
            <div className="w-full flex flex-row justify-between">
                <p className="font-semibold text-xl">{task.projectName}</p>
                <EditTask task={task} index={index} taskList={taskList} setTaskList={setTaskList} />
            </div>

            {/* Task Description */}
            <p className="text-lg py-2">{task.taskDesc}</p>
            
            {/* Timer Section */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-evenly">
                <div className="sm:w-1/4 text-xl font-semibold py-4">
                    <span>{("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                    <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                    <span className="text-sm">{("0" + ((time / 10) % 100)).slice(-2)}</span>
                </div>
                <div className="w-1/3 max-w-sm flex flex-row justify-evenly gap-2">
                    {running ? (
                        <button 
                            className="border rounded-lg py-1 px-3"
                            onClick={() => setRunning(false)}
                        >
                            Stop
                        </button>
                    ) : (
                        <button 
                            className="border rounded-lg py-1 px-3" 
                            onClick={() => setRunning(true)}
                        >
                            Start
                        </button>
                    )}
                    <button 
                        className="border rounded-lg py-1 px-3"
                        onClick={() => {
                            setTime(0);
                            setRunning(false); // Stop the timer when resetting
                        }}
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Delete Task Button */}
            <div className="w-full flex justify-center">
                <button 
                    className="bg-red-500 text-white text-sm uppercase font-semibold py-1.5 px-3 mt-6 mb-1 rounded-lg"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ToDo;
