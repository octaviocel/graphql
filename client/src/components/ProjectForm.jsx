import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT, GET_PROJECTS } from "../graphql/projects";

export function ProjectForm() {
  const [project, setProject] = useState({ name: "", description: "" });

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [
      {
        query: GET_PROJECTS,
      },
      "GetProjects",
    ],
  });

  const handleChange = (event) => {
    setProject({ ...project, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(project);
    createProject({
      variables: { name: project.name, description: project.description },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-2/5">
      {error && <p>{error.message}</p>}
      <input
        className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"
        type="text"
        name="name"
        placeholder="Write a title"
        onChange={handleChange}
      />
      <textarea
        className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"
        name="description"
        placeholder="Write a description"
        rows={3}
        onChange={handleChange}
      ></textarea>

      <button
        className="bg-blue-500 px-4 py-1 rounded-md text-lg mb-3 disable:bg-zinc-400"
        disabled={!project.name || !project.description || loading}
        type="submit"
      >
        Create Project
      </button>
    </form>
  );
}
