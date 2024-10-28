# TaskFlow

TaskFlow is a role-based task management application designed to handle task creation, user management, and access control with a robust frontend and backend structure. Using React for the frontend, TaskFlow leverages Redux Toolkit for state management and RTK Query for efficient API handling. The backend incorporates JWT-based authentication, role-based access control, and middleware for enhanced security.

## Features:
- Role-Based Access Control: Separate access levels for employees, managers, and admins, allowing only authorized roles to view or modify specific data.
- JWT Authentication: Secure token-based authentication, with refresh token handling for seamless user sessions.
- State Management with Redux: Efficient, normalized state management in the frontend using Redux and RTK Query.
- Persistence and Protected Routes: Access persists across page refreshes through token persistence and route protection.
- Efficient Data Handling: Uses normalized data structures for fast lookups and partial cache invalidation for specific entities, improving data freshness and UI responsiveness.
- API Caching and Refetching Options: Custom hooks and settings in RTK Query optimize API requests, including selective refetching and prefetching.

## Live Code
https://taskflow-n1sh.onrender.com
