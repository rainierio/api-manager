const contacts = require('./contacts/contacts.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(contacts);
  app.configure(users);
};
