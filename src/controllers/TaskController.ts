import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    const task = new Task(req.body);
    try {
      task.project = req.project.id;
      req.project.tasks.push(task.id);
      await Promise.allSettled([task.save(), req.project.save()]);
      res.send("Task created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate(
        "project"
      );

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Error" });
    }
  };

  // static getAllTasks = async (req: Request, res: Response) => {
  //   const { projectId } = req.params;
  //   try {
  //     const tasks = await Task.find({ project: projectId });
  //     res.json(tasks);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  static getTaskById = async (req: Request, res: Response) => {
    const { taskId } = req.params;
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        const error = new Error("Task not found");
        return res.status(404).json({ error: error });
      }
      if (task.project.toString() !== req.project.id.toString()) {
        const error = new Error("Task not found in this project");
        return res.status(400).json({ error: error });
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: "Error" });
      console.log(error);
    }
  };

  //   static updateTask = async (req: Request, res: Response) => {
  //     const { id } = req.params;
  //     try {
  //       const task = await Task.findByIdAndUpdate(id, req.body);

  //       if (!task) {
  //         return res.status(404).json({ message: "Task not found" });
  //       }
  //       await task.save();
  //       res.send("Task updated successfully");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   static deleteTask = async (req: Request, res: Response) => {
  //     const { id } = req.params;
  //     try {
  //       const task = await Task.findByIdAndDelete(id);
  //       if (!task) {
  //         return res.status(404).json({ message: "Task not found" });
  //       }
  //       res.send("Task deleted successfully");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
}
