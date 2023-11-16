import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../../graphql/task";
import { useParams } from "react-router-dom";
export function TaskForm() {
  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: ["getProject"],
  });
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await createTask({
      variables: {
        title: e.target.title.value,
        projectId: params.id,
      },
    });
    if (data) {
      e.target.reset();
      e.target.title.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="bg-zinc-900 text-white w-full p-2 rounded-lg mb-2"
        type="text"
        name="title"
        placeholder="Add a Task"
      />
      <button className="bg-sky-900 text-white w-full p-2 rounded-lg">
        Add
      </button>
    </form>
  );
}
