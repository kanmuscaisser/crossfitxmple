const mongoose = require('mongoose');

const config = require('./config');
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception! Shuting down server...');
  process.exit(1);
});

const app = require('./app');

const DB = config.database
  .replace('<PASSWORD>', config.dbPassword)
  .replace('<USERNAME>', config.dbUserName);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to mongo successfully!'));

const { port } = config;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection! Shuting down server...');
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated!');
  });
});
