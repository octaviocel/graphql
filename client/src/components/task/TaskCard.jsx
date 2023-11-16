import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../graphql/task";
import { AiOutlineDelete } from "react-icons/ai";

export function TaskCard({ task }) {
  const [deleteTask] = useMutation(DELETE_TASK);
  return (
    <div className="bg-zinc-900 px-5 py-3 mb-2 flex justify-between">
      <h1
      className="text-sm"
      >{task.title}</h1>
      <button
        onClick={() =>
          deleteTask({
            variables: { id: task._id },
            refetchQueries: ["getProject"],
          })
        }
        className="bg-red-500 px-3 py-2 rounded-md"
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
}
