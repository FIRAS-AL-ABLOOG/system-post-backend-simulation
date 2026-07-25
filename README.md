# RESTful Social Media Post & Comment System (Backend Simulation)

A highly structured, high-performance Node.js & Express.js backend implementation simulating a real-world social media Post, Comment, and Interaction (Like) system. This project demonstrates clean code architectural patterns (**MVC**), optimal database performance using **Mongoose**, and industry-standard security practices.

## 🚀 Key Features & Architectural Highlights

- **Clean RESTful API Design:** Implements strict RESTful conventions using appropriate HTTP methods (`GET`, `POST`, `PATCH`, `DELETE`) and clean resource routing (`/api/v1/posts`).
- **Advanced Mongoose Logic:** 
  - Uses atomic MongoDB operators like `$addToSet` and `$pull` to manage likes seamlessly and prevent double-liking without heavy server overhead.
  - Implements optimized single-query deletions using `findByIdAndDelete` paired with robust `null` checking to prevent runtime crashes.
  - Utilizes data population (`.populate()`) to dynamically fetch author and commenter details (`name`, `image`) without redundant queries.
- **Scalable Comment Architecture:** Leverages Express.js `{ mergeParams: true }` to separate the Comments router while keeping them deeply nested and dependent on individual Post IDs for true enterprise-grade scalability.
- **Fail-Safe Crash Prevention:** Fully guarded with comprehensive `try/catch` blocks and standard global exception handling (`app.all('*')`) for unmatched server uptime.
- **Secure Environment Configurations:** Implements `dotenv` for absolute environment variable isolation, shielding critical database credentials and port configurations from production leaks.

---

## 🛠️ Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database Object Modeling (ODM):** Mongoose (MongoDB)
- **Environment Management:** Dotenv

---

## 📂 Project Architecture (MVC Structure)

```text
├── config.env              # Environment Variables (Ignored in production)
├── app.js                  # Main Application Server & Global Middlewares
├── controllers/            # Business Logic Handler Functions
│   ├── postController.js   # Logic for CRUD and Post Likes (Toggle)
│   └── commentController.js# Logic for Create and Read Comments
├── model/                  # Database Schemas & Models
│   ├── postModel.js        # Post schema (with automated index on createdAt)
│   └── commentModel.js     # Referenced Comment schema
└── Routes/                 # Application Routers
    ├── postRouter.js       # Main posts routes
    └── commentRouter.js    # Decoupled comment routes utilizing mergeParams
```

---

## 📌 API Endpoints Checklist

### 📝 Posts Management
- `POST  /api/v1/posts` - Create a new post *(Requires user image upload validation)*
- `GET   /api/v1/posts` - Fetch all posts *(Sorted by newest first, populated with author)*
- `PUT   /api/v1/posts/:id` - Update post description/images *(With runValidators: true)*
- `DELETE /api/v1/posts/:id` - Atomic deletion of a post *(Safeguarded with null-check)*

### 👤 Interactions (Likes)
- `PATCH /api/v1/posts/:id/like` - Toggle user like *(Smart add/remove logic using `$addToSet`/`$pull`)*

### 💬 Comments Management
- `POST  /api/v1/posts/:postId/comments` - Create a new comment linked to a post
- `GET   /api/v1/posts/:postId/comments` - Retrieve all comments for a specific post

---

