const noteEventController = require('./noteEvent.controller');

module.exports = {
  connectUser: (io) => {
    io.on('connection', (socket) => {
      noteEventController.connectUser(socket);

      socket.on('disconnect', () => {
        noteEventController.disconnectUser(socket);
      });
    });
  },
};
