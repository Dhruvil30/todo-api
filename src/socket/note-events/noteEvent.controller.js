module.exports = {
  connectUser: (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) socket.join(userId);
  },

  disconnectUser: (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) socket.leave(userId);
  },

  sendUpdatedData: (data, userId, io) => {
    io.to(userId).emit('newNoteAdded', data);
  }
};
