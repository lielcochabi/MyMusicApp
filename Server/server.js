// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Define routes and middleware here

// const userRoutes = require('./routes/userRoutes');

// // Mount routes
// app.use('/api/users', userRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import routes
const myRouter = require('./routes/myRouter');
app.use('/api', myRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
