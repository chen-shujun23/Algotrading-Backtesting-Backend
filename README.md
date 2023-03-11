# Frontend Development for Handicaps Welfare Assocation

## Installation

1. Clone the repository: git clone https://github.com/chen-shujun23/Algotrading-Backtesting-Backend
2. Install dependencies:

- npm install
- npm i bcrypt cors dotenv express express-validator jsonwebtoken pg pg-hstore sequelize uuid
- npm install -D nodemon sequelize-cli

3. Start the development server: npm start
4. Open http://localhost:5001 or any other port that you have configured to view it in the browser.

## Usage

This repository should run concurrently with the frontend server for the user interface. You may clone the frontend development repository from https://github.com/chen-shujun23/Algotrading-Backtesting-Frontend

## Technologies

This project uses the following technologies:

- HTML, CSS, Javascript
- TailwindCSS: a utility-first CSS framework
- **P**ostgresSQL: a SQL database used to store and retrieve data
- **E**xpress: a backend web framework for Node.js
- **R**eact: a frontend JavaScript library for building user interfaces
- **N**ode.js: a JavaScript runtime environment for server-side development

## Database Relationship

![Database](public/database.png)

## Backend Approach

## Unsolved Problems & Further Work

- Poorly optimized HTTP requests for events that made the application slow in loading images. We should refactor the code such that we do not have to call the database so many times. We should call the database as infrequently as possible and filter the events on the front-end instead.

- Mapping fetched data led to some props not being rendered, such as the background colour of event tags and the number of search results.

- Minor styling issues that make the web application differ slightly from the original UX design.

- Further optimization of hierarchy.

1. Create env file with

PORT=8000
DB_DATABASE=dbname
DB_USERNAME=username
DB_PASSWORD=password
DB_HOST=localhost
DB_DIALECT=postgres
NODE_ENV=development

2. Create database => npx sequelize-cli db:create

npm START
npm run migrate
npm run seed-users
npm run seed-strategies
npm run seed-users-strategies

access_token in state, refresh token in local storage

User.hasMany(UserStrategy)
UserStrategy.belongsTo(User)

Strategy.hasMany(UserStrategy)
UserStrategy.belongsTo(Strategy)

User.belongsToMany(Strategy,{through:'users-strategies'})
Strategy.belongsToMany(User,{through:'users-strategies'})

Death Cross (Bearish signal) -> SELL
50 SMA < 200 SMA
50 SMA < 100 SMA
20 SMA < 50 SMA

Golden Cross (Bullish signal) -> BUY
50 SMA > 200 SMA
50 SMA > 100 SMA
20 SMA > 50 SMA
