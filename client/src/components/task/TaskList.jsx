import { TaskCard } from "./TaskCard";

export function TaskList({ task }) {
    return (
        <div>
            {task.map((task) => (
                <TaskCard key={task._id} task={task} />
            ))}
        </div>
    );
}

