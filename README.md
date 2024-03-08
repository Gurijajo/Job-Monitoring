# Shift Controller App

Shift Controller App is a web application built with Angular for managing shifts and schedules for workers.

## Features

- **User Authentication:** Secure login and registration system for users with role-based access control.
- **Dashboard:** Separate dashboards for administrators and regular users, providing relevant information and functionalities.
- **Schedule Management:** Create, edit, and delete shifts and schedules for workers.
- **Form Handling:** User-friendly forms for adding and updating job roles and schedules.
- **Guard Services:** Implement guards to control access based on user roles.
- **Notification System:** Notify users about important updates or changes.
- **Validators:** Custom validators for password matching and other input validations.

## Project Structure

The project structure follows Angular's best practices, with components, services, guards, interfaces, validators, and routing modules organized into different directories.

- **Components:** Contains various components for different parts of the application, such as dashboard, job forms, login, register, schedule, etc.
- **Guards:** Contains guard services for controlling access to routes based on user roles.
- **Interfaces:** Defines TypeScript interfaces for better type safety and code readability.
- **Services:** Contains Angular services for handling authentication, form submission, notifications, schedules, etc.
- **Validators:** Custom validators for validating form inputs, such as passwords matching.

## Getting Started

To run the project locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Run the development server using `ng serve`.
5. Open your web browser and visit `http://localhost:4200` to view the application.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow the contribution guidelines outlined in the CONTRIBUTING.md file.

## Credits

This project was created and maintained by Guram Jajanidze. Special thanks to Luka Budagovi and Sandro Jvarsheishvili.
