const socketServer = require('socket.io');
const noteEvent = require('./note-events/noteEvent.route');

module.exports.listen = (server, app) => {
  const io = socketServer.listen(server);
  app.set('io', io);
  noteEvent.connectUser(io);
};
