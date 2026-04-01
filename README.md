# School Task Assignment Website

A web-based application designed to help school administrators manage tasks and assign them to teachers. This system streamlines the process of task delegation, tracking, and management within an educational institution.

## 🚀 Features

### For Administrators

- **Dashboard**: Overview of administrative activities.
- **Task Management**:
  - Add new tasks with details like title, priority, and description.
  - Edit existing tasks.
  - View a list of all tasks.
- **Teacher Management**: Manage teacher accounts and details.

### For Teachers

- **Dashboard**: Personalized view for teachers.
- **Task Tracking**:
  - View assigned tasks ("My Tasks").
  - View task details.
  - Mark tasks as completed.
  - View history of completed tasks.

### General Features

- **User Authentication**: Login, Sign up, and Forgot Password functionality.
- **Profile Management**: Users can view and manage their profiles.
- **Navigation**: distinct navigation menus for Admins, Teachers, and public users.

## 📂 Project Structure

```text
School-Task-Assignment-website/
├── admin/                  # Admin-specific pages
│   ├── add-task.html       # Form to create new tasks
│   ├── dashboard.html      # Admin control panel
│   ├── edit-task.html      # Form to modify tasks
│   ├── manage-teachers.html # Teacher management interface
│   └── tasks.html          # List of all tasks
├── assets/
│   └── images/             # Project images
├── navigation/             # Reusable navigation components
│   ├── admin_nav.html      # Navigation bar for admins
│   ├── main_nav.html       # Public navigation bar
│   └── teacher_nav.html    # Navigation bar for teachers
├── shared/                 # Common pages
│   ├── Index.html          # Landing page
│   ├── login.html          # User login page
│   ├── signup.html         # User registration page
│   ├── profile.html        # User profile page
│   └── forgot-password.html # Password recovery
└── teacher/                # Teacher-specific pages
    ├── dashboard.html      # Teacher control panel
    ├── my-tasks.html       # List of assigned tasks
    ├── task-details.html   # Detailed view of a specific task
    └── completed-tasks.html # History of finished tasks
```

## 🛠️ Technologies Used

- **HTML5**: For page structure and content.
- **CSS**: For styling (inline and embedded styles).

## 📖 How to Run

1.  Clone or download the repository to your local machine.
2.  Navigate to the project folder.
3.  Open `shared/Index.html` in your web browser to start the application.
