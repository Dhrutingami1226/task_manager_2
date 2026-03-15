const swaggerDocs = {
  openapi: '3.0.0',
  info: {
    title: 'Task Manager API',
    version: '1.0.0',
    description: 'A secure REST API for task management with user authentication and role-based access control',
    contact: {
      name: 'API Support',
      email: 'support@taskmanager.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'User ID'
          },
          name: {
            type: 'string',
            description: 'User name'
          },
          email: {
            type: 'string',
            description: 'User email'
          },
          role: {
            type: 'string',
            enum: ['user', 'admin'],
            description: 'User role'
          }
        }
      },
      Task: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Task ID'
          },
          userId: {
            type: 'string',
            description: 'ID of task owner'
          },
          title: {
            type: 'string',
            description: 'Task title'
          },
          description: {
            type: 'string',
            description: 'Task description'
          },
          status: {
            type: 'string',
            enum: ['pending', 'completed'],
            description: 'Task status'
          }
        }
      }
    }
  },
  paths: {
    '/api/v1/auth/register': {
      post: {
        summary: 'Register a new user',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                  role: { type: 'string', enum: ['user', 'admin'] }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'User registered successfully'
          }
        }
      }
    },
    '/api/v1/auth/login': {
      post: {
        summary: 'Login user',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Login successful'
          }
        }
      }
    },
    '/api/v1/auth/logout': {
      post: {
        summary: 'Logout user',
        tags: ['Authentication'],
        responses: {
          '200': {
            description: 'Logout successful'
          }
        }
      }
    },
    '/api/v1/tasks': {
      post: {
        summary: 'Create a new task',
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title'],
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  status: { type: 'string', enum: ['pending', 'completed'] }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Task created successfully'
          }
        }
      },
      get: {
        summary: 'Get all tasks for current user',
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Tasks retrieved successfully'
          }
        }
      }
    },
    '/api/v1/tasks/{id}': {
      put: {
        summary: 'Update a task',
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Task updated successfully'
          }
        }
      },
      delete: {
        summary: 'Delete a task',
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Task deleted successfully'
          }
        }
      }
    }
  }
};

export default swaggerDocs;
