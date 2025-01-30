# # GraphQL Profile Page Project

## Objective
The goal of this project is to learn the GraphQL query language by creating a personal profile page that displays user data fetched from a GraphQL API.

## Key Features
- **Profile Page**: Displays user data including basic information, XP amount, grades, skills, etc.
- **Statistics Section**: Generates  two SVG graphs based on user data (e.g., XP earned over time, pass/fail ratios, etc.).
- **Login Page**: Allows user authentication via JWT to query the API securely.
- **GraphQL Queries**: Fetch data from the provided GraphQL endpoint to populate the profile and generate dynamic charts.

## Setup & Hosting
- **GraphQL Endpoint**: The data is queried from [https://learn.reboot01.com/api/graphql-engine/v1/graphql](https://learn.reboot01.com/api/graphql-engine/v1/graphql).
- **Authentication**: Use JWT for secure access, obtained through the signin endpoint [https://learn.reboot01.com/api/auth/signin](https://learn.reboot01.com/api/auth/signin).
- **Hosting**: The project is hosted on GitHub Pages at [https://reemohamed2.github.io/GhrapicQL/]


## Technologies Used
- **Frontend**: HTML, CSS, JavaScript , react js
- **GraphQL**: Queries for fetching user data
- **SVG**: For rendering interactive and animated graphs
- **JWT**: For secure user authentication

