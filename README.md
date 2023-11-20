# SpiceSafari

A full-stack web application for managing and exploring spice-rich recipes, built with React, Node.js, and MongoDB.

## Features

- **User Authentication**: Users can register and log in to manage their recipes.
- **Recipe Sharing**: Share your unique recipes with the community.
- **Recipe Search**: Explore recipes online through an external API.

## Installation

### Prerequisites
- Node.js: Make sure you have Node.js installed.
- MongoDB: Ensure MongoDB is installed and running on your machine.

### Steps
1. Clone the repository:

    ```bash
    git clone https://github.com/SSShogunn/SpiceSafari.git
    cd SpiceSafari
    ```

2. Install dependencies for the server:

    ```bash
    cd server
    npm install
    ```

3. Configure MongoDB:

    - Create a MongoDB database and obtain the connection string.
    - Update the MongoDB connection string in `server/config.js`.

4. Start the server:

    ```bash
    npm start
    ```

5. Open a new terminal window, navigate to the client folder, and install client dependencies:

    ```bash
    cd ../client
    npm install
    ```

6. Start the client application:

    ```bash
    npm start
    ```

7. Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

- **User Authentication**:
  - Register a new account.
  - Log in to access personalized features.
  
- **Recipe Management**:
  - Add, edit, and delete spice-rich recipes.
  - Share your unique recipes with the community.

- **Recipe Search**:
  - Utilize the search button to explore recipes online through an external API.

## Contributing

Feel free to contribute to the development of this project! Follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

Aman Singh
