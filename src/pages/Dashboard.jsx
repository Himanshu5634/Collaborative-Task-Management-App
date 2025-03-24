import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskComments from "../components/TaskComments";

const Dashboard = () => {
  const [taskToEdit, setTaskToEdit] = useState(null);

  return (
    <>
      <div className="dashboard">
        <h2>Task Management</h2>
        <TaskForm taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
      </div>
      <TaskList setTaskToEdit={setTaskToEdit} />
      <TaskComments />
    </>
  );
};

export default Dashboard;
