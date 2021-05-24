const noteEventController = require('./noteEvent.controller');

module.exports = {
    connectUser: (io) => {
        io.on('connection', (socket) => {
            noteEventController.connectUser(socket, io);

            socket.on('disconnect', () => {
                noteEventController.disconnectUser(socket, io);
            })
        })
    }
}