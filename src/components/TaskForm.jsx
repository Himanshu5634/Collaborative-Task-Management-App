import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../features/taskSlice";


const TaskForm = ({ taskToEdit, setTaskToEdit }) => {
  const [title, setTitle] = useState(""); // State to store the task title
  const [description, setDescription] = useState(""); // State to store the task description
  const [dueDate, setDueDate] = useState(""); // State to store the task due date
  const dispatch = useDispatch(); // Redux dispatch function

  /**
   * Populates the form fields with the taskToEdit data when taskToEdit changes.
   */
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
    }
  }, [taskToEdit]);

  /**
   * Handles the form submission for adding or updating a task.
   * Dispatches the appropriate Redux action based on whether a task is being edited or created.
   * Clears the form fields after submission.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskToEdit) {
      dispatch(updateTask({ id: taskToEdit.id, title, description, dueDate }));
      setTaskToEdit(null); // Reset the taskToEdit state
    } else {
      dispatch(addTask({ id: Date.now(), title, description, dueDate }));
    }

    // Clear the form fields
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button type="submit">{taskToEdit ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
