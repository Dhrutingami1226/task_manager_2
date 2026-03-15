# Task Manager Application

A full-stack, secure REST API with JWT authentication, role-based access control, and a responsive React frontend for efficient task management. Built with scalability and security best practices in mind.

## ✨ Features

### ✅ **User Authentication & Security**
- User registration (signup) with email validation
- Secure login with password hashing (bcryptjs)
- JWT token-based authentication (1-hour expiration)
- httpOnly cookie storage for secure token handling
- Bearer token support in Authorization header
- Logout functionality with cookie clearing
- Role-based access control (User vs Admin roles)

### ✅ **Task Management**
- Create new tasks with title and description
- View all user tasks in personalized dashboard
- Edit existing tasks (title, description, status)
- Delete tasks with authorization checks
- Mark tasks as completed or pending
- Filter tasks by status (pending/completed)
- Real-time task statistics (total, pending, completed)
- User isolation - each user can only see their own tasks

### ✅ **API Design & Documentation**
- RESTful API endpoints with proper HTTP status codes
- API versioning (`/api/v1/`) for future compatibility
- Comprehensive Swagger/OpenAPI documentation
- Interactive API docs available at `/api-docs`
- Input validation and error handling
- Data sanitization to prevent NoSQL injection and XSS attacks

### ✅ **User-Friendly Interface**
- Clean and modern UI with responsive design
- Modal forms for creating and editing tasks
- Real-time statistics showing task counts
- Intuitive navigation and task management
- Success/error message feedback

## 🔐 Security Features

- **Password Security**: Bcryptjs hashing with salt rounds
- **JWT Security**: Signed tokens with expiration
- **httpOnly Cookies**: Prevent XSS attacks
- **NoSQL Injection Prevention**: Input sanitization with express-mongo-sanitize
- **XSS Protection**: XSS-clean middleware
- **CORS Protection**: Configured CORS headers
- **User Data Isolation**: Users can only access their own tasks
- **Authorization Checks**: Task operations verify user ownership

## 🏗️ Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **React Router 7.13.0** - Client-side routing
- **Axios** - HTTP client for API requests
- **Vite** - Modern build tool and dev server
- **CSS3** - Styling with responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.17.1** - MongoDB ODM and schema validation
- **JWT (jsonwebtoken)** - Secure authentication tokens
- **bcryptjs** - Password hashing
- **express-mongo-sanitize** - NoSQL injection prevention
- **xss-clean** - XSS attack prevention
- **swagger-ui-express** - Interactive API documentation
- **CORS** - Cross-origin resource sharing
- **Cookie-parser** - Cookie handling

## 📥 Installation

### Prerequisites
- Node.js v18.x or higher
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. **Setup Backend**
   ```bash
   cd Backend
   npm install
   ```

   Create a `.env` file by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:
   ```env
   PORT=3001
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/task_manager
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Setup Frontend**
   ```bash
   cd ../Frontend
   npm install
   ```

## 🚀 Running the Application

### Start the Backend Server
```bash
cd Backend
npm run dev
```
The backend will run on `http://localhost:3001`  
API Documentation: `http://localhost:3001/api-docs`

### Start the Frontend Dev Server
In a new terminal:
```bash
cd Frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

## 📖 Usage Guide

### 1. Create an Account
- Navigate to the Sign Up page
- Enter your name, email, and password
- Click "Sign Up" to create your account
- You'll be automatically logged in and redirected to dashboard

### 2. Login
- Enter your registered email and password
- Click "Login" to access your dashboard
- Your session will be maintained via JWT token

### 3. Create a Task
- Click the "Create New Task" button on the dashboard
- Enter task title (required) and optional description
- Click "Create Task" to save

### 4. View Tasks
- All tasks appear in the "Your Tasks" section
- View real-time statistics at the top (Total, Pending, Completed)
- Tasks are sorted by creation date (newest first)

### 5. Edit a Task
- Click the "Edit ✎" button on any pending task
- Modify the title, description, or status
- Click "Update Task" to save changes

### 6. Mark Task as Complete
- Click "Mark Complete ✓" on any pending task
- Task status changes to completed and styling updates

### 7. Delete a Task
- Click "Delete ✕" on any task
- Task is immediately deleted from your list

### 8. Logout
- Click "Logout" button in the top-right corner
- You'll be logged out and redirected to login page

## 📁 Project Structure

```
task-manager/
├── Backend/
│   ├── controllers/
│   │   ├── auth.mjs           # Authentication logic
│   │   └── task.mjs           # Task CRUD operations
│   ├── models/
│   │   ├── register.mjs       # User schema with role field
│   │   └── task.mjs           # Task schema
│   ├── routes/
│   │   ├── auth.mjs           # Auth endpoints (v1)
│   │   └── task.mjs           # Task endpoints (v1)
│   ├── middlewares/
│   │   └── auth.mjs           # JWT protection & authorization
│   ├── config/
│   │   └── db.mjs             # MongoDB connection
│   ├── swagger.mjs            # OpenAPI/Swagger documentation
│   ├── app.mjs                # Express app setup
│   ├── .env.example           # Environment variables template
│   ├── package.json
│   └── package-lock.json
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── login.jsx              # Login form
    │   │   ├── Signup.jsx             # Registration form
    │   │   ├── Dashboard.jsx          # Main task management
    │   │   └── ProtectedRoute.jsx     # Route protection
    │   ├── context/
    │   │   └── AuthContext.jsx        # Auth state management
    │   ├── styles/
    │   │   ├── Auth.css               # Auth pages styling
    │   │   ├── Dashboard.css          # Dashboard styling
    │   │   └── index.css              # Global styles
    │   ├── App.jsx                    # Main app component
    │   └── main.jsx                   # React entry point
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── package-lock.json
```

## 📡 API Endpoints (v1.0)

### Base URL: `http://localhost:3001/api/v1`

#### **Authentication Endpoints**

- **POST** `/auth/register`
  - Register a new user
  - Body: `{ name, email, password }`
  - Response: User object with role

- **POST** `/auth/login`
  - Login user and receive JWT token
  - Body: `{ email, password }`
  - Response: JWT token and user object with role

- **POST** `/auth/logout`
  - Logout user (clears session)
  - Response: Success message

#### **Task Endpoints** (Requires JWT Authentication)

- **POST** `/tasks`
  - Create a new task
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ title, description, status }`
  - Response: Created task object

- **GET** `/tasks`
  - Get all tasks for current user
  - Headers: `Authorization: Bearer {token}`
  - Response: Array of task objects

- **GET** `/tasks/status/:status`
  - Filter tasks by status (pending/completed)
  - Headers: `Authorization: Bearer {token}`
  - Response: Filtered tasks with count

- **PUT** `/tasks/:id`
  - Update a task
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ title, description, status }`
  - Response: Updated task object

- **DELETE** `/tasks/:id`
  - Delete a task
  - Headers: `Authorization: Bearer {token}`
  - Response: Deleted task object

## 🔑 Authentication & Authorization

### JWT Token Flow
1. User registers/logs in → Backend creates JWT with user ID and role
2. Token stored in httpOnly cookie (secure) and localStorage (client access)
3. Token sent with each request in `Authorization: Bearer {token}` header
4. Backend verifies token signature and expiration
5. User data extracted from token and attached to request
6. Task operations verified for user ownership

### Role-Based Access Control (RBAC)
- **User Role**: Default role, can manage only their own tasks
- **Admin Role**: (Currently implemented, expandable for future features)
- Authorization middleware ensures users can only access/modify their own data

## 📋 API Documentation

Interactive Swagger/OpenAPI documentation available at:
```
http://localhost:3001/api-docs
```

Features:
- All endpoints with request/response schemas
- Try-it-out functionality
- Authentication headers documentation
- Error response examples

## 🌐 Scalability & Deployment Strategy

### Current Architecture
- **Monolithic Backend**: Single Express server with all business logic
- **Standalone Frontend**: Static React build served separately
- **Single MongoDB Database**: Centralized data store
- **No Caching Layer**: Direct database queries

### Scaling Roadmap

#### **Phase 1: Immediate Improvements** (1-2 weeks)
- Add request logging (Winston or Morgan)
- Implement rate limiting to prevent API abuse
- Add request/response validation middleware
- Database indexing on frequently queried fields (email, userId)
- Enable MongoDB compression

#### **Phase 2: Caching & Performance** (2-4 weeks)
- **Redis Cache Layer**: Cache user tasks (TTL: 5 minutes)
  - Reduces database load by 60-70%
  - Faster repeated requests
- **CDN for Frontend**: Static assets via Cloudflare/AWS CloudFront
- **API Response Compression**: gzip middleware

#### **Phase 3: Microservices Architecture** (1-2 months)
```
Current: [Frontend] [Backend] [Database]
         
Target:  [Frontend] 
         /          \
    [Auth Service]  [Task Service]
         |                |
      [Auth DB]       [Task DB]
```

Benefits:
- Independent scaling per service
- Easier deployment and updates
- Technology flexibility per service
- Enhanced fault isolation

#### **Phase 4: Load Balancing & High Availability** (2-3 months)
- **Load Balancer** (Nginx/HAProxy):
  - Distribute traffic across multiple backend instances
  - Health checks for automatic failover
  - Session persistence (sticky sessions)
  
- **Database Replication**:
  - MongoDB Replica Set (3-5 nodes)
  - Automatic failover on primary failure
  - Read replicas for analytics

- **Message Queue** (RabbitMQ/Redis):
  - Asynchronous task processing
  - Improved response times
  - Decoupled services

#### **Phase 5: Advanced Optimization** (Ongoing)
- **Containerization**: Docker for consistent deployments
- **Orchestration**: Kubernetes for auto-scaling
- **Monitoring**: Prometheus + Grafana for metrics
- **Alerting**: PagerDuty for incident response
- **Database Sharding**: Partition data by userId for massive scale
- **GraphQL**: Consider migration for flexible queries

### Example Production Setup (Small Scale - 1M users)
```
┌─────────────────────────────────────┐
│     CloudFlare CDN (Frontend)       │
└────────────────┬────────────────────┘
                 │ HTTPS
┌────────────────┴────────────────────┐
│      Nginx Load Balancer            │
└────────┬─────────────────────┬──────┘
         │                     │
    ┌────▼──────┐         ┌───▼─────┐
    │  Backend  │         │ Backend  │
    │ Instance1 │         │ Instance2│
    └────┬──────┘         └───┬─────┘
         │                     │
    ┌────▼─────────────────────▼──┐
    │  Redis Cache (Session/Data)  │
    └─────────┬────────────────────┘
              │
    ┌─────────▼────────────────┐
    │ MongoDB Replica Set      │
    │ (Primary + 2 Secondaries)│
    └──────────────────────────┘
```

### Estimated Performance Metrics
- **Current**: ~500 concurrent users, ~50ms avg response time
- **With Caching**: ~2000 concurrent users, ~15ms avg response time
- **With Load Balancing**: ~10,000 concurrent users, ~20ms avg response time
- **Kubernetes + Sharding**: 1M+ concurrent users, <100ms p99 latency

### Cost Considerations
- **Local Development**: Free (2-3 GB RAM needed)
- **Small Scale (AWS t3.micro)**: $10/month
- **Medium Scale (3 instances + Redis)**: $100-150/month
- **Enterprise Scale (Auto-scaling)**: $1000-5000/month

## 📝 Environment Variables

Required environment variables (see `.env.example`):
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `JWT_SECRET`: Secret key for JWT signing (change in production!)
- `CORS_ORIGIN`: Frontend URL for CORS

## 🐛 Error Handling

API returns standardized error responses:
```json
{
  "message": "Error description",
  "status": 400
}
```

Common Status Codes:
- `201`: Resource created successfully
- `200`: Success
- `400`: Bad request (validation error)
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (authorization failed)
- `404`: Resource not found
- `500`: Server error

## 🧪 Testing the API

### Using cURL
```bash
# Register
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Create Task (replace TOKEN with actual JWT)
curl -X POST http://localhost:3001/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"My Task","description":"Task details"}'
```

### Using Postman
1. Import the Swagger JSON from `/api-docs`
2. Set up environment variable: `token` = JWT from login response
3. Use `{{token}}` in Authorization headers
4. Test all endpoints interactively

## 📊 Database Schema

### User Model
```javascript
{
  userId: Number (unique auto-increment),
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Task Model
```javascript
{
  userId: ObjectId (reference to User, required),
  title: String (required),
  description: String,
  status: String (enum: ['pending', 'completed'], default: 'pending'),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=your_mongodb_uri
```

### Frontend Deployment (Vercel)
```bash
npm install -g vercel
vercel
```

## 📄 License

ISC

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

---

**Happy Task Managing!** 🚀

For questions or support, please open an issue on GitHub.