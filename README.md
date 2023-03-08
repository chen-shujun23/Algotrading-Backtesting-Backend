# Algotrading-Backtesting-Backend

How to:

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


