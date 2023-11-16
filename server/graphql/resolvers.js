import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const resolver = {
  Query: {
    hello: function () {
      return "Hola Mundo";
    },
    projects: async () => {
      return await Project.find();
    },
    tasks: async () => await Task.find(),
    project: async (_, { _id }) => await Project.findById(_id),
    task: async (_, { _id }) => await Task.findById(_id),
  },
  Mutation: {
    createProject: async (_, { name, description }) => {
      const project = new Project({
        name,
        description,
      });
      const savedProject = await project.save();
      return savedProject;
    },
    createTask: async (_, { title, projectId }) => {
      const projectFound = await Project.findById(projectId);

      if (!projectFound) throw new Error("Project not found");

      const task = new Task({
        title,
        projectId,
      });
      const savedTask = await task.save();
      return savedTask;
    },
    deleteProject: async (_, { _id }) => {
      const deletedProject = await Project.findByIdAndDelete(_id);
      if (!deletedProject) throw new Error("Project not found");

      await Task.deleteMany({ projectId: deletedProject._id });

      return deletedProject;
    },
    deleteTask: async (_, { _id }) => {
      const deletedTask = await Task.findByIdAndDelete(_id);
      if (!deletedTask) throw new Error("Task not found");

      return deletedTask;
    },
    updateProject: async (_, args) => {
      const updated = await Project.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updated) throw new Error("Project not found");

      return updated;
    },
    updateTask: async (_, args) => {
      const updated = await Task.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updated) throw new Error("Task not found");

      return updated;
    },
  },
  Project: {
    tasks: async ({ _id }) => await Task.find({ projectId: _id }),
  },
  Task: {
    project: async ({ projectId }) => await Project.findById(projectId),
  },
};
