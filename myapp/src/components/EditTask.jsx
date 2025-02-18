import { useEffect, useState } from "react";

const EditTask = ({ task, index, taskList, setTaskList }) => {
    const [editModal, setEditModal] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");

    // Ensure task updates dynamically
    useEffect(() => {
        setProjectName(task.projectName);
        setTaskDesc(task.taskDesc);
    }, [task]);

    const handleUpdate = (e) => {
        e.preventDefault();

        // Update the task in the list based on index
        const updatedTasks = taskList.map((t, i) =>
            i === index ? { ...t, projectName, taskDesc } : t
        );

        setTaskList(updatedTasks);
        setEditModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "projectName") setProjectName(value);
        if (name === "taskDesc") setTaskDesc(value);
    };

    return (
        <>
            {/* Edit Button */}
            <button
                className="bg-gray-400 text-white text-sm uppercase font-semibold py-1.5 px-3 rounded-lg"
                onClick={() => setEditModal(true)}
            >
                Edit
            </button>

            {/* Edit Modal */}
            {editModal && (
                <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
                    <div className="w-9/12 max-w-lg bg-white border rounded-lg shadow-md relative flex flex-col">
                        {/* Modal Header */}
                        <div className="flex flex-row justify-between p-5 border-b border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">Edit Task</h3>
                            <button
                                className="px-1 text-gray-400 text-3xl leading-none font-semibold"
                                onClick={() => setEditModal(false)}
                            >
                                ×
                            </button>
                        </div>

                        {/* Form */}
                        <form className="px-6 pt-6 pb-4" onSubmit={handleUpdate}>
                            <div>
                                <label
                                    className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                                    htmlFor="project-name"
                                >
                                    Project Name
                                </label>
                                <input
                                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                                    id="project-name"
                                    type="text"
                                    placeholder="Project Name"
                                    name="projectName"
                                    value={projectName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    className="track-wide uppercase text-gray-700 text-xs font-semibold mb-2 block"
                                    htmlFor="task-description"
                                >
                                    Task Description
                                </label>
                                <textarea
                                    className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-5 leading-tight focus:outline-none focus:bg-white"
                                    id="task-description"
                                    rows="5"
                                    placeholder="Task Description"
                                    name="taskDesc"
                                    value={taskDesc}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Modal Footer: Cancel & Update Buttons */}
                            <div className="flex justify-end p-6 border-t border-slate-200 rounded-b">
                                <button
                                    className="bg-gray-500 text-white font-semibold uppercase text-sm px-6 py-3 rounded hover:opacity-70 mr-2"
                                    type="button"
                                    onClick={() => setEditModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 text-white font-semibold uppercase text-sm px-6 py-3 rounded hover:opacity-70"
                                    type="submit"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditTask;
