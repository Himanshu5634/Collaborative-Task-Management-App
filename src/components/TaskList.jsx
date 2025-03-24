import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/taskSlice";

const TaskList = ({ setTaskToEdit }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

    
  return (
    <div className="task-list">
      {tasks.length === 0 ? <p>No tasks added yet.</p> : (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Due:</strong> {task.dueDate}</p>
            <button onClick={() => setTaskToEdit(task)}>Edit</button>
            <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
