/**
 * Aggregates `EventEmitter`s
 */
function UserService (io) {
  this.io = io;
  this.users = {};
}

UserService.prototype.usersInRoom = function (room) {
  var results = [];

  for (var socketId in this.io.nsps['/'].adapter.rooms[room]) {
      results.push(this.users[socketId]);
  }
  console.log("Users in room (" + room + ") are: " + JSON.stringify(results));
  return results;
};

UserService.prototype.registerUser = function (socket, newUser) {
  socket.join(newUser.room);

  this.users[socket.id] = newUser;

  var usersInRoom = this.usersInRoom(newUser.room);

  // Assign avatar
  newUser.avatar = 'svg-' + usersInRoom.length;
  newUser.score = 0;
  socket.emit('user', newUser);
  this.io.sockets.in(newUser.room).emit('users', usersInRoom);
  console.log("user joined: " + JSON.stringify(newUser.name));
};

UserService.prototype.unregisterUser = function (socket) {
  var user = this.users[socket.id];
  this.users[socket.id] = undefined;

  if (user) {
    var room = user.room;
    var usersInRoom = this.usersInRoom(room);
    this.io.sockets.in(user.room).emit('users', usersInRoom);
    console.log("user left: " + JSON.stringify(user.name));
  }
};

module.exports = function (io) {
  return new UserService (io);
};
