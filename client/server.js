const serve = require('serve');

const server = serve('.', {
  port: process.env.PORT || 3000, // Use Heroku's dynamic port or default to 3000
});