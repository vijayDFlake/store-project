const express = require('express');
const sequelize = require('./src/config/database')
const app = express();
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const feedbackRoutes = require("./src/routes/feedbackRoutes");
const bodyParser = require('body-parser');
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', feedbackRoutes);

// check database connection
sequelize.sync().then(() => {
    console.log("Database connected successfully");
}).catch(err => {
    console.error("Error connecting to the database: ", err);
});

// start the server
app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`);
});