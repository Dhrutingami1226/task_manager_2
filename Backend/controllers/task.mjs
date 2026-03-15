import Task from "../models/task.mjs";

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user._id;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = await Task.create({
      userId,
      title,
      description: description || "",
      status: status || "pending"
    });

    res.status(201).json({
      message: "Task created successfully",
      task: {
        _id: newTask._id,
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        createdAt: newTask.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const userId = req.user._id;
    const validStatuses = ["pending", "completed"];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    
    const tasks = await Task.find({ userId, status }).sort({ createdAt: -1 });
    
    res.status(200).json({
      status,
      tasks,
      count: tasks.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { title, description, status } = req.body;

    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) {
      const validStatuses = ["pending", "completed"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
      task.status = status;
    }

    await task.save();
    
    res.status(200).json({
      message: "Task updated successfully",
      task: {
        _id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        updatedAt: task.updatedAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }
    
    await Task.findByIdAndDelete(id);
    
    res.status(200).json({
      message: "Task deleted successfully",
      deletedTask: {
        _id: task._id,
        title: task.title,
        description: task.description,
        status: task.status
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
