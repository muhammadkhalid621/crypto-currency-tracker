# To start the application in development mode, please follow these steps:

1) Clone the Remix application repository to your local machine using Git.

2) Install the necessary dependencies:

    Open a terminal or command prompt in the project directory.
    Run the command npm install to install the project dependencies, including Remix, Tailwind CSS, and Prisma.

3) Start the development server:

    In the terminal or command prompt, run npm run dev. This command will start the Remix development server.
    The development server will compile the application and make it available at the specified URL, typically http://localhost:3000.

4) Access the application:

    Open your web browser and navigate to the URL provided by the development server (e.g., http://localhost:3000).
    You should see the Remix application running in development mode.

# Application Architecture

The application's architecture can be described as follows:

1) Frontend:

    The frontend is built using the Remix framework, which allows for server-rendered React components.
    The frontend interacts with the backend using Remix's "back-to-back" API mode, where the frontend communicates with its own Remix backend.

2) Backend:

    The backend consists of Remix server routes responsible for data fetching and handling API calls.
    Data fetching is performed using the fetch function provided by Remix.
    Load and search queries are made using the CoinCap API, accessed through the fetch function in the API file (e.g., api.js).
    For saving data, the application uses a POST request to the Prisma SQLite database via a specific route (e.g., /save).

3) External API Access (CoinCap API):

    The application accesses the CoinCap API using the fetch function in the API file.
    The API endpoint used is https://api.coincap.io/v2/assets, which provides data for cryptocurrencies.
    GET requests are utilized to fetch data from the CoinCap API.

4) Prisma SQLite Database:

    Prisma serves as an ORM (Object-Relational Mapping) tool for the SQLite database.
    For saving data, the application employs a POST request to a specific route (e.g., /save).
    The data sent in the POST request is subsequently saved to the Prisma SQLite database.


# Usage

- `src/routes`: Contains the Remix server routes.
- `src/utils`: Contains the Prisma Connectivity to the Remix Server.
- `src/api.js`: Handles API requests and interactions with external APIs.
- `prisma`: Contains the Prisma configuration and schema files for the SQLite database.
- `src/styles`: Contain the css of the application
