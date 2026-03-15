import express from 'express';
import { 
  createTask, 
  getTasks, 
  getTasksByStatus, 
  updateTask, 
  deleteTask 
} from '../controllers/task.mjs';
import { protect, authorize } from '../middlewares/auth.mjs';

const router = express.Router();

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, completed]
 *     responses:
 *       201:
 *         description: Task created successfully
 *   get:
 *     summary: Get all tasks for current user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 */
router.post('/', protect, createTask);
router.get('/', protect, getTasks);

/**
 * @swagger
 * /api/v1/tasks/status/{status}:
 *   get:
 *     summary: Get tasks filtered by status
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed]
 *     responses:
 *       200:
 *         description: Filtered tasks retrieved successfully
 */
router.get('/status/:status', protect, getTasksByStatus);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

export default router;
