import { useState } from "react";

export default function AddTask({ taskList, setTaskList }) {
    const [addModal, setAddModal] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleAdd = (e) => {
        e.preventDefault();

        if (!projectName) {
            setErrorMessage("Enter project name to continue");
            return;
        }

        let timestamp = new Date().toISOString(); // Save timestamp as string
        let newTask = {
            projectName,
            taskDesc,
            timestamp: timestamp,
            duration: 0,
        };

        // Update state correctly
        const updatedTasks = [...taskList, newTask];
        setTaskList(updatedTasks);

        // Save to localStorage
        localStorage.setItem("tasklist", JSON.stringify(updatedTasks)); // Fixed typo

        // Clear input fields and close modal
        setProjectName("");
        setTaskDesc("");
        setErrorMessage("");
        setAddModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "projectName") {
            setProjectName(value);
            setErrorMessage("");
        }
        if (name === "taskDesc") setTaskDesc(value);
    };

    return (
        <>
            {/* Add Task Button */}
            <button
                className="bg-blue-500 text-white uppercase text-sm font-semibold py-1 mx-1.5 pl-2 pr-2.5 rounded hover:opacity-70"
                type="button"
                onClick={() => setAddModal(true)}
            >
                + New
            </button>

            {/* Add Task Modal */}
            {addModal && (
                <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
                    <div className="w-9/12 max-w-lg bg-white border rounded-lg shadow-md relative flex flex-col">
                        {/* Modal Header */}
                        <div className="flex flex-row justify-between p-5 border-b border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">Please Enter A Task</h3>
                            <button
                                className="px-1 text-gray-400 text-3xl leading-none font-semibold"
                                onClick={() => setAddModal(false)}
                            >
                                ×
                            </button>
                        </div>

                        {/* Task Form */}
                        <form className="px-6 pt-6 pb-4" onSubmit={handleAdd}>
                            <div>
                                <label
                                    className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                                    htmlFor="project-name"
                                >
                                    Project Name
                                </label>
                                <input
                                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-light focus:outline-none focus:bg-white"
                                    id="project-name"
                                    type="text"
                                    placeholder="Project Name"
                                    name="projectName"
                                    value={projectName}
                                    onChange={handleInputChange}
                                    required
                                />
                                <p className="text-red-500 text-center mt-2 mb-5">{errorMessage}</p>
                            </div>
                            <div>
                                <label
                                    className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                                    htmlFor="task-description"
                                >
                                    Task Description
                                </label>
                                <textarea
                                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-light focus:outline-none focus:bg-white"
                                    id="task-description"
                                    rows="5"
                                    placeholder="Task Description"
                                    name="taskDesc" // Fixed name here
                                    value={taskDesc}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Modal Footer Buttons */}
                            <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
                                <button
                                    className="bg-gray-500 text-white font-semibold uppercase text-sm px-6 py-3 rounded hover:opacity-70 mr-2"
                                    type="button"
                                    onClick={() => setAddModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 text-white font-semibold uppercase text-sm px-6 py-3 rounded hover:opacity-70"
                                    type="submit"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
