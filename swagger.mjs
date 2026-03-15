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
    },
    {
      url: 'http://localhost:3000',
      description: 'Alternative development server'
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
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
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
          },
          createdAt: {
            type: 'string',
            format: 'date-time'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          },
          status: {
            type: 'number'
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
                  name: {
                    type: 'string',
                    example: 'John Doe'
                  },
                  email: {
                    type: 'string',
                    example: 'john@example.com'
                  },
                  password: {
                    type: 'string',
                    example: 'password123'
                  }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    user: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Bad request - User already exists or missing fields',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/v1/auth/login': {
      post: {
        summary: 'Login user and get JWT token',
        tags: ['Authentication'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: {
                    type: 'string',
                    example: 'john@example.com'
                  },
                  password: {
                    type: 'string',
                    example: 'password123'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    token: { type: 'string' },
                    user: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          },
          '404': {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
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
            description: 'Logout successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
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
                  title: {
                    type: 'string',
                    example: 'Buy groceries'
                  },
                  description: {
                    type: 'string',
                    example: 'Buy milk, eggs, and bread'
                  },
                  status: {
                    type: 'string',
                    enum: ['pending', 'completed'],
                    example: 'pending'
                  }
                }
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Task created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    task: { $ref: '#/components/schemas/Task' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Bad request',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      },
      get: {
        summary: 'Get all tasks for current user',
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Tasks retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Task' }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    },
    '/api/v1/tasks/status/{status}': {
      get: {
        summary: 'Get tasks filtered by status',
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'status',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              enum: ['pending', 'completed']
            }
          }
        ],
        responses: {
          '200': {
            description: 'Filtered tasks retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                    tasks: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Task' }
                    },
                    count: { type: 'number' }
                  }
                }
              }
            }
          },
          '400': {
            description: 'Invalid status',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
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
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  status: {
                    type: 'string',
                    enum: ['pending', 'completed']
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Task updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    task: { $ref: '#/components/schemas/Task' }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          '403': {
            description: 'Forbidden - Not authorized to update this task',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          '404': {
            description: 'Task not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
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
            description: 'Task deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    deletedTask: { $ref: '#/components/schemas/Task' }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          '403': {
            description: 'Forbidden - Not authorized to delete this task',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          },
          '404': {
            description: 'Task not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' }
              }
            }
          }
        }
      }
    }
  }
};

export default swaggerDocs;
