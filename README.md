# Mordor Mingle - Event Website

Mordor Mingle is a web application that provides a platform for users to explore events happening in Middle Earth. Whether you're interested in the latest gatherings, celebrations, or meetings, Mordor Mingle has you covered. By logging in, users can take advantage of additional features such as event publication, event commenting, event details viewing, and managing their own event activity on their profile page. The application is built using a modern tech stack including Node.js, React, Express, JavaScript, CSS, and MongoDB.

![Mordor Mingle Screenshot](/src/assets/Logo-white.png)

## Deployment Link

https://mordor-mingle.netlify.app/

## Features

- **Event Exploration:** Explore a wide range of events happening in Middle Earth.
- **User Authentication:** Create an account or log in to unlock additional features. Authentication is powered by JWT (JSON Web Tokens) and bcrypt for password hashing.
- **Event Publication:** Logged-in users can publish their own events to share with the community.
- **Event Comments:** Engage with other users by leaving comments on events.
- **Event Details:** View detailed information about each event.
- **User Profile:** Keep track of events you've created and liked through your profile.
- **Responsive Design:** Use Mondor Mingle on your desktop or mobile.

## Backlog

- Implement user profile image
- Add responsive design for tablets

## Technologies Used

- JavaScript
- CSS
- Node.js
- React
- Express
- MongoDB

## Installation

1. Clone this repository: `git clone https://github.com/yourusername/mordor-mingle.git`
2. Navigate to the project directory: `cd mordor-mingle`
3. Install server dependencies: `npm install`
4. Navigate to the `client` directory: `cd client`
5. Install client dependencies: `npm install`
6. Return to the project directory: `cd ..`

## Configuration

1. Rename `.env.example` to `.env`.
2. Open `.env` and provide your configuration values (e.g., MongoDB URI, JWT secret).

## Usage

1. In the project directory, start the server: `npm start`
2. In a separate terminal, navigate to the `client` directory: `cd client`
3. Start the client: `npm start`
4. Access the application in your web browser at: `http://localhost:3000`
